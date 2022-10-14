'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

// 添加样式
function addStyle(css) {
    let style = document.createElement('style');
    let head = document.head || document.getElementsByTagName('head')[0];
    style.appendChild(document.createTextNode(css));
    head.appendChild(style);
}

// 添加样式链接
function addStyleUrl(url) {
    let link = document.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = url;
    let head = document.getElementsByTagName('head')[0];
    head.appendChild(link);
}

// base64转blob
function dataUrl2Blob(dataUrl, type) {
    let data = dataUrl.split(',')[1];
    let mime = dataUrl.match(/^data:(.*?)(;base64)?,/)[1];
    let binStr = atob(data);
    let len = binStr.length;
    let arr = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        arr[i] = binStr.charCodeAt(i);
    }
    return new Blob([arr], { type: type || mime });
}

// 防抖
function debounce(fn, delay = 200, immediate = false) {
    let timer = null;
    let count = 0; // 外部函数调用次数
    return function () {
        count++;
        if (immediate && !timer) { // 是否立即执行
            // @ts-ignore
            fn.apply(this, arguments);
        }
        if (timer) { // 取消之前定时器
            clearTimeout(timer);
        }
        // 设定定时器
        timer = setTimeout(() => {
            // @ts-ignore
            (count > 1 || !immediate) && fn.apply(this, arguments); // 立即执行条件下多次调用，或非立即执行条件下，执行fn
            timer = null;
        }, delay);
    };
}

// 深拷贝
function deepCopy(obj, map = new Map()) {
    if (typeof obj === 'object') {
        let res = Array.isArray(obj) ? [] : {};
        if (map.get(obj)) {
            return map.get(obj);
        }
        map.set(obj, res);
        for (const key in obj) {
            // @ts-ignore
            res[key] = deepCopy(obj[key], map);
        }
        return res;
    }
    else {
        return obj;
    }
}

// 遍历筛选节点
function getNodeIterator(filterNode) {
    return document.createNodeIterator(document.body, NodeFilter.SHOW_ELEMENT, {
        acceptNode(node) {
            return filterNode(node) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
        }
    });
}

// 获取url中的参数
function getUrlParam(url = location.href) {
    let obj = {};
    let param = url.split('?')[1];
    if (param) {
        let items = param.split('&');
        for (let item of items) {
            let arr = item.split('=');
            obj[arr[0]] = arr[1];
        }
    }
    return obj;
}

// 节流
function throttle(fn, delay = 200, immediate = false) {
    let canRun = true;
    let count = 0; // 外部函数调用次数
    return function () {
        count++;
        if (immediate && count === 1) { // 立即执行条件下的第一次调用
            // @ts-ignore
            fn.apply(this, arguments);
        }
        if (canRun) {
            canRun = false;
            setTimeout(() => {
                // @ts-ignore
                (count > 1 || !immediate) && fn.apply(this, arguments); // 立即执行条件下多次调用，或非立即执行条件下，执行fn
                canRun = true;
            }, delay);
        }
    };
}

// async错误处理
function to(promise) {
    return promise.then((data) => [null, data]).catch((err) => [err, null]);
}

// 判断类型
function type(target, type) {
    const dataType = Object.prototype.toString
        .call(target)
        .replace(/\[object (\w+)\]/, '$1')
        .toLowerCase();
    return type ? dataType === type : dataType;
}

// 生成随机id
function uuid(length, chars) {
    chars = chars || '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    length = length || 8;
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
}

// 同步等待
function wait(delay) {
    let start = (new Date()).getTime();
    while ((new Date()).getTime() - start < delay) {
        continue;
    }
}

exports.addStyle = addStyle;
exports.addStyleUrl = addStyleUrl;
exports.dataUrl2Blob = dataUrl2Blob;
exports.debounce = debounce;
exports.deepCopy = deepCopy;
exports.getNodeIterator = getNodeIterator;
exports.getUrlParam = getUrlParam;
exports.throttle = throttle;
exports.to = to;
exports.type = type;
exports.uuid = uuid;
exports.wait = wait;
