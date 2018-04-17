import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import {  AngularFireObject , AngularFireList  } from 'angularfire2/database';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

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
  items: Observable<any[]>;
  public selectedvalue;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private database: AngularFireDatabase,
    public menu: MenuController,
  ) {
    console.log('carga estaciones');   
    this.items = database.list('estacion').valueChanges();
    console.log('selecciona');
    console.log(this.selectedvalue);
  }

  menu1Active() {
    this.menu.enable(true, 'menu1');
  }
  onChange(){
  console.log('selecciona');
  console.log(this.selectedvalue);
}

iniciarPractica(){
  console.log('inicia la practica');
  
}

  ionViewDidLoad() {
  }

}
