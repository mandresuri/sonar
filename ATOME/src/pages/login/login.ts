import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,  AlertController  } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from '../../app/models/user';
//import { FirebaseObjectObservable} from 'angularfire2/database';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Usuarios } from '../../app/models/usuario';







/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  user= { } as User;
  tipo ;
  usuarios$: AngularFireObject<Usuarios>;
 // usuarioss: AngularFireList<any>;
//  tipo: FirebaseObjectObservable<any>;
 // usuarios$: FirebaseListObservable<Usuarios[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public menu: MenuController,
    private afAuth: AngularFireAuth,
    private   database: AngularFireDatabase,
    public alertCtrl : AlertController
  ) {
    
  
    
    this.menu1Active();
    
  }
  /**
   * Yenifer Hernandez
   * 2018-04-12
   * permite desactivar el menu de la pagina login
   */
  menu1Active() {
    this.menu.enable(false, 'menu1');
  } 

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

//autenticar
  login(user: User) 
{


  if(user.email!=null && user.password!=null){
    this.afAuth.auth.signInWithEmailAndPassword(user.email,user.password ) 
    
 .then((success)=>{

   const authObserv= this.afAuth.authState.subscribe(auth => {
    console.log('sucees');
    console.log(auth.uid);
    this.usuarios$ = this.database.object('/usuarios/'+auth.uid);
    
    console.log(this.usuarios$);
 
    this.tipo=0;
    if (this.tipo=="0"){
         
      this.navCtrl.setRoot('MisestacionesPage',{
        
      });
    }else{
      this.navCtrl.setRoot('AdministradorPage');

     
    }


 
  
  
  
  }) // autenticar
}).catch((err)=>{
  let alert = this.alertCtrl.create({
    title: 'Autenticación Incorrecta',
    subTitle: "Verifica tú Email y Contraseña",
    buttons: ['Aceptar']
  });
  alert.present();
}) 
//pendiiente limpiar pagina de login al ir atras
}
else{
  let alert = this.alertCtrl.create({
    title: 'Autenticación Incorrecta',
    subTitle: "Faltan datos",
    buttons: ['Aceptar']
  });
  alert.present();
}
}
 


  } // fin de codigo

