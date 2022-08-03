import { player } from "./player";

export class user
{
    name:string;
    money:number;
    Team:player[];
    
    constructor() 
    {
        this.name = "";
        this.money = 50000;
        this.Team = [];
    }
}