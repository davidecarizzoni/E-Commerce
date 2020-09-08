import { Action, createReducer, on } from '@ngrx/store';
import { Todo } from '../../core/model/todo.interface';
import { initTodos, removeTodo, editTodo, insertTodo } from './todos.actions';

// state
export interface TodoState {
    todos: Todo[];
}

// inizializzazione dello state iniziale, lista vuota di todo
export const initialState: TodoState = {
    todos: []
};

// reducer, gestione dello state
// gestione simile allo switch normale
const todosReducersFun = createReducer(
    initialState, //stato inizialle dell'applicativo
    on(initTodos, (state, { todos }) => ({ ...state, todos: todos })),
    on(insertTodo, (state, { todo }) => ({ ...state, todos: [...state.todos, todo] })),
    on(removeTodo, (state, { todo }) => ({ ...state, todos: state.todos.filter(item => item.id !== todo.id) })),
    on(editTodo, (state, { todo }) => ({ ...state, todos: state.todos.map(item => item.id === todo.id ? todo : item) }))
    //State iniziale, veriabile da passare - aggiorno lo state del todo
);

//con state (variabile interna della libreria) faccio riferimetno al reducer
//initial state che ho dichiarato nel app module ts

// effettiva esecuzione dei reducers
export function todoReducer(state: TodoState | undefined, action: Action) {
    return todosReducersFun(state, action);
}