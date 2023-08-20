// js-fragment

/**
 * Convert dataUrl to Blob.
 *
 * @param {string} dataUrl The dataUrl.
 * @param {string} [type] The optional MIME type. If not specified, the MIME type from the data URL will be used.
 * @returns {Blob}
 */
function dataUrl2Blob(dataUrl, type) {
    const data = dataUrl.split(',')[1];
    const mime = dataUrl.match(/^data:(.*?)(;base64)?,/)[1];
    const binStr = atob(data);
    const len = binStr.length;
    const arr = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        arr[i] = binStr.charCodeAt(i);
    }
    return new Blob([arr], { type: type || mime });
}

/**
 * Debounce a function.
 *
 * @param {Function} fn The function to debounce.
 * @param {number} [delay=200] The number of milliseconds to delay.
 * @param {boolean} [immediate=false] Invoke immediately.
 * @param {boolean} [immediateInterval=false] After a while, whether it is still invoke immediately.
 * @returns {Function} The new debounced function.
 * @returns {Function.cancel} Cancel debounce.
 */
function debounce(fn, delay = 200, immediate = false, immediateInterval = false) {
    let timeout = null;
    let callCount = 0; // 调用次数
    const _debounce = function (...args) {
        // 立即执行
        if (immediate) {
            // 第一次调用，立即执行
            if (callCount === 0) {
                fn.apply(this, args);
            }
            callCount++;
            // 清除定时器
            if (timeout)
                clearTimeout(timeout);
            // 设定定时器
            timeout = setTimeout(() => {
                // 非第一次调用，执行回调
                if (callCount > 1) {
                    fn.apply(this, args);
                }
                // 调用结束后重置调用次数，过一会再调，是否立即执行
                if (immediateInterval) {
                    callCount = 0;
                }
            }, delay);
        }
        // 非立即执行
        else {
            // 清除定时器
            if (timeout)
                clearTimeout(timeout);
            // 设定定时器
            timeout = setTimeout(() => {
                fn.apply(this, args);
            }, delay);
        }
    };
    // 取消防抖
    _debounce.cancel = () => {
        if (timeout)
            clearTimeout(timeout);
        timeout = null;
        callCount = 0;
    };
    return _debounce;
}

/**
 * Deep copies.
 *
 * @param {*} target Target value to be copied.
 * @returns {*} The deep copy of the target.
 */
const map = new Map();
function deepCopy(target) {
    if (typeof target === 'object') {
        const res = Array.isArray(target) ? [] : {};
        if (map.get(target)) {
            return map.get(target);
        }
        map.set(target, res);
        for (const key in target) {
            res[key] = deepCopy(target[key]);
        }
        return res;
    }
    else {
        return target;
    }
}

/*
* Generate a UUID
*
* @param {number} length - The length of the UUID
* @param {string} chars - The chars to generate UUID.
*/
function generateUUID(length = 8, chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ') {
    let res = '';
    for (let i = 0; i < length; i++) {
        res += chars[Math.floor(Math.random() * chars.length)];
    }
    return res;
}

/**
 * Gets a node iterator that filters nodes based on the filterNode function.
 *
 * @param {function} filterNode - A function that returns true if the node should be accepted.
 * @returns {NodeIterator} A node iterator that filters nodes based on the filterNode function.
 */
function getNodeIterator(filterNode) {
    return document.createNodeIterator(document.body, NodeFilter.SHOW_ELEMENT, {
        acceptNode(node) {
            return filterNode(node) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
        }
    });
}

/**
 *  get type of target.
 *
 * @param {*} target
 * @returns {string} type of target.
 */
function getType(target) {
    return Object.prototype.toString
        .call(target)
        .replace(/\[object (\w+)\]/, '$1')
        .toLowerCase();
}

/**
 * Load script by url.
 *
 * @param url - The url of the script.
 */
function loadScript(url) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

/**
 * Load style by code or url
 *
 * @param css - The style code or url.
 */
function loadStyle(css) {
    if (css.indexOf('http') === 0) {
        const link = document.createElement('link');
        link.type = 'text/css';
        link.rel = 'stylesheet';
        link.href = css;
        document.head.appendChild(link);
    }
    else {
        const style = document.createElement('style');
        style.appendChild(document.createTextNode(css));
        document.head.appendChild(style);
    }
}

/**
 * Throttle a function.
 *
 * @param {Function} fn The function to throttle.
 * @param {number} [delay=200] The number of milliseconds to delay.
 * @param {boolean} [immediate=true] Invoke immediately.
 * @returns {Function} The new throttled function.
 * @returns {Function.cancel} Cancel throttle.
 */
function throttle(fn, delay = 200, immediate = true) {
    let lastCallTime = null;
    // 追加fn调用的定时器
    let addedCallTimeout = null;
    const _throttle = function (...args) {
        const now = Date.now();
        // 立即执行
        if (immediate) {
            if (!lastCallTime) {
                fn.apply(this, args);
                lastCallTime = now;
            }
            else if (now - lastCallTime >= delay) {
                fn.apply(this, args);
                lastCallTime = now;
            }
        }
        // 非立即执行
        else {
            if (!lastCallTime) {
                lastCallTime = now;
                // 用定时器追加一次fn调用，防止未达到最小时间间隔fn未被调起
                addedCallTimeout = setTimeout(() => {
                    fn.apply(this, args);
                    lastCallTime = Date.now();
                }, delay);
            }
            else if (now - lastCallTime >= delay) {
                fn.apply(this, args);
                lastCallTime = now;
                // 达到最小时间间隔fn调用成功，则清除追加的fn调用
                if (addedCallTimeout) {
                    clearTimeout(addedCallTimeout);
                }
            }
        }
    };
    // 取消节流
    _throttle.cancel = () => {
        if (addedCallTimeout)
            clearTimeout(addedCallTimeout);
        lastCallTime = null;
    };
    return _throttle;
}

/**
 * wrap promise with try catch return [err, data].
 *
 * @param {Promise} promise
 * @returns {Promise} if promise resolve, return [null, data], else return [err, undefined].
 */
async function to(promise) {
    try {
        const data = await promise;
        return [null, data];
    }
    catch (err) {
        return [err, undefined];
    }
}

/**
 * Synchronous wait.
 *
 * @param {number} delay The number of milliseconds to delay.
 */
function wait(delay) {
    const start = (new Date()).getTime();
    while ((new Date()).getTime() - start < delay) { /* empty */ }
}

export { dataUrl2Blob, debounce, deepCopy, generateUUID, getNodeIterator, getType, loadScript, loadStyle, throttle, to, wait };
