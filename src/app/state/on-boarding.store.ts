import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { Moment } from 'moment';

export interface OnBoardingState {
  form: {
    name: string,
    age: Moment,
    gender: 'male' | 'female' | null,
    relationship: string;
    child: number,
    email: string,
    comment: string,
  };
}

export function createInitialState(): OnBoardingState {
  return {
    form: {
      name: null,
      age: null,
      gender: null,
      relationship: null,
      child: null,
      email: null,
      comment: null,
    }
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'on-boarding' })
export class OnBoardingStore extends Store<OnBoardingState> {

  constructor() {
    super(createInitialState());
  }
}