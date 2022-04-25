import {Component, OnInit} from "@angular/core";
import {FormControl, FormGroup} from '@angular/forms';
import { FormBuilder, Validators} from "@angular/forms";
import {User} from "../../../models/user.model";
import {UserService} from "../../../services/user.service";
import {CLASSIC_Format, DMLA_FORMAT, GLAUCOME_FORMAT} from "../../../mocks/formatting.mock";
import {Formatting} from "../../../models/formatting.model";
import {FormattingService} from "../../../services/formatting.service";
import {ColorService} from "../../../services/color.service";
import {ColorStyle} from "../../../models/colorstyle.model";
import {DEFAULT_COLOR, DEUTE_COLOR, PROTA_COLOR, TRITA_COLOR} from "../../../mocks/colorstyle.mock";
import {UsernameValidator} from "./username.validators";


@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})

export class UserFormComponent implements OnInit{

  public userForm: FormGroup;
  public users;
  public messageError = {
    'name': {
      'required': "Nom d'utilisateur requis",
      'validUsername': "Nom d'utilisateur déjà pris"
    },
    'nom': {
      'required': 'Nom manquant'
    },
    'prenom': {
      'required': 'Prénom manquant'
    },
    'password': {
      'required': 'Mot de passe manquant'
    }
  }

  formatting:Formatting = CLASSIC_Format;
  colorStyle:ColorStyle = DEFAULT_COLOR;
  colorList:String[] = ["Aucun","Protanopie","Tritanopie","Deutéranopie"];
  illnessList:String[] = ["Aucune","DMLA","Glaucome"];
  currentColor:string;
  currentIllness:string;


  constructor(public formBuilder: FormBuilder, public userService: UserService,public formattingService:FormattingService,public colorService: ColorService) {

    this.formattingService.getFormatting().subscribe((format)=> {
      this.formatting = format;
    });
    this.colorService.getColorStyle().subscribe((color) => {
      this.colorStyle = color;
    });
    this.formattingService.getCurrentIllness().subscribe((illness)=>{
      this.currentIllness = illness;
    });
    this.userService.users$.subscribe((user)=>{
      this.users=user;
    });
    this.userForm = this.formBuilder.group({
      name:  new FormControl('', Validators.compose([
        UsernameValidator.validUsername(this),Validators.required])),
      nom: [null, Validators.required],
      prenom: [null, Validators.required],
      maladie: [null, Validators.required],
      daltonisme: [null, Validators.required],
      password: [null, Validators.required],
      id:['']
    });
  }

  ngOnInit() {
  }

  addUser() {
    if (this.userForm.invalid){

      return;
    }
    this.userForm.patchValue({
      id:Date.now()
    });
    const userToCreate: User = this.userForm.getRawValue() as User;
    console.log('Add User: ', userToCreate);
    this.userService.addUser(userToCreate);
  }
  getAllIllness(){
    return this.illnessList;
  }
  applyIllnessChange(){
    const illness: string = (document.getElementById('illness') as HTMLInputElement).value;
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

  }

  changeColorDeute(){
    this.colorStyle = DEUTE_COLOR;
    this.colorService.colorUpdate(this.colorStyle);
    this.colorService.currentColorUpdate("Deutéranopie");

  }
  getAllColors(){
    return this.colorList;
  }

  applyColorChange(){
    const color: string = (document.getElementById('color') as HTMLInputElement).value;
    switch (color){
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

}

