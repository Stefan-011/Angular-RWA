import { createEntityAdapter, EntityState } from '@ngrx/entity';
import * as OtherTeamAction from './Otherteam.action';
import { createReducer, on } from '@ngrx/store';
import { player } from '../models/player';


export interface OtherTeamState extends EntityState<player>{
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
   
    

