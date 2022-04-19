import {NgModule} from '@angular/core';
import {RouterModule,Routes} from "@angular/router";
import {EditQuizComponent} from "./quizzes/edit-quiz/edit-quiz.component";
import {QuizListComponent} from "./quizzes/quiz-list/quiz-list.component";
import {UserListComponent} from "./users/user-list/user-list.component";
import {OptionsComponent} from "./options/options.component";
import {MenuComponent} from "./menu/menu.component";
import {ThemeListComponent} from "./themes/theme-list/theme-list.component";
import {ThemeViewComponent} from "./themes/theme-view/theme-view.component";
import {AuthentificationComponent } from './authentification/authentification.component';


import {PlayQuizComponent} from "./quizzes/play-quiz/play-quiz.component";
const routes: Routes = [
  {path:'themes',component:ThemeListComponent},
  {path:'themes/:name', component: ThemeViewComponent},
  {path:'quiz-list', component: QuizListComponent},
  { path: 'menu', component: MenuComponent },
  { path: 'authentification', component: AuthentificationComponent },
  { path: '', redirectTo: '/authentification', pathMatch: 'full' },
  { path: 'detail/:id', component: EditQuizComponent },//Permet de relier à la page details
  {path:'user-list',component: UserListComponent},
  {path:'options',component:OptionsComponent},
  {path:'play-quiz/:id',component:PlayQuizComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports:[RouterModule]
})

export class AppRoutingModule{

}
