import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  styleUrls: [ './navbar.component.less' ],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {

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

}
