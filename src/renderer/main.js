import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'
import {Button, Select, Option, Upload, Input, Icon} from 'element-ui'
import './assets/element-variables.scss'

Vue.prototype.$ELEMENT = {size: 'small', zIndex: 3000}
Vue.component(Button.name, Button)
Vue.component(Select.name, Select)
Vue.component(Option.name, Option)
Vue.component(Upload.name, Upload)
Vue.component(Input.name, Input)
Vue.component(Icon.name, Icon)

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: {App},
  router,
  store,
  template: '<App/>'
}).$mount('#app')
