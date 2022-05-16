import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../../services/quiz.service';
import { Quiz } from '../../../models/quiz.model';
import {LoupeService} from "../../../services/loupe.service";
import {Formatting} from "../../../models/formatting.model";
import {FormattingService} from "../../../services/formatting.service";

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss']
})
export class QuizListComponent implements OnInit {

  public quizList: Quiz[];
  formatting:Formatting;

  constructor(public quizService: QuizService,public loupeService:LoupeService, private formattingService:FormattingService) {
    console.log("je suis dans le CONSTRUCTEUR")
    this.quizService.quizzes$.subscribe((quizList) => {
      this.quizList = quizList;
    });
    this.formattingService.getFormatting().subscribe((format)=> {
      this.formatting = format;
    })
  }

  ngOnInit() {
    console.log("je suis dans le ON INIT")
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
