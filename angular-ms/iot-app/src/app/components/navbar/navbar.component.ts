import { Component, OnInit } from '@angular/core';

import { DropdownMenuOption } from '@shared/dropdown-menu-option';

@Component({
  selector: 'app-navbar',
  styleUrls: [ './navbar.component.less' ],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {

  icon: string = 'keyboard_arrow_down';
  options: DropdownMenuOption[] = [
    { link: '/temperature/realtime', name: 'Tiempo real' },
    { link: '/temperature/history', name: 'Historial' },
    { link: '#', name: 'Estadísticas' },
    { link: '#', name: 'Predicciones' }
  ];
  today: string = this.getToday();

  constructor() { }

  ngOnInit() {

  }

  private getToday(): string {
    const date: Date = new Date();
    const day: number = date.getDate();
    const month: number = date.getMonth() + 1;
    const year: number = date.getFullYear();

    const correct = (n: number): string => n < 10 ? `0${n}` : `${n}`;

    return `${correct(day)}/${correct(month)}/${year}`;
  }

  menuClosed() {
    this.icon = 'keyboard_arrow_down';
  }

  menuOpened() {
    this.icon = 'keyboard_arrow_up';
  }

}
