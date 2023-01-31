import { fromEvent, switchMap } from "rxjs";
import { updateResults } from "./results-manager";
import "./style.css";

const refreshButton = document.getElementById("refresh-button");
const refreshButtonClick$ = fromEvent(refreshButton!, "click");

refreshButtonClick$.pipe(switchMap((_) => updateResults())).subscribe();
