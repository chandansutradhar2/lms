import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  constructor(private snackBar: MatSnackBar) {}

  showSnackBar(
    msg: string,
    duration: number = 4000,
    hPosition: any = 'right',
    vPosition: any = 'top'
  ) {
    this.snackBar.open(msg, 'OK', {
      duration: duration,
      horizontalPosition: hPosition,
      verticalPosition: vPosition,
    });
  }
}
