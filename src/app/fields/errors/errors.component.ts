import { Component, Input } from '@angular/core';
import { FIELDS_NAME_MAPPING } from '../utils';

@Component({
  selector: 'app-errors',
  templateUrl: './errors.component.html',
  styleUrls: ['./errors.component.css'],
})
export class ErrorsComponent {
  @Input() errors: FormError[];
  fieldsMaping(field: string): string {
    return FIELDS_NAME_MAPPING[field];
  }
}

export interface FormError {
  control: string;
  error: string;
  value: string;
}
