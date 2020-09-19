import { Component, OnInit } from '@angular/core';
import {MovementService} from "../../services/movement.service";
import {InfoUser} from "../../domain/info-user";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  infoUser: InfoUser
  constructor(private movementService: MovementService) { }

  ngOnInit(): void {
    this.getInfoUser();
  }

  getInfoUser () {
    const user = localStorage['user-flow'];
    this.movementService.getInfoUser(user).then(user => {
      this.infoUser = user[0];
    }).catch();
  }

}
