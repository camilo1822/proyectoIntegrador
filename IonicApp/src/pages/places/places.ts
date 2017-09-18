import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {PlaceDetailPage} from '../place-detail/place-detail'

/**
 * Generated class for the PlacesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';


@IonicPage()
@Component({
    selector: 'page-places',
    templateUrl: 'places.html',
})
export class PlacesPage {
    places: FirebaseListObservable<any[]>;

    constructor(public navCtrl: NavController, public navParams: NavParams, db: AngularFireDatabase) {
        this.places = db.list('/places');
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad PlacesPage');
    }
    goDetails(selectedPlace){

        this.navCtrl.push(PlaceDetailPage,{placeKey:selectedPlace.$key})

    }

}
