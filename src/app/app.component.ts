import { Component } from '@angular/core';

//meta data or decorator
@Component({
  selector: 'my-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'lmsapp';
  toggleState: boolean = true;

  clickHandler() {}

  toggleMenu() {
    this.toggleState ? (this.toggleState = false) : (this.toggleState = true);
  }
}
