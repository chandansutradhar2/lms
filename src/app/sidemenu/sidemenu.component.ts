import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

interface Menu {
  name: string;
  icon: string;
  url: string;
}

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss'],
})
export class SidemenuComponent implements OnInit {
  // @Input('showHide') toggleMenu: boolean = false;
  private _toggleMenu: boolean = false;
  menus: Menu[] = [
    { name: 'Home', url: 'home', icon: 'home' },
    { name: 'About Us', url: 'aboutus', icon: 'beenhere' },
    { name: 'Courses', url: 'courses', icon: 'book' },
    { name: 'My Profile', url: 'profile', icon: 'face' },
    { name: 'Logout', url: '', icon: 'settings_power' },
  ];
  public get toggleMenu(): boolean {
    return this._toggleMenu;
  }

  @Input('showHide')
  public set toggleMenu(v: boolean) {
    this._toggleMenu = v;
  }

  constructor(private router: Router) {}

  ngOnInit(): void {
    console.log(this.toggleMenu);
  }

  navigate(ev: Menu) {
    console.log(ev);
    ev.url.length == 0 ? this.logout() : this.router.navigate([ev.url]);
  }

  logout() {
    alert('logout invoked');
  }
}
