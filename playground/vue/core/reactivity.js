// vue简单实现
let currenteffect
// 依赖
class Dep {
  constructor(val) {
    this._val = val
    this.effects = new Set()
  }
  get value() {
    this.depend()
    return this._val
  }
  set value(newVal) {
    this._val = newVal
    this.notice()
  }
  // 收集依赖
  depend() {
    if(currenteffect) {
      this.effects.add(currenteffect)
    }
  }
  // 触发依赖
  notice() {
    this.effects.forEach(effect => {
      effect()
    })
  }
}

// 收集依赖
export function effectWatch(effect) {
  currenteffect = effect
  effect()
  currenteffect = null
}


// const dep = new Dep(10)
// let b

// effectWatch(() => {
//   b = dep.value + 10
//   console.log(b)
// })

// dep.value = 15


const targetMap = new Map()
// 获取
function getDep(target, key) {
  let depsMap = targetMap.get(target)
  if(!depsMap) {
    depsMap = new Map()
    targetMap.set(target, depsMap)
  }
  let dep = depsMap.get(key)
  if(!dep) {
    dep = new Dep()
    depsMap.set(key, dep)
  }
  return dep
}

export function reactive(target) {
  return new Proxy(target, {
    get(target, key) {
      const dep = getDep(target, key)
      dep.depend()
      return Reflect.get(target, key)
    },
    set(target, key, value) {
      const dep = getDep(target, key)
      const result = Reflect.set(target, key, value)
      dep.notice()
      return result
    }
  })
}
