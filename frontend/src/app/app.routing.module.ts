import {NgModule} from '@angular/core';
import {RouterModule,Routes} from "@angular/router";
import {EditQuizComponent} from "./quizzes/edit-quiz/edit-quiz.component";
import {QuizListComponent} from "./quizzes/quiz-list/quiz-list.component";
import {UserListComponent} from "./users/user-list/user-list.component";
import {OptionsComponent} from "./options/options.component";
import {MenuComponent} from "./menu/menu.component";
import {ThemeComponent} from "./themes/theme/theme.component";
import {ThemeListComponent} from "./themes/theme-list/theme-list.component";

import {PlayQuizComponent} from "./play-quiz/play-quiz.component";
const routes: Routes = [
  {path:'themes',component:ThemeListComponent},
  {path:'themes./:id', component: QuizListComponent}, //TODO afficher les quiz d'un theme
  {path:'quiz-list', component: QuizListComponent},
  {path: 'edit-quiz', component: EditQuizComponent},
  { path: '', component: MenuComponent },
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
