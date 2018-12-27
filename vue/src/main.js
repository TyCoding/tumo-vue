import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

import i18n from './lang' // Internationalization
import '@/icons' // icon
import '@/permission' // permission control

// Vue.use(ElementUI, {locale})

Vue.use(Element, {
    i18n: (key, value) => i18n.t(key, value)
});

Vue.config.productionTip = false;

new Vue({
    el: '#app',
    router,
    store,
    i18n,
    render: h => h(App)
});
