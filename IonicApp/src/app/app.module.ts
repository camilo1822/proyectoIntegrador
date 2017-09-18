import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';

import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {ListPage} from '../pages/list/list';
import {PlacesPage} from '../pages/places/places';
import {MapPage} from '../pages/map/map';
import {PlaceDetailPage} from '../pages/place-detail/place-detail';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {PlacesProvider} from '../providers/places/places';

import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';


export const firebaseConfig = {
    apiKey: "AIzaSyDuIRfagLRoWtW9wtmpcGeAZvd18v7VxWA",
    authDomain: "culturalapp-ee59b.firebaseapp.com",
    databaseURL: "https://culturalapp-ee59b.firebaseio.com/",
    projectId: "culturalapp-ee59b",
    storageBucket: "culturalapp-ee59b.appspot.com",
    messagingSenderId: "134005070152"
}

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        ListPage,
        PlacesPage,
        MapPage,
        PlaceDetailPage
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp),
        AngularFireModule.initializeApp(firebaseConfig),
        AngularFireDatabaseModule
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        ListPage,
        PlacesPage,
        MapPage,
        PlaceDetailPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        PlacesProvider
    ]
})
export class AppModule {
}
