import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable, of} from 'rxjs';
import { Quiz } from '../models/quiz.model';
import { QUIZ_LIST } from '../mocks/quiz-list.mock';
import {Question, QUESTION_LIST} from "../models/question.model";
import {Theme} from "../models/theme.model";
import {THEME_LIST} from "../mocks/theme-list";

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  /**
   * Services Documentation:
   * https://angular.io/docs/ts/latest/tutorial/toh-pt4.html
   */

   /**
    * The list of quiz.
    * The list is retrieved from the mock.
    */
  private quizzes: Quiz[] = QUIZ_LIST;
  private themes: Theme[] = THEME_LIST;

  /**
   * Observable which contains the list of the quiz.
   * Naming convention: Add '$' at the end of the variable name to highlight it as an Observable.
   */
  public quizzes$: BehaviorSubject<Quiz[]> = new BehaviorSubject(QUIZ_LIST);
  public themes$:BehaviorSubject<Theme[]> = new BehaviorSubject(THEME_LIST);

  private stockURL = 'http://localhost:9428/';


  constructor(private http: HttpClient) {
    this.getQuizzes();
    this.getThemes();
  }

  addQuiz(quiz: Quiz) {
    this.quizzes.push(quiz);
    this.quizzes$.next(this.quizzes);
    this.postQuizzes(quiz);
    // You need here to update the list of quiz and then update our observable (Subject) with the new list
    // More info: https://angular.io/tutorial/toh-pt6#the-searchterms-rxjs-subject
  }

  deleteQuiz(quiz: Quiz){
    let index = this.quizzes.indexOf(quiz);
    this.quizzes.splice(index,1);
    this.quizzes$.next(this.quizzes);
    this.deleteQuizzes(quiz);
  }

  postQuizzes(quiz:Quiz){
      this.http.post(this.stockURL+"api/quizzes",quiz).subscribe((quiz)=>{
        console.log(quiz);
      });
  }

  getQuizzes(){
    this.http.get<Quiz[]>(this.stockURL+"api/quizzes").subscribe((quizList) => {
      this.quizzes = quizList;
      this.quizzes$.next(this.quizzes);
    });
  }

  putQuiz(quiz:Quiz){
    this.http.put(this.stockURL+"api/quizzes/"+quiz.id,quiz);
  }

  deleteQuizzes(quiz:Quiz){
    this.http.delete(this.stockURL+"api/quizzes/"+quiz.id);
  }

  getQuizById(id: string | null): Quiz {
    const quiz = this.quizzes.find(q => q.id === id)!;
    return quiz;
  }

  getQuiz(id: string | null): Observable<Quiz> {
    const quiz = this.quizzes.find(q => q.id === id)!;
    return of(quiz);
  }

  addQuestion(question:Question,id:string|undefined){
    let quiz = this.quizzes.find(q => q.id === id)!;
    quiz.questions.push(question);

   /* this.questions.push(question);

    /* this.questions.push(question);
    this.questions$.next(this.questions);*/
    this.quizzes$.next(this.quizzes);
    this.putQuiz(quiz); //TODO verif
  }

  deleteQuestion(question:Question, id:string|undefined){
    let quiz = this.quizzes.find(q => q.id === id)!;
    let index = quiz.questions.indexOf(question);
    let indexQuiz = this.quizzes.indexOf(quiz)
    this.quizzes[indexQuiz].questions.splice(index,1);
    this.quizzes$.next(this.quizzes);
    this.putQuiz(quiz); //TODO verif
  }

  getThemes(){
    this.http.get<Theme[]>(this.stockURL).subscribe((themelist) => {
      this.themes = themelist;
      this.themes$.next(this.themes);
      console.log(themelist);
    });
  }

  addIdTheme(){
    let id =0
    this.quizzes.forEach(value => {
      value.id = String(id);
      id +=1;
    })
  }

  createTheme(theme: string): void
  {
    this.http.post(this.stockURL.toString() + "themes", { name: theme }).subscribe(_ =>
    {
      this.getThemes();
    });
  }

}
