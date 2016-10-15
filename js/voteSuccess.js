var nextVote = document.getElementById('nextVote');
var flag = false;

addEvent(nextVote, "click", function(event) {
    try {
        window.location.replace('/static/html/vote.html');
    } catch (err) {
        window.location.assign('/static/html/vote.html');
    }
    forbiddenEvent(event);
});
getData("POST", "/voteNext", "openId=" + getCookie('openId'), function(event) {
    if (xmlhttp.readyState == 4) {
        if (xmlhttp.status == 200) {
            var data = JSON.parse(xmlhttp.responseText);
            console.log(isEmptyObject(data));
            if (!isEmptyObject(data)) {
                if (data.status) {
                    flag = true;
                    nextVote.disabled = false;
                    nextVote.innerText = '进入下一轮投票';
                    nextVote.style.backgroundColor = "lime";
                } else if (data.isOver) {
                    clearInterval(Flag);
                    nextVote.innerText = "投票结束";
                } else {
                    nextVote.innerText = "等待下一轮投票";
                }
            }
        } else {
            console.log("发生错误" + xmlhttp.status);
        }
    }
});
var Flag = setInterval(function() {
    getData("POST", "/voteNext", "openId=" + getCookie('openId'), function(event) {
        if (xmlhttp.readyState == 4) {
            if (xmlhttp.status == 200) {
                var data = JSON.parse(xmlhttp.responseText);
                console.log(isEmptyObject(data));
                if (!isEmptyObject(data)) {
                    if (data.status) {
                        flag = true;
                        nextVote.disabled = false;
                        nextVote.innerText = '进入下一轮投票';
                        nextVote.style.backgroundColor = "lime";
                    } else if (data.isOver) {
                        clearInterval(Flag);
                        nextVote.innerText = "投票结束";
                    } else {
                        nextVote.innerText = "等待下一轮投票";
                    }
                }
            } else {
                console.log("发生错误" + xmlhttp.status);
            }
        }
    });
    if (flag) clearInterval(Flag);
}, 5000);
