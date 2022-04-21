import {Component, OnInit} from "@angular/core";
import { FormGroup } from '@angular/forms';
import { FormBuilder, Validators} from "@angular/forms";
import {User} from "../../../models/user.model";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})

export class UserFormComponent implements OnInit{

  public userForm: FormGroup;

  constructor(public formBuilder: FormBuilder, public userService: UserService) {
    this.userForm = this.formBuilder.group({
      name: [null, Validators.required],
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
    this.userForm.patchValue({
      id:Date.now()
    });
    const userToCreate: User = this.userForm.getRawValue() as User;
    console.log('Add User: ', userToCreate);
    this.userService.addUser(userToCreate);
  }
}

