import { Component, EventEmitter, OnInit, Output } from '@angular/core'

@Component({
  selector: 'app-navbar',
  styleUrls: [ './navbar.component.less' ],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {

  isOpen = false
  @Output() opened = new EventEmitter<boolean>()
  today = new Date()

  constructor() { }

  ngOnInit() { }

  toggle() {
    this.isOpen = !this.isOpen
    this.opened.emit(this.isOpen)
  }

}
