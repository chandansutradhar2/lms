import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  //step 1:
  @Output() menuButtonClicked: EventEmitter<any> = new EventEmitter();
  private _isLoggedIn: boolean = false;

  @Input()
  public set isLoggedIn(v: boolean) {
    this._isLoggedIn = v;
  }

  public get isLoggedIn(): boolean {
    return this._isLoggedIn;
  }

  constructor() {}

  ngOnInit(): void {}

  menuIconClicked() {
    //step 2: emit the event
    this.menuButtonClicked.emit();
  }
}
