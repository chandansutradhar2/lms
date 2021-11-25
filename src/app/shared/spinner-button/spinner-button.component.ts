import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

@Component({
  selector: 'infra-spinner-button',
  templateUrl: './spinner-button.component.html',
  styleUrls: ['./spinner-button.component.scss'],
})
export class SpinnerButtonComponent implements OnInit {
  @Input() label: string = 'SAVE';
  // @Input() style: {} = { width: '100%' };

  private _showIcon: boolean = false;

  @Output() buttonClicked: EventEmitter<void> = new EventEmitter();

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'spinner',
      sanitizer.bypassSecurityTrustResourceUrl(
        '../../../assets/images/spinner.svg'
      )
    );
  }

  ngOnInit(): void {}

  public get showIcon(): boolean {
    return this._showIcon;
  }

  @Input()
  public set showIcon(v: boolean) {
    this._showIcon = v;
  }

  click() {
    this.buttonClicked.emit();
  }
}
