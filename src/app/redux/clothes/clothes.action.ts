import {createAction, props} from '@ngrx/store';
import {Clothes} from '../../core/model/clothes.interface';

export const initClothes = createAction('[Clothes] init store',  props<{clothes: Clothes[]}>());

//effects
export const retrieveAllClothes = createAction('[Clothes] effect - get all');
