import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Question} from "../../../models/question.model";

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})

export class QuestionsComponent implements OnInit{
 @Input()
 question: Question | undefined;
 @Output()
 questionDeleted: EventEmitter<Question> = new EventEmitter<Question>();

  ngOnInit():void {

  }

  deleteQuestion(){
    this.questionDeleted.emit(this.question);
  }
}
