import {Component, OnInit} from "@angular/core";
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { User } from "src/models/user.model";
import { UserService } from "src/services/user.service";
import { Router } from "@angular/router";
import { VariableService } from "src/services/variable.service";
import {DEFAULT_COLOR, DEUTE_COLOR, PROTA_COLOR, TRITA_COLOR} from "../../mocks/colorstyle.mock";
import {CLASSIC_Format,DMLA_FORMAT,GLAUCOME_FORMAT} from "../../mocks/formatting.mock";
import { Formatting } from 'src/models/formatting.model';
import { FormattingService } from 'src/services/formatting.service';
import {ColorStyle} from "../../models/colorstyle.model";
import {ColorService} from "../../services/color.service";

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.scss']
})
export class AuthentificationComponent implements OnInit {

  public authentificationForm: FormGroup;
  public userList: User[];
  public auth : Boolean = false;
  public inscription : Boolean = false;
  public connexion : Boolean = false;
  public submitted : Boolean;
  public noMatch: Boolean;
  public hide:boolean = true;
  public currentUser;
  formatting:Formatting = CLASSIC_Format;

  colorStyle:ColorStyle = DEFAULT_COLOR;

  constructor(public formBuilder:FormBuilder,public colorService: ColorService, private formattingService:FormattingService,public userService:UserService,public router:Router,public variableService:VariableService) {
    this.userService.users$.subscribe((users) => {
      this.userList = users;
    });
    //Form creation
    this.authentificationForm = this.formBuilder.group(
      {
        id:[''],
        name:['',Validators.required],
        password:['',Validators.required],
      });
  }


  get f() { return this.authentificationForm.controls; }


  addUser() {
    this.authentificationForm.patchValue({
      id:Date.now(),
    });
    this.submitted = true;
    if (this.authentificationForm.invalid) {
      this.noMatch = false;
      return;
    }

    const userEnter: User = this.authentificationForm.getRawValue() as User;
    for(let i = 0;i< this.userList.length;i++){
      if(this.userList[i].name == userEnter.name && this.userList[i].password == userEnter.password){
        this.auth = true;
        console.log("connexion" ,this.userList[i]);
        this.variableService.postUserSync(this.userList[i]);
        this.variableService.getVariables();
        this.currentUser = this.userList[i];
        this.applyColorChange();
        this.applyIllnessChange();

        this.router.navigate(['/menu']);
      }
    }
    this.noMatch = true;
    this.submitted = false;

  }

  showHide(){
    var p = document.getElementById('mdp');
    if (this.hide){
      this.hide = false;
      p.setAttribute('type','text');
    }
    else{
      this.hide = true;
      p.setAttribute('type','password');
    }
  }


  ngOnInit() {
  }

  changeColorDefault(){
    this.colorStyle = DEFAULT_COLOR;
    this.colorService.colorUpdate(this.colorStyle);
    this.colorService.currentColorUpdate("Aucun");
  }

  changeColorProta(){
    this.colorStyle = PROTA_COLOR;
    this.colorService.colorUpdate(this.colorStyle);
    this.colorService.currentColorUpdate("Protanopie");

  }

  changeColorTrita(){
    this.colorStyle = TRITA_COLOR;
    this.colorService.colorUpdate(this.colorStyle);
    this.colorService.currentColorUpdate("Tritanopie");
    console.log(this.formatting)

  }

  changeColorDeute(){
    this.colorStyle = DEUTE_COLOR;
    this.colorService.colorUpdate(this.colorStyle);
    this.colorService.currentColorUpdate("Deutéranopie");

  }

  changeFormatClassic(){
    this.formatting = CLASSIC_Format;
    this.formattingService.formattingUpdate(this.formatting);
    this.formattingService.changeIllness("Aucune");
  }

  changeFormatDMLA(){
    this.formatting = DMLA_FORMAT;
    this.formattingService.formattingUpdate(this.formatting);
    this.formattingService.changeIllness("DMLA");

  }

  changeFormatGlaucome(){
    this.formatting = GLAUCOME_FORMAT;
    this.formattingService.formattingUpdate(this.formatting);
    this.formattingService.changeIllness("Glaucome");
    console.log(this.formatting)

  }

  applyColorChange(){
    const daltonisme: string = this.currentUser.daltonisme;
    console.log(daltonisme)
    switch (daltonisme){
      case "Aucun":{
        this.changeColorDefault();
        break;
      }
      case "Protanopie":{
        this.changeColorProta();
        break;
      }
      case "Tritanopie":{
        this.changeColorTrita();
        break;
      }
      case "Deutéranopie":{
        this.changeColorDeute();
        break;
      }
    }
  }


  applyIllnessChange(){
    const illness: string = this.currentUser.maladie;
    console.log(illness)
    switch (illness){
      case "Aucune":{
        this.changeFormatClassic();
        break;
      }
      case "DMLA":{
        this.changeFormatDMLA();
        break;
      }
      case "Glaucome":{
        this.changeFormatGlaucome();
        break;
      }
    }
  }
}
