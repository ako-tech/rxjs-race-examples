export type Answer = string;
export interface Question {
    prompt: string;
    possibleAnswers: Answer[];
    validAnswer: Answer;
}
type Questions = Question[];

export interface QuizResults {
    numberOfQuestions: number;
    numberOfValidAnswers: number;
}

export const questions: Questions = [
    {
        prompt: "¿Cual es el resultado de 1+1?",
        possibleAnswers: ["2", "0", "3"],
        validAnswer: "2",
    },
    {
        prompt: "¿Cual es la capital de España?",
        possibleAnswers: ["Barcelona", "Madrid", "Sevilla"],
        validAnswer: "Madrid",
    },
];
