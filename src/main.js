import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import firebase from 'firebase/app';
import 'firebase/firestore';


Vue.config.productionTip = false


const firebaseConfig = {
  apiKey: "AIzaSyBKCCiL36TlYdh_-QXxRsJw8zm4z2SCRtw",
  authDomain: "pokemon-7bc83.firebaseapp.com",
  projectId: "pokemon-7bc83",
  storageBucket: "pokemon-7bc83.appspot.com",
  messagingSenderId: "291971657926",
  appId: "1:291971657926:web:de2ed95e284bf607c4e7c7"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore()  
export {db}

Vue.prototype.$db = firebase.firestore();

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
