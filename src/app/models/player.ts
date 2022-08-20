
// Klasa za prestavljanje igraca u timu
export class player
{
    id:number;
    kd:number;
    img:string;
    nick:string;
    team:string;
    name:string;
    price:number;
    lname:string;
    impact:number;
    rating:number;

    constructor() 
    {
        this.id = 0;
        this.kd = 0;
        this.nick = "";
        this.name = "";
        this.team = "";
        this.lname = "";
        this.impact = 0;
        this.rating = 0;
        this.price =  0;
        this.img = "/assets/img/Player.png"     
    }
}