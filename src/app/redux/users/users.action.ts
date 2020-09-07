import { User } from './../../core/model/user.interface';
import { createAction, props } from '@ngrx/store';

export const saveCurrentUser = createAction('[Users] save current', props<{user: User}>());
export const initUsers = createAction('[User] init', props<{users: User[]}>());
export const insertUser = createAction('[User] insert', props<{user: User}>());


//using httpCommunicationService
export const retrieveAllUsers = createAction('[User] retrieve all user');
export const postUser = createAction('[User] add to server', props<{user: User}>());
