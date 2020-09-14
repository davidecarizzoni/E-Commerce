import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextComponent } from './components/input-text/input-text.component';
import { CustomizeFormComponent } from './components/customize-form/customize-form.component';


@NgModule({
  declarations: [
    InputTextComponent,
    CustomizeFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextComponent,
    CustomizeFormComponent
  ]
})
export class SharedModule { }
