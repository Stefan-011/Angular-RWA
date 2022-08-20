import { player } from "./player";
import { Sponzor } from "./Sponzor";


// Interface koji sluzi za predstavljanje korisnickog tima
export interface MyTeam
{
    players:player[];
    sponzor:Sponzor;
}