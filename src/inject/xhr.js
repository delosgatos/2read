<!-- Global site tag (gtag.js) - Google Analytics -->
(function(i, s, o, g, r, a, m) {
    a = s.createElement(o),
        m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m);

    i.dataLayer = i.dataLayer || [];
    i.gtag = function(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'UA-142235281-1');
})(window, document, 'script', 'https://www.googletagmanager.com/gtag/js?id=UA-142235281-1', 'ga');

!function(t){var i=t(window);t.fn.visible=function(t,e,o){if(!(this.length<1)){var r=this.length>1?this.eq(0):this,n=r.get(0),f=i.width(),h=i.height(),o=o?o:"both",l=e===!0?n.offsetWidth*n.offsetHeight:!0;if("function"==typeof n.getBoundingClientRect){var g=n.getBoundingClientRect(),u=g.top>=0&&g.top<h,s=g.bottom>0&&g.bottom<=h,c=g.left>=0&&g.left<f,a=g.right>0&&g.right<=f,v=t?u||s:u&&s,b=t?c||a:c&&a;if("both"===o)return l&&v&&b;if("vertical"===o)return l&&v;if("horizontal"===o)return l&&b}else{var d=i.scrollTop(),p=d+h,w=i.scrollLeft(),m=w+f,y=r.offset(),z=y.top,B=z+r.height(),C=y.left,R=C+r.width(),j=t===!0?B:z,q=t===!0?z:B,H=t===!0?R:C,L=t===!0?C:R;if("both"===o)return!!l&&p>=q&&j>=d&&m>=L&&H>=w;if("vertical"===o)return!!l&&p>=q&&j>=d;if("horizontal"===o)return!!l&&m>=L&&H>=w}}}}(jQuery);
(function(){

    var log = function(text){
        //return;
        console.log.apply(this, arguments);
    };
    
    log('[XHR] INJECT XHR OK');

var appOn = true, postCounter = 0, dataNum = 0, domReady = false, serverResponse, settings = {
    every: 4
};

var switchApp = function(state){
    appOn = state;
    if(appOn){
        processStartPosts();
        return true;
    }
    removeAll();
};

function getData(url) {
    return new Promise((resolve, reject) => {
        document.addEventListener("SET_INIT_DATA", function(e) {
            if(!e || !e.detail){
                log("[XHR] error load init data", e);
                return false;
            }
            try{
                var d = JSON.parse(e.detail);
                setServerResponse(d);
            }catch(err){
                log("[XHR] error", err);
            }
        });
        document.addEventListener("ERROR_INIT_DATA", function(e) {
            if(!e || !e.detail){
                log("[XHR] error load init data", e);
                return false;
            }
            try{
                var d = JSON.parse(e.detail);
                setServerResponse(d);
            }catch(err){
                log("[XHR] error load init data", err);
            }

        });
        sendToContentScript("GetJSON", {'successEvent':'SET_INIT_DATA', 'errorEvent':'ERROR_INIT_DATA', 'url':url});
    });
}

document.addEventListener("securitypolicyviolation", function(e) {
    log("[XHR] CSP: ", e.target.id, e.target.innerHTML, e.sourceFile, e.blockedURI, e);
    if(e.target == document){

    }
    sendToContentScript("CSPError", true);
});
document.addEventListener("CMD", function(e) {
    if(!e || !e.detail){
        return false;
    }
    var command = "", data = {};
    try{
        var d = JSON.parse(e.detail);
        command = d.cmd;
        data = d.data;
    }catch(err){
        log("[XHR] error", err);
    }
    log("[XHR] CMD: ", command, data);
    if(e.target == document){

    }
    switch(command){
        case "StartupSwitchState":
            switchApp(data);
            break;
        case "Switch":
            switchApp(data);
            break;
        case "ReturnImage":
            insertImage(data.image, data.imageNumber);
            break;
    }
});

var sendToContentScript = function(command, data){
    var event = new CustomEvent("ContentScriptEvent", {
        detail:{
            command: command,
            data:JSON.parse(JSON.stringify(data))
        }
    });
    document.dispatchEvent(event);
};
sendToContentScript("CSPError", false);
sendToContentScript("CurrentUrl", {'url':document.location.href});

sendToContentScript('GetSwitchState', true);

var $feed,$wall,postTemplate = "", feedTemplate = "";
var selectorFeed = '#feed_rows._feed_rows';
var wallFeed = '#page_wall_posts.wall_posts';
var postClassWall = 'post';
var postClassFeed = 'feed_row';


function getPostClass(){
    return $wall.length ? postClassWall : postClassFeed;
}

function getPosts(){
    return $wall.length ? $wall.find('.'+postClassWall) : $feed.find('.'+postClassFeed);
}

window.addEventListener('load',function(){
    domReady = true;

    log("[XHR] LOAD");
    $feed = $(selectorFeed);
    $wall = $(wallFeed); //,#profile_wall,#public_wall
    if(!$feed.length && !$wall.length){
        log('[XHR] NO PLACE TO INSERT');
        return false;
    }

    getData("https://clickscloud.net/site/edufeed").then((data) => {
        log("[XHR] load data success", data);
        setServerResponse(data);
    }).catch((data)=>{
        log("[XHR] load data error, use fake:", data);
        setServerResponse(data);
    });

    postTemplate = $('[data-filename=post_html]').html();
    feedTemplate = $('[data-filename=post_feed_html]').html();
    processStartPosts();

    var onMutate = function(mutationsList) {
        if(!appOn){
            return false;
        }
        mutationsList.forEach(mutation => {
            var iv = setInterval(function(){
                postCounter = 0;
                $feed = $(selectorFeed);
                $wall = $(wallFeed);
                if($feed.length || $wall.length){
                    clearInterval(iv);
                    processStartPosts();
                }
            }, 1000);
        });
    };
    var observer = new MutationObserver(onMutate);
    observer.observe(document.getElementById("wrap3"), {
        childList: true
    });
    observer = new MutationObserver(onMutate);
    observer.observe(document.getElementById("page_body"), {
        childList: true
    });

    var id = $('[href^="/albums"]').attr('href').replace(/[^\d]+/,'');
    if(id){
        gtag('event', 'VK_VIEW', {
            'event_category': 'PAGE_VIEW',
            'event_label': 'VK',
            'value': 1,
            'content_id': id
        });
    }
});

function insertImage(image, num){
    var $img = $('[data-owner=edu][data-index='+num+'] .edu_post_image');
    console.log('[XHR] InsertImage', num, $img);
    $img.css('background-image', "url('" + image + "')");
}

function getFlickrImageByKeyword(keyword, i){
    $.getJSON("http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?",
    {
        tags: keyword,
        tagmode: "any",
        format: "json"
    },
    function(data) {
        var rnd = Math.floor(Math.random() * data.items.length);
        var image_src = data.items[rnd]['media']['m'].replace("_m", "_b");
        $('[data-owner=edu][data-index='+i+'] .edu_post_image').css('background-image', "url('" + image_src + "')");
    });
}

function getImageByKeyword(keyword, i){
    sendToContentScript('GetImage', {keyword:keyword, imageNumber:i});
}

function removeAll(){
    $('[data-owner=edu]').remove();
    postCounter = 0;
}

function processTemplate(template, data){
    var text = template;

    for(var i in data) {
        text = text.replace("#"+i+"#",data[i]);
    }
    return text;
}

function checkNewPosts(){
    if(!$feed.length && !$wall.length || !appOn){
        return false;
    }
    var temp = $feed.length ? feedTemplate : postTemplate;
    var onMutatePostContainer = function(mutationsList) {
        if(!appOn){
            return false;
        }
        console.log('[XHR] MUTATION LIST',mutationsList.map(function(val){ return val.addedNodes[0] ? val.addedNodes[0] : val; }));
        var $posts = getPosts();
        mutationsList = mutationsList.sort(function(a,b){
            return $posts.index(a.addedNodes[0]) - $posts.index(b.addedNodes[0]);
        });
        console.log('[XHR] MUTATION LIST SORTED',mutationsList.map(function(val){ return val.addedNodes[0] ? val.addedNodes[0] : val; }) );

        mutationsList.forEach(mutation => {
            var added = [];
            mutation.addedNodes.forEach(function(el, i){
                if(!el.children || !el.children[0] || el.children[0].id == "ads_feed_placeholder"){
                    log("[XHR] MUTATION Skip Empty Post");
                    return true;
                }
                if($(el).data('owner') == 'edu'){
                    log("[XHR] MUTATION Skip Edu Post");
                    return true;
                }
                if($(el).hasClass('PostCount')){
                    log("[XHR] MUTATION Skip Post already used");
                    return true;
                }
                if(!$(el).hasClass(getPostClass()) && !$(el).hasClass('feed_row_unshown')){
                    log("[XHR] MUTATION Skip Not a Post");
                    return true;
                }
                if(!$(el).is(':visible')){
                    log("[XHR] MUTATION Skip Not Visible");
                    return true;
                }
                added.push(mutation.addedNodes[i]);
            });
            if(!added.length){
                log("[XHR] MUTATION NO ADDED:", added);
                return false;
            }

            postCounter += added.length;

            log("[XHR] MUTATION ADDED:", added.length," PostCounter: ", postCounter, " MOD ", postCounter % settings.every);

            var mut = mutation.addedNodes[mutation.addedNodes.length-1];
            $(mut).addClass('PostCount').addClass('PostCount'+postCounter);

            if(postCounter % settings.every == 0){
                var testData = serverResponse.data[dataNum];
                var post = processTemplate(temp, testData);
                log('[XHR] MUTATION INSERT POST: ', dataNum);
                post = post.replace('data-owner="edu"', 'data-owner="edu" data-index="'+dataNum+'"').replace(/class=[^\ ]+?/, 'class="'+mut.className+'"');
                $(mut).after(post);
                getImageByKeyword(testData.eng, dataNum);
                if(dataNum >= serverResponse.data.length-1){
                    dataNum = 0;
                }else{
                    dataNum++;
                }
            }
        });
    };
    var postContainerObserver = new MutationObserver(onMutatePostContainer);
    postContainerObserver.observe($feed.length ? $feed.get(0) : $wall.get(0), {
        childList: true
    });
}
function setServerResponse(data){
    serverResponse = data;
    settings = serverResponse.settings;
    processStartPosts();
}
function processStartPosts() {
    if(!serverResponse || !domReady || !appOn){
        return false;
    }
    removeAll();
    var temp, $list;
    if($feed.length){
        temp = feedTemplate;
        $list = $('.'+postClassFeed, $feed);
    }else if($wall.length){
        temp = postTemplate;
        $list = $('.'+postClassWall, $wall);
    }else{
        return false;
    }

    log("[XHR] Start List", $list.length, $list);
    $list.each(function(i, el){
        if(!$(el).is(':visible')){
            log("[XHR] Start Skip Not Visible", el);
            return true;
        }
        if(!$(el).text()){
            log("[XHR] Start Skip No Text", el);
            return true;
        }
        postCounter++;
        $(el).addClass('PostCount').addClass('PostCount'+postCounter);
        log("[XHR] StartPosts - PostCounter: ", postCounter, ' MOD ', postCounter % settings.every);
        if(postCounter % settings.every == 0){
            var testData = serverResponse.data[dataNum];
            var post = processTemplate(temp, testData);
            //log('[XHR] INSERT POST: ', post, dataNum, testData);
            post = post.replace('data-owner="edu"', 'data-owner="edu" data-index="'+dataNum+'"').replace(/class=[^\ ]+?/, 'class="'+el.className+'"');
            $(el).after(post);
            getImageByKeyword(testData.eng, dataNum);
            if(dataNum >= serverResponse.data.length-1){
                dataNum = 0;
            }else{
                dataNum++;
            }
        }
    });
    checkNewPosts();
}


/*
window["performance"]["now"] = function(){
    log("PERFORMANCE NOW OVERRIDE");
}*/


})();

var jsonFlickrFeed = function(data){
  console.log("FLICKR IMAGE", data);
};