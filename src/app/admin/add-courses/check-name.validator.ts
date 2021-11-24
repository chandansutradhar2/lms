import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {
  AsyncValidator,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CheckNameValidator implements AsyncValidator {
  constructor(private firestore: AngularFirestore) {}

  validate(ctrl: AbstractControl): Promise<ValidationErrors | null> {
    return new Promise((resolve, reject) => {
      if (ctrl.value.length < 0) {
        resolve(null);
        return;
      }

      this.firestore
        .collection('courses', (ref) => ref.where('name', '==', ctrl.value))
        .get()
        .subscribe((doc) => {
          doc.empty ? resolve(null) : resolve({ nameExist: true });
        });
    });
  }
}
