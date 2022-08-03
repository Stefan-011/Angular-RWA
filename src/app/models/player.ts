export class player
{
    name:string;
    lname:string;
    kd:number;
    rel:number;
    rating:number;
    team:string;
    img:string;
    
    constructor() 
    {
        this.name = "";
        this.lname = "";
        this.kd = 0;
        this.rel = 0;
        this.rating = 0;
        this.team = "";
        this.img = "/assets/img/Player.png"
    }
}