import { Question } from './question.model';

export interface Quiz {
    name: string;
    id: string;
    creationDate: string;
    questions: Question[];
}
