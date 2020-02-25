import { Component, OnInit } from '@angular/core';

import { DropdownMenuOption } from '@shared/dropdown-menu-option';

@Component({
  selector: 'app-login',
  styleUrls: [ './login.component.less' ],
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  options: DropdownMenuOption[] = [
    { link: '/', name: 'Mi perfil' },
    { link: '/', name: 'Configuración' },
    { link: '/', name: 'Cerrar sesión' }
  ];
  username: string = 'Rocky';

  constructor() { }

  ngOnInit() {

  }

}
