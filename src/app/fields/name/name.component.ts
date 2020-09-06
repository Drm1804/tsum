import { Component, OnInit } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { AkitaNgFormsManager } from '@datorama/akita-ng-forms-manager';
import { PersistNgFormPlugin } from '@datorama/akita';
import { cyrillicValidate } from '../utils';

@Component({
  selector: 'app-name',
  templateUrl: './name.component.html',
})
export class NameComponent implements OnInit {
  parentForm: any;
  private pngfp: PersistNgFormPlugin;
  constructor(
    private formsManager: AkitaNgFormsManager<any>,
    private parentControl: ControlContainer
  ) {}

  ngOnInit(): void {
    this.parentForm = this.parentControl.control;
    this.formsManager.upsert('form', this.parentForm);
  }

  validation(ev: any): boolean {
    return cyrillicValidate(ev);
  }
}
