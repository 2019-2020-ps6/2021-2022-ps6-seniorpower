import { Component, OnInit} from '@angular/core';
import { Quiz } from '../../../models/quiz.model';
import {ActivatedRoute} from "@angular/router";
import {QuizService} from "../../../services/quiz.service";
import {Location} from "@angular/common";

@Component({
  selector: 'app-edit-quiz',
  templateUrl: './edit-quiz.component.html',
  styleUrls: ['./edit-quiz.component.scss']
})
export class EditQuizComponent implements OnInit {
  quiz:Quiz|undefined;

  constructor(
    private route: ActivatedRoute,
    private quizService: QuizService,
    private location: Location
  ) {}

  ngOnInit():void {
    this.getQuiz();

  }

  getQuiz(): void {
    const id = String(this.route.snapshot.paramMap.get('id'));
    this.quizService.getQuiz(id)
      .subscribe(quiz => this.quiz = quiz);
  }

  goBack(): void {
    this.location.back();
  }

}
