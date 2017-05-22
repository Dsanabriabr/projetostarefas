import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class TarefasService {

  
  url: string = 'http://kutova.com/dev/todolist/api.php';

   constructor(public http: Http) { 
   
   }

  getTarefa(t:number):  Promise<any> {

    return new Promise( resolve => { 

     this.http.get(this.url+'/tarefas/'+t)
      .toPromise()
      .then( resposta => {
          let dados = resposta.json();
          let tarefa = {
                codigo: parseInt(dados.codigo),
                projeto: parseInt(dados.projeto),
                descricao: dados.descricao,
                data: new Date (
                  parseInt( dados.data.substr(0,4) ),
                  parseInt( dados.data.substr(5,2) ) -1,
                  parseInt( dados.data.substr(8,2) ) ), 
                prioridade: parseInt(dados.prioridade)
            }
            resolve(tarefa);
           });
        });
   }

  getTarefas():  Promise<any[]> {

    return new Promise( resolve => { 

     this.http.get(this.url+'/tarefas')
      .toPromise()
      .then( resposta => {
          let dados = resposta.json();
          let tarefas = [];
          for(let i=0; i<dados.length; i++) {
            tarefas.push({
                codigo: parseInt(dados[i].codigo),
                projeto: parseInt(dados[i].projeto),
                descricao: dados[i].descricao,
                data: new Date (
                  parseInt( dados[i].data.substr(0,4) ),
                  parseInt( dados[i].data.substr(5,2) ) -1,
                  parseInt( dados[i].data.substr(8,2) ) ), 
                prioridade: parseInt(dados[i].prioridade)
            });
           }
          resolve(tarefas);
        });
    });
   }


editTarefa(ct:number, cp:number, n:string, d:Date, p:number): Promise<any>{

let headers = new Headers({ 'Content-Type': 'application/json'});

let tarefa ={
  projeto: cp,
  descricao: n,
  data: d.getFullYear()+"-"+
                    ("0"+(d.getMonth()+1)).substr(-2,2)+"-"+
                    ("0"+d.getDate()).substr(-2,2),
  prioridade: p
};
let body = JSON.stringify(tarefa);

return new Promise( resolve => {
  this.http.put(this.url+'/tarefas/'+ct, body, {headers: headers})
    .toPromise()
    .then( resposta =>{
      resolve(resposta.json());
    });
  });
}
deleteTarefa(ct:number): Promise<any>{
    return new Promise( resolve => {
      this.http.delete(this.url+'/tarefas/'+ct)
      .toPromise()
      .then( resposta =>{
        resolve(resposta.json());
       });
    });
  }

  addTarefa(cp:number, n:string, d:Date, p:number): Promise<any>{
   
    let headers = new Headers({ 'Content-Type': 'application/json'});

    let tarefa ={
      projeto: cp,
      descricao: n,
      data: d.getFullYear()+"-"+
                        ("0"+(d.getMonth()+1)).substr(-2,2)+"-"+
                        ("0"+d.getDate()).substr(-2,2),
      prioridade: p
      };
    let body = JSON.stringify(tarefa);

    return new Promise( resolve =>{
      this.http.post(this.url+'/tarefas/', body, {headers: headers})
        .toPromise()
        .then( resposta =>{
          resolve(resposta.json());
        });
      });
  }
}
