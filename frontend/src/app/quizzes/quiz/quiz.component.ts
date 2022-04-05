import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Quiz } from '../../../models/quiz.model';
import { QuizService } from '../../../services/quiz.service';
import { Question } from '../../../models/question.model';

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

  constructor(public quizService: QuizService) {
    this.quizService.questions$.subscribe((questionList) => {
      this.questionList = questionList;
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
