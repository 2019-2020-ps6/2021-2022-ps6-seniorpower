import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../../services/quiz.service';
import { Quiz } from '../../../models/quiz.model';
import {LoupeService} from "../../../services/loupe.service";

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss']
})
export class QuizListComponent implements OnInit {

  public quizList: Quiz[];

  constructor(public quizService: QuizService,public loupeService:LoupeService) {
    this.quizService.quizzes$.subscribe((quizList) => {
      this.quizList = quizList;
    });
  }

  ngOnInit() {
    this.loupeService.setup();
  }


  quizSelected(selected: boolean) {
    console.log('event received from child:', selected);
  }
  deleteQuiz(quiz: Quiz){
    this.quizService.deleteQuiz(quiz);
    console.log('event deletion',quiz);
  }
}
