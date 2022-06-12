import Vue from 'vue'
import App from './App.vue'
import {Button,Checkbox,Input} from 'element-ui'

Vue.use(Button)
Vue.use(Checkbox)
Vue.use(Input)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  beforeCreate(){
    Vue.prototype.$bus = this;
  }
}).$mount('#app')
