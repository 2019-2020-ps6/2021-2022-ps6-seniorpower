import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable, of, throwError, Subject} from 'rxjs';
import { Quiz } from '../models/quiz.model';
import {Question} from "../models/question.model";
import {Theme} from "../models/theme.model";
import { ThemeComponent } from 'src/app/themes/theme/theme.component';

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
  private quizzes: Quiz[] = [];
  private themes: Theme[] = [];
  private questions: Question[] = [];


  /**
   * Observable which contains the list of the quiz.
   * Naming convention: Add '$' at the end of the variable name to highlight it as an Observable.
   */
  public quizzes$: BehaviorSubject<Quiz[]> = new BehaviorSubject(this.quizzes);
  public themes$:BehaviorSubject<Theme[]> = new BehaviorSubject(this.themes);
  public questions$:BehaviorSubject<Question[]> = new BehaviorSubject(this.questions);
  public quizSelected$: Subject<Quiz> = new Subject();



  private stockURL = 'http://localhost:9428/';


  constructor(private http: HttpClient) {
    this.getQuizzes();
    this.getThemes();
  }

  addQuiz(quiz: Quiz) {
    this.quizzes.push(quiz);
    this.quizzes$.next(this.quizzes);
    this.postQuizzes(quiz);
  }

  deleteQuiz(quiz: Quiz){
    let index = this.quizzes.indexOf(quiz);
    this.quizzes.splice(index,1);
    this.quizzes$.next(this.quizzes);
    this.deleteQuizzes(quiz);
  }

  postQuizzes(quiz:Quiz){
      this.http.post(this.stockURL+"api/quizzes",quiz).subscribe((quiz)=>{
      });
  }


  getQuizzes(){
    console.log("aaaaaaaaaaaaaaaaaaaaasalut get quiz")
    this.http.get<Quiz[]>(this.stockURL+"api/quizzes").subscribe((quizList) => {
      this.quizzes = quizList;
      this.quizzes$.next(this.quizzes);
    });
  }

  getQuestions(id:string){
    this.http.get<Question[]>(this.stockURL+"api/quizzes/" + id + "/questions").subscribe((questionList) => {
      this.questions = questionList;
      this.questions$.next(this.questions);
    });
  }

  putQuiz(quiz:Quiz){
    this.http.put(this.stockURL+"api/quizzes/"+quiz.id,quiz);
  }

  deleteQuizzes(quiz:Quiz){
    console.log(this.stockURL+"api/quizzes/"+quiz.id.toString())
    this.http.delete(this.stockURL+"api/quizzes/"+quiz.id.toString()).subscribe(() => this.getQuizzes());
  }

  getQuizById(quizId: string) {
    const urlWithId = this.stockURL + "api/quizzes/" + quizId;
    this.http.get<Quiz>(urlWithId).subscribe((quiz) => {
      this.quizSelected$.next(quiz);
    });
  }

  getQuizId(id: string | null) : Quiz | null{
    for(let i = 0; i < this.quizzes.length;i++){
      if(this.quizzes[i].id == id){
        return this.quizzes[i];
      }
    }
    return null;

  }

  getQuiz(id: string | null): Quiz {
    const quiz = this.quizzes.find(q => q.id === id)!;
    return quiz;
  }


  addQuestion(question:Question,id:string|null){
    this.http.post<Question>(this.stockURL+"api/quizzes/" + id + "/questions", question).subscribe((question)=>{
      console.log(question);
    });
    question.quizId = id;
    this.questions.push(question);
    this.questions$.next(this.questions);

  }

  deleteQuestion(question:Question){
    const quizId = question.quizId;
    console.log(question);
    this.http.delete(this.stockURL+"api/quizzes/"+quizId+ "/questions/" + question.id).subscribe(() => this.getQuestions(quizId));
  }

  getThemes(){
    this.http.get<Theme[]>(this.stockURL + "api/themes").subscribe((themelist) => {
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

  //a tester
  getThemeByName(name:string){
    for(let i = 0; i < this.themes.length; i++){
      if ((name === this.themes[i].name)){
        return this.themes[i]
      }
    }
    return undefined;
  }

  createTheme(theme: string): void
  {
    console.log("create theme")
    this.http.post(this.stockURL +"api/themes", { "name": theme,"idQuizList":[] } as Theme).subscribe(() =>
    {
      this.getThemes();
    });
  }

  addTheme(theme: Theme): void
  {
    console.log("create theme")
    this.http.post(this.stockURL +"api/themes", theme as Theme).subscribe(() =>
    {
      this.getThemes();
    });
  }


  addQuizToTheme(quizId:string,theme:Theme):void{
    theme.idQuizList.push(quizId);
    console.log("add quiz to theme")
    this.http.put(this.stockURL+"api/themes/" +  theme.id,theme).subscribe(() =>
      {
        this.getThemes();
      });
  }

  //a tester
  deleteQuizToTheme(quizId:string,theme:Theme):void{
    for(let i = 0; i < theme.idQuizList.length; i++){
      if(theme.idQuizList[i] === quizId){
        delete theme.idQuizList[i];
      }
    }
    this.http.put(this.stockURL+"api/themes/" + theme.id,theme).subscribe();
  }


}
