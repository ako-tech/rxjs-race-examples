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
import { Answer, Question, questions, QuizResults } from "./questions.data";
import { renderQuestion, renderResults } from "./renderer";
import "./style.css";
import { createTimeout } from "./timeout";

from(questions)
    .pipe(
        concatMap(processQuestion),
        toArray(),
        map(processAnswers),
        tap(renderResults)
    )
    .subscribe(console.log);

function processQuestion(question: Question): Observable<[Question, Answer]> {
    return of(question).pipe(
        tap(renderQuestion),
        switchMap(() => {
            // obtener botones
            const answersBtns = document.querySelectorAll<HTMLButtonElement>(
                "#question-container button"
            );
            // crear observables alrededor del click de cada boton
            const answersClicks$ = Array.from(answersBtns).map(
                generateAnswerClickObservable
            );
            // combinar los observables de los clicks
            const timeout$ = createTimeout(5).pipe(map(() => ""));

            return race([...answersClicks$, timeout$]);
        }),
        map((answer) => [question, answer])
    );
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
