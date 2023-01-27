import {
    from,
    Observable,
    of,
    concatMap,
    map,
    tap,
    fromEvent,
    take,
    race,
    switchMap,
    toArray,
} from "rxjs";
import { Answer, Question, questionnaire, QuizResults } from "./questions.data";
import { renderQuestion, renderResults } from "./renderer";
import "./style.css";
import { createTimeout } from "./timeout";

function processQuestion(question: Question): Observable<[Question, Answer]> {
    return of(question).pipe(
        tap(renderQuestion),
        switchMap(() => {
            const answersClick$ = generateAnswersClickObservables();
            const timeout$ = createTimeout(5).pipe(map(() => ""));
            return race([...answersClick$, timeout$]);
        }),
        map((answer) => [question, answer])
    );
}

from(questionnaire)
    .pipe(
        concatMap(processQuestion),
        toArray(),
        map(processAnswers),
        tap(renderResults)
    )
    .subscribe(console.log);

function generateAnswersClickObservables(): Observable<Answer>[] {
    const buttons = document.querySelectorAll<HTMLButtonElement>(
        "#question-container button"
    );
    return Array.from(buttons).map(generateAnswerClickObservable);
}

function generateAnswerClickObservable(
    button: HTMLButtonElement
): Observable<Answer> {
    return fromEvent(button, "click").pipe(
        take(1),
        map((ev) => (ev.target as HTMLButtonElement).value)
    );
}

function processAnswers(results: [Question, Answer][]): QuizResults {
    const validAnswers = results.reduce(
        (acc, [question, answer]) =>
            question.validAnswer === answer ? acc + 1 : acc,
        0
    );

    return {
        numberOfQuestions: results.length,
        numberOfValidAnswers: validAnswers,
    };
}
