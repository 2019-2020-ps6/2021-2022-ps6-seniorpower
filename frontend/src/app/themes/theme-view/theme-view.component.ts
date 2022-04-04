import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {QuizService} from "../../../services/quiz.service";
import {Quiz} from "../../../models/quiz.model"
import {LoupeService} from "../../../services/loupe.service";

@Component({
  selector: 'app-theme-view',
  templateUrl: './theme-view.component.html',
  styleUrls: ['./theme-view.component.scss']
})
export class ThemeViewComponent implements OnInit {

  public name:string | null;

  constructor(private route: ActivatedRoute,
    private quizService: QuizService,public loupeService:LoupeService) {
     }

  ngOnInit(): void {
    this.name = this.route.snapshot.paramMap.get('name');
    this.loupeService.setup();
  }

  quizOnTheme(){
    let quizzes : Quiz[] = [];
    let theme = this.quizService.getThemeByName(this.name);
    if(theme == null){
      console.log("null");
      return null;
    }
    for(let i = 0; i < theme.idQuizList.length;i++){
        quizzes.push(this.quizService.getQuizById(theme.idQuizList[i]));
    }
    console.log(quizzes);
    return quizzes;
  }

  quizSelected(selected: boolean) {
    console.log('event received from child:', selected);
  }

}
