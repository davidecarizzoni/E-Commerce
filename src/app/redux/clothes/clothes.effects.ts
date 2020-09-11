import { Injectable } from '@angular/core';
import { HttpCommunicationsService } from 'src/app/core/http-communication/http-communication.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {switchMap, map, catchError, tap} from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { User } from 'src/app/core/model/user.interface';
import { retrieveAllUsers } from '../users/users.action';
import { Clothes } from 'src/app/core/model/clothes.interface';
import { initClothes } from './clothes.action';

@Injectable()
export class clothesEffects{

    constructor(private actions$: Actions, private httpCommunicationSercive: HttpCommunicationsService) {}

    retrieveAllUsers$ = createEffect(() => this.actions$.pipe(
        ofType(retrieveAllUsers),
        switchMap(() => this.httpCommunicationSercive.retrieveGetCall<Clothes[]>("clothes").pipe(
            map((clothes) => initClothes({clothes}))
        ))
    ));
}