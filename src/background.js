/*
var AABFilter = {urls: ["*://ok9ydq.ru/!*","*://rpsehc.ru/!*"]};

var beforeAABCallback = function(details) {
    console.log("AAB onBeforeRequest DETAILS: ", details);
    return {};
};
chrome.webRequest.onBeforeRequest.addListener(beforeAABCallback, AABFilter, ['blocking', 'requestBody']);

var afterAABCallback = function(details) {
    console.log("AAB onResponseStarted DETAILS: ", details);
    return {responseHeaders: details.responseHeaders};
};
chrome.webRequest.onResponseStarted.addListener(afterAABCallback, AABFilter, ['responseHeaders']);

var completeAABCallback = function(details) {
    console.log("AAB onComplete DETAILS: ", details);
    return {responseHeaders: details.responseHeaders};
};
chrome.webRequest.onCompleted.addListener(completeAABCallback, AABFilter, ['responseHeaders']);
*/

//chrome.runtime.setUninstallURL(url, callback);

console.log('[BG] WINDOW', window, 'DOCUMENT', document);

// Standard Google Universal Analytics code
// noinspection OverlyComplexFunctionJS
(function(i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    // noinspection CommaExpressionJS
    i[r] = i[r] || function() {
        (i[r].q = i[r].q || []).push(arguments);
    }, i[r].l = 1 * new Date();
    // noinspection CommaExpressionJS
    a = s.createElement(o),
        m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m);
})(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

ga('create', 'UA-142235281-2', 'auto', {'allowLinker': true});
ga('require', 'linker');
ga('linker:autoLink', ['edufeed.me', 'chrome.google.com'] );

// see: http://stackoverflow.com/a/22152353/1958200
ga('set', 'checkProtocolTask', function() { });
ga('set', 'appName', 'Edufeed.me');
ga('set', 'appId', 'edufeed');
ga('set', 'appVersion', '0.4.11');
ga('require', 'displayfeatures');

console.log('[BG] GA', ga);

ga('send', 'event', "STARTUP", "START", "START USING EXTENSION", 1);

chrome.contextMenus.removeAll();
chrome.contextMenus.create({
    title: "first",
    contexts: ["browser_action"],
    onclick: function() {
        console.log('[chrome.contextMenus] onclick first');
    }
});
chrome.browserAction.setPopup({
    popup: 'src/popup/popup.html'
});
chrome.browserAction.onClicked.addListener(function() {
    // Only called when there's no popup.
    console.log('chrome.browserAction.onClicked');
});
chrome.browserAction.onClicked.addListener(function() {
    console.log("[BG] browser actions");
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {command: "append"}, function(response) {
            console.log("chrome.tabs.sendMessage", response.result);
        });
    });
});
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log("[BG] Message", request, sender);
    if(request) {
        if (request.cmd == "Switch") {
            ga('send', 'event', "MENU", "SWITCH", "SWITCH ON/OFF", request.data);
        }else if (request.cmd == "SendFeedback") {
            ga('send', 'event', "MENU", "FEEDBACK", "SEND FEEDBACK", 1);
        }else if (request.cmd == "insertCodeUsingClient") {

        }
    }
    sendMessage(request);
});


/* A map of functions listening for messages from the content scripts */
var loadBinaryImage = function (path, respond, tab) {
    // The Firefox worker XHR dislikes protocol-less URLs, so prefix with the tab's protocol.
    //path = (path.indexOf('//') === 0 ? tab.url.slice(0, tab.url.indexOf(':') + 1) + path : path);
    var imageType = path.slice(path.lastIndexOf('.') + 1);
    var xhr = new XMLHttpRequest();
    xhr.open('GET', path, true);
    xhr.responseType = 'arraybuffer';
    xhr.onload = function (e) {
        if (this.status === 200 || this.status === 0) {
            respond({ uri: 'data:image/' + imageType + ';base64,' + arrayBufferToBase64(this.response) });
        } else {
            respond({ error: 'Status ' + this.status + ' did not equal 200 for ' + path });
        }
    };
    xhr.onerror = respond.bind(null, { error: 'Couldn\'t load image ' + path });
    xhr.send();
};
// A good, well-supported way to get base64 out of bytes
function arrayBufferToBase64(buffer) {
    var binary = '';
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
}



