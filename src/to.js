// async错误处理
// @ts-ignore
export function to(promise) {
    // @ts-ignore
    return promise.then((data) => [null, data]).catch((err) => [err, null]);
}
