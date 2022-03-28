import {Component, OnInit} from "@angular/core";
import {QuizService} from "../../../services/quiz.service";
import {Theme} from "../../../models/theme.model";
import {Question} from "../../../models/question.model";
import {QUESTION_VIDE} from "../../../mocks/quiz-list.mock";

@Component({
  selector: 'app-theme-list',
  templateUrl: './theme-list.component.html',
  styleUrls: ['./theme-list.component.scss']
})
export class ThemeListComponent implements OnInit {

  public themeList: Theme[] = [];
  public question:Question = QUESTION_VIDE;
  constructor(public quizService: QuizService) {
    this.quizService.themes$.subscribe((theme) => {
      this.themeList = theme;
    });
  }

  ngOnInit() {
  }

  themeSelected(selected: boolean) {
    console.log('event received from child:', selected);
  }
}
