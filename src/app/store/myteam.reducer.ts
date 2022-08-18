import { state } from '@angular/animations';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { player } from '../models/player';
import { user } from '../models/user';
import * as MyTeamActions from './myteam.action';

export interface MyTeamState extends EntityState<player>{
     SelectedPlayer:number;
     NumberOfPlayers:number
    // Sponzor:number;
   }
   const adapter = createEntityAdapter<player>();
 
   export const initialState: MyTeamState = adapter.getInitialState ({
     SelectedPlayer: 0,
     NumberOfPlayers: 0
     //Sponzor:null;
   });
 
  
  export const MyTeamReducer = createReducer(
    initialState,
    on(MyTeamActions.GetMyTeamSuccess ,(state,{MyTeam})=>
    {
      return adapter.setAll(MyTeam.players,state);
      }),
      on(MyTeamActions.SelectPlayer ,(state,{ID})=>
     {
      return { ... state, SelectedPlayer:ID}
      }),
      on(MyTeamActions.SellPlayerSuccess ,(state,{ID})=>
     {
      return adapter.removeOne(ID,state);
      }),
      on(MyTeamActions.BuyPlayerSuccess ,(state,{NewOne})=>
      {
       return adapter.addOne(NewOne,state);
       }),
       on(MyTeamActions.CheckMyPlayerFail ,(state)=>
       {
         alert("Igrac je vec u vasem timu!");
        return state;
        }),

      );
  