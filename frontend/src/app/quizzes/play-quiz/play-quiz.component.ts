import { Component, OnInit } from '@angular/core';
import {Answer, AnswerFalse, Question} from "../../../models/question.model";
import {Quiz} from "../../../models/quiz.model";
import {ActivatedRoute} from "@angular/router";
import {QuizService} from "../../../services/quiz.service";
import {QUIZ_vide} from "../../../mocks/quiz-list.mock";
//TODO rendre fonctionnel

@Component({
  selector: 'app-play-quiz',
  templateUrl: './play-quiz.component.html',
  styleUrls: ['play-quiz.component.scss']
})

export class PlayQuizComponent implements OnInit {
  indexQuiz: number = 0;
  nbCorrectAnswer: number = 0;
  selectAnswer = new Map();
  public question: Question | undefined;
  public whoCorrectAnswer: Answer[] = [];
  public answer: Answer=AnswerFalse;
  public quiz: Quiz = QUIZ_vide;
  resultAffiche: boolean = false;
  public id: string | null ="";

  constructor(
    private route: ActivatedRoute,
    private quizService: QuizService,
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.quizService.getQuizById(this.id);
    console.log(this.id);
    console.log(this.quiz.name)
    console.log(this.quiz.questions.length)
  }

  isEnd() {
    return this.indexQuiz >= this.quiz.questions.length;
  }

  getCorrectAnswer(){
    for (let i = 0; this.quiz.questions[this.indexQuiz].answers.length; i++) {
      if (this.quiz.questions[this.indexQuiz].answers[i].isCorrect) {
        this.whoCorrectAnswer.push(this.quiz.questions[this.indexQuiz].answers[i]);
      }
    }return this.whoCorrectAnswer;
  };

  incrementCorrect(answer:Answer){
    for (let i=0; this.getCorrectAnswer();i++){
      if(this.whoCorrectAnswer[i].value===answer.value){
        this.nbCorrectAnswer++;
    }

    }
  this.resultAffiche=true;
    this.selectAnswer.set(this.indexQuiz,answer);
    setTimeout(()=>{this.resultAffiche=false;this.indexQuiz++; console.log(this.indexQuiz);}
  ,1000);
  }


}
