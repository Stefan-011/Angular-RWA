import { player } from "./player";

export class user
{
    username:string;
    money:number;
    Team:player[];
    
    constructor() 
    {
        this.username = "";
        this.money = 50000;
        this.Team = [];
    }
}

export class LoginUser
{
    username:string;
    password:string;
    email:string;
    
    constructor() 
    {
        this.username = "";
        this.password = "";
        this.email = "";
    }
}


