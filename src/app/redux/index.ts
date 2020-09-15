import { UsersState, usersReducer } from './users/users.reducers';
import { ActionReducerMap } from '@ngrx/store';
import { clothesReducer, ClothesState } from './clothes/clothes.reducers';
import { cartReducers, CartState } from './cart/cart.reducers';

//interfaccia rappresentante lo stato globale
export interface AppState {
    usersState: UsersState;
    clothesState: ClothesState;
    cartState: CartState;
}

export const reducers: ActionReducerMap<AppState> = {
    usersState: usersReducer,
    clothesState: clothesReducer,
    cartState: cartReducers
};