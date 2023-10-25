export class Utilisateur {
    id?: number;
    nom?: string;
    email?: string;
    password?: string
    role?: string
    status?: number
}
export class UtilisateurRequest {
    id?: number;
    nom?: string;
    email?: string;
    password?: string;
    status?: number;
}
export class addRoleByUserRequest {

    role?: string;
    email?: string;
}