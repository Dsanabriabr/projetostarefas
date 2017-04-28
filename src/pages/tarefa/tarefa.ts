import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {TarefasService} from '../../providers/tarefas-service';
import {ProjetosService} from '../../providers/projetos-service';

@IonicPage()
@Component({
  selector: 'page-tarefa',
  templateUrl: 'tarefa.html',
})
export class TarefaPage {

projetos: any[];
novo: boolean;

codigoTarefa: number;
codigoProjeto: number;
descricao: string;
prioridade: number;
data: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public TarefasService: TarefasService,
  public ProjetosService: ProjetosService) {
    this.projetos = ProjetosService.getProjetos();
    this.codigoTarefa = navParams.get('codigo');
    this.novo = navParams.get('novo');
    if(!this.novo) {
      let tarefas = TarefasService.getTarefas();
      for(let i=0; i<tarefas.length; i++) {
        if(tarefas[i].codigo == this.codigoTarefa){
          this.codigoProjeto = tarefas[i].projeto;
          this.descricao = tarefas[i].descricao;
          this.prioridade = tarefas[i].prioridade;
          let d = tarefas[i].data;
          this.data = d.getFullYear()+"-"+("0"+(d.getMonth()+1)).substr(-2,2)+"-"+("0"+d.getDate()).substr(-2,2);
        }
      }
  } else {
          this.codigoProjeto = this.projetos[0].codigo;
          this.descricao = '';
          this.prioridade = 3;
          let d = new Date();
          this.data = d.getFullYear()+"-"+("0"+(d.getMonth()+1)).substr(-2,2)+"-"+("0"+d.getDate()).substr(-2,2);
  }
  }
  alterar(){
    let d = new Date(
      parseInt(this.data.substr(0,4)),
      parseInt(this.data.substr(5,2)),
      parseInt(this.data.substr(8,2)));
    
    this.TarefasService.editTarefa(this.codigoTarefa, this.codigoProjeto,
    this.descricao,
    d,
    this.prioridade);
    this.navCtrl.pop();
  }
  excluir(){
    this.TarefasService.deleteTarefa(this.codigoTarefa);
    this.navCtrl.pop();
  }
  incluir(){
    let d = new Date(
      parseInt(this.data.substr(0,4)),
      parseInt(this.data.substr(5,2)),
      parseInt(this.data.substr(8,2)));
    
    this.TarefasService.addTarefa(this.codigoProjeto,
    this.descricao,
    d,
    this.prioridade);
    this.navCtrl.pop();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad Tarefa');
  }

}
