import { User } from '../../users/entities/user.entity';
export declare class Note {
    id: number;
    title: string;
    content: string;
    lastModificationDate: Date;
    author: User;
    constructor(partial: Partial<Note>);
}
