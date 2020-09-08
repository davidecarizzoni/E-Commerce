import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { retrieveAllTodos, initTodos, updateTodo, editTodo, postTodo, insertTodo, deleteTodo, removeTodo } from './todos.actions';
import { switchMap, map, tap } from 'rxjs/operators';
import { Todo } from 'src/app/core/model/todo.interface';
import { goToDetail, goToTodosHome } from 'src/app/features/todos/redux/todos-navigation.actions';
import { HttpCommunicationsService } from 'src/app/core/http-communication/http-communication.service';
import { Store } from '@ngrx/store';

@Injectable()
export class TodosEffects {

    //utilizzo la action che usa le chiamate HTTP -> GET
    retrieveAllTodos$ = createEffect(() => this.actions$.pipe(
        ofType(retrieveAllTodos),
        switchMap(() => this.httpCommunicationsService.retrieveGetCall<Todo[]>("todos").pipe(
            map(todos => initTodos({ todos }))
        ))
    ));

    //utilizzo la action che usa le chiamate HTTP -> PUT
    updateTodo$ = createEffect(() => this.actions$.pipe(
        ofType(updateTodo),
        switchMap(action => this.httpCommunicationsService.retrievePutCall<Todo>("todos/" + action.todo.id, action.todo).pipe(
            switchMap(todo => {
                return [editTodo({ todo }), goToDetail({id: todo.id})];
            })
        ))
    ));

    //utilizzo la action che usa le chiamate HTTP -> POST
    insertTodo$ = createEffect(() => this.actions$.pipe(
        ofType(postTodo),
        switchMap(action => this.httpCommunicationsService.retrievePostCall<Todo>("todos/", action.todo).pipe(
            switchMap(todo => [insertTodo({ todo }), goToTodosHome()])
        ))
    ))

    //utilizzo la action che usa le chiamate HTTP -> DELETE
    deleteTodo$ = createEffect(() => this.actions$.pipe(
        ofType(deleteTodo),
        switchMap(action => this.httpCommunicationsService.retrieveDeleteCall<Todo>("todos/" + action.todo.id).pipe(
            switchMap(todo => [removeTodo({ todo }), goToTodosHome()])
        ))
    ))

    constructor(private actions$: Actions, private store: Store,
        private httpCommunicationsService: HttpCommunicationsService) {
    }
}