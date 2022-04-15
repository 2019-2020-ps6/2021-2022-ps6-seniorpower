import {Component, OnInit} from "@angular/core";
import {User} from "../../../models/user.model";
import {UserService} from "../../../services/user.service";
import {LoupeService} from "../../../services/loupe.service";
import {Formatting} from "../../../models/formatting.model";
import {FormattingService} from "../../../services/formatting.service";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})

export class UserListComponent implements OnInit{
  public userList: User[];
  formatting:Formatting;
  constructor(public userService: UserService, public loupeService:LoupeService, private formattingService:FormattingService) {
    this.userService.users$.subscribe((users) => {
      this.userList = users;
    });
    this.formattingService.format$.subscribe((format)=>{
      this.formatting = format;
    })
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
