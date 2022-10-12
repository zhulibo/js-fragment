// 添加样式
export function addStyle(css) {
    let style = document.createElement('style');
    let head = document.head || document.getElementsByTagName('head')[0];
    style.appendChild(document.createTextNode(css));
    head.appendChild(style);
}
