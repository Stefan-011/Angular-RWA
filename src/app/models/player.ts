export class player
{
    id:number;
    name:string;
    lname:string;
    nick:string;
    kd:number;
    impact:number;
    rating:number;
    team:string;
    img:string;
    
    constructor() 
    {
        this.id = 0;
        this.name = "";
        this.lname = "";
        this.nick = "";
        this.kd = 0;
        this.impact = 0;
        this.rating = 0;
        this.team = "";
        this.img = "/assets/img/Player.png"
    }
}