import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index',
  styleUrls: [ './index.component.less' ],
  templateUrl: './index.component.html'
})
export class IndexComponent implements OnInit {

  showBtn1 = false
  showBtn2 = false
  showBtn3 = false

  constructor() { }

  ngOnInit() { }

}
