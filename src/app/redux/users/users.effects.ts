import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, tap } from 'rxjs/operators';
import { HttpCommunicationsService } from 'src/app/core/http-communication/http-communication.service';
import { Store } from '@ngrx/store';
import { retrieveAllUsers, initUsers, postUser, insertUser } from './users.action';
import { User } from 'src/app/core/model/user.interface';

@Injectable()
export class TodosEffects {

    //utilizzo la action che usa le chiamate HTTP -> GET
    retrieveAllUsers$ = createEffect(() => this.actions$.pipe(
        ofType(retrieveAllUsers),
        switchMap(() => this.httpCommunicationsService.retrieveGetCall<User[]>("users").pipe(
            map(users => initUsers({ users }))
        ))
    ));

    

    //utilizzo la action che usa le chiamate HTTP -> POST
    insertUser$ = createEffect(() => this.actions$.pipe(
        ofType(postUser),
        switchMap(action => this.httpCommunicationsService.retrievePostCall<User>("users/", action.user).pipe(
            switchMap(user => [insertUser({ user })])
        ))
    ))

    

    constructor(private actions$: Actions, private store: Store,
        private httpCommunicationsService: HttpCommunicationsService) {
    }
}