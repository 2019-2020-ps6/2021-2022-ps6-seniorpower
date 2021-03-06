import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Quiz } from '../../../models/quiz.model';
import { QuizService } from '../../../services/quiz.service';
import { Question } from '../../../models/question.model';
import {ColorStyle} from "../../../models/colorstyle.model";
import {ColorService} from "../../../services/color.service";
import { VariableService } from 'src/services/variable.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

  /**
   * Input here could be undefined, if the parent component doesn't give any quiz.
   * If you remove `undefined`, you will have an error saying:
   * "Property 'quiz' has no initializer and is not definitely assigned in the constructor."
   * We can also defined the initial value of the quiz in the constructor.
   */
  @Input()
  quiz: Quiz | undefined;

  @Output()
  quizSelected: EventEmitter<boolean> = new EventEmitter<boolean>();

  public questionList: Question[];
  public color:ColorStyle;

  public isAdmin;

  constructor(public quizService: QuizService, public colorService:ColorService,public variableService:VariableService) {
    this.quizService.questions$.subscribe((questionList) => {
      this.questionList = questionList;
    });
    this.colorService.color$.subscribe((color) => {
      this.color = color;
    });
    this.variableService.variable$.subscribe((variable) => {
      this.isAdmin = this.variableService.isAdmin();
    });
  }

  ngOnInit() {
    this.quizService.getQuestions(this.quiz.id)
  }

  selectQuiz() {
    this.quizSelected.emit(true);
  }

  deleteQuiz(quiz){
    console.log(quiz)
    this.quizService.deleteQuiz(quiz);
  }

}
