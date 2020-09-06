import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormComponent } from './form/form.component';
import { ResultComponent } from './result/result.component';
import { ResultGuard } from './result/resul.guard';

const routes: Routes = [
  {
    path: '',
    component: FormComponent,
  },
  {
    path: 'result',
    component: ResultComponent,
    canActivate: [ResultGuard],
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
