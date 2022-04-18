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
import {PoliceStyle} from "../../../models/PoliceStyle.model";
import {CLASSIC_Police} from "../../../mocks/PoliceStyle.mock";
import {PoliceStyleService} from "../../../services/policeStyle.service";

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
  quizEnd: boolean = false;
  public  police: PoliceStyle = CLASSIC_Police

  constructor(
    private route: ActivatedRoute,
    private quizService: QuizService,
    public loupeService: LoupeService,
    public variableService: VariableService,
    public colorService: ColorService,
    public policeStyleService:PoliceStyleService
  ){
    //   this.variableService.variable$.subscribe((variable) => {
    //   this.variable = variable;
    // });

    this.quizService.quizSelected$.subscribe((quiz) => this.quiz = quiz);
    this.policeStyleService.getPoliceStyle().subscribe((police) => {
      this.police = police;
    });

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
  }
  getresultnb(){
    return this.variableService.tempResultat;
  }

  next(){
    this.resultAffiche = false;
    this.indexQuiz++;
    if (this.isEnd()){
      this.quizEnd = true;
    }
  }
}
