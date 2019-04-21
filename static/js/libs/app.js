function gotoHome(){
    setTitle(config.blog_name);
    setBlogName();
    setFooter();
    const page = 1;
    const link = {};
    const postList = document.getElementById("post_list");
    function loadPage(page) {
        const more = document.getElementById("more");
        if (more) {
            removeChildById(postList, "more");
            const newMore = document.createElement("img");
            newMore.id = "more";
            newMore.src = "littlewait.gif";
            postList.appendChild(newMore);
        }
        getJSON(getPageUrl(page), function(data, headers) {
            removeChildById(document.getElementById("index"), "wait");
            removeChildById(postList, "more");
            for (let i=0; i<data.length; i++) {
                const postTitle = document.createElement("li");
                postTitle.className = "pagelist";
                postList.appendChild(postTitle);
                const href = document.createElement("a");
                href.href = "?p="+data[i].number+"&t="+(new Date().getTime());
                const txt = document.createTextNode(data[i].title);
                href.appendChild(txt);
                postTitle.appendChild(href);
            }

            if (headers.Link) {
                const linkArray = headers.Link.split(",");
                for (let i=0; i<linkArray.length; i++) {
                    const m = linkArray[i].match(/\?per_page=(\d+)&page=(\d+)>; rel="(\w+)"/);
                    if (m) {
                        link[m[3]] = {
                            "per_page": m[1],
                            "page": m[2]
                        }
                    }
                }
                const last = parseInt(link.last.page);
                if (page<last) {
                    const href = document.createElement("a");
                    href.id = "more";
                    href.href = "javascript:loadPage("+(page+1)+");";
                    const txt = document.createTextNode("More");
                    href.appendChild(txt);
                    postList.appendChild(href);
                }
            }
        });
    }
    loadPage(1);
}

function gotoPage(id){
    setTitle(config.blog_name);
    setFooter();
    getJSON(getIssuesUrl(id), function(data) {
        setTitle(config.blog_name + " - " + data.title);
        const title = document.getElementById("title");
        let txt = document.createTextNode(data.title);
        title.appendChild(txt);
        const content = document.getElementById("content");
        renderMarkdown(content, data.body);
        const comment = document.getElementById("comment");
        const href = document.createElement("a");
        href.href = getCommentUrl(id);
        txt = document.createTextNode("Click here to comments");
        href.appendChild(txt);
        comment.appendChild(href);
    });
}

