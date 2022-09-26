export interface TournamentDTO {
    canRegister:          boolean;
    categoryID:           number[];
    id:                   string;
    isRegistered:         number;
    location:             string;
    maxELO:               number;
    maxNumberPlayers:     number;
    minELO:               number;
    minNumberPlayers:     number;
    name:                 string;
    players:              number;
    registrationEndDate:  Date;
    round:                number;
    statusID:             number;
    tournamentCreateDate: Date;
    tournamentUpdateDate: Date;
    womenOnly:            boolean;
}

export interface TournamentDetailsDTO {
    categoryID:           number[];
    id:                   string;
    location:             string;
    maxELO:               number;
    maxNumberPlayers:     number;
    membersRegistered:    MembersRegistered[];
    minELO:               number;
    minNumberPlayers:     number;
    name:                 string;
    registrationEndDate:  Date;
    round:                number;
    statusID:             number;
    tournamentCreateDate: Date;
    tournamentUpdateDate: Date;
    womenOnly:            boolean;
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
   