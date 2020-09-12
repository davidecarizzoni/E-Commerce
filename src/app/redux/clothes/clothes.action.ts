import {createAction, props} from '@ngrx/store';
import {Clothes} from '../../core/model/clothes.interface';

export const initClothes = createAction('[Clothe] init clothes',  props<{clothes: Clothes[]}>());

//effects
export const retrieveAllClothes = createAction('[Clothes] effect - Retrieve all');
