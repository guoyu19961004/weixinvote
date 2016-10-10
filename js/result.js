// var data = [{
//     'sum': '1',
//     'name': '李一'
// }, {
//     'sum': '2',
//     'name': '李二'
// }, {
//     'sum': '3',
//     'name': '李三'
// }, {
//     'sum': '4',
//     'name': '李四'
// }, {
//     'sum': '5',
//     'name': '李五'
// }];
// var singerData = [{
//     'name': '李一'
// }, {
//     'name': '李二'
// }, {
//     'name': '李三'
// }, {
//     'name': '李四'
// }, {
//     'name': '李五'
// },{
//     'name': '李六'
// },{
//     'name': '李七'
// }];
var votSumList = document.querySelectorAll('div.voteSum');
var singerList = document.querySelectorAll('p.singer');
var voteNumList = document.querySelectorAll('p.voteNum');

function changeVotes(data) {
    for (var i = 0; i < votSumList.length; i++) {
        if (data[i].score === 0) {
            console.log(data[i].score);
            votSumList[i].style.paddingTop = '1%';
        } else votSumList[i].style.paddingTop = data[i].score * 5 + '%';
        singerList[i].innerText = data[i].name;
        voteNumList[i].innerText = data[i].score;
    }
}



function showSinger(data) {
    for (var i = 0; i < data.length; i++) {
        var list = document.createElement('li');
        list.className = "singerName";
        list.innerText = data[i].name;
        document.getElementById('nameList').appendChild(list);
    }
}

//showSinger(singerData);
//changeVotes(data);

//动态获取名单
setInterval(function() {
    getData("POST", "/voteResult", "", function(event) {
        if (xmlhttp.readyState == 4) {
            if (xmlhttp.status == 200) {
                var data = JSON.parse(xmlhttp.responseText);
                switch (data.groupNumber) {
                    case 1:
                        document.getElementById('groupNumber').innerText = data.groupNumber;
                        changeVotes(data.singers);
                        break;
                    case 2:
                        document.getElementById('groupNumber').innerText = data.groupNumber;
                        changeVotes(data.singers);
                        break;
                    case 3:
                        document.getElementById('groupNumber').innerText = data.groupNumber;
                        changeVotes(data.singers);
                        break;
                    case 4:
        		document.getElementById('nameList').innerHTML="";
                        document.getElementById('title').innerText = "总决赛名单";
                        document.getElementById('nameList').style.opacity = 1;
                        document.getElementById('showList').style.opacity = 0;
                        showSinger(data.singers);
                        break;
                    case 5:
                        document.getElementById('title').innerText = "总决赛选手得票情况";
                        document.getElementById('nameList').style.opacity = 0;
                        document.getElementById('showList').style.opacity = 1;
                        changeVotes(data.singers);
                        break;
                    default:
                        break;
                }
            } else {
                console.log("发生错误" + xmlhttp.status);
            }
        }
        forbiddenEvent(event);
    });
}, 1000);
