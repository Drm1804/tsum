import { Component, OnInit } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { AkitaNgFormsManager } from '@datorama/akita-ng-forms-manager';
@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
})
export class EmailComponent implements OnInit {
  parentForm: any;
  constructor(
    private parentControl: ControlContainer,
    private formsManager: AkitaNgFormsManager<any>
  ) {}

  ngOnInit(): void {
    this.parentForm = this.parentControl.control;
    this.formsManager.upsert('form', this.parentForm);
  }
}
