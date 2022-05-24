import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';

import { QuizService } from '../../../services/quiz.service';
import { Quiz } from '../../../models/quiz.model';
import {Question} from "../../../models/question.model";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss']
})


export class QuestionFormComponent implements OnInit {
  @Input()
  quiz:Quiz;
  public questionForm: FormGroup;

  constructor(public formBuilder:FormBuilder, public quizService: QuizService,
    private route: ActivatedRoute,) {
    this.quizService.quizSelected$.subscribe((quiz) => this.quiz = quiz);
    //Form creation
    this.questionForm = this.formBuilder.group(
      {
        id:[''],
        label:[''],
        answers: this.formBuilder.array([])
      });
  }

  ngOnInit() {
    this.quizService.getQuizById(this.route.snapshot.paramMap.get('id'));
  }

  get answers(){
    return this.questionForm.get('answers') as FormArray;
  }


  private createAnswer(){
    return this.formBuilder.group({
      value: '',
      isCorrect: false
    });
  }

  addAnswer(){
    this.answers.push(this.createAnswer());
  }

  addQuestion() {
    this.questionForm.patchValue({
      id:Date.now(),
    });
    const questionToCreate: Question = this.questionForm.getRawValue() as Question;
    console.log('Add question: ', questionToCreate);
    this.quizService.addQuestion(questionToCreate, this.quiz.id);
  }

  deleteAnswer(){
    this.answers.removeAt(this.answers.length-1);
  }
}
