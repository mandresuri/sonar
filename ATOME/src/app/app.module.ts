import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AuthProvider } from '../providers/auth/auth';

export const firebaseConfig = {
  apiKey: "AIzaSyDNRoAfBGD15BUvZyw2bIWhrD57naFCoxI",
  authDomain: "atome-77ef6.firebaseapp.com",
  databaseURL: "https://atome-77ef6.firebaseio.com",
  projectId: "atome-77ef6",
  storageBucket: "",
  messagingSenderId: "825006961025"

};

export const config = {
  apiKey: "AIzaSyDUz7IJOCgsz5Zk9HBoU0cwF9z2Q229LtI",
  authDomain: "tiendq-3d47a.firebaseapp.com",
  databaseURL: "https://tiendq-3d47a.firebaseio.com",
  storageBucket: "tiendq-3d47a.appspot.com",
  messagingSenderId: "12950516640"
};


@NgModule({
  declarations: [
    MyApp,
    
    
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
  ]
})
export class AppModule {}
