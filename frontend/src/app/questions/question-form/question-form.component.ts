import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';

import { QuizService } from '../../../services/quiz.service';
import { Quiz } from '../../../models/quiz.model';
import {QuestionsComponent} from "../question/question.component";
import {QUESTION_SPORT, QUESTION_VIDE} from "../../../mocks/quiz-list.mock";
import {Question} from "../../../models/question.model";

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss']
})


export class QuestionFormComponent implements OnInit {
  @Input()
  quiz:Quiz|undefined;
  public questionForm: FormGroup;

  constructor(public formBuilder:FormBuilder, public quizService: QuizService) {
    //Form creation
    this.questionForm = this.formBuilder.group(
      {
        label:[''],
        answers: this.formBuilder.array([])
      });
  }

  ngOnInit() {
  }

  get answers(){
    return this.questionForm.get('answers') as FormArray;
  }


  private createAnswer(){
    return this.formBuilder.group({
      value: '',
      isCorrect: false,
    });
  }

  addAnswer(){
    this.answers.push(this.createAnswer());
  }

  addQuestion() {
    const questionToCreate: Question = this.questionForm.getRawValue() as Question;
    console.log('Add question: ', questionToCreate);
    this.quizService.addQuestion(questionToCreate, this.quiz?.id);
  }
}
