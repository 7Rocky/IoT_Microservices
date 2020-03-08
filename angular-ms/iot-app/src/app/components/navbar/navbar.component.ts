import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  styleUrls: [ './navbar.component.less' ],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {
  icon: string = 'keyboard_arrow_down';
  today: string = new Date().toLocaleDateString();

  constructor() { }

  ngOnInit() {

  }

  menuClosed() {
    this.icon = 'keyboard_arrow_down';
  }

  menuOpened() {
    this.icon = 'keyboard_arrow_up';
  }

}
