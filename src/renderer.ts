import { Question, QuizResults } from "./questions.data";

const questionContainer = document.getElementById(
    "question-container"
) as HTMLDivElement;

const progress = document.getElementById("progress") as HTMLSpanElement;

export function renderQuestion(question: Question): void {
    const prompt = createQuestionPromptEl(question.prompt);
    const answers = question.possibleAnswers.map(createAnswerButton);

    questionContainer.replaceChildren(prompt, ...answers);
}

function createQuestionPromptEl(prompt: string): HTMLParagraphElement {
    const el = document.createElement("p");
    el.id = "question-prompt";
    el.textContent = prompt;

    return el;
}

function createAnswerButton(answer: string): HTMLButtonElement {
    const button = document.createElement("button");
    button.type = "text";
    button.value = answer;
    button.textContent = answer;

    return button;
}

export function renderResults(results: QuizResults): void {
    const p = document.createElement("p");
    p.textContent = `Preguntas Acertadas`;
    p.id = "quiz-results-text";
    const resultsEl = document.createElement("p");
    resultsEl.id = "quiz-results";
    resultsEl.textContent = `${results.numberOfValidAnswers} / ${results.numberOfQuestions}`;

    questionContainer.replaceChildren(p, resultsEl);
}

export function renderProgress(pct: number): void {
    progress.style.transform = `scaleX(${pct})`;
}
