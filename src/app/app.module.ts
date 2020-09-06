import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormComponent } from './form/form.component';
import { NameComponent } from './fields/name/name.component';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { ReactiveFormsModule } from '@angular/forms';
import { AgeComponent } from './fields/age/age.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatSelectModule } from '@angular/material/select';
import { RelationshipComponent } from './fields/relationship/relationship.component';
import { GenderComponent } from './fields/gender/gender.component';
import { MatRadioModule } from '@angular/material/radio';
import { ChildsComponent } from './fields/childs/childs.component';
import { EmailComponent } from './fields/email/email.component';
import { CommentComponent } from './fields/comment/comment.component';
import {TextFieldModule} from '@angular/cdk/text-field';
import { ErrorsComponent } from './fields/errors/errors.component';
import {MatButtonModule} from '@angular/material/button';
import {StoreModule} from '@ngrx/store';
import { formReducer } from './form/for,mreducer';
import { ResultComponent } from './result/result.component';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    NameComponent,
    AgeComponent,
    RelationshipComponent,
    GenderComponent,
    ChildsComponent,
    EmailComponent,
    CommentComponent,
    ErrorsComponent,
    ResultComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    // Material
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMomentDateModule,
    MatSelectModule,
    MatRadioModule,
    MatRadioModule,
    TextFieldModule,
    MatButtonModule,
    StoreModule.forRoot({message: formReducer})
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
