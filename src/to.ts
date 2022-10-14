// async错误处理
export function to(promise: Promise<any>){
  return promise.then((data) => [null, data]).catch((err) => [err, null])
}
