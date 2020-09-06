import { Component, OnInit } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { AkitaNgFormsManager } from '@datorama/akita-ng-forms-manager';

@Component({
  selector: 'app-childs',
  templateUrl: './childs.component.html',
})
export class ChildsComponent implements OnInit {
  parentForm: any;
  constructor(
    private parentControl: ControlContainer,
    private formsManager: AkitaNgFormsManager<any>
  ) {}

  ngOnInit(): void {
    this.parentForm = this.parentControl.control;
    this.formsManager.upsert('form', this.parentForm);
  }

  customValidate(event: any): boolean {
    if (event.keyCode === 43) {
      this.increaseValue(this.parentForm.value.child);
      return false;
    }

    if (event.keyCode === 45) {
      this.decreaseValue(this.parentForm.value.child);
      return false;
    }

    if (/[0-9]/.test(String.fromCharCode(event.keyCode))) {
      return true;
    }
    event.preventDefault();
    return false;
  }

  private increaseValue(value: string): void {
    return this.parentControl.control.patchValue({
      child: String(Number(value) + 1),
    });
  }

  private decreaseValue(value: string): void {
    const val = Number(value);
    if (val < 1) {
      return;
    }
    return this.parentControl.control.patchValue({
      child: String(val - 1),
    });
  }
}
