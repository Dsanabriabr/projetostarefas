import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TarefaPage } from './tarefa';

@NgModule({
  declarations: [
    TarefaPage,
  ],
  imports: [
    IonicPageModule.forChild(TarefaPage),
  ],
  exports: [
    TarefaPage
  ]
})
export class TarefaModule {}
