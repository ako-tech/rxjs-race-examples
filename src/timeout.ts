import { Observable, timer, last, take, tap } from "rxjs";
import { renderProgress } from "./renderer";

export function createTimeout(lengthInSeconds: number): Observable<number> {
    return timer(0, 1000).pipe(
        take(lengthInSeconds + 1),
        tap({
            next: (tick) => renderProgress(tick / lengthInSeconds),
            finalize: () => renderProgress(0),
        }),
        last()
    );
}
