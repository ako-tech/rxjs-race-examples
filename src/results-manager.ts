import { delay, Observable, of, tap } from "rxjs";
import {
    disableAutoRefreshBtn,
    enableAutoRefreshBtn,
    renderResults,
    showLoader,
} from "./renderer";

const dummyData = [
    "Primer Resultado",
    "Segundo Resultado",
    "Tercer Resultado",
    "...",
];

export function updateResults(): Observable<string[]> {
    return of(dummyData).pipe(
        delay(1000),
        tap({
            subscribe: () => {
                disableAutoRefreshBtn();
                showLoader();
            },
            next: (results) => {
                enableAutoRefreshBtn();
                renderResults(results);
            },
        })
    );
}
