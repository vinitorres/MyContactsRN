import { Contact } from '@/src/models/Contact';
import { IContactsService } from '@/src/services/IContactsService';
import { getContactsService } from '@/src/services/ServiceFactory';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';

export function useAddContactViewModel() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const contactId = params.contactId ? Number(params.contactId) : undefined;

    const [contactsService] = useState<IContactsService>(() => getContactsService());
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [phone, setPhone] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (contactId) {
            loadContact(contactId);
        }
    }, [contactId]);

    const loadContact = async (id: number) => {
        setIsLoading(true);
        try {
            const contact = await contactsService.findById(id);
            if (contact) {
                setName(contact.name);
                setSurname(contact.surname);
                setPhone(contact.phone);
            }
        } catch (error) {
            console.error("Failed to load contact:", error);
            Alert.alert("Error", "Could not load contact details.");
        } finally {
            setIsLoading(false);
        }
    };

    const saveContact = async () => {
        if (!name || !phone) {
            Alert.alert("Validation", "Name and Phone are required.");
            return;
        }

        setIsSaving(true);
        try {
            const contactData: Contact = { name, surname, phone }; // ID is not included for create, handled by backend usually, or sent if update

            if (contactId) {
                await contactsService.update(contactId, { ...contactData, id: contactId });
                Alert.alert("Success", "Contact updated successfully.");
            } else {
                await contactsService.create(contactData);
                Alert.alert("Success", "Contact created successfully.");
            }
            router.back();
        } catch (error) {
            console.error("Failed to save contact:", error);
            Alert.alert("Error", "Could not save contact.");
        } finally {
            setIsSaving(false);
        }
    };

    return {
        name,
        setName,
        surname,
        setSurname,
        phone,
        setPhone,
        saveContact,
        isSaving,
        isLoading,
        isEditing: !!contactId,
    };
}
