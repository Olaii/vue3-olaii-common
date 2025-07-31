import { resolveComponent as e, openBlock as c, createBlock as i, withCtx as o, createVNode as a, createElementVNode as p, toDisplayString as l, unref as _ } from "vue";
import { u as m } from "./lib-cf917e1d.js";
import "vue3-gettext";
import "vue-router";
const V = {
  __name: "DemoGeneralStore",
  setup(s) {
    const t = m();
    return (u, f) => {
      const r = e("NiceWrapper"), n = e("NiceView");
      return c(), i(n, {
        title: "General store",
        icon: "icon-box"
      }, {
        default: o(() => [
          a(r, null, {
            default: o(() => [
              p("pre", null, l(_(t)), 1)
            ]),
            _: 1
          })
        ]),
        _: 1
      });
    };
  }
};
export {
  V as default
};
