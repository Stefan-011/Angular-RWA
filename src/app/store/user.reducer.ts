import { createReducer, on } from '@ngrx/store';
import * as UserActions from './user.action';
import { user } from '../models/user';


export interface UserState {
    loggedIn:boolean, 
    CurrentUser: user | null, 
    component:string, 
  }

  export const initialState: UserState = {
    loggedIn:false,
    CurrentUser: null,
    component:"",
  };

  export const userReducer = createReducer(
    initialState,
    on(UserActions.GetLoggedUserSuccess,(state,{data})=> ({ ...state, CurrentUser: data, loggedIn:true})),

    on(UserActions.loginSuccess,
    (state,{data}) => ({ ...state ,CurrentUser:data, loggedIn:true})),
  

    on(UserActions.SetComponent,
      (state, {comp}) => ({ ...state , component:comp})), 
      );
  