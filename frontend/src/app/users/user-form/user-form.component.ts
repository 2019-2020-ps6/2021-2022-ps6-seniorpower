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
  public submitted = false;
  public already = false;

  formatting:Formatting = CLASSIC_Format;
  colorStyle:ColorStyle = DEFAULT_COLOR;
  colorList:String[] = ["Aucun","Protanopie","Tritanopie","Deutéranopie"];
  illnessList:String[] = ["Aucune","DMLA","Glaucome"];
  currentColor:string;
  currentIllness:string;
  created:boolean = false;


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
      maladie: [null, Validators.required],
      daltonisme: [null, Validators.required],
      password: [null, Validators.required],
      id:['']
    });
  }

  ngOnInit() {
  }

  get f() { return this.userForm.controls; }

  addUser() {
    this.submitted = true;
    if (this.userForm.invalid){
      this.created = false;
      return;
    }
    this.userForm.patchValue({
      id:Date.now()
    });
    const userToCreate: User = this.userForm.getRawValue() as User;
    console.log('Add User: ', userToCreate);
    this.userService.addUser(userToCreate);
    this.created = true;
    this.userService.getUsers();
    for(let i = 0;i<this.users.length;i++){
      if(this.users[i].name == userToCreate.name){
        this.already = true;
      }
    }
  }
  getAllIllness(){
    return this.illnessList;
  }

  getAllColors(){
    return this.colorList;
  }

}

