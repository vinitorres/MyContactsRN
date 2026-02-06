import { Contact } from '@/src/models/Contact';

export interface IContactsService {
    findAll(): Promise<Contact[]>;
    findById(id: number): Promise<Contact | null>;
    create(data: Contact): Promise<void>;
    update(id: number, data: Contact): Promise<Contact>;
    delete(id: number): Promise<void>;
}
