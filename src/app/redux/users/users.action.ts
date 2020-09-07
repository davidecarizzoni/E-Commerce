import { User } from './../../core/model/user.interface';
import { createAction, props } from '@ngrx/store';

export const udpateUser = createAction('[User] update', props<{user: User}>());
export const addUser = createAction('[User] Add user',props<{user:User}>());

export const saveCurrentUser = createAction('[Users] save current', props<{user: User}>());