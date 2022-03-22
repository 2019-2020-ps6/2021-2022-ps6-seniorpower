import {NgModule} from '@angular/core';
import {RouterModule,Routes} from "@angular/router";
import {EditQuizComponent} from "./quizzes/edit-quiz/edit-quiz.component";
import {QuizListComponent} from "./quizzes/quiz-list/quiz-list.component";
import {UserListComponent} from "./users/user-list/user-list.component";
import {OptionsComponent} from "./options/options.component";

const routes: Routes = [
  {path:'quiz-list', component: QuizListComponent},
  {path: 'edit-quiz', component: EditQuizComponent},
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'detail/:id', component: EditQuizComponent },//Permet de relier à la page details
  {path:'user-list',component: UserListComponent},
  {path:'options',component:OptionsComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports:[RouterModule]
})

export class AppRoutingModule{

}
