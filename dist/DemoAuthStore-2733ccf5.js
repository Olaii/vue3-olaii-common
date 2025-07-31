import { resolveComponent as o, openBlock as u, createBlock as a, withCtx as r, createVNode as i, unref as n, createTextVNode as s, createElementVNode as _, toDisplayString as m } from "vue";
import { a as f } from "./lib-cf917e1d.js";
import "vue3-gettext";
import "vue-router";
const k = {
  __name: "DemoAuthStore",
  setup(d) {
    const t = f();
    return (N, e) => {
      const l = o("NiceButton"), p = o("NiceWrapper"), c = o("NiceView");
      return u(), a(c, {
        title: "Auth store",
        icon: "icon-user"
      }, {
        default: r(() => [
          i(p, null, {
            default: r(() => [
              i(l, {
                loading: n(t).loadingUserProfile,
                onClick: e[0] || (e[0] = (g) => n(t).getUserProfile())
              }, {
                default: r(() => e[1] || (e[1] = [
                  s("Get user profile", -1)
                ])),
                _: 1,
                __: [1]
              }, 8, ["loading"]),
              _("pre", null, m(n(t)), 1)
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
  k as default
};
