import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Movement} from "../../domain/movement";
import {MovementService} from "../../services/movement.service";
import {InfoUser} from "../../domain/info-user";

@Component({
  selector: 'app-periods',
  templateUrl: './periods.component.html',
  styleUrls: ['./periods.component.css']
})
export class PeriodsComponent implements OnInit {

  periodForm: FormGroup;
  movements: Movement[] = [];
  cols: string[] = ['date', 'description', 'type', 'value'];
  infouser: InfoUser;
  credit: number;
  debit: number;
  totalValue: number;
  types: any[];

  constructor(
    private formbuilder: FormBuilder,
    private movementService: MovementService,
  ) {
    this.periodForm = this.formbuilder.group({
      startDate: this.formbuilder.control(''),
      endDate: this.formbuilder.control(''),
      movement: this.formbuilder.control(''),
    });
  }

  ngOnInit(): void {
    this.getUser();
    this.types = [
      {name: 'Entrada', value: 'CREDIT'},
      {name: 'Saída', value: 'DEBIT'},
      {name: 'Entrada e Saída', value: 'DEBITANDCREDIT'},
    ]
  }

  getUser() {
    const user = localStorage['user-flow'];
    this.movementService.getInfoUser(user).then(user => {
      this.infouser = user[0];
    }).catch()
  }

  filterMovements() {
    const form = this.periodForm.getRawValue();
    console.log(form);
    if (form.movement === 'CREDIT' || form.movement === 'DEBIT') {
      return this.movementService.filterDatesAndMovements(this.infouser, form).subscribe(movements => {
        this.movements = movements;
        console.log(movements)
        this.getTotal();
      })
    } else if (form.movement === 'DEBITANDCREDIT') {
      return this.movementService.filterDates(this.infouser, form).subscribe(movements => {
        this.movements = movements;
        console.log(movements)
        this.getTotal();
      })
    }

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
}
