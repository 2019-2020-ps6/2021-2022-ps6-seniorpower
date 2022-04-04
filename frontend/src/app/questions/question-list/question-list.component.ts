import {Component, Input, OnInit} from '@angular/core';
import { QuizService } from '../../../services/quiz.service';
import { Quiz } from '../../../models/quiz.model';
import {Question} from "../../../models/question.model";
import {LoupeService} from "../../../services/loupe.service";

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent implements OnInit {
  @Input()
  quiz:Quiz|undefined;

  public questionList: Question[] | undefined = [];

  constructor(public quizService: QuizService,public loupeService:LoupeService) {

  }

  ngOnInit() {
    this.questionList = this.quiz?.questions;
    this.loupeService.setup();
  }

  deleteQuestion(question : Question){
    this.quizService.deleteQuestion(question,this.quiz?.id);
    console.log('event deletion',question);
  }

}
