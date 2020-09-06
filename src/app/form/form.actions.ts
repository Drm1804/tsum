import { Action } from '@ngrx/store';
import { Form } from './form.model';

export const SAVE = '[Form] Save';

export class Save implements Action {
  readonly type = SAVE;

  constructor(public payload: Form) {}
}

export type All = Save;
