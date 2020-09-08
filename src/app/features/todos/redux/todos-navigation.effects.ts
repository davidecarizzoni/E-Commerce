import { TodosFacadeService } from './../services/todos-facade.service';
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { goToDetail, goToLogin } from './todos-navigation.actions';
import { tap } from 'rxjs/operators';

@Injectable()
export class TodosNavigationEffects {

    goToDetail$ = createEffect(() => this.actions$.pipe(
        ofType(goToDetail),
        tap(action => {
            this.todosFacadeService.goToDetail(action.id);
        })
    ), { dispatch: false });

    goToHome$ = createEffect(() => this.actions$.pipe(
        ofType(goToDetail),
        tap(action => {
            this.todosFacadeService.goToHome();
        })
    ), { dispatch: false });

    goToLogin$ = createEffect(() => this.actions$.pipe(
        ofType(goToLogin),
        tap(action => {
            this.todosFacadeService.goToLogin();
        })
    ), { dispatch: false });

    constructor(private actions$: Actions,
        private todosFacadeService: TodosFacadeService) {
    }
}