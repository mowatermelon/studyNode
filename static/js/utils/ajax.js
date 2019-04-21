const createHTTPRequestObject = function() {
    // although IE supports the XMLHttpRequest object, but it does not work on local files.
    const forceActiveX = (window.ActiveXObject && location.protocol === "file:");
    if (window.XMLHttpRequest && !forceActiveX) {
        return new XMLHttpRequest();
    } else {
        try {
            return new ActiveXObject("Microsoft.XMLHTTP");
        } catch(e) {}
    }
    alert ("Your browser doesn't support XML handling!");
    return null;
}

const getJSON = function(url, callback){
    const xhr = createHTTPRequestObject();
    xhr.open("get", url, true);
    xhr.setRequestHeader("Accept", "application/json, text/javascript, */*; q=0.01");
    xhr.onreadystatechange = function() {
        if (xhr.readyState==4 && xhr.status==200) {
            const headers = {};
            if (xhr.getAllResponseHeaders) {
                const headersArray = xhr.getAllResponseHeaders().split("\n");
                for (let i=0; i<headersArray.length; i++) {
                    const kv = headersArray[i].split(": ");
                    if (kv.length==2) {
                        headers[kv[0]] = kv[1];
                    }
                }
            }
            callback(JSON.parse(xhr.responseText), headers);
        }
    }
    xhr.send();
}

const ajax = function(post, url, callback) {
    const xhr = createHTTPRequestObject();
    const method = "post";
    if (post == null) {
        method = "get";
    }
    xhr.open(method, url, true);
    xhr.setRequestHeader("Accept", "application/json, text/javascript, */*; q=0.01");
    xhr.onreadystatechange = function() {
        if (xhr.readyState==4 && xhr.status==200)
        {
            callback(xhr.responseText);
        }
    }
    xhr.send(JSON.stringify(post));
}
