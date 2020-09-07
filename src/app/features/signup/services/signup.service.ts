import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from 'src/app/core/model/user.interface';
import { saveCurrentUser, postUser } from 'src/app/redux/users/users.action';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private store: Store) { }

  insertUser(user: User){
    this.store.dispatch(postUser({user}))
  }
}
