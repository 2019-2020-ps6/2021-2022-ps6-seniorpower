import {Component, OnInit} from "@angular/core";
import {QuizService} from "../../services/quiz.service";
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import { User } from "src/models/user.model";
import { UserService } from "src/services/user.service";
import { Router } from "@angular/router";


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

  constructor(public formBuilder:FormBuilder,public userService: UserService,public router: Router) {
    this.userService.users$.subscribe((users) => {
      this.userList = users;
    });
     //Form creation
     this.authentificationForm = this.formBuilder.group(
      {
        id:[''],
        name:[''],
        password:[''],
      });
  }

  ngOnInit() {
  }

  addUser() {
    const userEnter: User = this.authentificationForm.getRawValue() as User;
    for(let i = 0;i< this.userList.length;i++){
      if(this.userList[i].name == userEnter.name && this.userList[i].password == userEnter.password){
        this.auth = true;
        console.log(this.userList[i]);
        this.userService.userEnter = this.userList[i];
        this.router.navigate(['/menu']);
      }
    }
  }

}
