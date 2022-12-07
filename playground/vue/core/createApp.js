import { effectWatch } from "./reactivity.js"
import { diff, mountElement } from "./renderer.js"

export function createApp(rootComponent) {
  return {
    mount(rootContainer) {
      const context = rootComponent.setup()
      let isMounted = false
      let prevSubtree

      effectWatch(() => {
        if(!isMounted) {
          isMounted = true
          rootContainer.innerHTML = ''
          const subTree = rootComponent.render(context)
          mountElement(subTree, rootContainer)
          prevSubtree = subTree
        }else{
          const subTree = rootComponent.render(context)
          diff(prevSubtree, subTree)
          prevSubtree = subTree
        }
      })
    }
  }
}