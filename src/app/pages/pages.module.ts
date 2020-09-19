import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MovementsModule} from "./movements/movements.module";
import {HomeModule} from "./home/home.module";
import { PeriodsComponent } from './periods/periods.component';
import {PeriodsModule} from "./periods/periods.module";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MovementsModule,
    PeriodsModule,
    HomeModule
  ]
})
export class PagesModule { }
