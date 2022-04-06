import { Component, OnInit} from '@angular/core';
import { Quiz } from '../../../models/quiz.model';
import {ActivatedRoute} from "@angular/router";
import {QuizService} from "../../../services/quiz.service";
import {Location} from "@angular/common";
import {LoupeService} from "../../../services/loupe.service";

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
    private location: Location,
    public loupeService:LoupeService
  ) {
    this.quizService.quizSelected$.subscribe((quiz) => this.quiz = quiz);
  }

  ngOnInit():void {
    this.getQuiz();
    this.loupeService.setup();

  }

  getQuiz(): void {
    const id = String(this.route.snapshot.paramMap.get('id'));
    this.quizService.getQuizById(this.route.snapshot.paramMap.get('id'))
  }

  goBack(): void {
    this.location.back();
  }

}
