import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import {  FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { AngularFireDatabase } from 'angularfire2/database';

/**
 * Generated class for the CrearBitacoraPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-crear-bitacora',
  templateUrl: 'crear-bitacora.html',
})
export class CrearBitacoraPage {
 // almacenes: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CrearBitacoraPage');
  }

}
