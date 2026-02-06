import { Contact } from '@/src/models/Contact';
import { IContactsService } from '@/src/services/IContactsService';
import { getContactsService } from '@/src/services/ServiceFactory';
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { Alert } from 'react-native';

export function useContactsViewModel() {
    const [contactsService] = useState<IContactsService>(() => getContactsService());
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchContacts = useCallback(async (isInitial = false) => {
        if (isInitial || contacts.length === 0) {
            setIsLoading(true);
        }
        setError(null);
        try {
            const data = await contactsService.findAll();
            setContacts(data);
        } catch (error) {
            console.error("Failed to fetch contacts:", error);
            setError("Could not load contacts. Pull to refresh to try again.");
        } finally {
            setIsLoading(false);
        }
    }, [contactsService, contacts.length]);

    useFocusEffect(
        useCallback(() => {
            // Background refresh without blocking UI if we already have data
            fetchContacts();
        }, [fetchContacts])
    );

    const deleteContact = async (id: number) => {
        Alert.alert(
            "Delete Contact",
            "Are you sure you want to delete this contact?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            await contactsService.delete(id);
                            await fetchContacts();
                        } catch (error) {
                            console.error("Failed to delete contact:", error);
                            setError("Could not delete contact. Please try again.");
                        }
                    }
                }
            ]
        );
    };

    return {
        contacts,
        isLoading,
        error,
        refreshContacts: fetchContacts,
        deleteContact,
    };
}
