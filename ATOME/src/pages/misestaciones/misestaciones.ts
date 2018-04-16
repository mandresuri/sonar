import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';

/**
 * Generated class for the MisestacionesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-misestaciones',
  templateUrl: 'misestaciones.html',
})
export class MisestacionesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public menu: MenuController,
  ) {
    this.menu1Active();
  }

  ionViewDidLoad() {
  
  }

  menu1Active() {
    this.menu.enable(true, 'menu1');
    this.menu.enable(false, 'menu2');
  }

  openPage(page){
    this.navCtrl.setRoot(page);
}

openPageHija(page){
  this.navCtrl.push(page);
}

}
