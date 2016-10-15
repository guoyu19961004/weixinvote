// var data = [{
//     'score': 0,
//     'judgeScore': 90,
//     'name': '1_李一'
// }, {
//     'score': 40,
//     'judgeScore': 90.6,
//     'name': '2_李二'
// }, {
//     'score': 50,
//     'judgeScore': 100,
//     'name': '3_李三'
// }, {
//     'score': 20,
//     'judgeScore': 95.5,
//     'name': '4_李四'
// }, {
//     'score': 10,
//     'judgeScore': 98.8,
//     'name': '5_李五'
// }];
var votSumList = document.querySelectorAll('div.voteSum');
var judgeScoreList = document.querySelectorAll('div.judgeScore');
var allScoreList = document.querySelectorAll('p.allScore');
var singerList = document.querySelectorAll('p.singer');
var voteNumList = document.querySelectorAll('p.voteNum');
var judegeNumList = document.querySelectorAll('p.judegeNum');
var singerNumberList = document.querySelectorAll('span.singerNumber');

function changeVotes(data, judgeFlag) {
    for (var i = 0; i < votSumList.length; i++) {
        if (!judgeFlag) {
            if (data[i].score === 0) votSumList[i].style.paddingTop = '1%';
            else votSumList[i].style.paddingTop = data[i].score * 3 + '%';
            allScoreList[i].innerText = data[i].score;
        } else {
            if (data[i].score === 0) votSumList[i].style.paddingTop = '1%';
            else votSumList[i].style.paddingTop = data[i].score + '%';
            judgeScoreList[i].style.paddingTop = data[i].judgeScore + '%';
            voteNumList[i].innerText = data[i].score;
            judegeNumList[i].innerText = data[i].judgeScore;
            allScoreList[i].innerText = data[i].score + data[i].judgeScore;
        }
        singerNumberList[i].innerText = data[i].name.split("_")[0];
        singerList[i].innerText = data[i].name.split("_")[1];
    }
}

//changeVotes(data, 0);

//动态获取名单
setInterval(function() {
    getData("POST", "/voteResult", "", function(event) {
        if (xmlhttp.readyState == 4) {
            if (xmlhttp.status == 200) {
                var data = JSON.parse(xmlhttp.responseText);
                switch (data.groupNumber) {
                    case 1:
                        document.getElementById('groupNumber').innerText = data.groupNumber;
                        changeVotes(data.singers, 0);
                        break;
                    case 2:
                        document.getElementById('groupNumber').innerText = data.groupNumber;
                        changeVotes(data.singers, 0);
                        break;
                    case 3:
                        document.getElementById('groupNumber').innerText = data.groupNumber;
                        changeVotes(data.singers, 0);
                        break;
                    case 4:
                        document.getElementById('title').innerText = "总决赛选手得票情况";
                        changeVotes(data.singers, 0);
                        break;
                    case 5:
                        document.getElementById('title').innerText = "总决赛选手得分情况";
                        changeVotes(data.singers, 1);
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
