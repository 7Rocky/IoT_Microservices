import { Component, OnInit } from '@angular/core';

import { DropdownMenuOption } from '@shared/dropdown-menu-option';

@Component({
  selector: 'app-navbar',
  styleUrls: [ './navbar.component.less' ],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {
  options: DropdownMenuOption[] = [
    { link: '/', name: 'Temperatura' },
    { link: '/', name: 'Humedad' }
  ];

  constructor() { }

  ngOnInit() {

  }

}