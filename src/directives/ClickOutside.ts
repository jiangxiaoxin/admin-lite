import { Directive } from "vue";
type MapValue = {
  prevent: boolean | undefined;
  callback: (e: MouseEvent) => {};
};
let eleMap = new Map<HTMLElement, MapValue>();

document.addEventListener("click", (e) => {
  let { target, currentTarget } = e;
  for (const [el, handle] of eleMap) {
    if (handle.prevent == true) {
      // 要自己判断，那就把事件传递过去
      handle.callback(e);
    } else {
      // 系统判断
      // 点击的不是el。那还可能点击的是el的子元素，此时也算el点击了
      if (el != target && el.contains(target! as Node) == false) {
        handle.callback(e);
      }
    }
  }
});

export const ClickOutside: Directive = {
  mounted(el, binding, vnode, preVnode) {
    eleMap.set(el, {
      prevent: binding.modifiers.prevent,
      callback: binding.value,
    });
  },
  updated(el, binding) {
    eleMap.set(el, {
      prevent: binding.modifiers.prevent,
      callback: binding.value,
    });
  },
  beforeUnmount(el) {
    eleMap.delete(el)
  },
};
