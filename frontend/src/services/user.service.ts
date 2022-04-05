import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {User} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users: User[] = [];
  public users$: BehaviorSubject<User[]> = new BehaviorSubject(this.users);
  private stockURL = 'http://localhost:9428/';

  constructor(private http: HttpClient) {
    this.getUsers();

  }

  addUser(user: User) {
    this.postUsers(user);
    // You need here to update the list of user and then update our observable (Subject) with the new list
    // More info: https://angular.io/tutorial/toh-pt6#the-searchterms-rxjs-subject
  }

  deleteUser(user: User){
    let index = this.users.indexOf(user);
    this.users.splice(index,1);
    this.users$.next(this.users);
    this.deleteUsers(user);
  }

  postUsers(user:User){
      this.http.post(this.stockURL+"api/users",user).subscribe((user)=>{this.getUsers()});
  }


  getUsers(){
    this.http.get<User[]>(this.stockURL+"api/users").subscribe((userList) => {
      this.users = userList;
      this.users$.next(this.users);
    });
  }

  putUser(user:User){
    this.http.put(this.stockURL+"api/users/"+user.id,user);
  }

  deleteUsers(user:User){
    console.log(this.stockURL+"api/users/"+user.id.toString())
    this.http.delete(this.stockURL+"api/users/" + user.id.toString()).subscribe(() => this.getUsers());
  }
}
