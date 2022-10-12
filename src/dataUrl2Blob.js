// base64转blob
export function dataUrl2Blob(dataUrl, type) {
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
