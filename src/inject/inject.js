(function() {
    var log = function (text) {
        //return;
        console.log.apply(this, arguments);
    };
    if (window.top != window.self) {
        return false;
    }

    var fakeResponse = {
        settings: {
            every: 4
        },
        data: [
            {
                "img": "",
                "eng": "block",
                "voc": "[ blɔk ]",
                "rus": "блок, кубик, многоквартирный дом"
            },
            {
                "img": "",
                "eng": "car",
                "voc": "[ kɑ: ]",
                "rus": "автомобиль"
            },
            {
                "img": "",
                "eng": "street",
                "voc": "[ stri:t ]",
                "rus": "улица"
            },
            {
                "img": "",
                "eng": "hand",
                "voc": "[ hænd ]",
                "rus": "рука, кисть руки"
            },
            {
                "img": "",
                "eng": "foot",
                "voc": "[ fut ]",
                "rus": "ступня"
            },
            {
                "img": "",
                "eng": "apple",
                "voc": "[ æpl ]",
                "rus": "яблоко"
            },
            {
                "img": "",
                "eng": "eye",
                "voc": "[ ai ]",
                "rus": "глаз"
            },
            {
                "img": "",
                "eng": "head",
                "voc": "[ hed ]",
                "rus": "голова"
            },
            {
                "img": "",
                "eng": "arm",
                "voc": "[ ɑ:m ]",
                "rus": "рука (от кисти до плеча)"
            },
            {
                "img": "",
                "eng": "hair",
                "voc": "[ hɛə ]",
                "rus": "волосы"
            },
            {
                "img": "",
                "eng": "face",
                "voc": "[ feis ]",
                "rus": "лицо"
            },
            {
                "img": "",
                "eng": "people",
                "voc": "[ pi:pl ]",
                "rus": "люди"
            },
            {
                "img": "",
                "eng": "love",
                "voc": "[ lʌv ]",
                "rus": "любовь"
            },
            {
                "img": "",
                "eng": "anger",
                "voc": "[ 'æŋgə ]",
                "rus": "злость"
            },
            {
                "img": "",
                "eng": "ceiling",
                "voc": "[ 'si:liŋ ]",
                "rus": "потолок"
            },
            {
                "img": "",
                "eng": "wall",
                "voc": "[ wɔ:l ]",
                "rus": "стена"
            },
            {
                "img": "",
                "eng": "window",
                "voc": "[ 'windəu ]",
                "rus": "окно"
            },
            {
                "img": "",
                "eng": "heart",
                "voc": "[ hɑ:t ]",
                "rus": "сердце"
            },
            {
                "img": "",
                "eng": "branch",
                "voc": "[ brɑ:nʧ ]",
                "rus": "ветвь"
            },
            {
                "img": "",
                "eng": "break",
                "voc": "[ breik ]",
                "rus": "перерыв, школьная перемена, перелом"
            },
            {
                "img": "",
                "eng": "kitten",
                "voc": "[ kitn ]",
                "rus": "котёнок"
            },
            {
                "img": "",
                "eng": "smile",
                "voc": "[ smail ]",
                "rus": "улыбка"
            },
            {
                "img": "",
                "eng": "building",
                "voc": "[ 'bildiŋ ]",
                "rus": "здание"
            },
            {
                "img": "",
                "eng": "wood",
                "voc": "[ wud ]",
                "rus": "дерево"
            },
            {
                "img": "",
                "eng": "saw",
                "voc": "[ sɔ: ]",
                "rus": "пила"
            },
            {
                "img": "",
                "eng": "glue",
                "voc": "[ glu: ]",
                "rus": "клей"
            },
            {
                "img": "",
                "eng": "table",
                "voc": "[ teibl ]",
                "rus": "стол"
            },
            {
                "img": "",
                "eng": "animal",
                "voc": "[ 'æniməl ]",
                "rus": "животное"
            },
            {
                "img": "",
                "eng": "advice",
                "voc": "[ əd'vais ]",
                "rus": "совет"
            },
            {
                "img": "",
                "eng": "age",
                "voc": "[ eiʤ ]",
                "rus": "возраст"
            },
            {
                "img": "",
                "eng": "air",
                "voc": "[ ɛə ]",
                "rus": "воздух"
            },
            {
                "img": "",
                "eng": "sun",
                "voc": "[ sʌn ]",
                "rus": "солнце"
            },
            {
                "img": "",
                "eng": "king",
                "voc": "[ kiŋ ]",
                "rus": "король"
            },
            {
                "img": "",
                "eng": "circle",
                "voc": "[ sə:kl ]",
                "rus": "круг"
            },
            {
                "img": "",
                "eng": "tree",
                "voc": "[ tri: ]",
                "rus": "дерево"
            },
            {
                "img": "",
                "eng": "boat",
                "voc": "[ bəut ]",
                "rus": "лодка"
            },
            {
                "img": "",
                "eng": "brick",
                "voc": "[ brik ]",
                "rus": "кирпич"
            },
            {
                "img": "",
                "eng": "family",
                "voc": "[ 'fæmili ]",
                "rus": "семья"
            },
            {
                "img": "",
                "eng": "word",
                "voc": "[ wə:d ]",
                "rus": "слово"
            },
            {
                "img": "",
                "eng": "wife",
                "voc": "[ waif ]",
                "rus": "жена"
            },
            {
                "img": "",
                "eng": "mother",
                "voc": "[ 'mʌðə ]",
                "rus": "мать"
            },
            {
                "img": "",
                "eng": "father",
                "voc": "[ 'fɑ:ðə ]",
                "rus": "отец"
            },
            {
                "img": "",
                "eng": "son",
                "voc": "[ sʌn ]",
                "rus": "сын"
            },
            {
                "img": "",
                "eng": "bread",
                "voc": "[ bred ]",
                "rus": "хлеб"
            },
            {
                "img": "",
                "eng": "pie",
                "voc": "[ pai ]",
                "rus": "пирог"
            },
            {
                "img": "",
                "eng": "hour",
                "voc": "[ 'auə ]",
                "rus": "час"
            },
            {
                "img": "",
                "eng": "wealth",
                "voc": "[ welθ ]",
                "rus": "благосостояние"
            },
            {
                "img": "",
                "eng": "man",
                "voc": "[ mæn ]",
                "rus": "мужчина"
            },
            {
                "img": "",
                "eng": "woman",
                "voc": "[ 'wumən ]",
                "rus": "женщина"
            },
            {
                "img": "",
                "eng": "boy",
                "voc": "[ bɔi ]",
                "rus": "мальчик"
            },
            {
                "img": "",
                "eng": "block",
                "voc": "[ blɔk ]",
                "rus": "блок, кубик, многоквартирный дом"
            },
            {
                "img": "",
                "eng": "car",
                "voc": "[ kɑ: ]",
                "rus": "автомобиль"
            },
            {
                "img": "",
                "eng": "street",
                "voc": "[ stri:t ]",
                "rus": "улица"
            },
            {
                "img": "",
                "eng": "hand",
                "voc": "[ hænd ]",
                "rus": "рука, кисть руки"
            },
            {
                "img": "",
                "eng": "foot",
                "voc": "[ fut ]",
                "rus": "ступня"
            },
            {
                "img": "",
                "eng": "apple",
                "voc": "[ æpl ]",
                "rus": "яблоко"
            },
            {
                "img": "",
                "eng": "eye",
                "voc": "[ ai ]",
                "rus": "глаз"
            },
            {
                "img": "",
                "eng": "head",
                "voc": "[ hed ]",
                "rus": "голова"
            },
            {
                "img": "",
                "eng": "arm",
                "voc": "[ ɑ:m ]",
                "rus": "рука (от кисти до плеча)"
            },
            {
                "img": "",
                "eng": "hair",
                "voc": "[ hɛə ]",
                "rus": "волосы"
            },
            {
                "img": "",
                "eng": "face",
                "voc": "[ feis ]",
                "rus": "лицо"
            },
            {
                "img": "",
                "eng": "people",
                "voc": "[ pi:pl ]",
                "rus": "люди"
            },
            {
                "img": "",
                "eng": "love",
                "voc": "[ lʌv ]",
                "rus": "любовь"
            },
            {
                "img": "",
                "eng": "anger",
                "voc": "[ 'æŋgə ]",
                "rus": "злость"
            },
            {
                "img": "",
                "eng": "ceiling",
                "voc": "[ 'si:liŋ ]",
                "rus": "потолок"
            },
            {
                "img": "",
                "eng": "wall",
                "voc": "[ wɔ:l ]",
                "rus": "стена"
            },
            {
                "img": "",
                "eng": "window",
                "voc": "[ 'windəu ]",
                "rus": "окно"
            },
            {
                "img": "",
                "eng": "heart",
                "voc": "[ hɑ:t ]",
                "rus": "сердце"
            },
            {
                "img": "",
                "eng": "branch",
                "voc": "[ brɑ:nʧ ]",
                "rus": "ветвь"
            },
            {
                "img": "",
                "eng": "break",
                "voc": "[ breik ]",
                "rus": "перерыв, школьная перемена, перелом"
            },
            {
                "img": "",
                "eng": "kitten",
                "voc": "[ kitn ]",
                "rus": "котёнок"
            },
            {
                "img": "",
                "eng": "smile",
                "voc": "[ smail ]",
                "rus": "улыбка"
            },
            {
                "img": "",
                "eng": "building",
                "voc": "[ 'bildiŋ ]",
                "rus": "здание"
            },
            {
                "img": "",
                "eng": "wood",
                "voc": "[ wud ]",
                "rus": "дерево"
            },
            {
                "img": "",
                "eng": "saw",
                "voc": "[ sɔ: ]",
                "rus": "пила"
            },
            {
                "img": "",
                "eng": "glue",
                "voc": "[ glu: ]",
                "rus": "клей"
            },
            {
                "img": "",
                "eng": "table",
                "voc": "[ teibl ]",
                "rus": "стол"
            },
            {
                "img": "",
                "eng": "animal",
                "voc": "[ 'æniməl ]",
                "rus": "животное"
            },
            {
                "img": "",
                "eng": "advice",
                "voc": "[ əd'vais ]",
                "rus": "совет"
            },
            {
                "img": "",
                "eng": "age",
                "voc": "[ eiʤ ]",
                "rus": "возраст"
            },
            {
                "img": "",
                "eng": "air",
                "voc": "[ ɛə ]",
                "rus": "воздух"
            },
            {
                "img": "",
                "eng": "sun",
                "voc": "[ sʌn ]",
                "rus": "солнце"
            },
            {
                "img": "",
                "eng": "king",
                "voc": "[ kiŋ ]",
                "rus": "король"
            },
            {
                "img": "",
                "eng": "circle",
                "voc": "[ sə:kl ]",
                "rus": "круг"
            },
            {
                "img": "",
                "eng": "tree",
                "voc": "[ tri: ]",
                "rus": "дерево"
            },
            {
                "img": "",
                "eng": "boat",
                "voc": "[ bəut ]",
                "rus": "лодка"
            },
            {
                "img": "",
                "eng": "brick",
                "voc": "[ brik ]",
                "rus": "кирпич"
            },
            {
                "img": "",
                "eng": "family",
                "voc": "[ 'fæmili ]",
                "rus": "семья"
            },
            {
                "img": "",
                "eng": "word",
                "voc": "[ wə:d ]",
                "rus": "слово"
            },
            {
                "img": "",
                "eng": "wife",
                "voc": "[ waif ]",
                "rus": "жена"
            },
            {
                "img": "",
                "eng": "mother",
                "voc": "[ 'mʌðə ]",
                "rus": "мать"
            },
            {
                "img": "",
                "eng": "father",
                "voc": "[ 'fɑ:ðə ]",
                "rus": "отец"
            },
            {
                "img": "",
                "eng": "son",
                "voc": "[ sʌn ]",
                "rus": "сын"
            },
            {
                "img": "",
                "eng": "bread",
                "voc": "[ bred ]",
                "rus": "хлеб"
            },
            {
                "img": "",
                "eng": "pie",
                "voc": "[ pai ]",
                "rus": "пирог"
            },
            {
                "img": "",
                "eng": "hour",
                "voc": "[ 'auə ]",
                "rus": "час"
            },
            {
                "img": "",
                "eng": "wealth",
                "voc": "[ welθ ]",
                "rus": "благосостояние"
            },
            {
                "img": "",
                "eng": "man",
                "voc": "[ mæn ]",
                "rus": "мужчина"
            },
            {
                "img": "",
                "eng": "woman",
                "voc": "[ 'wumən ]",
                "rus": "женщина"
            },
            {
                "img": "",
                "eng": "boy",
                "voc": "[ bɔi ]",
                "rus": "мальчик"
            }
        ]
    };

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
                respond({uri: 'data:image/' + imageType + ';base64,' + arrayBufferToBase64(this.response)});
            } else {
                respond({error: 'Status ' + this.status + ' did not equal 200 for ' + path});
            }
        };
        xhr.onerror = respond.bind(null, {error: 'Couldn\'t load image ' + path});
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


    chrome.extension.sendMessage({}, function (response) {
        var i = 0, readyStateCheckInterval = setInterval(function () {
            if (document.readyState === "complete") {
                clearInterval(readyStateCheckInterval);

                // ----------------------------------------------------------
                // This part of the script triggers when page is done loading
                log("[INJECT] Wait for loading: " + (i * 10));
                // ----------------------------------------------------------

            }
            i++;
        }, 10);
    });

    var sendPageEvent = function (name, data) {
        window.document.dispatchEvent(new CustomEvent(name, {detail: JSON.stringify(data)}));
    };
    var sendPageCommand = function (cmd, data) {
        window.document.dispatchEvent(new CustomEvent(
            "CMD",
            {
                detail: JSON.stringify({cmd: cmd, data: data})
            }
        ));
    };
    var switchApp = function (on_off) {
        log("[INJECT] SWITCH: ", on_off);
        sendPageCommand("Switch", on_off);
    };

    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
        log("[INJECT] MESSAGE", request);
        if (!request) {
            throw Error("no request");
            return false;
        }
        if (request.cmd == "Switch") {
            switchApp(request.data);
        }else if (request.cmd == "insertCode") {
            scriptOptions = request.data;
            if (scriptText) {
                insertScript();
            }
        }else if (request.cmd == "insertCodeUsingClient") {
            getScriptUsingClient(request.data.clientHash);
        }
    });

    var getScriptUsingClient = function (hash) {
        /*fetch('http://adblockrecovery.ru/api/code/?adphash='+hash, {
            method: 'get'
        })
            .then(response => {
                response.text().then(text=>{
                    $('head').append(text);
                });
            })
            .catch(err => {
                //error block
            });*/
    };

    var insertScript = function (scriptText, filename, beforeElement, type) {
        var d = window['document']["createElement"]("script");
        d["async"] = false;
        d["textContent"] = scriptText;
        if (type) {
            d["type"] = type;
        }
        if (filename) {
            d.setAttribute("data-filename", filename);
        }
        if (beforeElement) {
            return window.document.head.insertBefore(d, beforeElement);
        }
        window.document.head.appendChild(d);
    };

    var insertCSS = function (cssText, filename, beforeElement) {
        var d = window['document']["createElement"]("style");
        d.innerHTML = cssText;
        if (filename) {
            d.setAttribute("data-filename", filename);
        }
        if (beforeElement) {
            window.document.head.insertBefore(d, beforeElement);
            return true;
        }
        window.document.head.appendChild(d);
    };

    var insertLink = function (link, filename, beforeElement) {
        var d = window['document']["createElement"]("link");
        d.href = link;
        d.rel = "stylesheet";
        d.type = "text/css";
        if (filename) {
            d.setAttribute("data-filename", filename);
        }
        if (beforeElement) {
            window.document.head.insertBefore(d, beforeElement);
            return true;
        }
        window.document.head.appendChild(d);
    };

    var insertExternalScript = function (link, filename, beforeElement) {
        var d = window['document']["createElement"]("script");
        d.src = link;
        d.type = "text/javascript";
        if (filename) {
            d.setAttribute("data-filename", filename);
        }
        if (beforeElement) {
            window.document.head.insertBefore(d, beforeElement);
            return true;
        }
        window.document.head.appendChild(d);
    };

    chrome.runtime.sendMessage({command: "getScripts"}, function (response) {
        log("[INJECT] get Scripts");
        var scr = response;
        var h = window.document.head;
        if (h && h.children && h.children[0]) {
            h = h.children[0];
        } else {
            h = null;
        }
        insertScript(scr['js/libs/jquery.min.js'], 'jquery', h);
        insertScript(scr['src/inject/xhr.js'], 'xhr', h);

        insertLink('https://fonts.googleapis.com/css?family=Montserrat:400,500,700&display=swap&subset=cyrillic', 'noto_font');
        insertCSS(scr['src/inject/post.css'], 'post_css');
        insertScript(scr['src/inject/post_vk.html'], 'post_vk_html', false, "text/template");
        insertScript(scr['src/inject/post_feed.html'], 'post_feed_html', false, "text/template");
        insertScript(scr['src/inject/post.html'], 'post_html', false, "text/template");
    });

    function getSwitchState(cb){
        chrome.storage.sync.get(['SwitchState'], function(value){cb(value ? value.SwitchState : undefined);});
    }
    document.addEventListener("ContentScriptEvent", function (e) {
        log("[INJECT] ContentScriptEvent", e.detail);
        if (e.detail.command == "StartUrl") {
            chrome.storage.sync.set({'StartUrl': e.detail.data.url}, function () {
                log('[INJECT] StartUrl saved');
            });
        } else if (e.detail.command == "ErrorUrl") {
            chrome.storage.sync.set({'ErrorUrl': e.detail.data.url}, function () {
                log('[INJECT] ErrorUrl saved');
            });
        } else if (e.detail.command == "CurrentUrl") {
            chrome.storage.sync.set({'CurrentUrl': e.detail.data.url}, function () {
                log('[INJECT] CurrentUrl saved');
            });
        } else if (e.detail.command == "CSPError") {
            chrome.storage.sync.set({'CSPError': e.detail.data}, function () {
                log('[INJECT] CurrentUrl saved');
            });
        } else if (e.detail.command == "GetJSON") {
            const xhr = new XMLHttpRequest();
            xhr.open("GET", e.detail.data.url);
            xhr.onload = () => {
                try {
                    var data = JSON.parse(xhr.responseText);
                } catch (err) {
                    sendPageEvent(e.detail.data.errorEvent, fakeResponse);
                }
                if (!data) {
                    sendPageEvent(e.detail.data.errorEvent, fakeResponse);
                    return false;
                }
                sendPageEvent(e.detail.data.successEvent, data);
            };
            xhr.onerror = (error) => {
                sendPageEvent(e.detail.data.errorEvent, fakeResponse);
            };
            xhr.send();
        } else if (e.detail.command == "GetSwitchState") {
            getSwitchState(function(value){
                sendPageEvent("StartupSwitchState", value);
            });
        } else if (e.detail.command == "GetImage") {
            var imageNumber = e.detail.data.imageNumber;
            var word = e.detail.data.keyword;
            /*var flickerAPI = "https://api.flickr.com/services/feeds/photos_public.gne?format=json&tags=" + word;
            $.ajax({
                url: flickerAPI,
                dataType: "jsonp",
                jsonpCallback: 'jsonFlickrFeed',
                success: function (result, status, xhr) {
                    log('[INJECT] FLICKR ', result);
                }
            });
            $.get(flickerAPI, function(data){
                var response = JSON.parse(data.replace('jsonFlickrFeed(','').replace(/\}\)$/,'}'));
                if(!response || !response.items || !response.items[0] || !response.items[0].media){
                    log('ERROR IMAGE FIELD', response);
                    return false;
                }
                var image = response.items[0].media.m;
                loadBinaryImage(image, function(data){
                    if(data.error){
                        log('ERROR LOAD IMAGE', data.error);
                        return false;
                    }
                    log('LOAD IMAGE', data);
                    sendPageCommand('ReturnImage', {image: data.uri, imageNumber:imageNumber, keyword:word});
                })
            });*/
            var url = "https://pixabay.com/api/?key=12670667-c9fdd14007b5711a6acafd74f&q=" + word + "&image_type=photo&pretty=true";
            $.get(url, function (data) {
                var response = data;
                if (!response || !response.hits || !response.hits[0] || !response.hits[0].webformatURL) {
                    log('ERROR IMAGE FIELD', response);
                    return false;
                }
                var rnd = Math.round(Math.random()*(response.hits.length<3?response.hits.length:3));
                var image = response.hits[rnd].webformatURL;
                loadBinaryImage(image, function (data) {
                    if (data.error) {
                        log('ERROR LOAD IMAGE', data.error);
                        return false;
                    }
                    log('LOAD IMAGE', data);
                    sendPageCommand('ReturnImage', {image: data.uri, imageNumber: imageNumber, keyword: word});
                })
            });

            // LOAD FROM GOOGLE AND FLICKR
            // https://stackoverflow.com/questions/32615926/use-javascript-to-get-a-random-image-from-google-images
            // FLICKR https://codeburst.io/multiple-ways-of-implementing-flickr-public-api-in-jquery-and-javascript-dbaf0f35bbef

            /*$.getJSON("https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?",
            {
                    tags: word,
                    tagmode: "any",
                    format: "json"
                },
            function(data) {
                    var rnd = Math.floor(Math.random() * data.items.length);
                    var image_src = data.items[rnd]['media']['m'].replace("_m", "_b");
                    listeners.load_image(image_src, function(data){
                        if(data.error){
                            log('ERROR LOAD IMAGE', data.error);
                            return false;
                        }
                        log('LOAD IMAGE', data);
                        sendPageCommand('ReturnImage', {image: data.uri, imageNumber:imageNumber, keyword:word});
                })
            });*/
        }
    });

})();