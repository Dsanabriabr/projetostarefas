import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProjetoPage } from './projeto';

@NgModule({
  declarations: [
    ProjetoPage,
  ],
  imports: [
    IonicPageModule.forChild(ProjetoPage),
  ],
  exports: [
    ProjetoPage
  ]
})
export class ProjetoModule {}
