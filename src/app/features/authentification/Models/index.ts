import { AbstractControl, ValidationErrors } from "@angular/forms";
import { Observable } from "rxjs";

export interface TokenDTO {
    membersRegistered: MembersRegistered;
    token: string;
}
   
export interface MembersRegistered {
    birthDate: Date;
    elo:       number;
    email:     string;
    genderID:  number;
    id:        string;
    pseudo:    string;
    roleID:    number;
}

export interface MembersConnected {
    Token : string | null | undefined;
    Pseudo : string | null | undefined;
    Elo : string | null | undefined;
    Connect : boolean | undefined;
    roleID : number | null | undefined;
}

