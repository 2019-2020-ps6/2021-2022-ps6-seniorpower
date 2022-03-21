import { Quiz } from '../models/quiz.model';
import { Question } from '../models/question.model';

 export const QUESTION_ACTOR: Question = {
     label: 'Jean Gabin a joué dans...',
     answers: [
         {
             value: 'Les tuches II',
             isCorrect: false,
         },
        {
             value: 'La grande illusion',
            isCorrect: true,
         }
     ]
 };

 export const QUESTION_SPORT: Question = {
   label : 'Les jeux Olympiques 2022 ont lieu à ...',
   answers:[
     {
       value: 'Chine',
       isCorrect: true,
     },
     {
       value: 'Beijing',
       isCorrect: true,
     },
     {
       value: 'faux',
       isCorrect: false,
     }
   ]
 };

 export const QUESTION_VIDE: Question = {
   label : 'Question vide',
   answers:[

   ]
 }

export const QUIZ_LIST: Quiz[] = [
    {
        name: 'Les Acteurs', // What's happening if I change this value..?
        id: '0',
        theme: 'Actor',
        questions: [QUESTION_ACTOR],
    },
    {
        name: 'Les Sports',
        id: '1',
        theme : 'Ceci est un thème',
        questions: [QUESTION_SPORT],
    }
];
