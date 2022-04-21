import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {Variable} from "../models/variable.model";
import { Observable } from 'rxjs';
import { User } from 'src/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class VariableService {

  private variable: Variable = {resultat:0} as Variable;
  public variable$: BehaviorSubject<Variable> = new BehaviorSubject(this.variable);
  private stockURL = 'http://localhost:9428/';

  public tempResultat = 0;

  public idLogOut = "0000000000000";

  constructor(private http: HttpClient) {
    this.getVariables();
    this.tempResultat = 0;
  }

  addVariable(variable: Variable) {
    this.postVariables(variable);
    // You need here to update the list of variable and then update our observable (Subject) with the new list
    // More info: https://angular.io/tutorial/toh-pt6#the-searchterms-rxjs-subject
  }


  postVariables(variable:Variable){
      return this.http.post(this.stockURL+"api/variables",variable).subscribe((variable)=>{this.getVariables()});
  }


  getVariables(){
    return this.http.get<Variable>(this.stockURL+"api/variables").subscribe((variable) => {
        this.variable = variable;
        this.variable$.next(this.variable);
    });
  }

  getVariableSync():Variable{
    var request = new XMLHttpRequest();
    request.open('GET', this.stockURL+"api/variables", false);  
    request.send(null);
    return JSON.parse(request.responseText); 
}

  postVariableSync(variable: Variable){
    let xhr = new XMLHttpRequest();
    xhr.open("POST", this.stockURL+"api/variables",false);
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.send(JSON.stringify(variable));
  }

  getUserSelected(){
    let id = this.getVariableSync().userSelected;
    var request = new XMLHttpRequest();
    request.open('GET', this.stockURL+"api/users/" + id, false);  
    request.send(null);
    return JSON.parse(request.responseText); 
  }

  postUserSync(user : User){
    let xhr = new XMLHttpRequest();
    let variable = this.getVariableSync();
    variable.userSelected = user.id.toString();
    xhr.open("POST", this.stockURL+"api/variables",false);
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.send(JSON.stringify(variable));
  }

  isAdmin(){
    let userEnter = this.getUserSelected();
    if(userEnter.id !== this.idLogOut){
      if(userEnter.name == "Admin"){
        return true;
      }
    }
    return false;
  }

  isConnected(){
    let userEnter = this.getVariableSync().userSelected;
    if(userEnter !== this.idLogOut){
      return true;
    }
    return false;
  }
  
  logOut(){
    let temp = {id :this.idLogOut,name:"none",password:"none"} as User;
    console.log("log out");
    this.postUserSync(temp);
  }

  putUserInUsers(user:User){
    let xhr = new XMLHttpRequest();
    xhr.open("PUT", this.stockURL+"api/users/" + user.id,false);
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.send(JSON.stringify(user));
  }

  //pour recuperer l'user qui est connecté : getUserSelected() (function synchrone)
  //pour poster l'user apres modifications : putUserInUsers(user : User) (function synchrone)
  //il faut etre connecté pour recuperer user connecté, isConnected() renvoie true si connecté et false sinon
  // il y a 4 element nouveaux parametre dans user : maladie(string) et daltonisme (string) nom (string) et prenom (string)
}
