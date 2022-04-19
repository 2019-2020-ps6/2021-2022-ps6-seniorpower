import {Component, OnInit} from "@angular/core";
import {QuizService} from "../../../services/quiz.service";
import {Theme} from "../../../models/theme.model";
import {Question} from "../../../models/question.model";
import {LoupeService} from "../../../services/loupe.service";
import { FormGroup } from '@angular/forms';
import { FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-theme-list',
  templateUrl: './theme-list.component.html',
  styleUrls: ['./theme-list.component.scss']
})
export class ThemeListComponent implements OnInit {

  public themeList: Theme[];
  public themeForm: FormGroup;

  constructor(public formBuilder: FormBuilder,public quizService: QuizService,public loupeService:LoupeService) {
    this.quizService.themes$.subscribe((themes: Theme[]) => {
      this.themeList = themes;
    });
      // Form creation
      this.themeForm = this.formBuilder.group({
      name: [null, Validators.required],
      idQuizList:[[]],
    });
  }

  ngOnInit() {
    this.loupeService.setup();
    this.quizService.getThemes();
  }

  addTheme() {
    // We retrieve here the quiz object from the quizForm and we cast the type "as Quiz".
    const themeToCreate: Theme = this.themeForm.getRawValue() as Theme;
    // Do you need to log your object here in your class? Uncomment the code below
    // and open your console in your browser by pressing F12 and choose the tab "Console".
    // You will see your quiz object when you click on the create button.
    console.log('Add theme: ', themeToCreate);
    // Now, add your quiz in the list!
    this.quizService.addTheme(themeToCreate);
  }

}
