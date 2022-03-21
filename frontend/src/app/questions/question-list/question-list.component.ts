import {Component, Input, OnInit} from '@angular/core';
import { QuizService } from '../../../services/quiz.service';
import { Quiz } from '../../../models/quiz.model';
import {Answer, Question} from "../../../models/question.model";
import {EditQuizComponent} from "../../quizzes/edit-quiz/edit-quiz.component";

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent implements OnInit {
  @Input()
  quiz:Quiz|undefined;

  public questionList: Question[] | undefined = [];

  constructor(public quizService: QuizService) {

  }

  ngOnInit() {
    this.questionList = this.quiz?.questions;
  }

  deleteQuestion(question : Question){
    this.quizService.deleteQuestion(question,this.quiz?.id);
    console.log('event deletion',question);
  }

}
