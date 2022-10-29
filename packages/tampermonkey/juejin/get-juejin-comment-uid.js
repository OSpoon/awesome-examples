// ==UserScript==
// @name         掘金文章评论区评论用户UID获取
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  获取当前文章评论区评论用户UID，用于后续抽奖工具
// @author       小鑫同学
// @match        https://juejin.cn/post/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=juejin.cn
// @grant        none
// @require      https://unpkg.com/sweetalert/dist/sweetalert.min.js
// ==/UserScript==


(function() {

    const cookie = '<请设置掘金cookie，在回到某一篇文章页面，右键菜单找到油猴标识，点击“掘金文章评论区评论用户UID获取”菜单进行获取>';

    const getCommentsApi = (articleId) => {
        const users = [];

        const options = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                cookie,
            },
            body: `{"client_type": 2608, "item_id":"${articleId}","item_type":2,"cursor":"0","limit":99999,"sort":0}`,
            credentials: 'include'
        };

        fetch('https://api.juejin.cn/interact_api/v1/comment/list', options)
            .then(response => response.json())
            .then(response => {
            const {err_msg, err_no, data} = response;
            if(err_msg === "success" && err_no === 0 && data){
                console.log(data.length)
                for (let i = 0; i < data.length; i++) {
                    const commit = data[i];
                    const { user_id } = commit.user_info;
                    users.push(`${user_id}`);
                }
                const result = `参与共计${users.length}人：\n${users.join('\n')}`;
                console.log(window)
                window.swal(result);
            }else{
                window.swal(err_msg);
            }
        })
            .catch(err => console.error(err));
    }

    getCommentsApi(location.pathname.split("/").pop());
})();
