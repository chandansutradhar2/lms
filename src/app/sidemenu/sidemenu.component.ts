import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss'],
})
export class SidemenuComponent implements OnInit {
  // @Input('showHide') toggleMenu: boolean = false;
  private _toggleMenu: boolean = false;
  public get toggleMenu(): boolean {
    return this._toggleMenu;
  }

  @Input('showHide')
  public set toggleMenu(v: boolean) {
    this._toggleMenu = v;
  }

  constructor() {}

  ngOnInit(): void {
    console.log(this.toggleMenu);
  }
}
