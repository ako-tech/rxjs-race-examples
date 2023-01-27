const refreshButton = document.getElementById(
    "refresh-button"
) as HTMLButtonElement;
const resultsContainer = document.getElementById(
    "results-container"
) as HTMLDivElement;

export function enableAutoRefreshBtn(): void {
    refreshButton.disabled = false;
}
export function disableAutoRefreshBtn(): void {
    refreshButton.disabled = true;
}

export function updateTimeLeftLabel(timeLeft: number) {
    refreshButton.textContent = `Actualizar (${timeLeft})`;
}

export function showLoader(): void {
    resultsContainer.textContent = "Actualizando ...";
}

export function renderResults(results: string[]): void {
    const list = document.createElement("ul");
    const items = results.map((result) => {
        const el = document.createElement("li");
        el.textContent = result;
        return el;
    });
    list.append(...items);

    resultsContainer?.replaceChildren(list);
}
