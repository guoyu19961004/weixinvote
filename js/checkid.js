if (!is_weixin()) {
    window.location.replace('/static/html/404.html');
}
//document.location.assign('https://developer.mozilla.org/en-US/docs/Web/API/Location.reload');
var checkError = document.getElementById('check-error');
var checkSubmit = document.getElementById('checkIdSubmit');
document.getElementsByTagName('html')[0].style.height = window.innerHeight + "px";
document.forms.checkid[1].value = getQueryString('openId');
setCookie('openId', getQueryString('openId'), 1);
getData('POST', '/checkBind', "openId=" + getQueryString('openId'), function() {
    if (xmlhttp.readyState == 4) {
        if (xmlhttp.status == 200) {
            var data = JSON.parse(xmlhttp.responseText);
            console.log(data);
            if (data.status) {
                if (!data.voteFlag) {
                    try {
                        window.location.replace('/static/html/voteSuccess.html');
                    } catch (err) {
                        alert(err.message);
                        window.location.assign('/static/html/voteSuccess.html');
                    }

                } else {
                    try {
                        window.location.replace('/static/html/vote.html');
                    } catch (err) {
                        alert(err.message);
                        window.location.assign('/static/html/vote.html');
                    }
                }
            }
        } else {
            console.log("发生错误" + xmlhttp.status);
        }
    }
});
addEvent(checkSubmit, "click", function(event) {
    var qstring = getFormQueryString("checkid");
    //对接版
    if (document.forms.checkid[0].value) {
        getData("POST", "/JudgeBind", getFormQueryString('checkid'), function() {
            if (xmlhttp.readyState == 4) {
                if (xmlhttp.status == 200) {
                    var data = JSON.parse(xmlhttp.responseText);
                    console.log(data);
                    if (!data.status) { //no key
                        checkError.innerText = "验证码错误";
                        checkError.style.opacity = 1;
                        checkSubmit.disabled = true;
                        checkSubmit.style.backgroundColor = "#aaa";
                    } else if (data.status === 1) { //sucess
                        if (!data.voteFlag) {
                            try {
                                window.location.replace('/static/html/voteSuccess.html');
                            } catch (err) {
                                window.location.assign('/static/html/voteSuccess.html');
                            }

                        } else {
                            try {
                                window.location.replace('/static/html/vote.html');
                            } catch (err) {
                                window.location.assign('/static/html/vote.html');
                            }
                        }
                    } else if (data.status === 2) { //used
                        checkError.innerText = "验证码已使用";
                        checkError.style.opacity = 1;
                        checkSubmit.disabled = true;
                        checkSubmit.style.backgroundColor = "#aaa";
                    }
                } else {
                    console.log("发生错误" + xmlhttp.status);
                }
            }
        });
    }
    forbiddenEvent(event);
});

addEvent(document.getElementById("check-code"), "focus", function(event) {
    checkError.style.opacity = 0;
    if (document.forms.checkid[0].value.length >= 4) {
        checkSubmit.disabled = false;
        checkSubmit.style.backgroundColor = "lime";
    } else {
        checkSubmit.disabled = true;
        checkSubmit.style.backgroundColor = "#aaa";
    }
    forbiddenEvent(event);
});
addEvent(document.forms.checkid[0], "input", function(event) {
    checkError.style.opacity = 0;
    if (document.forms.checkid[0].value.length >= 4) {
        checkSubmit.disabled = false;
        checkSubmit.style.backgroundColor = "lime";
    } else {
        checkSubmit.disabled = true;
        checkSubmit.style.backgroundColor = "#aaa";
    }
    forbiddenEvent(event);
});
