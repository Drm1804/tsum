import { Component, OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject, combineLatest, from, of, Subject } from 'rxjs';
import { OnBoardingQuery } from '../../state/on-boarding.query';
import { skip, takeUntil } from 'rxjs/operators';
import {
  ControlContainer,
} from '@angular/forms';
import { AkitaNgFormsManager } from '@datorama/akita-ng-forms-manager';

const list = [
  {
    label: 'женат',
    hideFor: 'female',
  },
  {
    label: 'замужем',
    hideFor: 'male',
  },
  {
    label: 'в разводе',
  },
  {
    label: 'нет',
  },
];
@Component({
  selector: 'app-relationship',
  templateUrl: './relationship.component.html',
})
export class RelationshipComponent implements OnInit, OnDestroy {
  parentForm: any;
  list$ = new BehaviorSubject(list);
  unsubscriber$ = new Subject();
  constructor(
    private parentControl: ControlContainer,
    private formsManager: AkitaNgFormsManager<any>,
    private query: OnBoardingQuery
  ) {}

  ngOnInit(): void {
    this.parentForm = this.parentControl.control;
    this.formsManager.upsert('gender', this.parentForm);
    combineLatest(
      of(list),
      this.query.select((state) => state.form.gender).pipe(skip(1))
    )
      .pipe(takeUntil(this.unsubscriber$))
      .subscribe((data) => {
        this.list$.next(
          data[0].filter((el: RelationItem) => el.hideFor !== data[1])
        );
      });
  }

  ngOnDestroy(): void {
    this.unsubscriber$.next(true);
  }
}

export interface RelationItem {
  label: string;
  hideFor?: string;
}
