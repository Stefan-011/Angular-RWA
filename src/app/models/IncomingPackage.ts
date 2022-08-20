import { user } from "./user";

// Interface za pristizanje paketa koji ima date parametre
export interface IncomingPackage
{
    data:user;
    access_token:string;
}