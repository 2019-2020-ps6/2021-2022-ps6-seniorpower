import {Component, OnInit} from "@angular/core";
import {QuizService} from "../../../services/quiz.service";
import {Theme} from "../../../models/theme.model";
import {Question} from "../../../models/question.model";

@Component({
  selector: 'app-theme-list',
  templateUrl: './theme-list.component.html',
  styleUrls: ['./theme-list.component.scss']
})
export class ThemeListComponent implements OnInit {

  public themeList: Theme[];
  
  constructor(public quizService: QuizService) {
    this.quizService.themes$.subscribe((themes: Theme[]) => {
      this.themeList = themes;
    });
    console.log(this.themeList);
  }

  ngOnInit() {
  }

}
