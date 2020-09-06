import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { Form } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ResultGuard implements CanActivate {
  constructor(private router: Router, private store: Store<Form>) {}
  canActivate(): Observable<boolean> {
    return this.store.pipe(
      take(1),
      mergeMap((f: any) => {
        return Boolean(Object.keys(f).length)
          ? of(true)
          : this.router.navigate(['/']);
      })
    );
  }
}
