import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DbService } from '../services/db.service';
import { StateService } from '../services/state.service';
import { UtilService } from '../services/util.service';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss'],
})
export class DemoComponent implements OnInit {
  constructor(
    private snackBar: MatSnackBar,
    private stateSvc: StateService,
    private utilSvc: UtilService,
    private dbSvc: DbService
  ) {}

  ngOnInit(): void {}
}
