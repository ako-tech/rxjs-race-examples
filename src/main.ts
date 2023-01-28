import {
    fromEvent,
    map,
    tap,
    race,
    timer,
    repeat,
    switchMap,
    take,
    last,
} from "rxjs";
import { updateTimeLeftLabel } from "./renderer";
import { loader, updateResults } from "./results-manager";
import "./style.css";

const refreshButton = document.getElementById("refresh-button");
const refreshButtonClick$ = fromEvent(refreshButton!, "click");
const manualRefresh$ = refreshButtonClick$.pipe(take(1));

const autoRefreshTimeInSeconds = 5;
const autoRefresh$ = timer(0, 1_000).pipe(
    take(autoRefreshTimeInSeconds + 1),
    map((secondsElapsed) => autoRefreshTimeInSeconds - secondsElapsed),
    tap((secondsLeft) => updateTimeLeftLabel(secondsLeft)),
    last()
);

race([manualRefresh$, autoRefresh$])
    .pipe(
        switchMap((_) => race([loader(), updateResults()])),
        repeat(2)
    )
    .subscribe();
