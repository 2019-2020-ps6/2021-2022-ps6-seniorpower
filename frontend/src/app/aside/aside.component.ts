import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import {VariableService} from "../../services/variable.service";

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})
export class AsideComponent implements OnInit {


  public isConnected;
  public isAdminConnected;

  constructor(public router:Router, public variableService:VariableService) {
    this.variableService.variable$.subscribe((variable) => {
        this.isConnected = this.variableService.isConnected();
        this.isAdminConnected = this.variableService.isConnected() && this.variableService.isAdmin();
      }
    );
  }

  ngOnInit() {
  }

}
