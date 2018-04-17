import { Injectable } from "@angular/core";
import { ISubscription } from "rxjs/Subscription";
import { Observable } from "rxjs";
import { ToastController } from "ionic-angular";
import { BluetoothSerial } from "@ionic-native/bluetooth-serial";

@Injectable()
export class BluetoothArduinoService {

    recibido: string = "";

    li_devices: Array<any> = [];
    mensaje: string = "";
    conexion: ISubscription;
    conexionMensajes: ISubscription;
    reader: Observable<any>;
    rawListener;

    constructor(
        private toastCtrl: ToastController,
        public bluetoothSerial: BluetoothSerial
      ) { }

        /**
   * Busca los dispositivos bluetooth disponibles, evalúa si es posible usar la funcionalidad
   * bluetooth en el dispositivo.
   * @return {Promise<Object>} Regresa una lista de los dispositivos que se localizaron.
   */

  buscar_bluetooth() {
    return new Promise((resolve, reject) => {
      this.bluetoothSerial.isEnabled().then(success =>{
        this.bluetoothSerial.discoverUnpaired().then(success => {
          if (success.length > 0) {
            resolve(success);
          } else {
            reject('No se encontraron dispositivos');
          }
        }).catch((error) => {
          console.log(`[1] Error: ${JSON.stringify(error)}`);
          reject('Bluetooth no disponible en esta plataforma');
        });
      }, fail => {
        console.log(`[2] Error: ${JSON.stringify(fail)}`);
        reject('El bluetooth no está disponible o está apagado');
      });
    });
  }

    /**
   * Se conceta a un dispostitivo bluetooth por su id.
   * @param id Es la id del dispositivo al que se desea conectarse
   * @return {Promise<any>} Regresa un mensaje para indicar si se conectó exitosamente o no.
   */
  conectar(id: string) {
    return new Promise((resolve, reject) => {
      this.conexion = this.bluetoothSerial.connect(id).subscribe((data: Observable<any>) => {
        //this.enviarMensajes();
        resolve("Conectado");
      }, fail => {
        console.log(`[3] Error conexión: ${JSON.stringify(fail)}`);
        reject("No se logro conectar");
      });
    });
  }

    /**
   * Cierra el socket para la conexión con un dispositivo bluetooth.
   */
  desconectar() {
    if (this.conexionMensajes) {
      this.conexionMensajes.unsubscribe();
    }
    if (this.conexion) {
      this.conexion.unsubscribe();
    }
  }


    /**
   * Establece el socket para las comunicaciones seriales después de conectarse con un dispositivo
   * bluetooth.
   * @param message Es el texto que se desea enviar.
   * @returns {Observable<any>} Regresa el texto que llegue vía seria a través de la conexión 
   * bluetooth al dispositivo, en caso de no existir una conexión regresa un mensaje indicando que:
   * _No estas conectado a ningún dispositivo bluetooth_.
   */
  public dataInOut(message: string) {
    return Observable.create(observer => {
      this.bluetoothSerial.isConnected().then(isConnected => {
        this.reader = Observable.fromPromise(this.bluetoothSerial.write(message))
          .flatMap(() => {
            return this.bluetoothSerial.subscribeRawData()
          })
          .flatMap(() => {
            return this.bluetoothSerial.readUntil('#');   // <= delimitador
          });
        this.reader.subscribe(data => {
          observer.next(data);
        });
      }, notConected => {
        observer.next("Estas desconectado");
        observer.complete();
      });
    });
  }

    /**
   * Presenta un cuadro de mensaje.
   * @param text Mensaje a mostrar.
   */
  public presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000
    });
    toast.present();
  }
}