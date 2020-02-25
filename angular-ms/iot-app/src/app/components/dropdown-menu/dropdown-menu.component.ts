import { Component, Input, OnInit } from '@angular/core';

import { DropdownMenuOption } from '@shared/dropdown-menu-option';

@Component({
  selector: 'app-dropdown-menu',
  styleUrls: [ './dropdown-menu.component.less' ],
  templateUrl: './dropdown-menu.component.html'
})
export class DropdownMenuComponent implements OnInit {
  @Input() prompt: string;
  @Input() options: DropdownMenuOption[];

  dropdownStyle: { display: string } = { display: 'none' };
  rotate: boolean = false;

  constructor() { }

  ngOnInit() {

  }

  toggleDropdown() {
    this.rotate = !this.rotate;
    this.dropdownStyle.display = this.rotate ? 'block' : 'none';
  }
}
