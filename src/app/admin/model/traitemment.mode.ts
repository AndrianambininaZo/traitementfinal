export class Traitemment {
    id?: number;
    page?: number;
    mots?: number;
    audio?: number;
    idReception?: number;
}
export interface ListTraitement {
    status: string;
    id?: number;
    page?: string;
    mots?: string;
    mois?: number;
    annee?: number;
    reception: {
        id: number,
        dateReception: Date,
        user: {
            id: 3,
            nom: string,
            status: number,
            email: string,
            role: [
                {
                    id: number,
                    nomRole: number
                }
            ]
        }
        operationEntree: {
            id: number,
            description: string,
            codeTache: string,
            status: string,
            priority: string,
            dateOperation: Date,
            fileName: string,
            extDoc: string,
            extAud: string,
            user: {
                id: number,
                nom: number,
                status: number,
                email: string,
                role: [
                    {
                        id: number,
                        nomRole: string
                    }
                ]
            },
            annee: number
        },

    };
    date?: string;
    dateFull?: Date;
}