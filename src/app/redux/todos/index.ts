import { TodoState } from './todos.reducers';
import { createSelector } from '@ngrx/store';
import { AppState } from '..';
import { selectUsersState, getCurrentUser } from '../users';
import { UsersState } from '../users/users.reducers';
import { User } from 'src/app/core/model/user.interface';

export const selectTodosState = (state: AppState) => state.todoState;

export const selectTodos = createSelector(
    selectTodosState,
    (state: TodoState) => state.todos
);

export const selectTodosForCurrentUser = createSelector(
    selectTodosState,
    getCurrentUser,
    (state: TodoState, user: User) => state.todos.filter( todo => todo.users.some(usersItem => usersItem === user.username))
);

export const getTodoById = createSelector(
    selectTodosState,
    (state: TodoState, props: { id: number }) => state.todos.find(item => item.id === props.id)
);

export const getFirstTodo = createSelector(
    selectTodosState,
    (state: TodoState) => state.todos.length > 0 ? state.todos[0] : null
)