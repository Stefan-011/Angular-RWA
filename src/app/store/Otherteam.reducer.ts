import { state } from '@angular/animations';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Actions } from '@ngrx/effects';
import { createReducer, on } from '@ngrx/store';
import { player } from '../models/player';
import { user } from '../models/user';
import * as OtherTeamAction from './Otherteam.action';
import { Component } from '@angular/core';

export interface OtherTeamState extends EntityState<player>{
 //   CurrentTeam: player[],
    name:string,
    SelectedPlayer:number
  }
  const adapter = createEntityAdapter<player>();

  export const initialState: OtherTeamState = adapter.getInitialState ({
    name:"",
    SelectedPlayer: 0
  });

 
  export const OtherTeamState = createReducer(
    initialState,
    on(OtherTeamAction.GetAllPlayersSuccess ,(state,{data})=>
    {
      return adapter.setAll(data,state);
      }),

      on(OtherTeamAction.SetName,
        (state, {name}) => ({ ...state , name:name})),


      );
   
    

