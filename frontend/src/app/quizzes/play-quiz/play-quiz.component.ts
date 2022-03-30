import { Component, OnInit } from '@angular/core';
import {Answer, Question} from "../../../models/question.model";
import {Quiz} from "../../../models/quiz.model";
import {ActivatedRoute} from "@angular/router";
import {QuizService} from "../../../services/quiz.service";
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
  public quiz: Quiz;
  resultAffiche: boolean = false;
  public id: string | null ="";

  constructor(
    private route: ActivatedRoute,
    private quizService: QuizService,
  ) {}

  ngOnInit(): void {
    console.log(this.route.snapshot.paramMap.get('id'))
    this.quiz = this.quizService.getQuizById(this.route.snapshot.paramMap.get('id'));
    console.log(this.id);
    console.log(typeof(this.quiz));
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
