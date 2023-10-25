export interface ListOperation {
    id: number;
    description: string;
    status: string;
    priority: string;
    codeTache: string;
    fileName: string;
    dateOperation: Date;

    user: {
        id: number,
        email: string,
        nom: string,
        role: string
    }
}