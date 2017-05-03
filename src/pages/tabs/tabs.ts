import { Component } from '@angular/core';
import {TarefasService} from '../../providers/tarefas-service';
import { ProjetosPage } from '../projetos/projetos';
import {TarefasPage} from '../tarefas/tarefas';
import {InfoPage} from '../info/info';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tarefas: any[]; 
  cont: number;
  tab1Root = TarefasPage;
  tab2Root = ProjetosPage;
  tab3Root = InfoPage;
  
  constructor(public TarefasService: TarefasService) {
    this.tarefas = TarefasService.getTarefas();
    this.cont = this.tarefas.length;
  }
  getcont(){
    return this.cont;
  }
}
