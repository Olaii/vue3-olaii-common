import components from './components'
import OlaiiRequestService from './services/request.service'
import OlaiiStorageService from './services/storage.service'
import OlaiiTokenService from './services/token.service'
import './styles/main.scss'

const plugin = {
  install(app, options) {
    for (const prop in components) {
      const component = components[prop]
      app.component(component.name, component)
    }

    if (options.debug) console.log("[COMMON] Options:", options)
    OlaiiRequestService.init(options.apiURL);
    OlaiiTokenService.init(options.authURL);
    OlaiiStorageService.init(options.production);

    app.config.globalProperties.$t = options.gettext.$pgettext;
    app.provide('$t', options.gettext.$pgettext);

    app.config.globalProperties.$olaiiCommonOptions = options;
    app.provide('olaiiCommonOptions', options);
  } 
}

export default plugin