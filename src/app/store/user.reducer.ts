import { state } from '@angular/animations';
import { createReducer, on } from '@ngrx/store';
import { user } from '../models/user';
import { GetLoggedUser, loginUser } from './user.action';

export interface UserState {
    loggedIn:boolean,
    user: user | null,
  }

  export const initialState: UserState = {
    loggedIn:false,
    user: null,
  };

  export const userReducer = createReducer(
    initialState,
    on(GetLoggedUser,(state,action)=> ({ ...state, user: action.data}))
  );