import { Component, OnInit } from '@angular/core';
import { FormGroup, ControlContainer, Validators } from '@angular/forms';
import { AkitaNgFormsManager } from '@datorama/akita-ng-forms-manager';
import { OnBoardingQuery } from '../../state/on-boarding.query';
import { PersistNgFormPlugin } from '@datorama/akita';
import * as _moment from 'moment';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';

const moment = _moment;

@Component({
  selector: 'app-age',
  templateUrl: './age.component.html',
  providers: [
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
  ],
})
export class AgeComponent implements OnInit {
  parentForm: any;
  private pngfp: PersistNgFormPlugin;

  constructor(
    private parentControl: ControlContainer,
    private formsManager: AkitaNgFormsManager<any>,
    private query: OnBoardingQuery
  ) {}

  ngOnInit(): void {
    this.parentForm = this.parentControl.control;
    this.formsManager.upsert('form', this.parentForm);
    this.pngfp = new PersistNgFormPlugin(this.query, 'form').setForm(this.parentForm);
  }
}
