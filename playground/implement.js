// call的实现
Function.prototype.myCall = function(context, ...args) {
   // 把当前函数（即this）定义在传入对象context上
  let cxt = context || window
  let func = Symbol() // 新建一个唯一的属性名，避免与context上的属性重复
  cxt[func] = this
  args = args ? args : []
  // 调用cxt[func]，此时this指向了cxt
  const res = args.length > 0 ? cxt[func](...args) : cxt[func]()
  // 删除该方法，不然污染context
  delete cxt[func]
  return res
}

// apply的实现
Function.prototype.myApply = function(context, args = []) {
  let cxt = context || window
  let func = Symbol()
  cxt[func] = this
  const res = args.length > 0 ? cxt[func](...args) : cxt[func]()
  delete cxt[func]
  return res
}

// bind的实现
Function.prototype.myBind = function(context, ...args) {
  // 保存当前函数
  const fn = this
  args = args ? args : []
  // 返回一个newFn函数，在里面调用fn
  return function newFn(...newFnArgs) {
    if (this instanceof newFn) {
      return new fn(...args, ...newFnArgs)
    }
    return fn.apply(context, [...args, ...newFnArgs])
  }
}

// new的实现
export function myNew(ctor, ...args) {
  if(typeof ctor !== 'function'){
    throw 'myNew function the first param must be a function'
  }
  const newObj = Object.create(ctor.prototype) // 创建一个继承自ctor.prototype的新对象
  const ctorReturnResult = ctor.apply(newObj, args) // 将构造函数ctor的this绑定到newObj中
  const isObject = typeof ctorReturnResult === 'object' && ctorReturnResult !== null
  const isFunction = typeof ctorReturnResult === 'function'
  if(isObject || isFunction){
    return ctorReturnResult
  }
  return newObj
}

// instanceof的实现
export function myInstanceof(left, right) {
  let L = left.__proto__
  let R = right.prototype
  // 判断right.prototype是否在left的原型链上
  while(true){
    if(L === null){
      return false
    }
    if(L === R){
      return true
    }
    // 找不到，把L的值改为它的原型，进入到下一个循环
    L = L.__proto__
  }
}

// Object.create()的实现
export function create(obj) {
  function F() {}
  F.prototype = obj
  return new F()
}

// Object.assign()的实现
Object.assign2 = function(target, ...source) {
  if (target == null) {
    throw new TypeError('Cannot convert undefined or null to object')
  }
  let ret = Object(target)
  source.forEach(function(obj) {
    if (obj != null) {
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          ret[key] = obj[key]
        }
      }
    }
  })
  return ret
}

// 寄生式组合继承
{
  // 实现继承的核心函数
  function inheritPrototype(subType, superType) {
    function F (){}
    // F()的原型指向的是superType
    F.prototype = superType.prototype
    // subType的原型指向的是F()
    subType.prototype = new F()
    // 重新将构造函数指向自己，修正构造函数
    subType.prototype.constructor = subType
  }
  // 设置父类
  function SuperType(name) {
    this.name = name
    this.colors = ["red", "blue", "green"]
    SuperType.prototype.sayName = function() {
      console.log(this.name)
    }
  }
  // 设置子类
  function SubType(name, age) {
    // 构造函数式继承--子类构造函数中执行父类构造函数
    SuperType.call(this, name)
    this.age = age
  }
  // 核心：因为是对父类原型的复制，所以不包含父类的构造函数，也就不会调用两次父类的构造函数造成浪费
  inheritPrototype(SubType, SuperType)
  // 添加子类私有方法
  SubType.prototype.sayAge = function() {
    console.log(this.age)
  }
  let instance = new SubType("Taec", 18)
  console.log(instance)
}

// jsonp
export function jsonp(url, data) {
  return new Promise((resolve, reject) => {
    // 初始化url
    let dataString = url.indexOf('?') === -1 ? '?' : ''
    let callbackName = `jsonpCB_${Date.now()}`
    url += `${dataString}callback=${callbackName}`
    if (data) {
      // 有请求参数，依次添加到url
      for (let k in data) {
        url += `${k}=${data[k]}`
      }
    }
    let jsNode = document.createElement('script')
    jsNode.src = url
    // 触发callback，触发后删除js标签和绑定在window上的callback
    window[callbackName] = result => {
      delete window[callbackName]
      document.body.removeChild(jsNode)
      if (result) {
        resolve(result)
      } else {
        reject('没有数据')
      }
    }
    // js加载异常的情况
    jsNode.addEventListener('error', () => {
      delete window[callbackName]
      document.body.removeChild(jsNode)
      reject('JavaScript资源加载失败')
    }, false)
    // 添加js节点到document上时，开始请求
    document.body.appendChild(jsNode)
  })
}

// jsonp('xxx', {
//   a: 1,
//   b: 2
// })
//   .then(res => {
//     console.log(res)
//   })
//   .catch(e => {
//     console.error(e)
//   })

// promise的实现
class MyPromisse {
  constructor(executor) {
    this.state = 'pending' // 状态
    this.value = null // 成功结果
    this.reason = null // 失败原因
    this.callbacks = [] // 存放回调

    const resolve = (value) => {
      if(this.state !== 'pending') return
      this.state = 'fulfilled'
      this.value = value
      this.callbacks.forEach(callback => callback.fulfilled())
    }
    const reject = (reason) => {
      if(this.state !== 'pending') return
      this.state = 'rejected'
      this.reason = reason
      this.callbacks.forEach(callback => callback.rejected())
    }

    executor(resolve, reject) // 立即执行，等待函数执行完后调用resolve/reject
  }
  then(onFulfilled, onRejected) {
    if(typeof onFulfilled !== 'function') onFulfilled = value => value
    if(typeof onRejected !== 'function') onRejected = reason => {throw reason}

    let promise = new MyPromise((resolve, reject) => {
      if(this.state === 'fulfilled') {
        setTimeout(() => resolve(onFulfilled(this.value)))
      }
      if(this.state === 'rejected') {
        setTimeout(() => resolve(onRejected(this.reason)))
      }
      if(this.state === 'pending') {
        this.callbacks.push({
          fulfilled: () => {
            setTimeout(() => resolve(onFulfilled(this.value)))
          },
          rejected: () => {
            setTimeout(() => reject(onRejected(this.reason)))
          }
        })
      }
    })
    return promise
  }
}
