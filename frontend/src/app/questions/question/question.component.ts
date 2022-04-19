import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Question} from "../../../models/question.model";
import { QuizService } from '../../../services/quiz.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})

export class QuestionsComponent implements OnInit{

 @Input()
 question: Question;
 @Output()
 questionDelete: EventEmitter<Question> = new EventEmitter<Question>();

  constructor(public quizService: QuizService) {
  }

  ngOnInit():void {

  }

  deleteQuestion(){
    console.log(this.question);
    this.quizService.deleteQuestion(this.question);
  }
}
