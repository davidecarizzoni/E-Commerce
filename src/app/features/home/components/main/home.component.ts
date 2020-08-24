import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { map, filter } from 'rxjs/operators';
import { getCurrentUser } from 'src/app/redux/users';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  //return user using NgRx store and pipe method
  get user(): Observable<string> {
    return this.store.pipe(
      select(getCurrentUser),//current user logged
      filter(user => !!user),
      map(user => user.name)
    );
  }

  constructor(private store: Store) {}

  ngOnInit(): void {}

}