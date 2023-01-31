import { fromEvent, exhaustMap, race, timer, take, repeat } from "rxjs";
import { updateResults } from "./results-manager";
import "./style.css";

const refreshButton = document.getElementById("refresh-button");
const refreshButtonClick$ = fromEvent(refreshButton!, "click");

race([refreshButtonClick$.pipe(take(1)), timer(5_000)])
    .pipe(
        exhaustMap((_) => updateResults()),
        repeat()
    )
    .subscribe();
