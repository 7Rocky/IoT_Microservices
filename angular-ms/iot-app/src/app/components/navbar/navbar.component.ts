import { Component, EventEmitter, OnInit, Output } from '@angular/core'

@Component({
  selector: 'app-navbar',
  styleUrls: [ './navbar.component.less' ],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {

  isOpen = false
  @Output() opened = new EventEmitter<boolean>()
  today = this.getToday()

  constructor() { }

  ngOnInit() { }

  toggle() {
    this.isOpen = !this.isOpen
    this.opened.emit(this.isOpen)
  }

  private getToday() {
    const date = new Date()
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()

    const correct = (n: number) => n < 10 ? `0${n}` : `${n}`

    return `${correct(day)}/${correct(month)}/${year}`
  }

}
