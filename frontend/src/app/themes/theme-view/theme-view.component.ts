import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {QuizService} from "../../../services/quiz.service";
import {Quiz} from "../../../models/quiz.model"
import {LoupeService} from "../../../services/loupe.service";
import {FormattingService} from "../../../services/formatting.service";
import {Formatting} from "../../../models/formatting.model";

@Component({
  selector: 'app-theme-view',
  templateUrl: './theme-view.component.html',
  styleUrls: ['./theme-view.component.scss']
})
export class ThemeViewComponent implements OnInit {

  public name:string | null;
  public quizzes:Quiz[]|null;
  formatting:Formatting;

  constructor(private route: ActivatedRoute,
              private quizService: QuizService,public loupeService:LoupeService,private formattingService:FormattingService) {
    this.quizzes = this.quizOnTheme();
  this.formattingService.getFormatting().subscribe((format)=> {
            this.formatting = format;
          })
  }

  ngOnInit(): void {
    this.name = this.route.snapshot.paramMap.get('name');
    this.loupeService.setup();
    this.quizzes = this.quizOnTheme();
  }


  quizOnTheme(){
    let quizzes : Quiz[] = [];
    let theme = this.quizService.getThemeByName(this.name);
    if(theme == null){
      console.log("null");
      return null;
    }
    for(let i = 0; i < theme.idQuizList.length;i++){
      if(this.quizService.getQuizId(theme.idQuizList[i]) != null || this.quizService.getQuizId(theme.idQuizList[i]) != undefined){
        quizzes.push(this.quizService.getQuizId(theme.idQuizList[i]));
      }
    }
    return quizzes;
  }

  quizSelected(selected: boolean) {
    console.log('event received from child:', selected);
  }

}
