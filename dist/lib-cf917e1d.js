import { hasInjectionContext as yn, inject as be, getCurrentInstance as _n, ref as j, watch as En, reactive as Sn, markRaw as ce, effectScope as wn, isRef as he, isReactive as nt, toRef as $e, toRaw as kn, nextTick as dt, computed as X, getCurrentScope as Tn, onScopeDispose as vn, toRefs as pt, resolveComponent as G, openBlock as A, createBlock as ve, withCtx as te, createElementVNode as T, createVNode as P, resolveDirective as On, createElementBlock as L, normalizeClass as me, unref as N, toDisplayString as F, createCommentVNode as W, withDirectives as ht, createTextVNode as mt, Fragment as ze, renderList as Ft, normalizeStyle as Rn, renderSlot as Nn, resolveDynamicComponent as xn } from "vue";
import { createGettext as Cn } from "vue3-gettext";
import { createRouter as An, createWebHistory as Pn } from "vue-router";
function Dn(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var jt = { exports: {} };
(function(e, t) {
  (function() {
    var n = {
      expires: "1d",
      path: "; path=/",
      domain: "",
      secure: "",
      sameSite: "; SameSite=Lax",
      partitioned: ""
    }, s = {
      // install of Vue
      install: function(o, r) {
        r && this.config(r.expires, r.path, r.domain, r.secure, r.sameSite, r.partitioned);
        const i = o.config && o.config.globalProperties;
        i && (o.config.globalProperties.$cookies = this, o.provide && o.provide("$cookies", this)), (!i || o.prototype) && (o.prototype.$cookies = this), o.$cookies = this;
      },
      config: function(o, r, i, a, f, l) {
        n.expires = o || "1d", n.path = r ? "; path=" + r : "; path=/", n.domain = i ? "; domain=" + i : "", n.secure = a ? "; Secure" : "", n.sameSite = f ? "; SameSite=" + f : "; SameSite=Lax", n.partitioned = l ? "; Partitioned" : "";
      },
      get: function(o) {
        var r = decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(o).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
        if (r && (r.substring(0, 1) === "{" && r.substring(r.length - 1, r.length) === "}" || r.substring(0, 1) === "[" && r.substring(r.length - 1, r.length) === "]"))
          try {
            r = JSON.parse(r);
          } catch {
            return r;
          }
        return r;
      },
      set: function(o, r, i, a, f, l, u, d) {
        if (o) {
          if (/^(?:expires|max\-age|path|domain|secure|SameSite)$/i.test(o))
            throw new Error('Cookie name illegality. Cannot be set to ["expires","max-age","path","domain","secure","SameSite"]	 current key name: ' + o);
        } else
          throw new Error("Cookie name is not found in the first argument.");
        r && typeof r == "object" && (r = JSON.stringify(r));
        var g = "";
        if (i = i === void 0 ? n.expires : i, i && i !== 0)
          switch (i.constructor) {
            case Number:
              i === 1 / 0 || i === -1 ? g = "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : g = "; max-age=" + i;
              break;
            case String:
              if (/^(?:\d+(y|m|d|h|min|s))$/i.test(i)) {
                var S = i.replace(/^(\d+)(?:y|m|d|h|min|s)$/i, "$1");
                switch (i.replace(/^(?:\d+)(y|m|d|h|min|s)$/i, "$1").toLowerCase()) {
                  case "m":
                    g = "; max-age=" + +S * 2592e3;
                    break;
                  case "d":
                    g = "; max-age=" + +S * 86400;
                    break;
                  case "h":
                    g = "; max-age=" + +S * 3600;
                    break;
                  case "min":
                    g = "; max-age=" + +S * 60;
                    break;
                  case "s":
                    g = "; max-age=" + S;
                    break;
                  case "y":
                    g = "; max-age=" + +S * 31104e3;
                    break;
                }
              } else
                g = "; expires=" + i;
              break;
            case Date:
              g = "; expires=" + i.toUTCString();
              break;
          }
        return document.cookie = encodeURIComponent(o) + "=" + encodeURIComponent(r) + g + (f ? "; domain=" + f : n.domain) + (a ? "; path=" + a : n.path) + (l === void 0 ? n.secure : l ? "; Secure" : "") + (u === void 0 ? n.sameSite : u ? "; SameSite=" + u : "") + (d === void 0 ? n.partitioned : d ? "; Partitioned" : ""), this;
      },
      remove: function(o, r, i) {
        return !o || !this.isKey(o) ? !1 : (document.cookie = encodeURIComponent(o) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (i ? "; domain=" + i : n.domain) + (r ? "; path=" + r : n.path) + "; SameSite=Lax", !0);
      },
      isKey: function(o) {
        return new RegExp("(?:^|;\\s*)" + encodeURIComponent(o).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=").test(document.cookie);
      },
      keys: function() {
        if (!document.cookie)
          return [];
        for (var o = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/), r = 0; r < o.length; r++)
          o[r] = decodeURIComponent(o[r]);
        return o;
      }
    };
    e.exports = s, typeof window < "u" && (window.$cookies = s);
  })();
})(jt);
var Un = jt.exports;
const Be = /* @__PURE__ */ Dn(Un);
function gt() {
  return document.location.hostname == "localhost" || document.location.hostname == "0.0.0.0" || document.location.hostname == "test.olaii.com";
}
const O = {
  cookieSettings: {
    expires: "3m",
    domain: ".olaii.com",
    path: "/",
    sameSite: gt() ? "Strict" : "None",
    secure: !gt()
  },
  init(e) {
    this.isProduction = e;
  },
  remove(e) {
    e = O._handleKey(e), Be.remove(
      e,
      O.cookieSettings.path,
      O.cookieSettings.domain
    );
  },
  save(e, t) {
    t === void 0 ? O.remove(e) : (e = O._handleKey(e), Be.set(
      e,
      t,
      O.cookieSettings.expires,
      O.cookieSettings.path,
      O.cookieSettings.domain,
      O.cookieSettings.secure,
      O.cookieSettings.sameSite
    ));
  },
  get(e) {
    return e = O._handleKey(e), Be.get(e);
  },
  _handleKey(e) {
    let t = String(e);
    return this.isProduction || (t += "_dev"), t;
  }
}, Ie = Cn({
  defaultLanguage: "en",
  mutedLanguages: ["en"]
}), Ln = [
  {
    path: "/",
    name: "home",
    title: "Home",
    component: import("./DemoHome-f29c2485.js")
  },
  {
    path: "/auth-store",
    name: "auth-store",
    title: "Auth store",
    component: import("./DemoAuthStore-2733ccf5.js")
  },
  {
    path: "/general-store",
    name: "general-store",
    title: "General store",
    component: import("./DemoGeneralStore-252144f4.js")
  }
  // {
  //   path: "/olaii-user",
  //   name: "olaii-user",
  //   title: "Olaii User",
  //   component: import("@/demo/DemoOlaiiUser.vue")
  // },
];
function $t(e, t) {
  return function() {
    return e.apply(t, arguments);
  };
}
const { toString: Fn } = Object.prototype, { getPrototypeOf: st } = Object, { iterator: Ce, toStringTag: Bt } = Symbol, Ae = ((e) => (t) => {
  const n = Fn.call(t);
  return e[n] || (e[n] = n.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null)), J = (e) => (e = e.toLowerCase(), (t) => Ae(t) === e), Pe = (e) => (t) => typeof t === e, { isArray: ne } = Array, ge = Pe("undefined");
function ye(e) {
  return e !== null && !ge(e) && e.constructor !== null && !ge(e.constructor) && B(e.constructor.isBuffer) && e.constructor.isBuffer(e);
}
const It = J("ArrayBuffer");
function jn(e) {
  let t;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? t = ArrayBuffer.isView(e) : t = e && e.buffer && It(e.buffer), t;
}
const $n = Pe("string"), B = Pe("function"), qt = Pe("number"), _e = (e) => e !== null && typeof e == "object", Bn = (e) => e === !0 || e === !1, Se = (e) => {
  if (Ae(e) !== "object")
    return !1;
  const t = st(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Bt in e) && !(Ce in e);
}, In = (e) => {
  if (!_e(e) || ye(e))
    return !1;
  try {
    return Object.keys(e).length === 0 && Object.getPrototypeOf(e) === Object.prototype;
  } catch {
    return !1;
  }
}, qn = J("Date"), Vn = J("File"), Mn = J("Blob"), Hn = J("FileList"), zn = (e) => _e(e) && B(e.pipe), Jn = (e) => {
  let t;
  return e && (typeof FormData == "function" && e instanceof FormData || B(e.append) && ((t = Ae(e)) === "formdata" || // detect form-data instance
  t === "object" && B(e.toString) && e.toString() === "[object FormData]"));
}, Kn = J("URLSearchParams"), [Wn, Gn, Xn, Qn] = ["ReadableStream", "Request", "Response", "Headers"].map(J), Zn = (e) => e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function Ee(e, t, { allOwnKeys: n = !1 } = {}) {
  if (e === null || typeof e > "u")
    return;
  let s, o;
  if (typeof e != "object" && (e = [e]), ne(e))
    for (s = 0, o = e.length; s < o; s++)
      t.call(null, e[s], s, e);
  else {
    if (ye(e))
      return;
    const r = n ? Object.getOwnPropertyNames(e) : Object.keys(e), i = r.length;
    let a;
    for (s = 0; s < i; s++)
      a = r[s], t.call(null, e[a], a, e);
  }
}
function Vt(e, t) {
  if (ye(e))
    return null;
  t = t.toLowerCase();
  const n = Object.keys(e);
  let s = n.length, o;
  for (; s-- > 0; )
    if (o = n[s], t === o.toLowerCase())
      return o;
  return null;
}
const Q = (() => typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : global)(), Mt = (e) => !ge(e) && e !== Q;
function Je() {
  const { caseless: e } = Mt(this) && this || {}, t = {}, n = (s, o) => {
    const r = e && Vt(t, o) || o;
    Se(t[r]) && Se(s) ? t[r] = Je(t[r], s) : Se(s) ? t[r] = Je({}, s) : ne(s) ? t[r] = s.slice() : t[r] = s;
  };
  for (let s = 0, o = arguments.length; s < o; s++)
    arguments[s] && Ee(arguments[s], n);
  return t;
}
const Yn = (e, t, n, { allOwnKeys: s } = {}) => (Ee(t, (o, r) => {
  n && B(o) ? e[r] = $t(o, n) : e[r] = o;
}, { allOwnKeys: s }), e), es = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e), ts = (e, t, n, s) => {
  e.prototype = Object.create(t.prototype, s), e.prototype.constructor = e, Object.defineProperty(e, "super", {
    value: t.prototype
  }), n && Object.assign(e.prototype, n);
}, ns = (e, t, n, s) => {
  let o, r, i;
  const a = {};
  if (t = t || {}, e == null)
    return t;
  do {
    for (o = Object.getOwnPropertyNames(e), r = o.length; r-- > 0; )
      i = o[r], (!s || s(i, e, t)) && !a[i] && (t[i] = e[i], a[i] = !0);
    e = n !== !1 && st(e);
  } while (e && (!n || n(e, t)) && e !== Object.prototype);
  return t;
}, ss = (e, t, n) => {
  e = String(e), (n === void 0 || n > e.length) && (n = e.length), n -= t.length;
  const s = e.indexOf(t, n);
  return s !== -1 && s === n;
}, os = (e) => {
  if (!e)
    return null;
  if (ne(e))
    return e;
  let t = e.length;
  if (!qt(t))
    return null;
  const n = new Array(t);
  for (; t-- > 0; )
    n[t] = e[t];
  return n;
}, rs = ((e) => (t) => e && t instanceof e)(typeof Uint8Array < "u" && st(Uint8Array)), is = (e, t) => {
  const s = (e && e[Ce]).call(e);
  let o;
  for (; (o = s.next()) && !o.done; ) {
    const r = o.value;
    t.call(e, r[0], r[1]);
  }
}, as = (e, t) => {
  let n;
  const s = [];
  for (; (n = e.exec(t)) !== null; )
    s.push(n);
  return s;
}, cs = J("HTMLFormElement"), ls = (e) => e.toLowerCase().replace(
  /[-_\s]([a-z\d])(\w*)/g,
  function(n, s, o) {
    return s.toUpperCase() + o;
  }
), bt = (({ hasOwnProperty: e }) => (t, n) => e.call(t, n))(Object.prototype), us = J("RegExp"), Ht = (e, t) => {
  const n = Object.getOwnPropertyDescriptors(e), s = {};
  Ee(n, (o, r) => {
    let i;
    (i = t(o, r, e)) !== !1 && (s[r] = i || o);
  }), Object.defineProperties(e, s);
}, fs = (e) => {
  Ht(e, (t, n) => {
    if (B(e) && ["arguments", "caller", "callee"].indexOf(n) !== -1)
      return !1;
    const s = e[n];
    if (B(s)) {
      if (t.enumerable = !1, "writable" in t) {
        t.writable = !1;
        return;
      }
      t.set || (t.set = () => {
        throw Error("Can not rewrite read-only method '" + n + "'");
      });
    }
  });
}, ds = (e, t) => {
  const n = {}, s = (o) => {
    o.forEach((r) => {
      n[r] = !0;
    });
  };
  return ne(e) ? s(e) : s(String(e).split(t)), n;
}, ps = () => {
}, hs = (e, t) => e != null && Number.isFinite(e = +e) ? e : t;
function ms(e) {
  return !!(e && B(e.append) && e[Bt] === "FormData" && e[Ce]);
}
const gs = (e) => {
  const t = new Array(10), n = (s, o) => {
    if (_e(s)) {
      if (t.indexOf(s) >= 0)
        return;
      if (ye(s))
        return s;
      if (!("toJSON" in s)) {
        t[o] = s;
        const r = ne(s) ? [] : {};
        return Ee(s, (i, a) => {
          const f = n(i, o + 1);
          !ge(f) && (r[a] = f);
        }), t[o] = void 0, r;
      }
    }
    return s;
  };
  return n(e, 0);
}, bs = J("AsyncFunction"), ys = (e) => e && (_e(e) || B(e)) && B(e.then) && B(e.catch), zt = ((e, t) => e ? setImmediate : t ? ((n, s) => (Q.addEventListener("message", ({ source: o, data: r }) => {
  o === Q && r === n && s.length && s.shift()();
}, !1), (o) => {
  s.push(o), Q.postMessage(n, "*");
}))(`axios@${Math.random()}`, []) : (n) => setTimeout(n))(
  typeof setImmediate == "function",
  B(Q.postMessage)
), _s = typeof queueMicrotask < "u" ? queueMicrotask.bind(Q) : typeof process < "u" && process.nextTick || zt, Es = (e) => e != null && B(e[Ce]), c = {
  isArray: ne,
  isArrayBuffer: It,
  isBuffer: ye,
  isFormData: Jn,
  isArrayBufferView: jn,
  isString: $n,
  isNumber: qt,
  isBoolean: Bn,
  isObject: _e,
  isPlainObject: Se,
  isEmptyObject: In,
  isReadableStream: Wn,
  isRequest: Gn,
  isResponse: Xn,
  isHeaders: Qn,
  isUndefined: ge,
  isDate: qn,
  isFile: Vn,
  isBlob: Mn,
  isRegExp: us,
  isFunction: B,
  isStream: zn,
  isURLSearchParams: Kn,
  isTypedArray: rs,
  isFileList: Hn,
  forEach: Ee,
  merge: Je,
  extend: Yn,
  trim: Zn,
  stripBOM: es,
  inherits: ts,
  toFlatObject: ns,
  kindOf: Ae,
  kindOfTest: J,
  endsWith: ss,
  toArray: os,
  forEachEntry: is,
  matchAll: as,
  isHTMLForm: cs,
  hasOwnProperty: bt,
  hasOwnProp: bt,
  // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors: Ht,
  freezeMethods: fs,
  toObjectSet: ds,
  toCamelCase: ls,
  noop: ps,
  toFiniteNumber: hs,
  findKey: Vt,
  global: Q,
  isContextDefined: Mt,
  isSpecCompliantForm: ms,
  toJSONObject: gs,
  isAsyncFn: bs,
  isThenable: ys,
  setImmediate: zt,
  asap: _s,
  isIterable: Es
};
function w(e, t, n, s, o) {
  Error.call(this), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack, this.message = e, this.name = "AxiosError", t && (this.code = t), n && (this.config = n), s && (this.request = s), o && (this.response = o, this.status = o.status ? o.status : null);
}
c.inherits(w, Error, {
  toJSON: function() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: c.toJSONObject(this.config),
      code: this.code,
      status: this.status
    };
  }
});
const Jt = w.prototype, Kt = {};
[
  "ERR_BAD_OPTION_VALUE",
  "ERR_BAD_OPTION",
  "ECONNABORTED",
  "ETIMEDOUT",
  "ERR_NETWORK",
  "ERR_FR_TOO_MANY_REDIRECTS",
  "ERR_DEPRECATED",
  "ERR_BAD_RESPONSE",
  "ERR_BAD_REQUEST",
  "ERR_CANCELED",
  "ERR_NOT_SUPPORT",
  "ERR_INVALID_URL"
  // eslint-disable-next-line func-names
].forEach((e) => {
  Kt[e] = { value: e };
});
Object.defineProperties(w, Kt);
Object.defineProperty(Jt, "isAxiosError", { value: !0 });
w.from = (e, t, n, s, o, r) => {
  const i = Object.create(Jt);
  return c.toFlatObject(e, i, function(f) {
    return f !== Error.prototype;
  }, (a) => a !== "isAxiosError"), w.call(i, e.message, t, n, s, o), i.cause = e, i.name = e.name, r && Object.assign(i, r), i;
};
const Ss = null;
function Ke(e) {
  return c.isPlainObject(e) || c.isArray(e);
}
function Wt(e) {
  return c.endsWith(e, "[]") ? e.slice(0, -2) : e;
}
function yt(e, t, n) {
  return e ? e.concat(t).map(function(o, r) {
    return o = Wt(o), !n && r ? "[" + o + "]" : o;
  }).join(n ? "." : "") : t;
}
function ws(e) {
  return c.isArray(e) && !e.some(Ke);
}
const ks = c.toFlatObject(c, {}, null, function(t) {
  return /^is[A-Z]/.test(t);
});
function De(e, t, n) {
  if (!c.isObject(e))
    throw new TypeError("target must be an object");
  t = t || new FormData(), n = c.toFlatObject(n, {
    metaTokens: !0,
    dots: !1,
    indexes: !1
  }, !1, function(y, h) {
    return !c.isUndefined(h[y]);
  });
  const s = n.metaTokens, o = n.visitor || u, r = n.dots, i = n.indexes, f = (n.Blob || typeof Blob < "u" && Blob) && c.isSpecCompliantForm(t);
  if (!c.isFunction(o))
    throw new TypeError("visitor must be a function");
  function l(p) {
    if (p === null)
      return "";
    if (c.isDate(p))
      return p.toISOString();
    if (c.isBoolean(p))
      return p.toString();
    if (!f && c.isBlob(p))
      throw new w("Blob is not supported. Use a Buffer instead.");
    return c.isArrayBuffer(p) || c.isTypedArray(p) ? f && typeof Blob == "function" ? new Blob([p]) : Buffer.from(p) : p;
  }
  function u(p, y, h) {
    let v = p;
    if (p && !h && typeof p == "object") {
      if (c.endsWith(y, "{}"))
        y = s ? y : y.slice(0, -2), p = JSON.stringify(p);
      else if (c.isArray(p) && ws(p) || (c.isFileList(p) || c.endsWith(y, "[]")) && (v = c.toArray(p)))
        return y = Wt(y), v.forEach(function(E, D) {
          !(c.isUndefined(E) || E === null) && t.append(
            // eslint-disable-next-line no-nested-ternary
            i === !0 ? yt([y], D, r) : i === null ? y : y + "[]",
            l(E)
          );
        }), !1;
    }
    return Ke(p) ? !0 : (t.append(yt(h, y, r), l(p)), !1);
  }
  const d = [], g = Object.assign(ks, {
    defaultVisitor: u,
    convertValue: l,
    isVisitable: Ke
  });
  function S(p, y) {
    if (!c.isUndefined(p)) {
      if (d.indexOf(p) !== -1)
        throw Error("Circular reference detected in " + y.join("."));
      d.push(p), c.forEach(p, function(v, k) {
        (!(c.isUndefined(v) || v === null) && o.call(
          t,
          v,
          c.isString(k) ? k.trim() : k,
          y,
          g
        )) === !0 && S(v, y ? y.concat(k) : [k]);
      }), d.pop();
    }
  }
  if (!c.isObject(e))
    throw new TypeError("data must be an object");
  return S(e), t;
}
function _t(e) {
  const t = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0"
  };
  return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g, function(s) {
    return t[s];
  });
}
function ot(e, t) {
  this._pairs = [], e && De(e, this, t);
}
const Gt = ot.prototype;
Gt.append = function(t, n) {
  this._pairs.push([t, n]);
};
Gt.toString = function(t) {
  const n = t ? function(s) {
    return t.call(this, s, _t);
  } : _t;
  return this._pairs.map(function(o) {
    return n(o[0]) + "=" + n(o[1]);
  }, "").join("&");
};
function Ts(e) {
  return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
function Xt(e, t, n) {
  if (!t)
    return e;
  const s = n && n.encode || Ts;
  c.isFunction(n) && (n = {
    serialize: n
  });
  const o = n && n.serialize;
  let r;
  if (o ? r = o(t, n) : r = c.isURLSearchParams(t) ? t.toString() : new ot(t, n).toString(s), r) {
    const i = e.indexOf("#");
    i !== -1 && (e = e.slice(0, i)), e += (e.indexOf("?") === -1 ? "?" : "&") + r;
  }
  return e;
}
class vs {
  constructor() {
    this.handlers = [];
  }
  /**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   *
   * @return {Number} An ID used to remove interceptor later
   */
  use(t, n, s) {
    return this.handlers.push({
      fulfilled: t,
      rejected: n,
      synchronous: s ? s.synchronous : !1,
      runWhen: s ? s.runWhen : null
    }), this.handlers.length - 1;
  }
  /**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   *
   * @returns {Boolean} `true` if the interceptor was removed, `false` otherwise
   */
  eject(t) {
    this.handlers[t] && (this.handlers[t] = null);
  }
  /**
   * Clear all interceptors from the stack
   *
   * @returns {void}
   */
  clear() {
    this.handlers && (this.handlers = []);
  }
  /**
   * Iterate over all the registered interceptors
   *
   * This method is particularly useful for skipping over any
   * interceptors that may have become `null` calling `eject`.
   *
   * @param {Function} fn The function to call for each interceptor
   *
   * @returns {void}
   */
  forEach(t) {
    c.forEach(this.handlers, function(s) {
      s !== null && t(s);
    });
  }
}
const Et = vs, Qt = {
  silentJSONParsing: !0,
  forcedJSONParsing: !0,
  clarifyTimeoutError: !1
}, Os = typeof URLSearchParams < "u" ? URLSearchParams : ot, Rs = typeof FormData < "u" ? FormData : null, Ns = typeof Blob < "u" ? Blob : null, xs = {
  isBrowser: !0,
  classes: {
    URLSearchParams: Os,
    FormData: Rs,
    Blob: Ns
  },
  protocols: ["http", "https", "file", "blob", "url", "data"]
}, rt = typeof window < "u" && typeof document < "u", We = typeof navigator == "object" && navigator || void 0, Cs = rt && (!We || ["ReactNative", "NativeScript", "NS"].indexOf(We.product) < 0), As = (() => typeof WorkerGlobalScope < "u" && // eslint-disable-next-line no-undef
self instanceof WorkerGlobalScope && typeof self.importScripts == "function")(), Ps = rt && window.location.href || "http://localhost", Ds = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  hasBrowserEnv: rt,
  hasStandardBrowserEnv: Cs,
  hasStandardBrowserWebWorkerEnv: As,
  navigator: We,
  origin: Ps
}, Symbol.toStringTag, { value: "Module" })), U = {
  ...Ds,
  ...xs
};
function Us(e, t) {
  return De(e, new U.classes.URLSearchParams(), {
    visitor: function(n, s, o, r) {
      return U.isNode && c.isBuffer(n) ? (this.append(s, n.toString("base64")), !1) : r.defaultVisitor.apply(this, arguments);
    },
    ...t
  });
}
function Ls(e) {
  return c.matchAll(/\w+|\[(\w*)]/g, e).map((t) => t[0] === "[]" ? "" : t[1] || t[0]);
}
function Fs(e) {
  const t = {}, n = Object.keys(e);
  let s;
  const o = n.length;
  let r;
  for (s = 0; s < o; s++)
    r = n[s], t[r] = e[r];
  return t;
}
function Zt(e) {
  function t(n, s, o, r) {
    let i = n[r++];
    if (i === "__proto__")
      return !0;
    const a = Number.isFinite(+i), f = r >= n.length;
    return i = !i && c.isArray(o) ? o.length : i, f ? (c.hasOwnProp(o, i) ? o[i] = [o[i], s] : o[i] = s, !a) : ((!o[i] || !c.isObject(o[i])) && (o[i] = []), t(n, s, o[i], r) && c.isArray(o[i]) && (o[i] = Fs(o[i])), !a);
  }
  if (c.isFormData(e) && c.isFunction(e.entries)) {
    const n = {};
    return c.forEachEntry(e, (s, o) => {
      t(Ls(s), o, n, 0);
    }), n;
  }
  return null;
}
function js(e, t, n) {
  if (c.isString(e))
    try {
      return (t || JSON.parse)(e), c.trim(e);
    } catch (s) {
      if (s.name !== "SyntaxError")
        throw s;
    }
  return (n || JSON.stringify)(e);
}
const it = {
  transitional: Qt,
  adapter: ["xhr", "http", "fetch"],
  transformRequest: [function(t, n) {
    const s = n.getContentType() || "", o = s.indexOf("application/json") > -1, r = c.isObject(t);
    if (r && c.isHTMLForm(t) && (t = new FormData(t)), c.isFormData(t))
      return o ? JSON.stringify(Zt(t)) : t;
    if (c.isArrayBuffer(t) || c.isBuffer(t) || c.isStream(t) || c.isFile(t) || c.isBlob(t) || c.isReadableStream(t))
      return t;
    if (c.isArrayBufferView(t))
      return t.buffer;
    if (c.isURLSearchParams(t))
      return n.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), t.toString();
    let a;
    if (r) {
      if (s.indexOf("application/x-www-form-urlencoded") > -1)
        return Us(t, this.formSerializer).toString();
      if ((a = c.isFileList(t)) || s.indexOf("multipart/form-data") > -1) {
        const f = this.env && this.env.FormData;
        return De(
          a ? { "files[]": t } : t,
          f && new f(),
          this.formSerializer
        );
      }
    }
    return r || o ? (n.setContentType("application/json", !1), js(t)) : t;
  }],
  transformResponse: [function(t) {
    const n = this.transitional || it.transitional, s = n && n.forcedJSONParsing, o = this.responseType === "json";
    if (c.isResponse(t) || c.isReadableStream(t))
      return t;
    if (t && c.isString(t) && (s && !this.responseType || o)) {
      const i = !(n && n.silentJSONParsing) && o;
      try {
        return JSON.parse(t);
      } catch (a) {
        if (i)
          throw a.name === "SyntaxError" ? w.from(a, w.ERR_BAD_RESPONSE, this, null, this.response) : a;
      }
    }
    return t;
  }],
  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: {
    FormData: U.classes.FormData,
    Blob: U.classes.Blob
  },
  validateStatus: function(t) {
    return t >= 200 && t < 300;
  },
  headers: {
    common: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": void 0
    }
  }
};
c.forEach(["delete", "get", "head", "post", "put", "patch"], (e) => {
  it.headers[e] = {};
});
const at = it, $s = c.toObjectSet([
  "age",
  "authorization",
  "content-length",
  "content-type",
  "etag",
  "expires",
  "from",
  "host",
  "if-modified-since",
  "if-unmodified-since",
  "last-modified",
  "location",
  "max-forwards",
  "proxy-authorization",
  "referer",
  "retry-after",
  "user-agent"
]), Bs = (e) => {
  const t = {};
  let n, s, o;
  return e && e.split(`
`).forEach(function(i) {
    o = i.indexOf(":"), n = i.substring(0, o).trim().toLowerCase(), s = i.substring(o + 1).trim(), !(!n || t[n] && $s[n]) && (n === "set-cookie" ? t[n] ? t[n].push(s) : t[n] = [s] : t[n] = t[n] ? t[n] + ", " + s : s);
  }), t;
}, St = Symbol("internals");
function ae(e) {
  return e && String(e).trim().toLowerCase();
}
function we(e) {
  return e === !1 || e == null ? e : c.isArray(e) ? e.map(we) : String(e);
}
function Is(e) {
  const t = /* @__PURE__ */ Object.create(null), n = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let s;
  for (; s = n.exec(e); )
    t[s[1]] = s[2];
  return t;
}
const qs = (e) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());
function qe(e, t, n, s, o) {
  if (c.isFunction(s))
    return s.call(this, t, n);
  if (o && (t = n), !!c.isString(t)) {
    if (c.isString(s))
      return t.indexOf(s) !== -1;
    if (c.isRegExp(s))
      return s.test(t);
  }
}
function Vs(e) {
  return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (t, n, s) => n.toUpperCase() + s);
}
function Ms(e, t) {
  const n = c.toCamelCase(" " + t);
  ["get", "set", "has"].forEach((s) => {
    Object.defineProperty(e, s + n, {
      value: function(o, r, i) {
        return this[s].call(this, t, o, r, i);
      },
      configurable: !0
    });
  });
}
class Ue {
  constructor(t) {
    t && this.set(t);
  }
  set(t, n, s) {
    const o = this;
    function r(a, f, l) {
      const u = ae(f);
      if (!u)
        throw new Error("header name must be a non-empty string");
      const d = c.findKey(o, u);
      (!d || o[d] === void 0 || l === !0 || l === void 0 && o[d] !== !1) && (o[d || f] = we(a));
    }
    const i = (a, f) => c.forEach(a, (l, u) => r(l, u, f));
    if (c.isPlainObject(t) || t instanceof this.constructor)
      i(t, n);
    else if (c.isString(t) && (t = t.trim()) && !qs(t))
      i(Bs(t), n);
    else if (c.isObject(t) && c.isIterable(t)) {
      let a = {}, f, l;
      for (const u of t) {
        if (!c.isArray(u))
          throw TypeError("Object iterator must return a key-value pair");
        a[l = u[0]] = (f = a[l]) ? c.isArray(f) ? [...f, u[1]] : [f, u[1]] : u[1];
      }
      i(a, n);
    } else
      t != null && r(n, t, s);
    return this;
  }
  get(t, n) {
    if (t = ae(t), t) {
      const s = c.findKey(this, t);
      if (s) {
        const o = this[s];
        if (!n)
          return o;
        if (n === !0)
          return Is(o);
        if (c.isFunction(n))
          return n.call(this, o, s);
        if (c.isRegExp(n))
          return n.exec(o);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(t, n) {
    if (t = ae(t), t) {
      const s = c.findKey(this, t);
      return !!(s && this[s] !== void 0 && (!n || qe(this, this[s], s, n)));
    }
    return !1;
  }
  delete(t, n) {
    const s = this;
    let o = !1;
    function r(i) {
      if (i = ae(i), i) {
        const a = c.findKey(s, i);
        a && (!n || qe(s, s[a], a, n)) && (delete s[a], o = !0);
      }
    }
    return c.isArray(t) ? t.forEach(r) : r(t), o;
  }
  clear(t) {
    const n = Object.keys(this);
    let s = n.length, o = !1;
    for (; s--; ) {
      const r = n[s];
      (!t || qe(this, this[r], r, t, !0)) && (delete this[r], o = !0);
    }
    return o;
  }
  normalize(t) {
    const n = this, s = {};
    return c.forEach(this, (o, r) => {
      const i = c.findKey(s, r);
      if (i) {
        n[i] = we(o), delete n[r];
        return;
      }
      const a = t ? Vs(r) : String(r).trim();
      a !== r && delete n[r], n[a] = we(o), s[a] = !0;
    }), this;
  }
  concat(...t) {
    return this.constructor.concat(this, ...t);
  }
  toJSON(t) {
    const n = /* @__PURE__ */ Object.create(null);
    return c.forEach(this, (s, o) => {
      s != null && s !== !1 && (n[o] = t && c.isArray(s) ? s.join(", ") : s);
    }), n;
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([t, n]) => t + ": " + n).join(`
`);
  }
  getSetCookie() {
    return this.get("set-cookie") || [];
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(t) {
    return t instanceof this ? t : new this(t);
  }
  static concat(t, ...n) {
    const s = new this(t);
    return n.forEach((o) => s.set(o)), s;
  }
  static accessor(t) {
    const s = (this[St] = this[St] = {
      accessors: {}
    }).accessors, o = this.prototype;
    function r(i) {
      const a = ae(i);
      s[a] || (Ms(o, i), s[a] = !0);
    }
    return c.isArray(t) ? t.forEach(r) : r(t), this;
  }
}
Ue.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
c.reduceDescriptors(Ue.prototype, ({ value: e }, t) => {
  let n = t[0].toUpperCase() + t.slice(1);
  return {
    get: () => e,
    set(s) {
      this[n] = s;
    }
  };
});
c.freezeMethods(Ue);
const z = Ue;
function Ve(e, t) {
  const n = this || at, s = t || n, o = z.from(s.headers);
  let r = s.data;
  return c.forEach(e, function(a) {
    r = a.call(n, r, o.normalize(), t ? t.status : void 0);
  }), o.normalize(), r;
}
function Yt(e) {
  return !!(e && e.__CANCEL__);
}
function se(e, t, n) {
  w.call(this, e ?? "canceled", w.ERR_CANCELED, t, n), this.name = "CanceledError";
}
c.inherits(se, w, {
  __CANCEL__: !0
});
function en(e, t, n) {
  const s = n.config.validateStatus;
  !n.status || !s || s(n.status) ? e(n) : t(new w(
    "Request failed with status code " + n.status,
    [w.ERR_BAD_REQUEST, w.ERR_BAD_RESPONSE][Math.floor(n.status / 100) - 4],
    n.config,
    n.request,
    n
  ));
}
function Hs(e) {
  const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
  return t && t[1] || "";
}
function zs(e, t) {
  e = e || 10;
  const n = new Array(e), s = new Array(e);
  let o = 0, r = 0, i;
  return t = t !== void 0 ? t : 1e3, function(f) {
    const l = Date.now(), u = s[r];
    i || (i = l), n[o] = f, s[o] = l;
    let d = r, g = 0;
    for (; d !== o; )
      g += n[d++], d = d % e;
    if (o = (o + 1) % e, o === r && (r = (r + 1) % e), l - i < t)
      return;
    const S = u && l - u;
    return S ? Math.round(g * 1e3 / S) : void 0;
  };
}
function Js(e, t) {
  let n = 0, s = 1e3 / t, o, r;
  const i = (l, u = Date.now()) => {
    n = u, o = null, r && (clearTimeout(r), r = null), e(...l);
  };
  return [(...l) => {
    const u = Date.now(), d = u - n;
    d >= s ? i(l, u) : (o = l, r || (r = setTimeout(() => {
      r = null, i(o);
    }, s - d)));
  }, () => o && i(o)];
}
const Oe = (e, t, n = 3) => {
  let s = 0;
  const o = zs(50, 250);
  return Js((r) => {
    const i = r.loaded, a = r.lengthComputable ? r.total : void 0, f = i - s, l = o(f), u = i <= a;
    s = i;
    const d = {
      loaded: i,
      total: a,
      progress: a ? i / a : void 0,
      bytes: f,
      rate: l || void 0,
      estimated: l && a && u ? (a - i) / l : void 0,
      event: r,
      lengthComputable: a != null,
      [t ? "download" : "upload"]: !0
    };
    e(d);
  }, n);
}, wt = (e, t) => {
  const n = e != null;
  return [(s) => t[0]({
    lengthComputable: n,
    total: e,
    loaded: s
  }), t[1]];
}, kt = (e) => (...t) => c.asap(() => e(...t)), Ks = U.hasStandardBrowserEnv ? ((e, t) => (n) => (n = new URL(n, U.origin), e.protocol === n.protocol && e.host === n.host && (t || e.port === n.port)))(
  new URL(U.origin),
  U.navigator && /(msie|trident)/i.test(U.navigator.userAgent)
) : () => !0, Ws = U.hasStandardBrowserEnv ? (
  // Standard browser envs support document.cookie
  {
    write(e, t, n, s, o, r) {
      const i = [e + "=" + encodeURIComponent(t)];
      c.isNumber(n) && i.push("expires=" + new Date(n).toGMTString()), c.isString(s) && i.push("path=" + s), c.isString(o) && i.push("domain=" + o), r === !0 && i.push("secure"), document.cookie = i.join("; ");
    },
    read(e) {
      const t = document.cookie.match(new RegExp("(^|;\\s*)(" + e + ")=([^;]*)"));
      return t ? decodeURIComponent(t[3]) : null;
    },
    remove(e) {
      this.write(e, "", Date.now() - 864e5);
    }
  }
) : (
  // Non-standard browser env (web workers, react-native) lack needed support.
  {
    write() {
    },
    read() {
      return null;
    },
    remove() {
    }
  }
);
function Gs(e) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
}
function Xs(e, t) {
  return t ? e.replace(/\/?\/$/, "") + "/" + t.replace(/^\/+/, "") : e;
}
function tn(e, t, n) {
  let s = !Gs(t);
  return e && (s || n == !1) ? Xs(e, t) : t;
}
const Tt = (e) => e instanceof z ? { ...e } : e;
function Z(e, t) {
  t = t || {};
  const n = {};
  function s(l, u, d, g) {
    return c.isPlainObject(l) && c.isPlainObject(u) ? c.merge.call({ caseless: g }, l, u) : c.isPlainObject(u) ? c.merge({}, u) : c.isArray(u) ? u.slice() : u;
  }
  function o(l, u, d, g) {
    if (c.isUndefined(u)) {
      if (!c.isUndefined(l))
        return s(void 0, l, d, g);
    } else
      return s(l, u, d, g);
  }
  function r(l, u) {
    if (!c.isUndefined(u))
      return s(void 0, u);
  }
  function i(l, u) {
    if (c.isUndefined(u)) {
      if (!c.isUndefined(l))
        return s(void 0, l);
    } else
      return s(void 0, u);
  }
  function a(l, u, d) {
    if (d in t)
      return s(l, u);
    if (d in e)
      return s(void 0, l);
  }
  const f = {
    url: r,
    method: r,
    data: r,
    baseURL: i,
    transformRequest: i,
    transformResponse: i,
    paramsSerializer: i,
    timeout: i,
    timeoutMessage: i,
    withCredentials: i,
    withXSRFToken: i,
    adapter: i,
    responseType: i,
    xsrfCookieName: i,
    xsrfHeaderName: i,
    onUploadProgress: i,
    onDownloadProgress: i,
    decompress: i,
    maxContentLength: i,
    maxBodyLength: i,
    beforeRedirect: i,
    transport: i,
    httpAgent: i,
    httpsAgent: i,
    cancelToken: i,
    socketPath: i,
    responseEncoding: i,
    validateStatus: a,
    headers: (l, u, d) => o(Tt(l), Tt(u), d, !0)
  };
  return c.forEach(Object.keys({ ...e, ...t }), function(u) {
    const d = f[u] || o, g = d(e[u], t[u], u);
    c.isUndefined(g) && d !== a || (n[u] = g);
  }), n;
}
const nn = (e) => {
  const t = Z({}, e);
  let { data: n, withXSRFToken: s, xsrfHeaderName: o, xsrfCookieName: r, headers: i, auth: a } = t;
  t.headers = i = z.from(i), t.url = Xt(tn(t.baseURL, t.url, t.allowAbsoluteUrls), e.params, e.paramsSerializer), a && i.set(
    "Authorization",
    "Basic " + btoa((a.username || "") + ":" + (a.password ? unescape(encodeURIComponent(a.password)) : ""))
  );
  let f;
  if (c.isFormData(n)) {
    if (U.hasStandardBrowserEnv || U.hasStandardBrowserWebWorkerEnv)
      i.setContentType(void 0);
    else if ((f = i.getContentType()) !== !1) {
      const [l, ...u] = f ? f.split(";").map((d) => d.trim()).filter(Boolean) : [];
      i.setContentType([l || "multipart/form-data", ...u].join("; "));
    }
  }
  if (U.hasStandardBrowserEnv && (s && c.isFunction(s) && (s = s(t)), s || s !== !1 && Ks(t.url))) {
    const l = o && r && Ws.read(r);
    l && i.set(o, l);
  }
  return t;
}, Qs = typeof XMLHttpRequest < "u", Zs = Qs && function(e) {
  return new Promise(function(n, s) {
    const o = nn(e);
    let r = o.data;
    const i = z.from(o.headers).normalize();
    let { responseType: a, onUploadProgress: f, onDownloadProgress: l } = o, u, d, g, S, p;
    function y() {
      S && S(), p && p(), o.cancelToken && o.cancelToken.unsubscribe(u), o.signal && o.signal.removeEventListener("abort", u);
    }
    let h = new XMLHttpRequest();
    h.open(o.method.toUpperCase(), o.url, !0), h.timeout = o.timeout;
    function v() {
      if (!h)
        return;
      const E = z.from(
        "getAllResponseHeaders" in h && h.getAllResponseHeaders()
      ), C = {
        data: !a || a === "text" || a === "json" ? h.responseText : h.response,
        status: h.status,
        statusText: h.statusText,
        headers: E,
        config: e,
        request: h
      };
      en(function(_) {
        n(_), y();
      }, function(_) {
        s(_), y();
      }, C), h = null;
    }
    "onloadend" in h ? h.onloadend = v : h.onreadystatechange = function() {
      !h || h.readyState !== 4 || h.status === 0 && !(h.responseURL && h.responseURL.indexOf("file:") === 0) || setTimeout(v);
    }, h.onabort = function() {
      h && (s(new w("Request aborted", w.ECONNABORTED, e, h)), h = null);
    }, h.onerror = function() {
      s(new w("Network Error", w.ERR_NETWORK, e, h)), h = null;
    }, h.ontimeout = function() {
      let D = o.timeout ? "timeout of " + o.timeout + "ms exceeded" : "timeout exceeded";
      const C = o.transitional || Qt;
      o.timeoutErrorMessage && (D = o.timeoutErrorMessage), s(new w(
        D,
        C.clarifyTimeoutError ? w.ETIMEDOUT : w.ECONNABORTED,
        e,
        h
      )), h = null;
    }, r === void 0 && i.setContentType(null), "setRequestHeader" in h && c.forEach(i.toJSON(), function(D, C) {
      h.setRequestHeader(C, D);
    }), c.isUndefined(o.withCredentials) || (h.withCredentials = !!o.withCredentials), a && a !== "json" && (h.responseType = o.responseType), l && ([g, p] = Oe(l, !0), h.addEventListener("progress", g)), f && h.upload && ([d, S] = Oe(f), h.upload.addEventListener("progress", d), h.upload.addEventListener("loadend", S)), (o.cancelToken || o.signal) && (u = (E) => {
      h && (s(!E || E.type ? new se(null, e, h) : E), h.abort(), h = null);
    }, o.cancelToken && o.cancelToken.subscribe(u), o.signal && (o.signal.aborted ? u() : o.signal.addEventListener("abort", u)));
    const k = Hs(o.url);
    if (k && U.protocols.indexOf(k) === -1) {
      s(new w("Unsupported protocol " + k + ":", w.ERR_BAD_REQUEST, e));
      return;
    }
    h.send(r || null);
  });
}, Ys = (e, t) => {
  const { length: n } = e = e ? e.filter(Boolean) : [];
  if (t || n) {
    let s = new AbortController(), o;
    const r = function(l) {
      if (!o) {
        o = !0, a();
        const u = l instanceof Error ? l : this.reason;
        s.abort(u instanceof w ? u : new se(u instanceof Error ? u.message : u));
      }
    };
    let i = t && setTimeout(() => {
      i = null, r(new w(`timeout ${t} of ms exceeded`, w.ETIMEDOUT));
    }, t);
    const a = () => {
      e && (i && clearTimeout(i), i = null, e.forEach((l) => {
        l.unsubscribe ? l.unsubscribe(r) : l.removeEventListener("abort", r);
      }), e = null);
    };
    e.forEach((l) => l.addEventListener("abort", r));
    const { signal: f } = s;
    return f.unsubscribe = () => c.asap(a), f;
  }
}, eo = Ys, to = function* (e, t) {
  let n = e.byteLength;
  if (!t || n < t) {
    yield e;
    return;
  }
  let s = 0, o;
  for (; s < n; )
    o = s + t, yield e.slice(s, o), s = o;
}, no = async function* (e, t) {
  for await (const n of so(e))
    yield* to(n, t);
}, so = async function* (e) {
  if (e[Symbol.asyncIterator]) {
    yield* e;
    return;
  }
  const t = e.getReader();
  try {
    for (; ; ) {
      const { done: n, value: s } = await t.read();
      if (n)
        break;
      yield s;
    }
  } finally {
    await t.cancel();
  }
}, vt = (e, t, n, s) => {
  const o = no(e, t);
  let r = 0, i, a = (f) => {
    i || (i = !0, s && s(f));
  };
  return new ReadableStream({
    async pull(f) {
      try {
        const { done: l, value: u } = await o.next();
        if (l) {
          a(), f.close();
          return;
        }
        let d = u.byteLength;
        if (n) {
          let g = r += d;
          n(g);
        }
        f.enqueue(new Uint8Array(u));
      } catch (l) {
        throw a(l), l;
      }
    },
    cancel(f) {
      return a(f), o.return();
    }
  }, {
    highWaterMark: 2
  });
}, Le = typeof fetch == "function" && typeof Request == "function" && typeof Response == "function", sn = Le && typeof ReadableStream == "function", oo = Le && (typeof TextEncoder == "function" ? ((e) => (t) => e.encode(t))(new TextEncoder()) : async (e) => new Uint8Array(await new Response(e).arrayBuffer())), on = (e, ...t) => {
  try {
    return !!e(...t);
  } catch {
    return !1;
  }
}, ro = sn && on(() => {
  let e = !1;
  const t = new Request(U.origin, {
    body: new ReadableStream(),
    method: "POST",
    get duplex() {
      return e = !0, "half";
    }
  }).headers.has("Content-Type");
  return e && !t;
}), Ot = 64 * 1024, Ge = sn && on(() => c.isReadableStream(new Response("").body)), Re = {
  stream: Ge && ((e) => e.body)
};
Le && ((e) => {
  ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((t) => {
    !Re[t] && (Re[t] = c.isFunction(e[t]) ? (n) => n[t]() : (n, s) => {
      throw new w(`Response type '${t}' is not supported`, w.ERR_NOT_SUPPORT, s);
    });
  });
})(new Response());
const io = async (e) => {
  if (e == null)
    return 0;
  if (c.isBlob(e))
    return e.size;
  if (c.isSpecCompliantForm(e))
    return (await new Request(U.origin, {
      method: "POST",
      body: e
    }).arrayBuffer()).byteLength;
  if (c.isArrayBufferView(e) || c.isArrayBuffer(e))
    return e.byteLength;
  if (c.isURLSearchParams(e) && (e = e + ""), c.isString(e))
    return (await oo(e)).byteLength;
}, ao = async (e, t) => {
  const n = c.toFiniteNumber(e.getContentLength());
  return n ?? io(t);
}, co = Le && (async (e) => {
  let {
    url: t,
    method: n,
    data: s,
    signal: o,
    cancelToken: r,
    timeout: i,
    onDownloadProgress: a,
    onUploadProgress: f,
    responseType: l,
    headers: u,
    withCredentials: d = "same-origin",
    fetchOptions: g
  } = nn(e);
  l = l ? (l + "").toLowerCase() : "text";
  let S = eo([o, r && r.toAbortSignal()], i), p;
  const y = S && S.unsubscribe && (() => {
    S.unsubscribe();
  });
  let h;
  try {
    if (f && ro && n !== "get" && n !== "head" && (h = await ao(u, s)) !== 0) {
      let C = new Request(t, {
        method: "POST",
        body: s,
        duplex: "half"
      }), M;
      if (c.isFormData(s) && (M = C.headers.get("content-type")) && u.setContentType(M), C.body) {
        const [_, oe] = wt(
          h,
          Oe(kt(f))
        );
        s = vt(C.body, Ot, _, oe);
      }
    }
    c.isString(d) || (d = d ? "include" : "omit");
    const v = "credentials" in Request.prototype;
    p = new Request(t, {
      ...g,
      signal: S,
      method: n.toUpperCase(),
      headers: u.normalize().toJSON(),
      body: s,
      duplex: "half",
      credentials: v ? d : void 0
    });
    let k = await fetch(p, g);
    const E = Ge && (l === "stream" || l === "response");
    if (Ge && (a || E && y)) {
      const C = {};
      ["status", "statusText", "headers"].forEach((H) => {
        C[H] = k[H];
      });
      const M = c.toFiniteNumber(k.headers.get("content-length")), [_, oe] = a && wt(
        M,
        Oe(kt(a), !0)
      ) || [];
      k = new Response(
        vt(k.body, Ot, _, () => {
          oe && oe(), y && y();
        }),
        C
      );
    }
    l = l || "text";
    let D = await Re[c.findKey(Re, l) || "text"](k, e);
    return !E && y && y(), await new Promise((C, M) => {
      en(C, M, {
        data: D,
        headers: z.from(k.headers),
        status: k.status,
        statusText: k.statusText,
        config: e,
        request: p
      });
    });
  } catch (v) {
    throw y && y(), v && v.name === "TypeError" && /Load failed|fetch/i.test(v.message) ? Object.assign(
      new w("Network Error", w.ERR_NETWORK, e, p),
      {
        cause: v.cause || v
      }
    ) : w.from(v, v && v.code, e, p);
  }
}), Xe = {
  http: Ss,
  xhr: Zs,
  fetch: co
};
c.forEach(Xe, (e, t) => {
  if (e) {
    try {
      Object.defineProperty(e, "name", { value: t });
    } catch {
    }
    Object.defineProperty(e, "adapterName", { value: t });
  }
});
const Rt = (e) => `- ${e}`, lo = (e) => c.isFunction(e) || e === null || e === !1, rn = {
  getAdapter: (e) => {
    e = c.isArray(e) ? e : [e];
    const { length: t } = e;
    let n, s;
    const o = {};
    for (let r = 0; r < t; r++) {
      n = e[r];
      let i;
      if (s = n, !lo(n) && (s = Xe[(i = String(n)).toLowerCase()], s === void 0))
        throw new w(`Unknown adapter '${i}'`);
      if (s)
        break;
      o[i || "#" + r] = s;
    }
    if (!s) {
      const r = Object.entries(o).map(
        ([a, f]) => `adapter ${a} ` + (f === !1 ? "is not supported by the environment" : "is not available in the build")
      );
      let i = t ? r.length > 1 ? `since :
` + r.map(Rt).join(`
`) : " " + Rt(r[0]) : "as no adapter specified";
      throw new w(
        "There is no suitable adapter to dispatch the request " + i,
        "ERR_NOT_SUPPORT"
      );
    }
    return s;
  },
  adapters: Xe
};
function Me(e) {
  if (e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted)
    throw new se(null, e);
}
function Nt(e) {
  return Me(e), e.headers = z.from(e.headers), e.data = Ve.call(
    e,
    e.transformRequest
  ), ["post", "put", "patch"].indexOf(e.method) !== -1 && e.headers.setContentType("application/x-www-form-urlencoded", !1), rn.getAdapter(e.adapter || at.adapter)(e).then(function(s) {
    return Me(e), s.data = Ve.call(
      e,
      e.transformResponse,
      s
    ), s.headers = z.from(s.headers), s;
  }, function(s) {
    return Yt(s) || (Me(e), s && s.response && (s.response.data = Ve.call(
      e,
      e.transformResponse,
      s.response
    ), s.response.headers = z.from(s.response.headers))), Promise.reject(s);
  });
}
const an = "1.11.0", Fe = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((e, t) => {
  Fe[e] = function(s) {
    return typeof s === e || "a" + (t < 1 ? "n " : " ") + e;
  };
});
const xt = {};
Fe.transitional = function(t, n, s) {
  function o(r, i) {
    return "[Axios v" + an + "] Transitional option '" + r + "'" + i + (s ? ". " + s : "");
  }
  return (r, i, a) => {
    if (t === !1)
      throw new w(
        o(i, " has been removed" + (n ? " in " + n : "")),
        w.ERR_DEPRECATED
      );
    return n && !xt[i] && (xt[i] = !0, console.warn(
      o(
        i,
        " has been deprecated since v" + n + " and will be removed in the near future"
      )
    )), t ? t(r, i, a) : !0;
  };
};
Fe.spelling = function(t) {
  return (n, s) => (console.warn(`${s} is likely a misspelling of ${t}`), !0);
};
function uo(e, t, n) {
  if (typeof e != "object")
    throw new w("options must be an object", w.ERR_BAD_OPTION_VALUE);
  const s = Object.keys(e);
  let o = s.length;
  for (; o-- > 0; ) {
    const r = s[o], i = t[r];
    if (i) {
      const a = e[r], f = a === void 0 || i(a, r, e);
      if (f !== !0)
        throw new w("option " + r + " must be " + f, w.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (n !== !0)
      throw new w("Unknown option " + r, w.ERR_BAD_OPTION);
  }
}
const ke = {
  assertOptions: uo,
  validators: Fe
}, K = ke.validators;
class Ne {
  constructor(t) {
    this.defaults = t || {}, this.interceptors = {
      request: new Et(),
      response: new Et()
    };
  }
  /**
   * Dispatch a request
   *
   * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
   * @param {?Object} config
   *
   * @returns {Promise} The Promise to be fulfilled
   */
  async request(t, n) {
    try {
      return await this._request(t, n);
    } catch (s) {
      if (s instanceof Error) {
        let o = {};
        Error.captureStackTrace ? Error.captureStackTrace(o) : o = new Error();
        const r = o.stack ? o.stack.replace(/^.+\n/, "") : "";
        try {
          s.stack ? r && !String(s.stack).endsWith(r.replace(/^.+\n.+\n/, "")) && (s.stack += `
` + r) : s.stack = r;
        } catch {
        }
      }
      throw s;
    }
  }
  _request(t, n) {
    typeof t == "string" ? (n = n || {}, n.url = t) : n = t || {}, n = Z(this.defaults, n);
    const { transitional: s, paramsSerializer: o, headers: r } = n;
    s !== void 0 && ke.assertOptions(s, {
      silentJSONParsing: K.transitional(K.boolean),
      forcedJSONParsing: K.transitional(K.boolean),
      clarifyTimeoutError: K.transitional(K.boolean)
    }, !1), o != null && (c.isFunction(o) ? n.paramsSerializer = {
      serialize: o
    } : ke.assertOptions(o, {
      encode: K.function,
      serialize: K.function
    }, !0)), n.allowAbsoluteUrls !== void 0 || (this.defaults.allowAbsoluteUrls !== void 0 ? n.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls : n.allowAbsoluteUrls = !0), ke.assertOptions(n, {
      baseUrl: K.spelling("baseURL"),
      withXsrfToken: K.spelling("withXSRFToken")
    }, !0), n.method = (n.method || this.defaults.method || "get").toLowerCase();
    let i = r && c.merge(
      r.common,
      r[n.method]
    );
    r && c.forEach(
      ["delete", "get", "head", "post", "put", "patch", "common"],
      (p) => {
        delete r[p];
      }
    ), n.headers = z.concat(i, r);
    const a = [];
    let f = !0;
    this.interceptors.request.forEach(function(y) {
      typeof y.runWhen == "function" && y.runWhen(n) === !1 || (f = f && y.synchronous, a.unshift(y.fulfilled, y.rejected));
    });
    const l = [];
    this.interceptors.response.forEach(function(y) {
      l.push(y.fulfilled, y.rejected);
    });
    let u, d = 0, g;
    if (!f) {
      const p = [Nt.bind(this), void 0];
      for (p.unshift(...a), p.push(...l), g = p.length, u = Promise.resolve(n); d < g; )
        u = u.then(p[d++], p[d++]);
      return u;
    }
    g = a.length;
    let S = n;
    for (d = 0; d < g; ) {
      const p = a[d++], y = a[d++];
      try {
        S = p(S);
      } catch (h) {
        y.call(this, h);
        break;
      }
    }
    try {
      u = Nt.call(this, S);
    } catch (p) {
      return Promise.reject(p);
    }
    for (d = 0, g = l.length; d < g; )
      u = u.then(l[d++], l[d++]);
    return u;
  }
  getUri(t) {
    t = Z(this.defaults, t);
    const n = tn(t.baseURL, t.url, t.allowAbsoluteUrls);
    return Xt(n, t.params, t.paramsSerializer);
  }
}
c.forEach(["delete", "get", "head", "options"], function(t) {
  Ne.prototype[t] = function(n, s) {
    return this.request(Z(s || {}, {
      method: t,
      url: n,
      data: (s || {}).data
    }));
  };
});
c.forEach(["post", "put", "patch"], function(t) {
  function n(s) {
    return function(r, i, a) {
      return this.request(Z(a || {}, {
        method: t,
        headers: s ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url: r,
        data: i
      }));
    };
  }
  Ne.prototype[t] = n(), Ne.prototype[t + "Form"] = n(!0);
});
const Te = Ne;
class ct {
  constructor(t) {
    if (typeof t != "function")
      throw new TypeError("executor must be a function.");
    let n;
    this.promise = new Promise(function(r) {
      n = r;
    });
    const s = this;
    this.promise.then((o) => {
      if (!s._listeners)
        return;
      let r = s._listeners.length;
      for (; r-- > 0; )
        s._listeners[r](o);
      s._listeners = null;
    }), this.promise.then = (o) => {
      let r;
      const i = new Promise((a) => {
        s.subscribe(a), r = a;
      }).then(o);
      return i.cancel = function() {
        s.unsubscribe(r);
      }, i;
    }, t(function(r, i, a) {
      s.reason || (s.reason = new se(r, i, a), n(s.reason));
    });
  }
  /**
   * Throws a `CanceledError` if cancellation has been requested.
   */
  throwIfRequested() {
    if (this.reason)
      throw this.reason;
  }
  /**
   * Subscribe to the cancel signal
   */
  subscribe(t) {
    if (this.reason) {
      t(this.reason);
      return;
    }
    this._listeners ? this._listeners.push(t) : this._listeners = [t];
  }
  /**
   * Unsubscribe from the cancel signal
   */
  unsubscribe(t) {
    if (!this._listeners)
      return;
    const n = this._listeners.indexOf(t);
    n !== -1 && this._listeners.splice(n, 1);
  }
  toAbortSignal() {
    const t = new AbortController(), n = (s) => {
      t.abort(s);
    };
    return this.subscribe(n), t.signal.unsubscribe = () => this.unsubscribe(n), t.signal;
  }
  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */
  static source() {
    let t;
    return {
      token: new ct(function(o) {
        t = o;
      }),
      cancel: t
    };
  }
}
const fo = ct;
function po(e) {
  return function(n) {
    return e.apply(null, n);
  };
}
function ho(e) {
  return c.isObject(e) && e.isAxiosError === !0;
}
const Qe = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511
};
Object.entries(Qe).forEach(([e, t]) => {
  Qe[t] = e;
});
const mo = Qe;
function cn(e) {
  const t = new Te(e), n = $t(Te.prototype.request, t);
  return c.extend(n, Te.prototype, t, { allOwnKeys: !0 }), c.extend(n, t, null, { allOwnKeys: !0 }), n.create = function(o) {
    return cn(Z(e, o));
  }, n;
}
const x = cn(at);
x.Axios = Te;
x.CanceledError = se;
x.CancelToken = fo;
x.isCancel = Yt;
x.VERSION = an;
x.toFormData = De;
x.AxiosError = w;
x.Cancel = x.CanceledError;
x.all = function(t) {
  return Promise.all(t);
};
x.spread = po;
x.isAxiosError = ho;
x.mergeConfig = Z;
x.AxiosHeaders = z;
x.formToJSON = (e) => Zt(c.isHTMLForm(e) ? new FormData(e) : e);
x.getAdapter = rn.getAdapter;
x.HttpStatusCode = mo;
x.default = x;
const Ze = x;
class le extends Error {
}
le.prototype.name = "InvalidTokenError";
function go(e) {
  return decodeURIComponent(atob(e).replace(/(.)/g, (t, n) => {
    let s = n.charCodeAt(0).toString(16).toUpperCase();
    return s.length < 2 && (s = "0" + s), "%" + s;
  }));
}
function bo(e) {
  let t = e.replace(/-/g, "+").replace(/_/g, "/");
  switch (t.length % 4) {
    case 0:
      break;
    case 2:
      t += "==";
      break;
    case 3:
      t += "=";
      break;
    default:
      throw new Error("base64 string is not of the correct length");
  }
  try {
    return go(t);
  } catch {
    return atob(t);
  }
}
function Ct(e, t) {
  if (typeof e != "string")
    throw new le("Invalid token specified: must be a string");
  t || (t = {});
  const n = t.header === !0 ? 0 : 1, s = e.split(".")[n];
  if (typeof s != "string")
    throw new le(`Invalid token specified: missing part #${n + 1}`);
  let o;
  try {
    o = bo(s);
  } catch (r) {
    throw new le(`Invalid token specified: invalid base64 for part #${n + 1} (${r.message})`);
  }
  try {
    return JSON.parse(o);
  } catch (r) {
    throw new le(`Invalid token specified: invalid json for part #${n + 1} (${r.message})`);
  }
}
const $ = {
  debug: !1,
  accessToken: null,
  accessTokenExpired: !1,
  accessTokenExpireTimeout: null,
  accessTokenCookieName: "olaii_access_token",
  refreshToken: null,
  refreshTokenExpired: !1,
  refreshTokenExpireTimeout: null,
  refreshTokenCookieName: "olaii_refresh_token",
  refreshingTokenPromise: null,
  init(e) {
    this.authURL = e;
  },
  getHeader() {
    return this.accessToken ? {
      Authorization: `Bearer ${this.accessToken}`,
      "Content-Type": "application/json"
    } : {
      "Content-Type": "application/json"
    };
  },
  readFromCookies() {
    this.getAccessToken(), this.getRefreshToken(), this.accessToken || this.debug && console.log("[TOKEN] No token saved :(");
  },
  hasToken() {
    return this.accessToken != null;
  },
  getAccessToken() {
    if (this.accessToken = O.get(this.accessTokenCookieName), this.accessToken) {
      const e = Ct(this.accessToken), t = new Date(e.exp * 1e3), n = t - /* @__PURE__ */ new Date();
      this.debug && console.log("[TOKEN] Access token", {
        decoded: e,
        expire_date: t.toString(),
        expire_date_milliseconds: n
      }), n <= 0 && (this.debug && console.error("[TOKEN] Access token expired!"), this.accessTokenExpired = !0), clearTimeout(this.accessTokenExpireTimeout), this.accessTokenExpireTimeout = setTimeout(() => {
        this.debug && console.error("[TOKEN] Access token expired!"), this.accessTokenExpired = !0;
      }, n);
    }
    return this.accessToken;
  },
  setAccessToken(e) {
    this.accessToken = e, O.save(this.accessTokenCookieName, this.accessToken), this.getAccessToken();
  },
  removeAccessToken() {
    this.accessToken = null, O.remove(this.accessTokenCookieName), clearTimeout(this.accessTokenExpireTimeout);
  },
  getRefreshToken() {
    if (this.refreshToken = O.get(this.refreshTokenCookieName), this.refreshToken) {
      const e = Ct(this.refreshToken), t = new Date(e.exp * 1e3), n = t - /* @__PURE__ */ new Date();
      this.debug && console.log("[TOKEN] Refresh token", {
        decoded: e,
        expire_date: t.toString(),
        expire_date_milliseconds: n
      }), n <= 0 && (this.debug && console.error("[TOKEN] Refresh token expired!"), this.refreshTokenExpired = !0);
    }
    return this.refreshToken;
  },
  setRefreshToken(e) {
    this.refreshToken = e, O.save(this.refreshTokenCookieName, this.refreshToken), this.getRefreshToken();
  },
  removeRefreshToken() {
    this.refreshToken = null, O.remove(this.refreshTokenCookieName), clearTimeout(this.refreshTokenExpireTimeout);
  },
  async refreshAccessToken() {
    if (!$.refreshingTokenPromise) {
      const t = {
        method: "post",
        url: this.authURL + "api/v2/token/refresh/",
        headers: this.getHeader(),
        data: {
          refresh: $.refreshToken
        }
      };
      $.refreshingTokenPromise = Ze(t);
    }
    const e = await $.refreshingTokenPromise;
    return $.refreshingTokenPromise = null, this.debug && console.log("[TOKEN] Token refreshed:", e.data), $.setAccessToken(e.data.access), $.setRefreshToken(e.data.refresh), e.data.access;
  },
  clear() {
    this.removeAccessToken(), this.removeRefreshToken();
  }
}, de = {
  init(e) {
    Ze.defaults.baseURL = e;
  },
  // ----------------------------------------- GET -----------------------------------------
  get(e, t, n) {
    return this.request("GET", e, null, t, n);
  },
  // ----------------------------------------- GET BLOB -----------------------------------------
  getBlob(e, t, n) {
    return this.request("GET", e, null, t, n, "blob");
  },
  // ----------------------------------------- POST -----------------------------------------
  post(e, t, n, s) {
    return this.request("POST", e, t, n, s);
  },
  // ----------------------------------------- POST FILE -----------------------------------------
  postFile(e, t, n, s, o) {
    const r = s || new FormData();
    return s || (r.append("file", t), r.append("name", n)), this.request("POST", e, r, null, o);
  },
  // ----------------------------------------- POST FORM DATA -----------------------------------------
  postFormData(e, t, n) {
    return this.request("POST", e, t, null, n);
  },
  // ----------------------------------------- PUT -----------------------------------------
  put(e, t, n, s) {
    return this.request("PUT", e, t, n, s);
  },
  // ----------------------------------------- PUT FORM DATA -----------------------------------------
  putFormData(e, t, n) {
    return this.request("PUT", e, t, null, n);
  },
  // ----------------------------------------- DELETE -----------------------------------------
  delete(e, t, n) {
    return this.request("DELETE", e, null, t, n);
  },
  // ----------------------------------------- CUSTOM REQUEST -----------------------------------------
  customRequest(e) {
    return this.request(
      e.method,
      e.url,
      e.data,
      e.params,
      e.headers,
      e.responseType
    );
  },
  // ----------------------------------------- HANDLE LIST -----------------------------------------
  _handleList(e) {
    const t = e.data.results;
    return t._metadata = {
      count: e.data.count,
      next: e.data.next,
      previous: e.data.previous
    }, t;
  },
  // ----------------------------------------- GET MORE -----------------------------------------
  async getMore(e) {
    return de.get(e);
  },
  // ----------------------------------------- GET PAGE -----------------------------------------
  async getPage(e, t, n) {
    const s = {
      ...n,
      limit: 50,
      offset: (t - 1) * 50
    };
    return de.get(e, s);
  },
  // ----------------------------------------- REQUEST -----------------------------------------
  async request(e, t, n, s, o, r) {
    const i = function() {
      const a = {
        method: e,
        url: t,
        data: n,
        params: s,
        headers: o || $.getHeader(),
        responseType: r
      };
      return Ze(a).then((f) => f.data.results != null ? de._handleList(f) : f.data);
    };
    return $.getRefreshToken(), $.accessTokenExpired && (await $.refreshAccessToken(), o = $.getHeader()), i();
  },
  formatDate(e) {
    return typeof e == "object" ? e.toISOString() : e;
  }
};
/*!
 * pinia v3.0.3
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */
let ue;
const xe = (e) => ue = e, yo = process.env.NODE_ENV !== "production" ? Symbol("pinia") : (
  /* istanbul ignore next */
  Symbol()
);
function Y(e) {
  return e && typeof e == "object" && Object.prototype.toString.call(e) === "[object Object]" && typeof e.toJSON != "function";
}
var pe;
(function(e) {
  e.direct = "direct", e.patchObject = "patch object", e.patchFunction = "patch function";
})(pe || (pe = {}));
const fe = typeof window < "u";
function ln(e, t) {
  for (const n in t) {
    const s = t[n];
    if (!(n in e))
      continue;
    const o = e[n];
    Y(o) && Y(s) && !he(s) && !nt(s) ? e[n] = ln(o, s) : e[n] = s;
  }
  return e;
}
const un = () => {
};
function At(e, t, n, s = un) {
  e.push(t);
  const o = () => {
    const r = e.indexOf(t);
    r > -1 && (e.splice(r, 1), s());
  };
  return !n && Tn() && vn(o), o;
}
function ee(e, ...t) {
  e.slice().forEach((n) => {
    n(...t);
  });
}
const _o = (e) => e(), Pt = Symbol(), He = Symbol();
function Ye(e, t) {
  e instanceof Map && t instanceof Map ? t.forEach((n, s) => e.set(s, n)) : e instanceof Set && t instanceof Set && t.forEach(e.add, e);
  for (const n in t) {
    if (!t.hasOwnProperty(n))
      continue;
    const s = t[n], o = e[n];
    Y(o) && Y(s) && e.hasOwnProperty(n) && !he(s) && !nt(s) ? e[n] = Ye(o, s) : e[n] = s;
  }
  return e;
}
const Eo = process.env.NODE_ENV !== "production" ? Symbol("pinia:skipHydration") : (
  /* istanbul ignore next */
  Symbol()
);
function So(e) {
  return !Y(e) || !Object.prototype.hasOwnProperty.call(e, Eo);
}
const { assign: V } = Object;
function Dt(e) {
  return !!(he(e) && e.effect);
}
function Ut(e, t, n, s) {
  const { state: o, actions: r, getters: i } = t, a = n.state.value[e];
  let f;
  function l() {
    !a && (process.env.NODE_ENV === "production" || !s) && (n.state.value[e] = o ? o() : {});
    const u = process.env.NODE_ENV !== "production" && s ? (
      // use ref() to unwrap refs inside state TODO: check if this is still necessary
      pt(j(o ? o() : {}).value)
    ) : pt(n.state.value[e]);
    return V(u, r, Object.keys(i || {}).reduce((d, g) => (process.env.NODE_ENV !== "production" && g in u && console.warn(`[🍍]: A getter cannot have the same name as another state property. Rename one of them. Found with "${g}" in store "${e}".`), d[g] = ce(X(() => {
      xe(n);
      const S = n._s.get(e);
      return i[g].call(S, S);
    })), d), {}));
  }
  return f = et(e, l, t, n, s, !0), f;
}
function et(e, t, n = {}, s, o, r) {
  let i;
  const a = V({ actions: {} }, n);
  if (process.env.NODE_ENV !== "production" && !s._e.active)
    throw new Error("Pinia destroyed");
  const f = { deep: !0 };
  process.env.NODE_ENV !== "production" && (f.onTrigger = (b) => {
    l ? S = b : l == !1 && !_._hotUpdating && (Array.isArray(S) ? S.push(b) : console.error("🍍 debuggerEvents should be an array. This is most likely an internal Pinia bug."));
  });
  let l, u, d = [], g = [], S;
  const p = s.state.value[e];
  !r && !p && (process.env.NODE_ENV === "production" || !o) && (s.state.value[e] = {});
  const y = j({});
  let h;
  function v(b) {
    let m;
    l = u = !1, process.env.NODE_ENV !== "production" && (S = []), typeof b == "function" ? (b(s.state.value[e]), m = {
      type: pe.patchFunction,
      storeId: e,
      events: S
    }) : (Ye(s.state.value[e], b), m = {
      type: pe.patchObject,
      payload: b,
      storeId: e,
      events: S
    });
    const R = h = Symbol();
    dt().then(() => {
      h === R && (l = !0);
    }), u = !0, ee(d, m, s.state.value[e]);
  }
  const k = r ? function() {
    const { state: m } = n, R = m ? m() : {};
    this.$patch((I) => {
      V(I, R);
    });
  } : (
    /* istanbul ignore next */
    process.env.NODE_ENV !== "production" ? () => {
      throw new Error(`🍍: Store "${e}" is built using the setup syntax and does not implement $reset().`);
    } : un
  );
  function E() {
    i.stop(), d = [], g = [], s._s.delete(e);
  }
  const D = (b, m = "") => {
    if (Pt in b)
      return b[He] = m, b;
    const R = function() {
      xe(s);
      const I = Array.from(arguments), re = [], je = [];
      function gn(q) {
        re.push(q);
      }
      function bn(q) {
        je.push(q);
      }
      ee(g, {
        args: I,
        name: R[He],
        store: _,
        after: gn,
        onError: bn
      });
      let ie;
      try {
        ie = b.apply(this && this.$id === e ? this : _, I);
      } catch (q) {
        throw ee(je, q), q;
      }
      return ie instanceof Promise ? ie.then((q) => (ee(re, q), q)).catch((q) => (ee(je, q), Promise.reject(q))) : (ee(re, ie), ie);
    };
    return R[Pt] = !0, R[He] = m, R;
  }, C = /* @__PURE__ */ ce({
    actions: {},
    getters: {},
    state: [],
    hotState: y
  }), M = {
    _p: s,
    // _s: scope,
    $id: e,
    $onAction: At.bind(null, g),
    $patch: v,
    $reset: k,
    $subscribe(b, m = {}) {
      const R = At(d, b, m.detached, () => I()), I = i.run(() => En(() => s.state.value[e], (re) => {
        (m.flush === "sync" ? u : l) && b({
          storeId: e,
          type: pe.direct,
          events: S
        }, re);
      }, V({}, f, m)));
      return R;
    },
    $dispose: E
  }, _ = Sn(process.env.NODE_ENV !== "production" || process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test" && fe ? V(
    {
      _hmrPayload: C,
      _customProperties: ce(/* @__PURE__ */ new Set())
      // devtools custom properties
    },
    M
    // must be added later
    // setupStore
  ) : M);
  s._s.set(e, _);
  const H = (s._a && s._a.runWithContext || _o)(() => s._e.run(() => (i = wn()).run(() => t({ action: D }))));
  for (const b in H) {
    const m = H[b];
    if (he(m) && !Dt(m) || nt(m))
      process.env.NODE_ENV !== "production" && o ? y.value[b] = $e(H, b) : r || (p && So(m) && (he(m) ? m.value = p[b] : Ye(m, p[b])), s.state.value[e][b] = m), process.env.NODE_ENV !== "production" && C.state.push(b);
    else if (typeof m == "function") {
      const R = process.env.NODE_ENV !== "production" && o ? m : D(m, b);
      H[b] = R, process.env.NODE_ENV !== "production" && (C.actions[b] = m), a.actions[b] = m;
    } else
      process.env.NODE_ENV !== "production" && Dt(m) && (C.getters[b] = r ? (
        // @ts-expect-error
        n.getters[b]
      ) : m, fe && (H._getters || // @ts-expect-error: same
      (H._getters = ce([]))).push(b));
  }
  if (V(_, H), V(kn(_), H), Object.defineProperty(_, "$state", {
    get: () => process.env.NODE_ENV !== "production" && o ? y.value : s.state.value[e],
    set: (b) => {
      if (process.env.NODE_ENV !== "production" && o)
        throw new Error("cannot set hotState");
      v((m) => {
        V(m, b);
      });
    }
  }), process.env.NODE_ENV !== "production" && (_._hotUpdate = ce((b) => {
    _._hotUpdating = !0, b._hmrPayload.state.forEach((m) => {
      if (m in _.$state) {
        const R = b.$state[m], I = _.$state[m];
        typeof R == "object" && Y(R) && Y(I) ? ln(R, I) : b.$state[m] = I;
      }
      _[m] = $e(b.$state, m);
    }), Object.keys(_.$state).forEach((m) => {
      m in b.$state || delete _[m];
    }), l = !1, u = !1, s.state.value[e] = $e(b._hmrPayload, "hotState"), u = !0, dt().then(() => {
      l = !0;
    });
    for (const m in b._hmrPayload.actions) {
      const R = b[m];
      _[m] = //
      D(R, m);
    }
    for (const m in b._hmrPayload.getters) {
      const R = b._hmrPayload.getters[m], I = r ? (
        // special handling of options api
        X(() => (xe(s), R.call(_, _)))
      ) : R;
      _[m] = //
      I;
    }
    Object.keys(_._hmrPayload.getters).forEach((m) => {
      m in b._hmrPayload.getters || delete _[m];
    }), Object.keys(_._hmrPayload.actions).forEach((m) => {
      m in b._hmrPayload.actions || delete _[m];
    }), _._hmrPayload = b._hmrPayload, _._getters = b._getters, _._hotUpdating = !1;
  })), process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test" && fe) {
    const b = {
      writable: !0,
      configurable: !0,
      // avoid warning on devtools trying to display this property
      enumerable: !1
    };
    ["_p", "_hmrPayload", "_getters", "_customProperties"].forEach((m) => {
      Object.defineProperty(_, m, V({ value: _[m] }, b));
    });
  }
  return s._p.forEach((b) => {
    if (process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test" && fe) {
      const m = i.run(() => b({
        store: _,
        app: s._a,
        pinia: s,
        options: a
      }));
      Object.keys(m || {}).forEach((R) => _._customProperties.add(R)), V(_, m);
    } else
      V(_, i.run(() => b({
        store: _,
        app: s._a,
        pinia: s,
        options: a
      })));
  }), process.env.NODE_ENV !== "production" && _.$state && typeof _.$state == "object" && typeof _.$state.constructor == "function" && !_.$state.constructor.toString().includes("[native code]") && console.warn(`[🍍]: The "state" must be a plain object. It cannot be
	state: () => new MyClass()
Found in store "${_.$id}".`), p && r && n.hydrate && n.hydrate(_.$state, p), l = !0, u = !0, _;
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function fn(e, t, n) {
  let s;
  const o = typeof t == "function";
  s = o ? n : t;
  function r(i, a) {
    const f = yn();
    if (i = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    (process.env.NODE_ENV === "test" && ue && ue._testing ? null : i) || (f ? be(yo, null) : null), i && xe(i), process.env.NODE_ENV !== "production" && !ue)
      throw new Error(`[🍍]: "getActivePinia()" was called but there was no active Pinia. Are you trying to use a store before calling "app.use(pinia)"?
See https://pinia.vuejs.org/core-concepts/outside-component-usage.html for help.
This will fail in production.`);
    i = ue, i._s.has(e) || (o ? et(e, t, s, i) : Ut(e, s, i), process.env.NODE_ENV !== "production" && (r._pinia = i));
    const l = i._s.get(e);
    if (process.env.NODE_ENV !== "production" && a) {
      const u = "__hot:" + e, d = o ? et(u, t, s, i, !0) : Ut(u, V({}, s), i, !0);
      a._hotUpdate(d), delete i.state.value[u], i._s.delete(u);
    }
    if (process.env.NODE_ENV !== "production" && fe) {
      const u = _n();
      if (u && u.proxy && // avoid adding stores that are just built for hot module replacement
      !a) {
        const d = u.proxy, g = "_pStores" in d ? d._pStores : d._pStores = {};
        g[e] = l;
      }
    }
    return l;
  }
  return r.$id = e, r;
}
const lt = /* @__PURE__ */ fn("olaii-auth", () => {
  const e = be("olaiiCommonOptions"), t = j(!1), n = j({}), s = j(!1), o = j(null), r = j(null), i = j(null), a = j({
    hasMultiple: !1,
    hasCashless: !1,
    hasPos: !1,
    hasTicketing: !1,
    hasGuestlist: !1,
    hasPass: !1,
    hasVouchers: !1,
    isAdmin: !1
  }), f = {
    backoffice: {
      id: "BACKOFFICE",
      name: "Backoffice",
      url: "/backoffice",
      color: "#4abeb4",
      colorDarker: "#3fafa6",
      colorLighter: "#E5FFFD",
      icon: "icon-backoffice"
    },
    cashless: {
      id: "CASHLESS",
      name: "Cashless",
      url: "/cashless",
      color: "#49ae50",
      colorDarker: "#419c48",
      colorLighter: "#E1FFE3",
      icon: "icon-cashless"
    },
    ticketing: {
      id: "TICKETS",
      name: "Tickets",
      url: "/ticketing",
      color: "#ff5f2e",
      colorDarker: "#ff4b15",
      colorLighter: "#FFEBE4",
      icon: "icon-ticketing"
    },
    guestlist: {
      id: "GUESTLIST",
      name: "Guestlist",
      url: "/guestlist",
      color: "#b82dd4",
      colorDarker: "#a727c0",
      colorLighter: "#FAE2FF",
      icon: "icon-guestlist"
    },
    pass: {
      id: "PASS",
      name: "Pass",
      url: "/pass",
      color: "#696cff",
      colorDarker: "#595bda",
      colorLighter: "#f1f5ff",
      icon: "icon-pass"
    },
    vouchers: {
      id: "VOUCHERS",
      name: "Vouchers",
      url: "/vouchers",
      color: "#ff3153",
      colorDarker: "#ca0021",
      colorLighter: "#fce0dc",
      icon: "icon-vouchers"
    }
  };
  async function l() {
    const E = {
      method: "get",
      url: e.authURL + "api/v2/account/"
    };
    return await de.customRequest(E);
  }
  async function u() {
    this.loadingUserProfile = !0, console.log("[AUTH] Get user profile");
    try {
      const E = await l();
      return n.value = E, console.log("[AUTH] User profile:", E), d(), E;
    } catch (E) {
      throw console.log("[AUTH] User profile error:", E), g(), E;
    } finally {
      this.loadingUserProfile = !1;
    }
  }
  function d() {
    let E = 0;
    for (let D in n.value.profile)
      n.value.profile[D] && (E += 1);
    a.value = {
      hasMultiple: E != 1,
      hasCashless: n.value.profile.allow_pay,
      hasPos: n.value.profile.allow_pos,
      hasTicketing: n.value.profile.allow_ticketing,
      hasGuestlist: n.value.profile.allow_guestlist,
      hasPass: n.value.profile.allow_pass,
      hasVouchers: n.value.profile.allow_vouchers,
      isAdmin: n.value.profile.is_staff
    };
  }
  function g() {
    window.location.href = "/";
  }
  function S() {
    r.value = null, i.value = null;
  }
  function p() {
    n.value = null, s.value = !1, r.value = null, o.value = null;
  }
  const y = X(() => !!$.accessToken), h = X(() => {
    var E;
    return ((E = n.value.profile) == null ? void 0 : E.role) == "MANAGER";
  }), v = X(() => {
    var E;
    return (E = n.value.profile) == null ? void 0 : E.role;
  }), k = X(() => {
    const E = {};
    return a.value.hasPos && (E.backoffice = f.backoffice), a.value.hasCashless && (E.cashless = f.cashless), a.value.hasTicketing && (E.ticketing = f.ticketing), a.value.hasGuestlist && (E.guestlist = f.guestlist), a.value.hasPass && (E.pass = f.pass), a.value.hasVouchers && (E.vouchers = f.vouchers), E;
  });
  return {
    accessToken: r,
    refreshToken: i,
    loadingUserProfile: t,
    userProfile: n,
    authenticating: s,
    authenticationError: o,
    permissions: a,
    getUserProfile: u,
    logout: g,
    logoutSuccess: S,
    cleanStore: p,
    availableApps: k,
    getRole: v,
    isManager: h,
    loggedIn: y
  };
}), dn = [];
Ln.forEach((e) => {
  dn.push({
    path: e.path,
    name: e.name,
    component: () => e.component
  });
});
const tt = An({
  history: Pn("/common"),
  routes: dn
});
tt.beforeEach(async (e, t, n) => {
  const s = lt();
  !t.name && !s.userProfile.value && await s.getUserProfile(), n();
});
const ut = /* @__PURE__ */ fn("olaii-general", () => {
  const e = be("olaiiCommonOptions"), t = e.production, n = e.appName, s = j(O.get("olaii_theme") || "light"), o = j(!1), r = j(O.get("olaii_sidebar_small") == "true"), i = j(null), a = "olaii_sidebar_small", f = Ie.available, l = j(O.get(`olaii_${n}_language`) || Ie.current);
  function u(k) {
    i.value = k;
  }
  function d(k) {
    o.value = k;
  }
  function g() {
    o.value = !o.value;
  }
  function S(k) {
    r.value = k, O.save(a, k);
  }
  function p() {
    r.value = !r.value, O.save(a, r.value);
  }
  function y() {
    const k = s.value == "light" ? "dark" : "light";
    h(k);
  }
  function h(k) {
    s.value = k, document.body.classList.remove("dark"), document.body.classList.remove("light"), document.body.classList.add(k), O.save("olaii_theme", k);
  }
  h(s.value);
  function v(k) {
    l.value = k, Ie.current == k, O.save(`olaii_${n}_language`, k), tt.go(tt.currentRoute);
  }
  return {
    production: t,
    theme: s,
    sidebarOpen: o,
    sidebarSmall: r,
    languages: f,
    language: l,
    changeSideViewWidth: u,
    setSidebarOpen: d,
    toggleSidebar: g,
    setSidebarSmall: S,
    toggleSidebarSmall: p,
    toggleTheme: y,
    setTheme: h,
    setLanguage: v
  };
}), wo = { class: "text-right" }, pn = {
  __name: "OlaiiConfirmModal",
  props: {
    name: {
      type: String,
      default: () => "confirm-prompt"
    }
  },
  emits: ["cancel", "confirm"],
  setup(e, { emit: t }) {
    const n = be("nice"), s = t, o = e;
    function r() {
      n.modal(o.name, !1), s("cancel");
    }
    function i() {
      s("confirm");
    }
    return (a, f) => {
      const l = G("NiceButton"), u = G("NiceModal");
      return A(), ve(u, {
        name: o.name,
        title: a.$gettext("Warning"),
        subtitle: a.$gettext("Are you sure you complete this action?"),
        onClose: r
      }, {
        default: te(() => [
          T("div", wo, [
            P(l, {
              text: a.$gettext("Cancel"),
              onClick: r,
              type: "default",
              plain: "",
              icon: "icon-x"
            }, null, 8, ["text"]),
            P(l, {
              text: a.$gettext("Confirm"),
              onClick: i,
              icon: "icon-check"
            }, null, 8, ["text"])
          ])
        ]),
        _: 1
      }, 8, ["name", "title", "subtitle"]);
    };
  }
};
const ft = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [s, o] of t)
    n[s] = o;
  return n;
}, ko = {
  key: 0,
  class: "olaii-user clickable"
}, To = { class: "olaii-user-info" }, vo = { class: "title" }, Oo = { class: "subtitle" }, Ro = {
  key: 0,
  class: "subtitle danger text-bold"
}, No = {
  key: 1,
  class: "olaii-user clickable"
}, xo = { class: "olaii-user-info" }, Co = { class: "title" }, Ao = { class: "subtitle" }, Po = {
  key: 0,
  class: "subtitle danger text-bold"
}, Do = { class: "list-style" }, Uo = { class: "olaii-user" }, Lo = { class: "olaii-user-info" }, Fo = { class: "title" }, jo = { class: "subtitle" }, $o = { class: "subtitle" }, Bo = {
  key: 0,
  class: "subtitle danger text-bold"
}, Io = {
  name: "OlaiiUser"
}, qo = /* @__PURE__ */ Object.assign(Io, {
  setup(e) {
    const t = be("nice"), n = ut(), s = lt(), o = X(() => s.userProfile);
    function r() {
      n.setLanguage(n.language.value == "en" ? "sl" : "en");
    }
    function i() {
      t.modal("logout", !0);
    }
    function a() {
      s.logout();
    }
    return (f, l) => {
      const u = G("NiceAvatar"), d = G("NiceIcon"), g = G("NicePopup"), S = On("translate");
      return o.value ? (A(), L("div", {
        key: 0,
        class: me(["olaii-user", { small: N(n).sidebarSmall }])
      }, [
        P(g, {
          "no-padding": "",
          class: "grow",
          ref: "user"
        }, {
          trigger: te(() => [
            o.value.location ? W("", !0) : (A(), L("div", ko, [
              P(u, {
                class: "olaii-user-avatar",
                hash: o.value.email,
                text: o.value.first_name + " " + o.value.last_name,
                gradient: ""
              }, null, 8, ["hash", "text"]),
              T("div", To, [
                T("div", vo, F(o.value.first_name) + " " + F(o.value.last_name), 1),
                T("div", Oo, F(o.value.email), 1),
                N(n).production ? W("", !0) : (A(), L("div", Ro, "DEVELOPMENT"))
              ]),
              P(d, {
                class: "icon",
                icon: "icon-more-vertical"
              })
            ])),
            o.value.location ? (A(), L("div", No, [
              P(u, {
                class: "olaii-user-avatar",
                text: o.value.location.name,
                gradient: ""
              }, null, 8, ["text"]),
              T("div", xo, [
                T("div", Co, F(o.value.location.name), 1),
                T("div", Ao, F(o.value.location.address) + ", " + F(o.value.location.zip) + " " + F(o.value.location.city), 1),
                N(n).production ? W("", !0) : (A(), L("div", Po, "DEVELOPMENT"))
              ]),
              P(d, {
                class: "icon",
                icon: "icon-more-vertical"
              })
            ])) : W("", !0)
          ]),
          content: te(() => [
            T("div", Do, [
              T("div", Uo, [
                o.value.location ? W("", !0) : (A(), ve(u, {
                  key: 0,
                  class: "olaii-user-avatar",
                  hash: o.value.email,
                  text: o.value.first_name + " " + o.value.last_name,
                  gradient: ""
                }, null, 8, ["hash", "text"])),
                o.value.location ? (A(), ve(u, {
                  key: 1,
                  class: "olaii-user-avatar",
                  text: o.value.location.name,
                  gradient: ""
                }, null, 8, ["text"])) : W("", !0),
                T("div", Lo, [
                  T("div", Fo, F(o.value.first_name) + " " + F(o.value.last_name), 1),
                  T("div", jo, F(o.value.email), 1),
                  T("div", $o, F(N(s).role), 1),
                  N(n).production ? W("", !0) : (A(), L("div", Bo, " DEVELOPMENT "))
                ])
              ]),
              T("div", {
                class: "element clickable",
                onClick: r
              }, [
                P(d, { icon: "icon-globe" }),
                T("span", null, F(N(n).languages[N(n).language]), 1)
              ]),
              T("div", {
                class: "element clickable",
                onClick: l[0] || (l[0] = (...p) => N(n).toggleTheme && N(n).toggleTheme(...p))
              }, [
                P(d, { icon: "icon-droplet" }),
                ht((A(), L("span", null, l[1] || (l[1] = [
                  mt("Theme", -1)
                ]))), [
                  [S]
                ])
              ]),
              l[3] || (l[3] = T("div", { class: "divider" }, null, -1)),
              T("div", {
                class: "element clickable",
                onClick: i
              }, [
                P(pn, {
                  name: "logout",
                  onConfirm: a,
                  title: f.$gettext("Logout"),
                  subtitle: f.$gettext("Are you sure you want to logout?")
                }, null, 8, ["title", "subtitle"]),
                P(d, { icon: "icon-log-out" }),
                ht((A(), L("span", null, l[2] || (l[2] = [
                  mt("Sign out", -1)
                ]))), [
                  [S]
                ])
              ])
            ])
          ]),
          _: 1
        }, 512)
      ], 2)) : W("", !0);
    };
  }
}), hn = /* @__PURE__ */ ft(qo, [["__scopeId", "data-v-2f9f6ab5"]]);
const Vo = { class: "app-logo" }, Mo = { class: "app-dropdown" }, Ho = ["href"], zo = { class: "app-logo" }, Jo = { class: "app-name" }, Ko = {
  name: "OlaiiApps"
}, Wo = /* @__PURE__ */ Object.assign(Ko, {
  setup(e) {
    const t = ut(), n = lt(), s = X(() => n.availableApps);
    return (o, r) => {
      const i = G("NiceIcon"), a = G("NicePopup");
      return A(), L("div", {
        class: me(["olaii-apps", { "olaii-apps-small": N(t).sidebarSmall }])
      }, [
        P(a, null, {
          trigger: te(() => [
            T("div", {
              class: me(["app app-top clickable", { small: N(t).sidebarSmall }])
            }, [
              T("div", Vo, [
                P(i, { icon: "logo" })
              ]),
              r[0] || (r[0] = T("div", { class: "app-name" }, null, -1)),
              P(i, {
                icon: "icon-grid",
                class: "app-burger"
              })
            ], 2)
          ]),
          content: te(() => [
            T("div", Mo, [
              (A(!0), L(ze, null, Ft(s.value, (f) => (A(), L("a", {
                class: "app clickable",
                key: f.id,
                style: Rn({ "--color": f.color, "--color2": f.colorLighter }),
                href: f.url
              }, [
                T("div", zo, [
                  P(i, { icon: "logo" })
                ]),
                T("div", Jo, F(f.name), 1)
              ], 12, Ho))), 128))
            ])
          ]),
          _: 1
        })
      ], 2);
    };
  }
}), mn = /* @__PURE__ */ ft(Wo, [["__scopeId", "data-v-d6530a6f"]]);
const Go = { class: "olaii-sidebar-items" }, Xo = { class: "olaii-sidebar-footer" }, Qo = {
  name: "OlaiiSidebar"
}, Zo = /* @__PURE__ */ Object.assign(Qo, {
  props: {
    links: {
      type: Array,
      default: () => []
    }
  },
  setup(e) {
    const t = ut();
    return (n, s) => {
      const o = G("NiceButton"), r = G("NiceIcon");
      return A(), L(ze, null, [
        N(t).sidebarOpen ? (A(), L("div", {
          key: 0,
          class: "olaii-sidebar-overlay",
          onClick: s[0] || (s[0] = (...i) => N(t).toggleSidebar && N(t).toggleSidebar(...i))
        })) : W("", !0),
        T("aside", {
          class: me([{ open: N(t).sidebarOpen, small: N(t).sidebarSmall }, "olaii-sidebar"])
        }, [
          T("div", {
            class: "handle",
            onClick: s[1] || (s[1] = (...i) => N(t).toggleSidebarSmall && N(t).toggleSidebarSmall(...i))
          }),
          P(o, {
            class: "mobile-toggle",
            icon: "icon-menu",
            onClick: N(t).toggleSidebar
          }, null, 8, ["onClick"]),
          P(mn),
          Nn(n.$slots, "middle", {}, void 0, !0),
          T("div", Go, [
            (A(!0), L(ze, null, Ft(e.links, (i) => (A(), L("div", {
              class: "olaii-sidebar-item-wrapper",
              key: i.path
            }, [
              i.hidden ? W("", !0) : (A(), ve(xn(i.disabled ? "div" : "router-link"), {
                key: 0,
                class: me(["olaii-sidebar-item", { disabled: i.disabled }]),
                to: { name: i.path, params: { ...i.params } },
                onClick: N(t).closeSidebar
              }, {
                default: te(() => [
                  P(r, {
                    icon: i.icon
                  }, null, 8, ["icon"]),
                  T("span", null, F(i.name), 1)
                ]),
                _: 2
              }, 1032, ["class", "to", "onClick"]))
            ]))), 128))
          ]),
          T("div", Xo, [
            P(hn, {
              small: N(t).sidebarSmall
            }, null, 8, ["small"])
          ])
        ], 2)
      ], 64);
    };
  }
}), Yo = /* @__PURE__ */ ft(Zo, [["__scopeId", "data-v-e10453bd"]]), Lt = {
  OlaiiUser: hn,
  OlaiiSidebar: Yo,
  OlaiiApps: mn,
  OlaiiConfirmModal: pn
};
const sr = {
  install(e, t) {
    for (const n in Lt) {
      const s = Lt[n];
      e.component(s.name, s);
    }
    t.debug && console.log("[COMMON] Options:", t), de.init(t.apiURL), $.init(t.authURL), O.init(t.production), e.config.globalProperties.$t = t.gettext.$pgettext, e.provide("$t", t.gettext.$pgettext), e.config.globalProperties.$olaiiCommonOptions = t, e.provide("olaiiCommonOptions", t);
  }
};
export {
  lt as a,
  sr as p,
  ut as u
};
