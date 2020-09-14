import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomizeRoutingModule } from './customize-routing.module';
import { CustomizeComponent } from './components/customize.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [CustomizeComponent],
  imports: [
    CommonModule,
    CustomizeRoutingModule,
    SharedModule
  ]
})
export class CustomizeModule { }
