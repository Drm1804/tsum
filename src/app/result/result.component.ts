import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { FIELDS_NAME_MAPPING } from '../fields/utils';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
})
export class ResultComponent {
  constructor(public store: Store) {}

  mapping(key: string): string {
    return FIELDS_NAME_MAPPING[key];
  }
}
