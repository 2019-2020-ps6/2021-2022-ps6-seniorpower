import {Quiz} from "./quiz.model";
import {QUESTION_ACTOR, QUESTION_SPORT} from "../mocks/quiz-list.mock.component";

export interface Answer {
    type?: string;
    value: string;
    isCorrect: boolean;
}

export interface Question {
    label: string;
    answers: Answer[];
}

export const AnswerFalse:Answer={
  value:"0",
  isCorrect: false
}
export const QUESTION_LIST: Question[] = [
  {
    label:'0',
    answers: [AnswerFalse]
  }
];
