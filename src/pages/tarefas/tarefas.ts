import { Component, Pipe, PipeTransform } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import {TarefasService} from '../../providers/tarefas-service';
import {ProjetosService} from '../../providers/projetos-service';
import {TarefaPage} from '../tarefa/tarefa';

@IonicPage()
@Component({
  selector: 'page-tarefas',
  templateUrl: 'tarefas.html',
})
export class TarefasPage {

  rootPage = null;

  tarefas: any[];
  projetos: any[];
  filtroTarefas = {};


  constructor(public navCtrl: NavController, public navParams: NavParams,
  public TarefasService: TarefasService,
  public ProjetosService: ProjetosService,
  public menuCtrl: MenuController) {
    this.projetos = ProjetosService.getProjetos();
    this.tarefas = TarefasService.getTarefas();
}

  nomeProjeto(c):string {
    for(let i=0; i<this.projetos.length; i++)
      if(this.projetos[i].codigo == c)
        return this.projetos[i].nome;
    return "Projeto não encontrado";
  }
  selecionaTarefa(c){
    let cn = parseInt(c);
    this.navCtrl.push(TarefaPage, {codigo: cn, novo: false});
  }
  novaTarefa(){
    this.navCtrl.push(TarefaPage, {codigo: 0, novo: true})
  }
  limpaFiltros(){
    this.filtroTarefas = {};
    this.menuCtrl.close();
  }
    filtroProjeto(c){
      this.filtroTarefas = { projeto: c};
      this.menuCtrl.close();
    }
    filtroDias(d){
      this.filtroTarefas = { dias: d};
      this.menuCtrl.close();
    }


  ionViewDidLoad() {
    console.log('DSanabriaBR');
  }

}


@Pipe({
  name: 'filtro'
})
export class Filtro implements PipeTransform {
  transform(itens:any[], filtro:any):any {
    itens.sort(
     (a,b) => a.data-b.data
    );
    if(filtro.projeto>=0){
      return itens.filter(item => item.projeto == filtro.projeto);
    }
    else if(filtro.dias>=0){
      let d = (new Date()).getTime() + filtro.dias*24*60*60*1000;
      return itens.filter(
          item => item.data <= d

      );

    }
    else
      return itens;
  }
}
