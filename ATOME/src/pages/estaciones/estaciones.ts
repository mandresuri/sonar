import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, AlertController, Refresher } from 'ionic-angular';
import { BluetoothArduinoService } from '../../services/bluetoothArduino/bluetoothArduino.service';
import { Observable } from 'rxjs';
import { Estacion } from '../../app/models/estacion';
import { EstacionesListService } from '../../services/estaciones-list/estaciones-list.service';

/**
 * Generated class for the EstacionesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-estaciones',
  templateUrl: 'estaciones.html',
})
export class EstacionesPage {

  li_devices: Array<any> = [];
  devices: Array<any> = [];
  atomeList$: Observable<Estacion[]>
  mostrarSpiner = true;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,     
    private platform: Platform,
    private alertCtrl: AlertController,
    private atome: EstacionesListService,
    private bluetooth: BluetoothArduinoService) {
  }

  ionViewDidEnter() {
    this.platform.ready().then(() => {
      this.atomeList$ = this.atome.getEstacionesList().snapshotChanges().map(changes => {
        return changes.map(c => ({
          key: c.payload.key, ...c.payload.val()
        }))
      })

      console.log("basura"+this.atomeList$);

      this.bluetooth.buscar_bluetooth().then((success: Array<Object>) => {
        this.li_devices = success;
        this.atomeList$.subscribe(data => {
            data.forEach(atom => {
              this.li_devices.forEach(dev => {
                if (atom.id == dev.id){
                  this.devices.push(dev);
                }
              });
            });
        })
        


        this.mostrarSpiner = false;
      }, fail => {
        this.bluetooth.presentToast(fail);
        this.mostrarSpiner = false;
      });
    });
  
  }

  ionViewDidLoad() {
  }
  openPage(page) {
    this.navCtrl.setRoot(page);
  }
  openPageHija(page,device) {
    //this.navCtrl.push(page);
    this.navCtrl.push(page,{deviceConectado: device});
  }

  public ngOnDestroy() {
    this.bluetooth.desconectar();
  }

  refresh_bluetooth(refresher: Refresher) {
    console.log(refresher);
    if (refresher) {
      this.bluetooth.buscar_bluetooth().then((successMessage: Array<Object>) => {
        this.li_devices = [];
        this.li_devices = successMessage;
        refresher.complete();
      }, fail => {
        this.bluetooth.presentToast(fail);
        refresher.complete();
      });
    }
  }
  
}
