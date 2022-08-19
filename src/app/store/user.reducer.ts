import { state } from '@angular/animations';
import { createReducer, on } from '@ngrx/store';
import { user } from '../models/user';
import * as UserActions from './user.action';

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
    (state,{data}) => ({ ...state ,CurrentUser:data, loggedIn:true})),//{data}
  
    on(UserActions.ChangeLogin,
    (state, {data}) => ({ ...state , loggedIn:data})),

    on(UserActions.SetComponent,
      (state, {comp}) => {console.log(comp);return ({ ...state , component:comp})}),
      
    //  on(UserActions.SaveChangesSuccess,
    //    (state, {comp}) => {console.log(comp);return ({ ...state , component:comp})}),
      
  /*  on(UserActions.loginUser,
      (state, {email,password}) => ({ ...state , loggedIn:true}))*/
      );
  