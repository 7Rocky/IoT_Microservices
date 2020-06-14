import { MediaMatcher } from '@angular/cdk/layout'
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core'

@Component({
  selector: 'app-root',
  styleUrls: [ './app.component.less' ],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnDestroy, OnInit {

  ngOnInit() { }

  mobileQuery: MediaQueryList
  opened = false

  toggle(opened: boolean) {
    this.opened = !this.opened
  }

  private _mobileQueryListener: () => void

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)')
    this._mobileQueryListener = () => changeDetectorRef.detectChanges()
    this.mobileQuery.addListener(this._mobileQueryListener)
  }

  ngOnDestroy() {
    this.mobileQuery.removeListener(this._mobileQueryListener)
  }

  shouldRun = true
}
