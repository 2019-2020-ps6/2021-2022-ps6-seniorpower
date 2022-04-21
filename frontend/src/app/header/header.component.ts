import { Component, OnInit } from '@angular/core';
import {ColorStyle} from "../../models/colorstyle.model";
import {DEFAULT_COLOR} from "../../mocks/colorstyle.mock";
import {ColorService} from "../../services/color.service";
import {LoupeService} from "../../services/loupe.service";
import { UserService } from 'src/services/user.service';
import { Router } from '@angular/router';
import { VariableService } from 'src/services/variable.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  colorStyle:ColorStyle = DEFAULT_COLOR;
  constructor(public colorService: ColorService, public loupeService:LoupeService,public userService:UserService,public router:Router,public variableService:VariableService) {
    this.colorService.getColorStyle().subscribe((color) => {
      this.colorStyle = color;
    });

  }

  ngOnInit() {
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
