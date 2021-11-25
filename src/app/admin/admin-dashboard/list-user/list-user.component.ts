import { Component, OnInit } from '@angular/core';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss'],
})
export class ListUserComponent implements OnInit {
  userCount: number = 0;
  constructor(private dbSvc: DbService) {
    dbSvc.fetchDocs('users').then((r) => {
      this.userCount = r.length;
    });
  }

  ngOnInit(): void {}
}
