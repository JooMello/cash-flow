import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MovementsComponent} from "./movements.component";
import {MovementService} from "../../services/movement.service";
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import { DialogMovementComponent } from './dialog-movement/dialog-movement.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatInputModule} from "@angular/material/input";
import {MatDialogModule} from "@angular/material/dialog";
import {MAT_DATE_LOCALE, MatNativeDateModule} from "@angular/material/core";
import {CurrencyMaskModule} from "ng2-currency-mask";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatSelectModule} from "@angular/material/select";
import {MatIconModule} from "@angular/material/icon";
import {MatBottomSheetModule} from "@angular/material/bottom-sheet";


@NgModule({
  declarations: [MovementsComponent, DialogMovementComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    MatDialogModule,
    MatNativeDateModule,
    CurrencyMaskModule,
    MatSnackBarModule,
    MatSelectModule,
    MatIconModule,
    MatBottomSheetModule
  ],
  providers: [
    MovementService,
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }
    ]
})
export class MovementsModule { }
