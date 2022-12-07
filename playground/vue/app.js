import { effectWatch, reactive } from "./core/reactivity.js";
import { h } from "./core/h.js"

export default {
  render(context) {
    // const div = document.createElement('div')
    // div.innerText = context.state.count
    // return div
    return h(
      'div',
      {
        id: 'id-1',
        class: 'class-' + context.state.count
      }, 
      [h('p', null, String(context.state.count)), h('p', null, '测试')]
    )
  },
  setup() {
    const state = reactive({
      count: 0
    })

    setTimeout(() => {
      state.count++
    }, 5000)

    window.state = state // 控制台调试

    return {
      state
    }
  }
}
