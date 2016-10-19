// var data = [{
//     'score': 0,
//     'judgeScore': 90,
//     'name': '1_李一'
// }, {
//     'score': 4,
//     'judgeScore': 90.6,
//     'name': '2_李二'
// }, {
//     'score': 5,
//     'judgeScore': 100,
//     'name': '3_何毓辉、薛看豪、欧阳君、熊炫'
// }, {
//     'score': 2,
//     'judgeScore': 95.5,
//     'name': '4_戴莉、戴粤红、龙丹'
// }, {
//     'score': 9,
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
            if (data[i].score < 10) voteNumList[i].style.transform = "translate(0, -" + data[i].score * 5.5 + "%)";
            judgeScoreList[i].style.paddingTop = data[i].judgeScore + '%';
            voteNumList[i].innerText = data[i].score;
            judegeNumList[i].innerText = data[i].judgeScore;
            allScoreList[i].innerText = data[i].score + data[i].judgeScore;
        }
        singerNumberList[i].innerText = data[i].name.split("_")[0];
        var nameStr = data[i].name.split("_")[1];
        switch (nameStr.split("、").length) {
            case 1:
                singerList[i].innerText = nameStr;
                break;
            case 2:
                singerList[i].innerText = nameStr;
                break;
            case 3:
                singerList[i].innerText = nameStr;
                singerList[i].style.fontSize = "40px";
                singerList[i].style.lineHeight = "45px";
                break;
            case 4:
                singerList[i].style.fontSize = "32px";
                singerList[i].innerHTML = "";
                for (var j = 0; j < nameStr.split("、").length; j++) {
                    singerList[i].innerHTML += nameStr.split("、")[j];
                    if (j % 2) singerList[i].innerHTML += "<br/>";
                    else singerList[i].innerHTML += "、";
                }
                break;
            default:
                break;
        }
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
                        document.getElementById('title').innerText = "总决赛选手得票";
                        changeVotes(data.singers, 0);
                        break;
                    case 5:
                        document.getElementById('title').innerText = "总决赛选手得分";
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
