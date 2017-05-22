import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ProjetosService {
  projetos = [
    { codigo: 1, nome: 'Treinar Voz'},
    { codigo: 2, nome: 'Kung Fu'},
    { codigo: 3, nome: 'Desenvolver Swift'},
    { codigo: 4, nome: 'Desenvolver Ionic'},
  ];
  ultimoCodigo = 4;
 
 url: string = 'http://kutova.com/dev/todolist/api.php';


  constructor(public http: Http) {
    
  }

getProjetos(): Promise<any[]>{
  return new Promise( resolve=> {

    this.http.get(this.url+'/projetos')
      .toPromise()
      .then( resposta => {
          let dados = resposta.json();
          let projetos = [];
          for(let i=0; i<dados.length; i++) {
            projetos.push({
                codigo: parseInt(dados[i].codigo),
                nome: dados[i].nome
            });
           }
          resolve(projetos);
        });
  })
    
}

getProjeto(p:number): Promise<any>{
  return new Promise( resolve=> {

    this.http.get(this.url+'/projetos/'+p)
      .toPromise()
      .then( resposta => {
          let dados = resposta.json();
          let projeto = {
                codigo: parseInt(dados.codigo),
                nome: dados.nome
            }
          resolve(projeto);
        });
  });
}

editProjeto(c:number, n:string): Promise<any>{
  
let headers = new Headers({ 'Content-Type': 'application/json'});

let projeto ={
  nome: n,
};
let body = JSON.stringify(projeto);

return new Promise( resolve => {
  this.http.put(this.url+'/projetos/'+c, body, {headers: headers})
    .toPromise()
    .then( resposta =>{
      resolve(resposta.json());
    });
  });
}
deleteProjeto(c:number): Promise<any>{
   return new Promise( resolve => {
      this.http.delete(this.url+'/projetos/'+c)
      .toPromise()
      .then( resposta =>{
        resolve(resposta.json());
       });
    });
}
  addProjeto(n:string): Promise<any>{
   
    let headers = new Headers({ 'Content-Type': 'application/json'});

    let projeto ={
      nome: n,
      };
    let body = JSON.stringify(projeto);

    return new Promise( resolve =>{
      this.http.post(this.url+'/projetos/', body, {headers: headers})
        .toPromise()
        .then( resposta =>{
          resolve(resposta.json());
        });
      });
  }
}
