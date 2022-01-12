import Vue from 'vue'
import App from './App.vue'
import router from './router'
import bootstrapcss from './bootstrap'
import bootstrapjs from './bootstrap'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret, faTrash, faWrench } from '@fortawesome/free-solid-svg-icons'



library.add(faUserSecret, faTrash, faWrench)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.config.productionTip = false
Vue.use(bootstrapcss);
Vue.use(bootstrapjs);


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
