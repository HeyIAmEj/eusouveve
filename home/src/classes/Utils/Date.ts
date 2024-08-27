import { User } from "../User";

export interface IDates {
    date_creation: string;
    date_actived?: string;
    last_modification:string;
}

export class Dates implements IDates{
    date_creation: string;
    date_actived?: string;
    last_modification: string;

    constructor(data?: IDates){
        const date = new Date();
        const timestamp = date.getTime().toString();

        if(!data){
            data = {
                date_creation: timestamp,
                date_actived: undefined,
                last_modification:timestamp
            }
        }

        this.date_creation = data.date_creation ?? timestamp;
        this.date_actived = data.date_actived;
        this.last_modification = data.date_creation ?? timestamp;
    }

}