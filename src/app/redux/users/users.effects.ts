import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap} from 'rxjs/operators';
import { HttpCommunicationsService } from 'src/app/core/http-communication/http-communication.service';
import { addUser, udpateUser } from './users.action';
import { User } from 'src/app/core/model/user.interface';

@Injectable()
export class UsersEffects {

    addUser$ = createEffect(() =>this.actions$.pipe(
        ofType(addUser),
        switchMap(action => this.httpCommunicationsService.retrievePostCall<User>("users",action.user).pipe(
            switchMap(user => {
                return [udpateUser({user})]
            }) 
        ))
    ));

    constructor(private actions$: Actions, private httpCommunicationsService: HttpCommunicationsService) {}
}