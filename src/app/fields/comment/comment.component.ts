import { Component, OnInit } from '@angular/core';
import { ControlContainer} from '@angular/forms';
import { PersistNgFormPlugin } from '@datorama/akita';
import { AkitaNgFormsManager } from '@datorama/akita-ng-forms-manager';
import { cyrillicValidate } from '../utils';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
})
export class CommentComponent implements OnInit {
  parentForm: any;
  constructor(
    private parentControl: ControlContainer,
    private formsManager: AkitaNgFormsManager<any>
  ) {}

  ngOnInit(): void {
    this.parentForm = this.parentControl.control;
    this.formsManager.upsert('form', this.parentForm);
  }

  validation(ev: any): boolean {
    return cyrillicValidate(ev);
  }
}
