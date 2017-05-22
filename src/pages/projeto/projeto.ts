import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ProjetosService} from '../../providers/projetos-service';

@IonicPage()
@Component({
  selector: 'page-projeto',
  templateUrl: 'projeto.html',
})
export class ProjetoPage {
  codigoProjeto: number;
  nomeProjeto: string;
  novo: boolean;


  constructor(public navCtrl: NavController, public navParams: NavParams,
  public ProjetosService: ProjetosService) {
    this.codigoProjeto = navParams.get('codigo');
    this.novo = navParams.get('novo');
    if(!this.novo){  
      ProjetosService.getProjeto(this.codigoProjeto).then( dados => {
        this.nomeProjeto = dados.nome;
       });
     };
  }


  alterar(){
    this.ProjetosService.editProjeto(this.codigoProjeto, this.nomeProjeto).then(res => {
    this.navCtrl.pop();
    });
}
  excluir(){
    this.ProjetosService.deleteProjeto(this.codigoProjeto).then(res =>{
    this.navCtrl.pop();
    });
  }
  incluir(){
    this.ProjetosService.addProjeto(this.nomeProjeto).then(res =>{
    this.navCtrl.pop();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Projeto');
  }

}
