import {Component, OnInit} from '@angular/core';
import {MovementService} from "../../services/movement.service";
import {InfoUser} from "../../domain/info-user";
import {Movement} from "../../domain/movement";
import {MatDialog} from "@angular/material/dialog";
import {DialogMovementComponent} from "./dialog-movement/dialog-movement.component";
import * as firebase from 'firebase';
import {MatBottomSheet} from "@angular/material/bottom-sheet";

@Component({
  selector: 'app-movements',
  templateUrl: './movements.component.html',
  styleUrls: ['./movements.component.css']
})
export class MovementsComponent implements OnInit {

  infoUser: InfoUser;
  movements: Movement[];
  cols: string[] = [];
  totalValue: number;
  credit: number;
  debit: number;

  constructor(
    private movementsService: MovementService,
    public dialog: MatDialog,
    public bottomShet: MatBottomSheet,
  ) {
  }

  ngOnInit(): void {
    this.getInfoUser();
  }

  getInfoUser() {
    this.credit = 0;
    this.debit = 0;
    const user = localStorage['user-flow']
    this.movementsService.getInfoUser(user).then(infoUser => {
      this.infoUser = infoUser[0];
      this.movementsService.getMovements(this.infoUser).subscribe(movements => {
        this.movements = movements;
        this.cols = ['date', 'description', 'type', 'value', 'actions'];
      });
    }).catch(e => {
    });
  }

  openNewMovement() {
    const dialogRef = this.dialog.open(DialogMovementComponent);
    dialogRef.componentInstance.infoUser = this.infoUser;
  }

  replaceTypeMovement(type) {
    switch (type) {
      case 'CREDIT' : {
        return 'Entrada';
      }
      case 'DEBIT' : {
        return 'Saída';
      }
    }
  }

  getTotal() {
    this.credit = this.movements.filter(item => item.type === 'CREDIT').reduce((item, current) => item + current.value, 0);
    this.debit = this.movements.filter(item => item.type === 'DEBIT').reduce((item, current) => item + current.value, 0);
    this.totalValue = this.credit - this.debit;
    return this.totalValue
  }

  openEditMovement(movement: Movement) {
    const dialorEdit = this.dialog.open(DialogMovementComponent);
    dialorEdit.componentInstance.infoUser = this.infoUser;
    dialorEdit.componentInstance.formEdit = 'edit';
    dialorEdit.componentInstance.movementForm.patchValue({
      id: movement.id,
      date: movement.date.toDate(),
      description: movement.description,
      type: movement.type,
      value: movement.value,
    });
  }

  openRemoveMovement(movement: Movement) {
    const dialogRemove = this.bottomShet.open(DialogMovementComponent);
    dialogRemove.instance.infoUser = this.infoUser;
    dialogRemove.instance.movement = movement
    dialogRemove.instance.dialogOption = 'remove';
  }
}
