import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BlockWrap from './components/block-wrap.vue'

import 'highlight.js/styles/github.css'
import './assets/index.css'

Vue.config.productionTip = false

Vue.component(BlockWrap.name, BlockWrap)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
