import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class DbService {
  constructor(private firestore: AngularFirestore) {}

  createDocWithId(collectionName: string, doc: any, docId: string) {
    return this.firestore.collection(collectionName).doc(docId).set(doc);
  }
  createDoc(collectionName: string, doc: any) {
    return this.firestore.collection(collectionName).add(doc);
  }

  deleteDoc() {}

  updateDoc() {}

  watchDocForChange() {
    return new Observable((obs) => {});
  }

  fetchDocs(collectionName: string): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.firestore
        .collection(collectionName)
        .get()
        .subscribe((r) => {
          if (r.empty) {
            reject('no documents found');
          } else {
            let arr: any[] = [];
            r.docs.forEach((doc) => {
              arr.push(doc.data());
            });
            resolve(arr);
          }
        });
    });
  }

  fetchDocById(id: string) {}
}
