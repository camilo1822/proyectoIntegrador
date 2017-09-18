import Vue from 'vue'
import VueFire from 'vuefire'
import * as firebase from 'firebase'


class firebaseClass {
  constructor() {
    this.firebaseApp = firebase.initializeApp({
      apiKey: "AIzaSyDuIRfagLRoWtW9wtmpcGeAZvd18v7VxWA",
      authDomain: "culturalapp-ee59b.firebaseapp.com",
      databaseURL: "https://culturalapp-ee59b.firebaseio.com",
      projectId: "culturalapp-ee59b",
      storageBucket: "culturalapp-ee59b.appspot.com",
      messagingSenderId: "134005070152"
    })
    this.db = firebaseApp.database()
  }

}

export default new firebaseClass()
