import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class ProjetosService {
  projetos = [
    { codigo: 1, nome: 'Treinar Voz'},
    { codigo: 2, nome: 'Kung Fu'},
    { codigo: 3, nome: 'Desenvolver Swift'},
    { codigo: 4, nome: 'Desenvolver Ionic'},
  ];
  ultimoCodigo = 4;

  // constructor(public http: Http) {
  //   console.log('Hello ProjetosService Provider');
  // }

getProjetos(){
    return this.projetos;
}
editProjeto(c:number, n:string){
  for(let i=0; i<this.projetos.length; i++){
    if(this.projetos[i].codigo == c){
      this.projetos[i].nome = n;
      break;
    }
  }
}
deleteProjeto(c:number){
  for(let i=0; i<this.projetos.length; i++){
    if(this.projetos[i].codigo == c){
      this.projetos.splice(i,1);
      break;
    }
  }
}
  addProjeto(n:string){
    this.ultimoCodigo++;
    this.projetos.push(
      {codigo: this.ultimoCodigo, nome: n
      }
    )
  }
}
