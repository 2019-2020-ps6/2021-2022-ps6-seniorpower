import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {BehaviorSubject, Observable, of} from 'rxjs';
import { Quiz } from '../models/quiz.model';
import { QUIZ_LIST } from '../mocks/quiz-list.mock';
import {Question, QUESTION_LIST} from "../models/question.model";
import {User} from "../models/user.model";
import {USER_LIST} from "../mocks/user-list.mock";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: User[] = USER_LIST;
  public users$: BehaviorSubject<User[]> = new BehaviorSubject(USER_LIST);

  addUser(user:User){
    this.users.push(user);
    this.users$.next(this.users);
  }

  deleteUser(user:User){
    let index = this.users.indexOf(user);
    this.users.splice(index,1);
    this.users$.next(this.users);
  }
}
