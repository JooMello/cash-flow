import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MovementService} from "../../../services/movement.service";
import {InfoUser} from "../../../domain/info-user";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TypeMovement} from "../../../domain/type-movement";
import {Movement} from "../../../domain/movement";
import {MatBottomSheet} from "@angular/material/bottom-sheet";

@Component({
  selector: 'app-dialog-movement',
  templateUrl: './dialog-movement.component.html',
  styleUrls: ['./dialog-movement.component.css']
})
export class DialogMovementComponent implements OnInit {

  movementForm: FormGroup;
  infoUser: InfoUser;
  typeMovement: TypeMovement[] = []
  movement: Movement;
  formEdit: string;
  dialogOption: string;

  constructor(
    private formBuilder: FormBuilder,
    private movementService: MovementService,
    public dialog: MatDialog,
    public bottomShet: MatBottomSheet,
    public snackBar: MatSnackBar,
  ) {
    this.movementForm = this.formBuilder.group({
      id: this.formBuilder.control(''),
      date: this.formBuilder.control('', Validators.required),
      description: this.formBuilder.control('', Validators.required),
      type: this.formBuilder.control('', Validators.required),
      value: this.formBuilder.control('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.getTypeMovement();
  }

  getTypeMovement() {
    this.movementService.getTypeMovement().subscribe(type => {
      this.typeMovement = type;
    });
  }

  addNewMovement() {
    const movement = this.movementForm.getRawValue();
    this.movementService.addMovement(this.infoUser, movement).then(() => {
      this.dialog.closeAll();
      this.snackBar.open('Movimento incluído!', '', {
        duration: 5000
      });
    }).catch();
  }

  updateMovement() {
    const movement = this.movementForm.getRawValue();
    this.movementService.updateMovement(this.infoUser, movement).then(() => {
      this.dialog.closeAll();
      this.snackBar.open('Movimento Alterado!', '', {
        duration: 5000
      });
    }).catch();
  }


  removeMovement() {
    this.movementService.removeMovement(this.infoUser, this.movement).then(() => {
      this.bottomShet.dismiss();
      this.snackBar.open('Movimento Removido!', '', {
        duration: 5000
      });
    }).catch()
  }

  closeBottomShet() {
    this.bottomShet.dismiss()
  }
}
