import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {User} from "../models/user.model";
import {USER_LIST} from "../mocks/user-list.mock";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users: User[] = USER_LIST;
  public users$: BehaviorSubject<User[]> = new BehaviorSubject(USER_LIST);
  private stockURL = 'https://http://localhost:9428/';

  constructor(private http: HttpClient) {
    this.getUsers();

  }


  addUser(user:User){
    this.users.push(user);
    this.users$.next(this.users);
  }

  deleteUser(user:User){
    let index = this.users.indexOf(user);
    this.users.splice(index,1);
    this.users$.next(this.users);
  }

  getUsers(){
    this.http.get<User[]>(this.stockURL).subscribe((users) => {
      this.users = users;
      this.users$.next(this.users);
      console.log(users);
    });
  }
}
