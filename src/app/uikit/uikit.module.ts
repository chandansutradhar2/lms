import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { SpinnerButtonComponent } from '../shared/spinner-button/spinner-button.component';
import { MatDialogModule } from '@angular/material/dialog';
import { PromptDialogComponent } from '../shared/prompt-dialog/prompt-dialog.component';

@NgModule({
  declarations: [SpinnerButtonComponent, PromptDialogComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatInputModule,
    MatToolbarModule,
    MatIconModule,
  ],
  exports: [
    CommonModule,
    MatButtonModule,
    MatInputModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatSnackBarModule,
    MatCardModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatTabsModule,
    MatDialogModule,
    SpinnerButtonComponent,
    PromptDialogComponent,
  ],
})
export class UikitModule {}
