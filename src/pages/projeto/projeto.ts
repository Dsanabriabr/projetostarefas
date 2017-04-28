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
    let projetos = ProjetosService.getProjetos();
    if(!this.novo){  
      for(let i=0; i<projetos.length; i++){
        if(projetos[i].codigo == this.codigoProjeto) {
          this.nomeProjeto = projetos[i].nome;
          break;
        }
      }
    }
}

  alterar(){
    this.ProjetosService.editProjeto(this.codigoProjeto, this.nomeProjeto);
    this.navCtrl.pop();
  }
  excluir(){
    this.ProjetosService.deleteProjeto(this.codigoProjeto);
    this.navCtrl.pop();
  }
  incluir(){
    this.ProjetosService.addProjeto(this.nomeProjeto);
    this.navCtrl.pop();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Projeto');
  }

}
