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
   
    this.codigoTarefa = navParams.get('codigo');
    this.novo = navParams.get('novo');

    if(!this.novo) {
      TarefasService.getTarefa(this.codigoTarefa).then( dados => {
        this.codigoProjeto = dados.projeto;
        this.descricao = dados.descricao;
        let d = dados.data;
        this.data = d.getFullYear()+"-"+
                    ("0"+(d.getMonth()+1)).substr(-2,2)+"-"+
                    ("0"+d.getDate()).substr(-2,2);
        this.prioridade = dados.prioridade;
      });
      
  } 
  ProjetosService.getProjetos().then( dados => {
      this.projetos = dados;
      if(this.novo) {
        this.codigoProjeto = this.projetos[0].codigo;
        this.descricao = '';
        this.prioridade = 3;
        let d = new Date();
        this.data = d.getFullYear()+"-"+("0"+(d.getMonth()+1)).substr(-2,2)+"-"+("0"+d.getDate()).substr(-2,2);
      }
  });
  }
  alterar(){
    let d = new Date(
      parseInt(this.data.substr(0,4)),
      parseInt(this.data.substr(5,2))-1,
      parseInt(this.data.substr(8,2)));
    
    this.TarefasService.editTarefa(this.codigoTarefa, this.codigoProjeto,
    this.descricao,
    d,
    this.prioridade)
    .then(dados =>{
    this.navCtrl.pop();
    });
  }
  excluir(){
    this.TarefasService.deleteTarefa(this.codigoTarefa)
    .then(dados =>{
    this.navCtrl.pop();
    });
  }
  incluir(){
    let d = new Date(
      parseInt(this.data.substr(0,4)),
      parseInt(this.data.substr(5,2))-1,
      parseInt(this.data.substr(8,2)));
    
    this.TarefasService.addTarefa(this.codigoProjeto,
    this.descricao,
    d,
    this.prioridade)
    .then(dados =>{
    this.navCtrl.pop();
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad Tarefa');
  }

}
