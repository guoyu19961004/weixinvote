var voteSubmit = document.getElementById('voteSubmit');
document.forms.members[0].value = getCookie('openId');
var lastVote=false;
// var singerData = [{
//     'id': '01',
//     'name': '1_李一'
// }, {
//     'id': '02',
//     'name': '22_李二'
// }, {
//     'id': '03',
//     'name': '333_李三'
// }, {
//     'id': '04',
//     'name': '4444_李四'
// }, {
//     'id': '05',
//     'name': '55555_李五'
// }];
// showSinger(singerData);

function showSinger(data,event) {
    var docFrag = document.createDocumentFragment();
    for (var i = 0; i < data.length; i++) {
        var label = document.createElement('label');
        label.className = "demo--label";
        var input = document.createElement('input');
        input.className = "demo--radio";
        input.setAttribute("type", "checkbox");
        input.setAttribute("name", "singer");
        input.value = data[i].id;
        label.appendChild(input);
        addEvent(input, "click", function(event) {
            var singerNumber = document.querySelectorAll("input[name='singer']:checked").length;
            if (!singerNumber) {
                alert('请投票！');
                event.target.checked = !event.target.checked;
            } else if(lastVote && singerNumber > 2) {
                alert('请只选择1个选手！');
            }else if (!lastVote && singerNumber > 3) {
                alert('请选择3个选手！');
                event.target.checked = !event.target.checked;
            }
        });
        var checkbox = document.createElement('span');
        checkbox.className = "demo--checkbox demo--radioInput";
        label.appendChild(checkbox);
        var singerId = document.createElement('span');
        singerId.className = "singer-number";
        singerId.innerText = data[i].name.split("_")[0];
        label.appendChild(singerId);
        var singerName = document.createElement('span');
        singerName.innerText = data[i].name.split("_")[1];
        label.appendChild(singerName);
        docFrag.appendChild(label);
    }
    document.getElementById('checkboxWrap').appendChild(docFrag);

}

addEvent(voteSubmit, "click", function(event) {
    var qstring = getFormQueryString("members");
    var singerNumber = document.querySelectorAll("input[name='singer']:checked").length;
    if (!singerNumber) {
        alert('请投票！');
    } else if (!lastVote && singerNumber != 3) {
        alert('请选择3个选手！');
    } else if (lastVote && singerNumber != 1) {
        alert('请选择1个选手！');
    } else {
        voteSubmit.disabled = true;
        getData("POST", "/vote", getFormQueryString("members"), function(event) {
            if (xmlhttp.readyState == 4) {
                if (xmlhttp.status == 200) {
                    var data = JSON.parse(xmlhttp.responseText);
                    if (!data.status) {
                        try {
                            window.location.replace('/static/html/voteSuccess.html');
                        } catch (err) {
                            window.location.assign('/static/html/voteSuccess.html');
                        }
                    } else {
                        alert("vote Error");
                    }
                } else {
                    console.log("发生错误" + xmlhttp.status);
                }
            }
        });
    }
    forbiddenEvent(event);
});
//动态获取结果
getData("POST", "/voteGet", '', function(event) {
    if (xmlhttp.readyState == 4) {
        if (xmlhttp.status == 200) {
            var data = JSON.parse(xmlhttp.responseText);
            switch (data.groupNumber) {
                case 1:
                    document.getElementById('voteTime').innerText = "第1轮";
                    break;
                case 2:
                    document.getElementById('voteTime').innerText = "第2轮";
                    break;
                case 3:
                    document.getElementById('voteTime').innerText = "第3轮";
                    break;
                case 4:
                    document.getElementById('voteTime').innerText = "总决赛";
                    document.getElementById('intr').innerText = "只投1人";
                    lastVote = true;
                    break;
                default:
                    break;
            }
            showSinger(data.singers);
        } else {
            console.log("发生错误" + xmlhttp.status);
        }
    }
    forbiddenEvent(event);
});

setInterval(function() {
    getData("POST", "/voteClose", 'openId='+getCookie('openId'), function(event) {
        if (xmlhttp.readyState == 4) {
            if (xmlhttp.status == 200) {
                var data = JSON.parse(xmlhttp.responseText);
                if (!data.isVote) {
                    try {
                        window.location.replace("/static/html/voteSuccess.html");
                    } catch (err) {
                        window.location.assign("/static/html/voteSuccess.html");
                    }
                }
            } else {
                console.log("发生错误" + xmlhttp.status);
            }
        }
        forbiddenEvent(event);
    });
}, 5000);
