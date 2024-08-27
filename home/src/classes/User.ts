import { Dates } from "./Utils/Date";

export interface IUser{
    id: string|null;
    name:string;
    lastname:string;
    username:string;
    password:string;
    email:string;
    date: Dates;
}

export class User{
    id: string|null;
    name:string;
    lastname:string;
    email:string;
    username:string;
    password:string;
    date: Dates;

    constructor (data: IUser) {
        this.id = data.id;
        this.name = data.name;
        this.lastname = data.lastname ?? "";
        this.email = data.email;
        this.username = data.username ?? this.email;
        this.password = data.password;
        this.date = data.date ?? new Dates();
    }
}