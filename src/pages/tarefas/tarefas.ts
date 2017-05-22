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

  tarefas: any[] = [];
  projetos: any[];
  filtroTarefas = {};

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public TarefasService: TarefasService,
  public ProjetosService: ProjetosService,
  public menuCtrl: MenuController) {
    
  }
  ionViewWillEnter() {
    this.ProjetosService.getProjetos().then( dadosprojetos=> {
      this.projetos = dadosprojetos
    });
    this.TarefasService.getTarefas().then( dados => {
      this.tarefas = dados;
    });
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
      this.filtroTarefas = { projeto: c, count: 0};
      this.menuCtrl.close();
    }
    filtroDias(d){
      this.filtroTarefas = { dias: d, count: 0};
      this.menuCtrl.close();
    }
    getContador(){
     return this.filtroTarefas;
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
      filtro.count = itens.filter(item => item.projeto == filtro.projeto).length;
      return itens.filter(item => item.projeto == filtro.projeto);
    }
    else if(filtro.dias>=0){
      let d = (new Date()).getTime() + filtro.dias*24*60*60*1000;
      filtro.count = itens.filter(
          item => item.data <= d

      ).length;
      return itens.filter(
          item => item.data <= d

      );

    }
    else
       filtro.count = itens.length;
      return itens;
  }
}
