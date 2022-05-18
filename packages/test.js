// call的实现
Function.prototype.myCall = function(context,...args){
  let cxt = context || window
  //将当前被调用的方法定义在cxt.func上.(为了能以对象调用形式绑定this)
  //新建一个唯一的Symbol变量避免重复
  let func = Symbol()
  cxt[func] = this
  args = args ? args : []
  //以对象调用形式调用func,此时this指向cxt 也就是传入的需要绑定的this指向
  const res = args.length > 0 ? cxt[func](...args) : cxt[func]()
  //删除该方法，不然会对传入对象造成污染（添加该方法）
  delete cxt[func]
  return res
}

// apply的实现
Function.prototype.myApply = function(context,args = []){
  let cxt = context || window
  //将当前被调用的方法定义在cxt.func上.(为了能以对象调用形式绑定this)
  //新建一个唯一的Symbol变量避免重复
  let func = Symbol()
  cxt[func] = this
  //以对象调用形式调用func,此时this指向cxt 也就是传入的需要绑定的this指向
  const res = args.length > 0 ? cxt[func](...args) : cxt[func]()
  delete cxt[func]
  return res
}

// bind的实现
Function.prototype.myBind = function (context, ...args) {
  //新建一个变量赋值为this，表示当前函数
  const fn = this
  //判断有没有传参进来，若为空则赋值[]
  args = args ? args : []
  //返回一个newFn函数，在里面调用fn
  return function newFn(...newFnArgs) {
    if (this instanceof newFn) {
      return new fn(...args, ...newFnArgs)
    }
    return fn.apply(context, [...args,...newFnArgs])
  }
}

// new的实现
export function myNew(ctor,...args){
  if(typeof ctor !== 'function'){
    throw 'myNew function the first param must be a function'
  }
  const newObj = Object.create(ctor.prototype); //创建一个继承自ctor.prototype的新对象
  const ctorReturnResult = ctor.apply(newObj, args); //将构造函数ctor的this绑定到newObj中
  const isObject = typeof ctorReturnResult === 'object' && ctorReturnResult !== null
  const isFunction = typeof ctorReturnResult === 'function'
  if(isObject || isFunction){
    return ctorReturnResult
  }
  return newObj
}

// instanceof的实现
export function myInstanceof(left, right){
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
