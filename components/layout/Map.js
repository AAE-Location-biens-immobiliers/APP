import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'
import VueGeolocation from 'vue-browser-geolocation'
import interactiveMap from '~/pages/interactiveMap.vue'

Vue.config.productionTip = false
Vue.use(VueGeolocation)


Vue.use(VueGoogleMaps, {
  load: {
    key: ''
  }
})

new Vue({
  render: h => h(interactiveMap),
}).$mount('#app')