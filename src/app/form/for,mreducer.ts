import { Action } from '@ngrx/store';
import * as FormActions from './form.actions';
import { Form } from './form.model';

const newState = (state: Form, newData: any) => {
  return Object.assign({}, state, newData.payload);
};

export function formReducer(state: Form, action: Action): any {
  switch (action.type) {
    case FormActions.SAVE:
      return newState(state, action);
    default:
      return state;
  }
}
