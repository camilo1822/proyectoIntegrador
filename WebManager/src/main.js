// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import VueFire from '@vuefire/vuefire'

import Buefy from 'buefy'
import 'buefy/lib/buefy.css'

Vue.use(Buefy,{
  defaultIconPack:'fa'
})

Vue.config.productionTip = false


Vue.use(VueFire, {
  project: {
    apiKey: "AIzaSyDuIRfagLRoWtW9wtmpcGeAZvd18v7VxWA",
    authDomain: "culturalapp-ee59b.firebaseapp.com",
    databaseURL: "https://culturalapp-ee59b.firebaseio.com",
    projectId: "culturalapp-ee59b",
    storageBucket: "culturalapp-ee59b.appspot.com",
    messagingSenderId: "134005070152"
  }
})



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
})
