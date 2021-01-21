var isExtensionOn = true;

function disableButton() {
    isExtensionOn = !isExtensionOn;
    document.getElementById("disableButton").innerHTML = isExtensionOn ? 'Включить' : 'Выключить';

    console.log("setOnOffState");
    chrome.extension.sendMessage({cmd: "setOnOffState", data: {value: isExtensionOn}});
}

var isCodeInserted = false;

function insertCode() {
    isCodeInserted = !isCodeInserted;
    document.getElementById("insertButton").innerHTML = isCodeInserted ? 'Удалить код' : 'Вставить код';
    //chrome.extension.sendMessage({cmd: "insertCode", data: {value: isCodeInserted}});
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {cmd: "insertCode", data: {campaignId: document.getElementById('campaign').value, domainHash: document.getElementById('domain').value}}, function(response) {
            console.log("insert code ok");
        });
    });
}

function insertUsingClient() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
            cmd: "insertCodeUsingClient",
            data: {
                clientHash: document.getElementById('clientHash').value,
            }}, function(response) {
                console.log("insert code ok");
            }
        );
    });
}

function postMessageToSlack(title, text, pretext, currentUrl){

    chrome.runtime.sendMessage({cmd: "SendFeedback", data: text}, function(response) {

    });

    var xmlhttp = new XMLHttpRequest(),
        webhook_url = "https://hooks.slack.com/services/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"; //"https://hooks.slack.com/services/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",
        myJSONStr = 'payload= {' +
            '"username": "EDUFEED-TESTER", ' +
            '"icon_url": "http://www.antiadblock.ru/android-icon-36x36.png",' +
            //'"icon_emoji": ":ghost:"' +
            '"attachments": [{' +
            '"fallback": "Сообщение из плагина Edufeed",' +
            '"title": "'+title+'",' +
            '"color": "#9C1A22",' +
            '"pretext": "",' +
            '"author_name": "EDUFeed Tester",' +
            '"author_link": "http://www.edufeed.ru",' +
            '"author_icon": "http://www.antiadblock.ru/img/logo.png",' +
            '"fields": [{' +
            /*'"title": "URL сайта",' +
            '"value": "_<'+(currentUrl ? currentUrl : document.location)+'>_",' +
            '"short": true' +*/
            '}],' +
        '"mrkdwn_in": ["text", "fields"]' +
        ',"text": "'+text+'"' +
        //',"thumb_url": "http://www.antiadblock.ru/img/logo.png"' +
        '}]' +
        '}';
    xmlhttp.open('POST', webhook_url, false);
    xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xmlhttp.send(myJSONStr);
}

function setSwitchState(value){

    chrome.storage.sync.set({'SwitchState': value}, function() {
        console.log('[POPUP] SwitchState Saved');
    });
    chrome.runtime.sendMessage({cmd: "Switch", data: value}, function(response) {
        console.log("[POPUP] Runtime switch value sent", response);
    });
}
function getSwitchState(cb){
    chrome.storage.sync.get(['SwitchState'], function(value){cb(value ? value.SwitchState : undefined);});
}

window.onload = function() {
    console.log("popup onload", Date.now());
    /*chrome.storage.sync.get(['ErrorUrl', 'CSPError'], function(items) {
        console.log('Settings retrieved', items);
        if(items && (items["ErrorUrl"] || items["CSPError"])){
            document.getElementById("message").innerHTML = "<br><hr>";
            if(items["ErrorUrl"]) {
                document.getElementById("message").innerHTML += "<b>Заблокирован URL:</b><br>" + items["ErrorUrl"];
                document.getElementById("sendDebugInfo").style.display = 'block';
            }
            if(items["CSPError"]) {
                document.getElementById("message").innerHTML += "<br><b>Заблокирован js-код в связи с CSP политикой</b><br>";
                document.getElementById("sendDebugInfo").style.display = 'block';
            }
        }else{
            document.getElementById("message").innerHTML = "<br><hr><b>Наш домен не заблокирован!</b><br><br>";
            document.getElementById("sendDebugInfo").style.display = 'none';
        }
    });*/
};

document.addEventListener('DOMContentLoaded', function () {
    console.log("DOMContentLoaded", Date.now());

    getSwitchState(function (value) {
        console.log('[POPUP] Update SwitchState ', value);
        document.getElementById("switchon").checked = (value === undefined || value === true) ? true : false;
    });
    chrome.storage.sync.get(['MenuShow'], function(count) {
        if(!count) {
            getSwitchState(function (value) {
                console.log('[POPUP] Get SwitchState ', value);
                setSwitchState(value);
            });
        }
        count = count || 0;
        chrome.storage.sync.set({'MenuShow': count++}, function() {
            console.log('[POPUP] SwitchState Saved');
        });
    });

    document.getElementById("sendDebugInfo").addEventListener('click', function(){
        postMessageToSlack('Сообщение из плагина Edufeed', document.getElementById("message").value, "")
        /*chrome.storage.sync.get(['ErrorUrl','CurrentUrl','CSPError'], function(items) {
            if(items.CSPError) {
                postMessageToSlack('Политка CSP', 'Заблокирован наш js-код из-за CSP политики', 'Заблокирован js-код', items.CurrentUrl)
            }
        });*/
    });
    document.getElementById("switchon").addEventListener('change', function(e){
        console.log("SWITCH ON CHANGE", e.target.checked);
        setSwitchState(e.target.checked);
    });
});
