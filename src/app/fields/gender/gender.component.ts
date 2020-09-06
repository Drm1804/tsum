import { Component, OnInit } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { AkitaNgFormsManager } from '@datorama/akita-ng-forms-manager';
import { PersistNgFormPlugin } from '@datorama/akita';
import { OnBoardingQuery } from '../../state/on-boarding.query';

@Component({
  selector: 'app-gender',
  templateUrl: './gender.component.html',
})
export class GenderComponent implements OnInit {
  pngfp: PersistNgFormPlugin;
  parentForm: any;

  constructor(
    private parentControl: ControlContainer,
    private formsManager: AkitaNgFormsManager<any>,
    private query: OnBoardingQuery
  ) { }

  ngOnInit(): void {
    this.parentForm = this.parentControl.control;
    this.formsManager.upsert('gender', this.parentForm);
    this.pngfp = new PersistNgFormPlugin(this.query, 'form').setForm(this.parentForm);
  }
}
