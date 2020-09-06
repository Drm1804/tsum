import { Component, OnInit } from '@angular/core';
import { OnBoardingQuery } from '../state/on-boarding.query';
import { skip, take } from 'rxjs/operators';
import { Subject, interval } from 'rxjs';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ValidationErrors,
  FormControl,
} from '@angular/forms';
import * as moment from 'moment';
import { Form } from './form.model';
import { Store } from '@ngrx/store';
import * as FormActions from './form.actions';
import { Router } from '@angular/router';

interface FormStore {
  form: Form;
}
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
})
export class FormComponent implements OnInit {
  mainForm: FormGroup;
  isAdult$ = new Subject();
  isSubmitDisable$ = new Subject();
  formErrors$ = new Subject();
  private attemptConunter$ = new Subject();
  constructor(
    private q: OnBoardingQuery,
    private fb: FormBuilder,
    private store: Store<FormStore>,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.subscribeToFormChanges();
    this.formCleaner();
    this.additionContolsWatcher();
  }

  createForm(): void {
    this.mainForm = this.fb.group({
      name: ['', [Validators.required]],
      gender: ['', Validators.required],
      age: [moment(), Validators.required],
      child: [''],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
        ],
      ],
      comment: [''],
    });
  }

  subscribeToFormChanges(): void {
    /**
     * На самом деле тут не обязательно слушать стор, и отдельно стримить данные
     * можно использовать ангуляровские формы,
     *
     *          this.reactiveForm.valueChanges.subscribe(x => {
     *              console.log('form value changed')
     *              console.log(x)
     *          })
     *
     * думаю, если бы я делал это для прода, я бы использовал реактивные формы, но мне было интересно попробовать
     * пойти этим путем, потому что я никогда не работал с этими инструментами и мне интересно было попробовать
     */

    this.q
      .select((state) => state.form.age)
      .pipe(skip(1))
      .subscribe(() => {
        this.checkAdult(this.q.getValue().form.age.format('YYYY'));
      });
  }

  tryToSave(): void {
    this.getFormErrors();
  }

  private sendData(): void {
    this.store.dispatch(new FormActions.Save(this.mainForm.value));
    this.router.navigate(['/result']);
  }

  private checkAdult(age: string): void {
    this.isAdult$.next(Number(moment().format('YYYY')) - Number(age) > 18);
  }

  private formCleaner(): void {
    this.attemptConunter$.pipe(skip(2)).subscribe(() => {
      this.formErrors$.next([]);
      this.mainForm.reset();
    });
  }

  private additionContolsWatcher(): void {
    this.isAdult$.subscribe((val: boolean) => {
      if (val && !this.mainForm.controls.relationship) {
        return this.mainForm.addControl(
          'relationship',
          new FormControl('', Validators.required)
        );
      }

      if (!val && !!this.mainForm.controls.relationship) {
        return this.mainForm.removeControl('relationship');
      }
    });
  }

  private getFormErrors(): void {
    const result: any[] = [];
    Object.keys(this.mainForm.controls).forEach((key: string) => {
      const controlErrors: ValidationErrors = this.mainForm.get(key).errors;

      if (controlErrors) {
        Object.keys(controlErrors).forEach((keyError) => {
          result.push({
            control: key,
            error: keyError,
            value: controlErrors[keyError],
          });
        });
      }
    });
    if (result.length) {
      this.tempDisable();
      this.formErrors$.next(result);
      this.attemptConunter$.next(null);
    } else {
      this.sendData();
    }
  }

  tempDisable(): void {
    this.isSubmitDisable$.next(true);

    interval(1000)
      .pipe(take(10))
      .subscribe(
        () => {},
        () => {},
        () => {
          this.isSubmitDisable$.next(false);
        }
      );
  }
}
