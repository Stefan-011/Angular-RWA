import { player } from "./player";

export class user
{
    username:string;
    money:number;
    
    constructor() 
    {
        this.username = "";
        this.money = 50000;
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


