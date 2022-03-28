import {User} from "../models/user.model";
import {Quiz} from "../models/quiz.model";
import {QUESTION_ACTOR, QUESTION_SPORT} from "./quiz-list.mock.component";

export const ALPHA_USER:User = {
  name:"A",
  password:"Test1"
}

export const BETA_USER: User = {
  name:"Tester",
  password:"Test"
};

export const USER_LIST: User[] = [
  ALPHA_USER,BETA_USER
];
