/**
 * 绑定，删除事件
 * @param {obj对象}   elm       需要绑定事件的对象
 * @param {[type]}   evType     需要绑定的事件名称
 * @param {Function} fn         绑定事件的函数
 * @param {[type]}   useCapture true/false冒泡方式
 */
function addEvent(elm, evType, fn, useCapture) {
    if (elm.addEventListener) {
        elm.addEventListener(evType, fn, useCapture); //DOM2.0
        return true;
    } else if (elm.attachEvent) {
        var r = elm.attachEvent("on" + evType, fn); //IE5+
        return r;
    } else {
        elm['on' + evType] = fn; //DOM 0
    }
}

function removeEvent(elm, evType, fn, useCapture) {
    if (elm.removeEventListener) {
        elm.removeEventListener(evType, fn, useCapture); //DOM2.0
        return true;
    } else if (elm.detachEvent) {
        var r = elm.detachEvent("on" + evType, fn); //IE5+
        return r;
    }
}

function forbiddenEvent(event) {
    event = event || window.event;
    if (event.stopPropagation) event.stopPropagation();
    else event.cancelBubble = true;
    if (event.preventDefault) event.preventDefault();
    else event.returnValue = false;

}
/**
 * 删除该父级元素中为空或者为#test的子元素
 * @param  {[element]} elem 父元素
 * @return {[element]}      父元素
 */
function del_ff(elem) {
    var elem_child = elem.childNodes;
    for (var i = 0; i < elem_child.length; i++) {
        if (elem_child[i].nodeName === "#text" && !/\s/.test(elem_child.nodeValue)) {
            elem.removeChild(elem_child[i]);
        }
    }
    return elem;
}
/**
 * 原生JS获取form中的信息
 * @param  {[type]} frmID [description]
 * @return {[type]}       [description]
 */
function getFormQueryString(frmName) {
    var form = document.forms[frmName];
    var i, queryString = "",
        and = "";
    var item; // for each form's object
    var itemValue; // store each form object's value
    for (i = 0; i < form.length; i++) {
        item = form[i]; // get form's each object
        if (item.name != '') {
            if (item.type == 'select-one') {
                itemValue = item.options[item.selectedIndex].value;
            } else if (item.type == 'checkbox' || item.type == 'radio') {
                if (item.checked == false) {
                    continue;
                }
                itemValue = item.value;
            } else if (item.type == 'file') {
                continue; //跳过FILE
            } else if (item.type == 'button' || item.type == 'submit' || item.type == 'reset' || item.type == 'image') { // ignore this type
                continue;
            } else {
                itemValue = item.value;
            }
            //itemValue = encodeURIComponent(itemValue);
            queryString += and + item.name + '=' + itemValue;
            and = "&";
        }
    }
    return queryString;
}
//地址栏正则表达式获取
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r !== null) return unescape(r[2]);
    return null;
}
var xmlhttp;
if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp = new XMLHttpRequest();
} else { // code for IE6, IE5
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
}
//ajax请求数据
function getData(method, url, queryString, fnc) { //获取JSON数据
    if (method == "GET") {
        xmlhttp.open(method, url + '?' + queryString, true);
        xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xmlhttp.send();
    } else {
        xmlhttp.open(method, url, true);
        xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        //xmlhttp.setRequestHeader("Content-Type", "multipart/form-data;charset=utf-8");
        xmlhttp.send(queryString);
    }
    xmlhttp.onreadystatechange = fnc;
}

//创建COOKIE
function setCookie(c_name, value, expiredays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = c_name + "=" + escape(value) +
        ((expiredays === null) ? "" : ";expires=" + exdate.toGMTString());
}

//获取cookie
function getCookie(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) c_end = document.cookie.length;
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
}

//删除cookies 
function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval !== null)
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}

//检查COOKIE存在
function checkCookie(c_name) {
    username = getCookie(c_name);
    if (username !== null && username !== "") return true;
    else return false;
}

/**
 * 判断是否为微信内置浏览器打开
 * @return {Boolean} [description]
 */
function is_weixin() {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) === "micromessenger") {
        return true;
    } else {
        return false;
    }
}
if (!is_weixin()) {
    window.location.replace='/templates/404.html';
}



/**
 * 判断是否为空对象
 * @param  {[type]}  obj [description]
 * @return {Boolean}     [description]
 */
function isEmptyObject(obj) {
  for (var key in obj) {
    return false;
  }
  return true;
}