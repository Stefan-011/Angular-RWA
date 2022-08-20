import { createEntityAdapter, EntityState } from '@ngrx/entity';
import * as MyTeamActions from './myteam.action';
import { createReducer, on } from '@ngrx/store';
import { Sponzor } from '../models/Sponzor';
import { player } from '../models/player';



export interface MyTeamState extends EntityState<player>{
     SelectedPlayer:number;
     NumberOfPlayers:number
     Sponzor:Sponzor;
   }
   const adapter = createEntityAdapter<player>();
 
   export const initialState: MyTeamState = adapter.getInitialState ({
     SelectedPlayer: 0,
     NumberOfPlayers: 0,
     Sponzor:new Sponzor()
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

        on(MyTeamActions.GetMyTeamSuccess_Sponzor ,(state,{sponzor})=>
       {
            return { ...state, Sponzor:sponzor }
        }),

         on(MyTeamActions.AddSponzorSuccess ,(state,{sponzor})=>
        {
            return { ...state, Sponzor:sponzor }
         }),

         on(MyTeamActions.RemoveSponzorSuccess ,(state,{sponzor})=>
        {
         return { ...state, Sponzor:sponzor }
         }),

      );
  