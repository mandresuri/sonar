import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EstacionesPage } from './estaciones';

@NgModule({
  declarations: [
    EstacionesPage,
  ],
  imports: [
    IonicPageModule.forChild(EstacionesPage),
  ],
})
export class EstacionesPageModule {}
