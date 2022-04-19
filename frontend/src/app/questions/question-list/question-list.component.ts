import {Component, Input, OnInit} from '@angular/core';
import { QuizService } from '../../../services/quiz.service';
import { Quiz } from '../../../models/quiz.model';
import {Question} from "../../../models/question.model";
import {LoupeService} from "../../../services/loupe.service";
import {CLASSIC_Format} from "../../../mocks/formatting.mock";
import {Formatting} from "../../../models/formatting.model";
import {FormattingService} from "../../../services/formatting.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent implements OnInit {
  @Input()
  quiz:Quiz|undefined;
  formatting:Formatting = CLASSIC_Format;
  public questionList: Question[] | undefined = [];
  id:string|null;

  constructor(private route: ActivatedRoute, private quizService: QuizService,private loupeService:LoupeService, private formattingService:FormattingService) {
    this.formattingService.getFormatting().subscribe((format)=> {
      this.formatting = format;
    })
    this.quizService.questions$.subscribe((questionList) => {
      this.questionList = questionList;
    });
  }

  ngOnInit() {
    this.loupeService.setup();
    this.id = this.route.snapshot.paramMap.get('id');
    this.quizService.getQuestions(this.id);
  }

  deleteQuestion(selected:Question){
    this.quizService.deleteQuestion(selected,this.quiz);
  }
}
