import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ContactItem } from '@/components/ContactItem';
import { EmptyState } from '@/components/EmptyState';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors, Sizes } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Contact } from '@/src/models/Contact';
import { styles } from './styles';
import { useContactsViewModel } from './useContactsViewModel';

export function ContactsScreen() {
    const { t } = useTranslation();
    const { contacts, isLoading, error, refreshContacts, deleteContact } = useContactsViewModel();
    const colorScheme = useColorScheme() ?? 'light';
    const router = useRouter();

    const handleLongPress = (item: Contact) => {
        if (item.id) {
            deleteContact(item.id);
        }
    };

    const handlePress = (item: Contact) => {
        router.push({
            pathname: '/add-contact',
            params: { contactId: item.id }
        });
    }

    const renderItem = ({ item }: { item: Contact }) => (
        <ContactItem
            item={item}
            onPress={handlePress}
            onLongPress={handleLongPress}
        />
    );

    const renderEmptyComponent = () => (
        <EmptyState
            error={error}
            message={t('contacts.empty')}
        />
    );

    return (
        <ThemedView style={styles.container}>
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.header}>
                    <View style={{ width: 24 }} />
                    <ThemedText type="title" style={styles.headerTitle}>{t('contacts.title')}</ThemedText>
                    <TouchableOpacity onPress={() => router.push('/settings')}>
                        <IconSymbol name="gear" size={Sizes.icon.md} color={Colors[colorScheme].tint} />
                    </TouchableOpacity>
                </View>

                <FlatList
                    data={contacts}
                    keyExtractor={(item, index) => item.id?.toString() || `contact-${index}`}
                    renderItem={renderItem}
                    contentContainerStyle={[
                        styles.listContent,
                        contacts.length === 0 && !isLoading && { flexGrow: 1, justifyContent: 'center' }
                    ]}
                    ListEmptyComponent={renderEmptyComponent}
                    refreshing={isLoading}
                    onRefresh={refreshContacts}
                />

                <TouchableOpacity
                    style={styles.fab}
                    onPress={() => router.push('/add-contact')}
                >
                    <IconSymbol name="plus.circle.fill" size={Sizes.fab} color={Colors[colorScheme].tint} />
                </TouchableOpacity>
            </SafeAreaView>
        </ThemedView>
    );
}

export default ContactsScreen;
