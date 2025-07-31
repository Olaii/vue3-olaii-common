import { createApp } from 'vue'
import App from './App.vue'
import "/node_modules/vue3-nice-elements/dist/style.css";
import './styles/main.scss'
import router from "./router.js";
import gettext from "./language";
import NicePlugin from "vue3-nice-elements";
import OlaiiCommon from './lib.js';
import { createPinia } from "pinia";
import TokenService from "@/services/token.service.js"
const pinia = createPinia();

// If token exists set header and mount the interceptor
TokenService.readFromCookies();

const app = createApp(App)
app.use(router);
app.use(gettext)
app.use(pinia)
app.use(NicePlugin, { router, gettext })
app.use(OlaiiCommon, {
  gettext, 
  pinia,
  authURL: "https://auth.dev.olaii.com/",
  apiURL: "https://pass-api.dev.olaii.com/",
  appName: "common",
  production: true,
  debug: true
})
app.mount('#app')
