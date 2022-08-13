import { createAction, props } from '@ngrx/store';
import { user } from '../models/user';


export const loginUser = createAction('loginUser',props<{email:string,password:string}>());
export const loginSuccess = createAction('loginSuccess',props<{data:user}>());

export const GetLoggedUser = createAction('GetLoggedIn',props<{username:string}>());
export const GetLoggedUserSuccess  = createAction('GetLoggedInSuccess',props<{data:user}>());

export const ChangeLogin = createAction('ChangeLogin',props<{data:boolean}>());

export const SetComponent = createAction("SetComponent",props<{comp:string}>());

export const RegisterUser = createAction("RegisterUser",props<{username:string,password:string,email:string}>());
export const RegisterUserSuccess = createAction("RegisterUserSuccess");

export const CreateUser = createAction("CreateUser",props<{username:string}>());
export const CreateUserSuccess = createAction("CreateUserSuccess");
