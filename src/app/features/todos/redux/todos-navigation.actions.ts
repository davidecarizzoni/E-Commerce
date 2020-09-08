import { createAction, props } from '@ngrx/store';

export const goToTodosHome = createAction('[Todos - Navigation] todos home');
export const goToDetail = createAction('[Todos - Navigation] detail', props<{id: number}>());
export const goToEdit = createAction('[Todos - Navigation] edit', props<{id: number}>());

export const goToLogin = createAction('[Todos - Navigation] todos login');
