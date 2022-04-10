export interface Answer {
    type?: string;
    value: string;
    isCorrect: boolean;
    id : string;
    questionId : string;
}

export interface Question {
    id: string;
    label: string;
    quizId: string;
    answers: Answer[];
}
