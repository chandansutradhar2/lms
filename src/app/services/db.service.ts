import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DbService {
  constructor() {}

  createDocWithId(collectionName: string, doc: any, docId: string) {}
  createDoc(collectionName: string, doc: any) {}

  deleteDoc() {}

  updateDoc() {}

  fetchDocById(id: string) {}
}
