import { Component, OnInit } from '@angular/core';
import {LoginService} from "../../services/login.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  items: any[];

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    this.items = [
      {
        icon: 'home',
        link: '/home',
        toltip: 'Início'
      },
      {
        icon: 'payments',
        link: '/movimentos',
        toltip: 'Movimentos'
      },
      {
        icon: 'event',
        link: '/periodos',
        toltip: 'Períodos'
      }
    ]
  }

  logout() {
    this.loginService.logout().then().catch();
  }
}
