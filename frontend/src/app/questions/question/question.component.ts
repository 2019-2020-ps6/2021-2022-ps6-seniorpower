import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Question} from "../../../models/question.model";

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

  constructor() {
  }

  ngOnInit():void {

  }

  deleteQuestion(){
    console.log(this.question);
    this.questionDelete.emit(this.question);
    //this.quizService.deleteQuestion(question,this.route.snapshot.paramMap.get('id'));
  }
}
