const renderMarkdown = function(content,text){
    const post = {
        "text": text,
        "mode": "gfm",
    };
    const url = "https://api.github.com/markdown" + "?access_token="+config.access_token;
    ajax(post, url, function(data) {
        content.innerHTML = data;
    });
}

const getIssuesPreUrl = function(){
    return "https://api.github.com/repos/"+config.github_username+"/"+config.github_repo+"/issues";
}

const getPageUrl = function(page){
    const preUrl = getIssuesPreUrl();
    let url = preUrl+"?per_page="+config.per_page+"&page="+page;
    url += "&access_token="+config.access_token;
    return url;
}

const getIssuesUrl = function(id){
    const preUrl = getIssuesPreUrl();
    let url = preUrl+"/"+id;
    url += "?access_token="+config.access_token;
    return url
}

const getCommentUrl = function(id){
    return "https://github.com/"+config.github_username+"/"+config.github_repo+"/issues/"+id+"#new_comment_field";
}

const setTitle = function(title){
    const titles = document.getElementsByTagName("title");
    titles[0].innerHTML = title;
}

const setBlogName = function(){
    const bTitle = document.getElementById("blog_title");
    const txt = document.createTextNode(config.blog_name);
    bTitle.appendChild(txt);
}

const cleanChild = function(node){
    while (node.firstChild) {
        node.removeChild(node.firstChild);
    }
}

const removeChildById = function(node, id){
    const child = document.getElementById(id);
    if (child) {
        node.removeChild(child);
    }
}

const setFooter = function(){
    const footer = document.getElementById("footer");
    footer.innerHTML = '<span>\
        Copyright © 2018-2019 <a href="http://github.com/'+config.github_username+'" target="_blank">'+config.github_username+'</a>.\
        Powered by <a href="http://github.com/hanxi/issues-blog" target="_blank">issues-blog</a>.\
        </span>';
}

const hideElement = function(id){
    const node = document.getElementById(id);
    node.style.display="none";
}

const showElement = function(id){
    const node = document.getElementById(id);
    node.style.display="";
}

const loadPageVar = function (sVar) {
    return unescape(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + escape(sVar).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
}
