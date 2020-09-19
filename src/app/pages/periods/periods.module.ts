import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PeriodsComponent} from "./periods.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {ReactiveFormsModule} from "@angular/forms";
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {MatSelectModule} from "@angular/material/select";


@NgModule({
  declarations: [PeriodsComponent],
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        ReactiveFormsModule,
        MatTableModule,
        MatButtonModule,
        MatSelectModule,
    ]
})
export class PeriodsModule { }
