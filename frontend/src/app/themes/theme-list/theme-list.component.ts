import {Component, OnInit} from "@angular/core";
import {QuizService} from "../../../services/quiz.service";
import {Theme} from "../../../models/theme.model";
import {LoupeService} from "../../../services/loupe.service";
import { VariableService } from "src/services/variable.service";
import {FormattingService} from "../../../services/formatting.service";
import {Formatting} from "../../../models/formatting.model";

@Component({
  selector: 'app-theme-list',
  templateUrl: './theme-list.component.html',
  styleUrls: ['./theme-list.component.scss']
})
export class ThemeListComponent implements OnInit {

  public themeList: Theme[];
  formatting:Formatting;
  public isAdmin;

  constructor(public quizService: QuizService,public loupeService:LoupeService,public variableService:VariableService, private formattingService:FormattingService) {
    this.quizService.themes$.subscribe((themes: Theme[]) => {
      this.themeList = themes;
    });
    this.variableService.variable$.subscribe((variable) => {
      this.isAdmin = this.variableService.isConnected && this.variableService.isAdmin();
    });
    this.formattingService.getFormatting().subscribe((format)=> {
          this.formatting = format;
        })
  }

  ngOnInit() {
    this.loupeService.setup();
    this.quizService.getThemes();
  }

}
