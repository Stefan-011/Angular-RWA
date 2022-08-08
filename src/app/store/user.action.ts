import { createAction, props } from '@ngrx/store';
import { user } from '../models/user';


export const loginUser = createAction('loginUser',props<{email:string,password:string}>());
export const GetLoggedUser = createAction('GetLoggedIn',props<{data:user}>());
export const loginSuccess = createAction('loginSuccess',props<{data:user}>());