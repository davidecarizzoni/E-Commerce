import { Injectable } from '@angular/core';
import { HttpCommunicationsService } from 'src/app/core/http-communication/http-communication.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {switchMap, map, catchError, tap} from 'rxjs/operators';
import { Clothes } from 'src/app/core/model/clothes.interface';
import { initClothes, retrieveAllClothes } from './clothes.action';

@Injectable()
export class ClothesEffects{

    constructor(private actions$: Actions, private httpCommunicationSercive: HttpCommunicationsService) {}

    retrieveAllClothes$ = createEffect(() => this.actions$.pipe(
        ofType(retrieveAllClothes),
        switchMap(() => this.httpCommunicationSercive.retrieveGetCall<Clothes[]>('clothes').pipe(
            tap(clothes => console.log(clothes)),
            map((clothes) => initClothes({clothes}))
        ))
    ));
}