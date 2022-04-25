import { Component, OnInit } from '@angular/core';
import {ColorStyle} from "../../models/colorstyle.model";
import {DEFAULT_COLOR} from "../../mocks/colorstyle.mock";
import {ColorService} from "../../services/color.service";
import {LoupeService} from "../../services/loupe.service";
import { UserService } from 'src/services/user.service';
import { Router } from '@angular/router';
import { VariableService } from 'src/services/variable.service';
import{ ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public isConnected;
  public isAdminConnected;

  colorStyle:ColorStyle = DEFAULT_COLOR;
  constructor(public colorService: ColorService, public loupeService:LoupeService,public userService:UserService,public router:Router,public variableService:VariableService,private cdRef : ChangeDetectorRef  ) {
    this.colorService.getColorStyle().subscribe((color) => {
      this.colorStyle = color;
    });

  }

  ngOnInit() {
    this.isConnected = this.variableService.isConnected();
    this.isAdminConnected = this.variableService.isConnected() && this.variableService.isAdmin();

  }

  public loupe(){
    this.loupeService.refresh()
  }

  logOut(){
    this.variableService.logOut();
    this.router.navigate(['/authentification']);
  }

  show(){
    if(!(this.router.url == "/authentification")){
      return true;
    }
    return false
    
  }

}
