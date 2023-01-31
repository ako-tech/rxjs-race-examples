import { fromEvent, race, repeat, switchMap, timer } from "rxjs";
import { updateResults } from "./results-manager";
import "./style.css";

const refreshButton = document.getElementById("refresh-button");
const refreshButtonClick$ = fromEvent(refreshButton!, "click");

race([refreshButtonClick$, timer(5_000)])
    .pipe(
        switchMap((_) => updateResults()),
        repeat()
    )
    .subscribe();
