import Vue from 'vue'
Vue.config.devtools = true
import App from './App.vue'
import store from './store/index'
import Multiselect from 'vue-multiselect'


Vue.component('multiselect', Multiselect)

Vue.config.productionTip = false
new Vue({
    store,
    render: h => h(App),
}).$mount('#app')