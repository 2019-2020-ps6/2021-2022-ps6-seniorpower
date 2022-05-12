import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder, Validators} from "@angular/forms";
import { QuizService } from '../../../services/quiz.service';
import { Quiz } from '../../../models/quiz.model';
import {Theme} from "../../../models/theme.model";
import {FormattingService} from "../../../services/formatting.service";
import {Formatting} from "../../../models/formatting.model";
import {ColorStyle} from "../../../models/colorstyle.model";
import {ColorService} from "../../../services/color.service";

@Component({
  selector: 'app-quiz-form',
  templateUrl: './quiz-form.component.html',
  styleUrls: ['./quiz-form.component.scss']
})


export class QuizFormComponent implements OnInit {
  public themeList:Theme[];
  public quizList:Quiz[];
  public format:Formatting;
  public color:ColorStyle;


  // Note: We are using here ReactiveForms to create our form. Be careful when you look for some documentation to
  // avoid TemplateDrivenForm (another type of form)

  /**
   * QuizForm: Object which manages the form in our component.
   * More information about Reactive Forms: https://angular.io/guide/reactive-forms#step-1-creating-a-formgroup-instance
   */
  public quizForm: FormGroup;

  constructor(public formBuilder: FormBuilder, public quizService: QuizService, public formattingService:FormattingService, public colorService:ColorService) {
    // Form creation
    this.quizForm = this.formBuilder.group({
      name: [null, Validators.required],
      creationDate: [''],
      id:[''],
      questions:[[]]
    });

    this.quizService.themes$.subscribe((themes: Theme[]) => {
      this.themeList = themes;
    });

    this.quizService.quizzes$.subscribe((quizzes: Quiz[]) => {
      this.quizList = quizzes;
    });

    this.formattingService.format$.subscribe((format:Formatting)=>{
      this.format = format;
    })

    this.colorService.color$.subscribe((color:ColorStyle)=>{
      this.color = color;
    })
    // You can also add validators to your inputs such as required, maxlength or even create your own validator!
    // More information: https://angular.io/guide/reactive-forms#simple-form-validation
    // Advanced validation: https://angular.io/guide/form-validation#reactive-form-validation
  }

  ngOnInit() {
  }

  addQuiz() {
    this.quizForm.patchValue({
      id:Date.now(),
      creationDate: "date"
    });
    // We retrieve here the quiz object from the quizForm and we cast the type "as Quiz".
    const quizToCreate: Quiz = this.quizForm.getRawValue() as Quiz;
    // Do you need to log your object here in your class? Uncomment the code below
    // and open your console in your browser by pressing F12 and choose the tab "Console".
    // You will see your quiz object when you click on the create button.
    console.log('Add quiz: ', quizToCreate);
    this.quizService.addQuiz(quizToCreate)
    this.quizService.addQuizToTheme(quizToCreate.id,this.quizService.getThemeByName( (<HTMLInputElement>document.getElementById("theme")).value));
    // Now, add your quiz in the list!
  }

  getAllThemeName(){
    let themeNameList = []
    for(let i = 0; i < this.themeList.length;i++ ){
      themeNameList.push(this.themeList[i].name);
    }
    return themeNameList;
  }



}
