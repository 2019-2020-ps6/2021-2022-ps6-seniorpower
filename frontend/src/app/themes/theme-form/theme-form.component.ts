import {Component, OnInit} from "@angular/core";
import {Theme} from "../../../models/theme.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Formatting} from "../../../models/formatting.model";
import {QuizService} from "../../../services/quiz.service";
import {LoupeService} from "../../../services/loupe.service";
import {VariableService} from "../../../services/variable.service";
import {FormattingService} from "../../../services/formatting.service";

@Component({
  selector: 'app-theme-form',
  templateUrl: './theme-form.component.html',
  styleUrls: ['./theme-form.component.scss']
})
export class ThemeFormComponent implements OnInit {

  public themeForm: FormGroup;
  format:Formatting;
  public isAdmin;

  constructor(public formBuilder: FormBuilder,public quizService: QuizService,public loupeService:LoupeService,public variableService:VariableService, private formattingService:FormattingService) {
    this.variableService.variable$.subscribe((variable) => {
      this.isAdmin = this.variableService.isConnected && this.variableService.isAdmin();
    });
    this.formattingService.getFormatting().subscribe((format)=> {
      this.format = format;
    })

    // Form creation
    this.themeForm = this.formBuilder.group({
      name: [null, Validators.required],
      idQuizList:[[]],
    });
  }

  ngOnInit() {
    this.loupeService.setup();
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
