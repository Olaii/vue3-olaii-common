import { resolveComponent as o, openBlock as _, createBlock as m, withCtx as i, createVNode as e, createElementVNode as a, toDisplayString as l, unref as r } from "vue";
import { u as d, a as f } from "./lib-cf917e1d.js";
import "vue3-gettext";
import "vue-router";
const w = {
  __name: "DemoHome",
  setup(O) {
    const n = d(), s = f();
    return (b, h) => {
      const c = o("OlaiiUser"), t = o("NiceWrapper"), p = o("OlaiiSidebar"), u = o("NiceView");
      return _(), m(u, {
        title: "Home",
        icon: "icon-home"
      }, {
        default: i(() => [
          e(t, {
            title: "Olaii user",
            id: "olaii-user",
            collapsable: ""
          }, {
            default: i(() => [
              e(c)
            ]),
            _: 1
          }),
          e(t, {
            title: "Olaii sidebar",
            id: "olaii-sidebar",
            collapsable: ""
          }, {
            default: i(() => [
              e(p)
            ]),
            _: 1
          }),
          e(t, {
            title: "Olaii general store",
            id: "olaii-general-store",
            collapsable: ""
          }, {
            default: i(() => [
              a("pre", null, l(r(n)), 1)
            ]),
            _: 1
          }),
          e(t, {
            title: "Olaii auth store",
            id: "olaii-auth-store",
            collapsable: ""
          }, {
            default: i(() => [
              a("pre", null, l(r(s)), 1)
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
  w as default
};
