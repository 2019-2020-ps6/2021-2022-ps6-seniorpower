import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Question} from "../../../models/question.model";
import {QuizService} from "../../../services/quiz.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})

export class QuestionsComponent implements OnInit{
  
 @Input()
 question: Question;

  constructor(public quizService: QuizService,private route: ActivatedRoute,) {
  }

  ngOnInit():void {

  }

  deleteQuestion(question){
    console.log(this.question);
    this.quizService.deleteQuestion(question,this.route.snapshot.paramMap.get('id'));
  }
}
