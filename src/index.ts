import { fromEvent, zip } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';

const input = document.querySelector('input');

const observable = fromEvent(input, 'input');

observable.pipe(
  debounceTime(500),
  switchMap((event: KeyboardEvent) =>
    fetch(`https://gitlab.com/api/v4/projects?search=${(event.target as HTMLInputElement).value}`)
      .then(response => response.json())
  )
).subscribe(
  response => {
    console.log(response.length);
  }
);
