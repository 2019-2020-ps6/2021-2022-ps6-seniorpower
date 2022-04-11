import { Component, OnInit } from '@angular/core';
import {Answer, Question} from "../../../models/question.model";
import {Quiz} from "../../../models/quiz.model";
import {ActivatedRoute} from "@angular/router";
import {QuizService} from "../../../services/quiz.service";
import {LoupeService} from "../../../services/loupe.service";
import {VariableService} from "../../../services/variable.service";
import {Variable} from "../../../models/variable.model";
import {ColorService} from "../../../services/color.service";
import {ColorStyle} from "../../../models/colorstyle.model";
import {DEFAULT_COLOR} from "../../../mocks/colorstyle.mock";
//TODO rendre fonctionnel

@Component({
  selector: 'app-play-quiz',
  templateUrl: './play-quiz.component.html',
  styleUrls: ['play-quiz.component.scss']
})

export class PlayQuizComponent implements OnInit {
  indexQuiz: number = 0;
  selectAnswer = new Map();
  public question: Question | undefined;
  public quiz: Quiz;
  resultAffiche: boolean = false;
  public id: string | null = "";
  colorStyle: ColorStyle = DEFAULT_COLOR
  answer: Answer;

  constructor(
    private route: ActivatedRoute,
    private quizService: QuizService,
    public loupeService: LoupeService,
    public variableService: VariableService,
    public colorService: ColorService) {
    //   this.variableService.variable$.subscribe((variable) => {
    //   this.variable = variable;
    // });
    this.quizService.quizSelected$.subscribe((quiz) => this.quiz = quiz);

    this.colorService.getColorStyle().subscribe((color) => {
      this.colorStyle = color;
    });
  }

  ngOnInit(): void {
    console.log(this.route.snapshot.paramMap.get('id'))
    this.quizService.getQuizById(this.route.snapshot.paramMap.get('id')) //recup le quiz lié a l'id
    console.log(this.id);
    console.log(this.quiz);

    this.loupeService.setup();
  }


  isEnd() {
    return this.indexQuiz >= this.quiz.questions.length;
  }

  getCorrectAnswer() {
    let correctAnswer = [];
    for (let i = 0; i < this.quiz.questions[this.indexQuiz].answers.length; i++) {
      if (this.quiz.questions[this.indexQuiz].answers[i].isCorrect) {
        correctAnswer.push(this.quiz.questions[this.indexQuiz].answers[i]);
      }
    }
    return correctAnswer;
  }

  incrementCorrect(answer: Answer) {
    for (let i = 0; i < this.getCorrectAnswer().length; i++) {
      if (this.getCorrectAnswer()[i].value === answer.value) {
        this.variableService.tempResultat++;
      }
    }
    this.resultAffiche = true;
    this.selectAnswer.set(this.indexQuiz, answer);
    setTimeout(() => {
        this.resultAffiche = false;
        this.indexQuiz++;
        console.log(this.indexQuiz);
      }
      , 2000);
  }

  getCorrectresult(answer: Answer) {
    return this.getCorrectAnswer().length

  }

}
