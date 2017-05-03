import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class TarefasService {

  tarefas = [
    { codigo : 1, projeto: 1, descricao: 'Treinar Highway to Hell(AC/DC)',
  data: new Date(2017, 4, 6), prioridade: 2 },
    { codigo : 2, projeto: 4, descricao: 'Fazer trabalho pratico',
  data: new Date(2017, 4, 2), prioridade: 1 },
  { codigo : 3, projeto: 2, descricao: 'Treinar BackFlip',
  data: new Date(2017, 5, 5), prioridade: 3 },
  { codigo : 4, projeto: 4, descricao: 'Estudar segunda prova',
  data: new Date(2017, 4, 6), prioridade: 1 },
  ]
  ultimoCodigo = 4;

  // constructor(public http: Http) {
   
  // }

  getTarefas(): any[]{
    return this.tarefas;
  }


editTarefa(ct:number, cp:number, n:string, d:Date, p:number){
  for(let i=0; i<this.tarefas.length; i++){
    if(this.tarefas[i].codigo == ct){
      this.tarefas[i].projeto = cp;
      this.tarefas[i].descricao = n;
      this.tarefas[i].data = d;
      this.tarefas[i].prioridade = p;
      break;
    }
  }
}
deleteTarefa(c:number){
  for(let i=0; i<this.tarefas.length; i++){
    if(this.tarefas[i].codigo == c){
      this.tarefas.splice(i,1);
      break;
    }
  }
}
  addTarefa(cp:number, n:string, d:Date, p:number){
    this.ultimoCodigo++;
    this.tarefas.push(
      {codigo: this.ultimoCodigo,
      projeto: cp,
      descricao: n,
      data: d,
      prioridade: p
      }
    )
  }
}
