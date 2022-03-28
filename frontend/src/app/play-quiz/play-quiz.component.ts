import { Component, OnInit } from '@angular/core';
import {Answer, AnswerFalse, Question, QUESTION_LIST} from "../../models/question.model";
import {Quiz} from "../../models/quiz.model";
import {ActivatedRoute} from "@angular/router";
import {QuizService} from "../../services/quiz.service";
import {QuestionsComponent} from "../questions/question/question.component";
import {QUESTION_VIDE, QUIZ_LIST, QUIZ_vide} from "../../mocks/quiz-list.mock.component";

@Component({
  selector: 'app-play-quiz',
  templateUrl: './play-quiz.component.html',
  styleUrls: ['play-quiz.component.css']
})
export class PlayQuizComponent implements OnInit {
  indexQuiz: number = 0;
  CorrectAnswer: number = 0;
  selectAnswer = new Map();
  public question: Question | undefined;
  public answer: Answer=AnswerFalse;
  public quiz: Quiz | unknown;
  resultAffiche: boolean = false;
  public id: string | null ="null";

  constructor(
    private route: ActivatedRoute,
    private quizService: QuizService,
  ) {
    this.quizService.quizzes$.subscribe((quiz) => (this.quiz = quiz));
  }

  ngOnInit(): void {
   this.id = this.route.snapshot.paramMap.get('id');
    this.quizService.getQuiz(this.id);

  }

  isEnd() {
    return this.indexQuiz >= this.quiz.questions.length;

  }

  getCorrectAnswer(){
    for (let i = 0; i < 4; i++) {
      if (this.quiz.questions[this.indexQuiz].answers[i].isCorrect) {
        return this.quiz.questions[this.indexQuiz].answers[i];
      }
    }
  };

  incrementCorrect(answer){
    var correct = this.getCorrectAnswer().value;
    if(correct==answer){
      this.CorrectAnswer++;

    }
  this.resultAffiche=true;
    this.selectAnswer.set(this.indexQuiz,answer);
    setTimeout(()=>{this.resultAffiche=false;this.indexQuiz++; console.log(this.indexQuiz);}
  ,1000);
  }


}
