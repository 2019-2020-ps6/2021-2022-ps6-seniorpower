import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {Variable} from "../models/variable.model";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VariableService {

  private variable: Variable = {resultat:0} as Variable;
  public variable$: BehaviorSubject<Variable> = new BehaviorSubject(this.variable);
  private stockURL = 'http://localhost:9428/';

  public tempResultat = 0;

  constructor(private http: HttpClient) {
    this.getVariables();
  }

  addVariable(variable: Variable) {
    this.postVariables(variable);
    // You need here to update the list of variable and then update our observable (Subject) with the new list
    // More info: https://angular.io/tutorial/toh-pt6#the-searchterms-rxjs-subject
  }


  postVariables(variable:Variable){
      this.http.post(this.stockURL+"api/variables",variable).subscribe((variable)=>{this.getVariables()});
  }


  getVariables(){
    this.http.get<Variable>(this.stockURL+"api/variables").subscribe((variable) => {
        this.variable = variable;
        this.variable$.next(this.variable);
    });
  }

}