var errorHandler = function(data){
    console.error(data);
};
var sendMessage = function(data){
    var z = 0;
    chrome.tabs.query({}, tabs => {
      tabs.forEach(tab => {
          if(tabs && tabs[0]) {
              if(!z){
                console.log("[BG] SEND TO TAB:", tabs[0]);
                z++
              }
              chrome.tabs.sendMessage(tabs[0].id, data, function (response) {            });
          }
      });
    });

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        console.log("[BG] TABS:", tabs);
        if(tabs && tabs[0]) {
            console.log("[BG] SEND TO CURRENT TAB:", tabs[0]);
            chrome.tabs.sendMessage(tabs[0].id, data, function (response) {});
        }
    });
};
var js = {};
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log(sender.tab ?
        "from a content script:" + sender.tab.url :
        "from the extension");
    if (request.command == "getScripts") {
        sendResponse(js);
    }
});
chrome.runtime.onMessageExternal.addListener(function(message, sender, sendResponse) {
    console.log("[BG] external ", message, sender);
});
/*chrome.runtime.getPackageDirectoryEntry(function(root) {
    var fn = "js/app.js";
    root.getFile(fn, {}, function (fileEntry) {
        fileEntry.file(function (file) {
            var reader = new FileReader();
            reader.onloadend = function (e) {
                js[fn] = this.result;
            };
            reader.readAsText(file);
        }, errorHandler);
    }, errorHandler);
});*/
var loadScript = function(root, filename){
    root.getFile(filename, {}, function (fileEntry) {
        fileEntry.file(function (file) {
            var reader = new FileReader();
            reader.onloadend = function (e) {
                js[filename] = this.result;
                sendMessage({command: "insertScript", data:this.result, filename: filename, type:filename.replace(/.+\.([^\.]+?)/, "$1")});
            };
            reader.readAsText(file);
        }, errorHandler);
    }, errorHandler);
};
var scripts = [
    "js/libs/jsapi.js",
    "js/libs/jquery.min.js",
    "js/app.js",
    "src/inject/xhr.js",
    "src/inject/post.css",
    "src/inject/post.html",
    "src/inject/post_feed.html",
    "src/inject/post_vk.html"
];
chrome.runtime.getPackageDirectoryEntry(function(root) {
    scripts.forEach(function(val, i){
        loadScript(root, val);
    });
});


function getSwitchState(cb){
    chrome.storage.sync.get(['SwitchState'], function(value){cb(value ? value.SwitchState : undefined);});
}
getSwitchState(function(value){
    console.log("[BG] Switch State", value);
    chrome.runtime.sendMessage({cmd: "Switch", data: value}, function(response) {
        console.log("[BG] Runtime switch value sent", response);
    });
});

chrome.runtime.setUninstallURL("http://edufeed.me/final?action=uninstall", function(e){
    console.log("[BG] UNINSTALL CALLBACK");
    ga('send', 'event', "STARTUP", "UNINSTALL_CALLBACK", "UNINSTALL CALLBACK", 1);
});

chrome.runtime.onInstalled.addListener(function(details){
    if(details.reason == "install"){
        ga('send', 'event', "STARTUP", "INSTALL", "INSTALL EXTENSION", 1);
    }else if(details.reason == "update"){
        ga('send', 'event', "STARTUP", "UPDATE", "UPDATE EXTENSION OR BROWSER", 1);
    }else{
        ga('send', 'event', "STARTUP", "INSTALL_MORE", "INSTALL EXTENSION WITH NO DETAILS", 1);
    }
});
chrome.runtime.onStartup.addListener(function(details){
    ga('send', 'event', "STARTUP", "STARTUP", "EXTENSION FIRST START", 1);
});
