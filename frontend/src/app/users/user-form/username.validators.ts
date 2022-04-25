import { FormControl } from '@angular/forms';
import {UserService} from "../../../services/user.service";
import {User} from "../../../models/user.model";
import {UserFormComponent} from "./user-form.component";
export class UsernameValidator {

  private users:User[];
  constructor(private userService:UserService) {
    this.userService.users$.subscribe((users)=>{
      this.users = users;
    })
  }
  static validUsername(cmp:UserFormComponent){
    return (fc: FormControl) => {
      for (let i=0;i<cmp.users.length;i++){
        if (fc.value === cmp.users[i].name){
          return ({validUsername: true});
        }
      }return (null);
    }
  }

}
