import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {AsideComponent} from './aside/aside.component';
import { AppComponent } from './app.component';
import { QuizListComponent } from './quizzes/quiz-list/quiz-list.component';
import { QuizComponent } from './quizzes/quiz/quiz.component';
import { HeaderComponent } from './header/header.component';
import { QuizFormComponent } from './quizzes/quiz-form/quiz-form.component';
import {EditQuizComponent} from "./quizzes/edit-quiz/edit-quiz.component";
import {AppRoutingModule} from "./app.routing.module";
import {QuestionsComponent} from "./questions/question/question.component";
import {QuestionFormComponent} from "./questions/question-form/question-form.component";
import {QuestionListComponent} from "./questions/question-list/question-list.component";
import {UserComponent} from "./users/user/user.component";
import {UserListComponent} from "./users/user-list/user-list.component";
import {UserFormComponent} from "./users/user-form/user-form.component";
import {OptionsComponent} from "./options/options.component";
import {PlayQuizComponent} from "./quizzes/play-quiz/play-quiz.component";
import {MenuComponent} from "./menu/menu.component";
import {ThemeComponent} from "./themes/theme/theme.component";
import {ThemeListComponent} from "./themes/theme-list/theme-list.component";
import {ThemeViewComponent} from "./themes/theme-view/theme-view.component";
@NgModule({
  declarations: [
    AppComponent,
    AsideComponent,
    QuizListComponent,
    QuizComponent,
    HeaderComponent,
    QuizFormComponent,
    EditQuizComponent,
    QuestionsComponent,
    QuestionFormComponent,
    QuestionListComponent,
    UserComponent,
    UserFormComponent,
    ThemeViewComponent,
    UserListComponent,
    OptionsComponent,


    UserListComponent,
    PlayQuizComponent,
    OptionsComponent,
    MenuComponent,
    ThemeComponent,
    ThemeListComponent

  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
