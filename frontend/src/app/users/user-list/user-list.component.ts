import {Component, OnInit} from "@angular/core";
import {User} from "../../../models/user.model";
import {UserService} from "../../../services/user.service";
import {LoupeService} from "../../../services/loupe.service";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})

export class UserListComponent implements OnInit{
  public userList: User[] = [];

  constructor(public userService: UserService, public loupeService:LoupeService) {
    this.userService.users$.subscribe((users) => {
      this.userList = users;
    });
  }

  ngOnInit() {
    this.loupeService.setup();
  }

  deleteUser(user: User){
    console.log("delete" , user)
    this.userService.deleteUser(user);
    console.log('event deletion',user);
  }
}
