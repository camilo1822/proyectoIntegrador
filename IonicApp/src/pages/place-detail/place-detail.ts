import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {AngularFireDatabase, FirebaseObjectObservable} from 'angularfire2/database';

/**
 * Generated class for the PlaceDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-place-detail',
  templateUrl: 'place-detail.html',
})
export class PlaceDetailPage {

  place: FirebaseObjectObservable<any>;
  mapView: String;
  apiKey: String;
  mediaContent: String;

  constructor(public navCtrl: NavController, public navParams: NavParams, db: AngularFireDatabase) {
    this.apiKey = 'AIzaSyCJ4lUU9UQTuUucI8Z1i0OBbSstsuqlKWc';
    this.place = db.object('/places/' + navParams.data.placeKey)
    this.mediaContent = 'image';
    this.place.subscribe(snapshot => {
      this.mapView = `https://maps.googleapis.com/maps/api/staticmap?center=${snapshot.lat},${snapshot.long}&zoom=17&format=png&maptype=roadmap&style=element:geometry%7Ccolor:0x242f3e&style=element:labels.text.fill%7Ccolor:0x746855&style=element:labels.text.stroke%7Ccolor:0x242f3e&style=feature:administrative.locality%7Celement:labels.text.fill%7Ccolor:0xd59563&style=feature:poi%7Celement:labels.text.fill%7Ccolor:0xd59563&style=feature:poi.park%7Celement:geometry%7Ccolor:0x263c3f&style=feature:poi.park%7Celement:labels.text.fill%7Ccolor:0x6b9a76&style=feature:road%7Celement:geometry%7Ccolor:0x38414e&style=feature:road%7Celement:geometry.stroke%7Ccolor:0x212a37&style=feature:road%7Celement:labels.text.fill%7Ccolor:0x9ca5b3&style=feature:road.highway%7Celement:geometry%7Ccolor:0x746855&style=feature:road.highway%7Celement:geometry.stroke%7Ccolor:0x1f2835&style=feature:road.highway%7Celement:labels.text.fill%7Ccolor:0xf3d19c&style=feature:transit%7Celement:geometry%7Ccolor:0x2f3948&style=feature:transit.station%7Celement:labels.text.fill%7Ccolor:0xd59563&style=feature:water%7Celement:geometry%7Ccolor:0x17263c&style=feature:water%7Celement:labels.text.fill%7Ccolor:0x515c6d&style=feature:water%7Celement:labels.text.stroke%7Ccolor:0x17263c&size=480x360&markers=color:blue%7Csize:mid%7C${snapshot.lat},${snapshot.long}&key=${this.apiKey}`
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlaceDetailPage');

  }

}
