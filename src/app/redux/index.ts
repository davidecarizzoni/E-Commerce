import { UsersState, usersReducer } from './users/users.reducers';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
    usersState: UsersState;
}

// export const reducers: ActionReducerMap<AppState> = {
//     usersState: usersReducer
// };