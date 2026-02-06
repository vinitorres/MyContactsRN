import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
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
        <TouchableOpacity
            onLongPress={() => handleLongPress(item)}
            onPress={() => handlePress(item)}
            activeOpacity={0.7}
        >
            <ThemedView style={styles.itemContainer} lightColor="#f9f9f9" darkColor="#1f1f1f">
                <IconSymbol
                    name="person.fill"
                    size={40}
                    color={Colors[colorScheme].icon}
                    style={styles.avatar}
                />
                <ThemedView style={{ backgroundColor: 'transparent', flex: 1 }}>
                    <ThemedText type="subtitle">{`${item.name} ${item.surname}`}</ThemedText>
                    <ThemedText style={styles.contactDetail} lightColor="#666" darkColor="#aaa">
                        {item.phone}
                    </ThemedText>
                </ThemedView>
            </ThemedView>
        </TouchableOpacity>
    );

    const renderEmptyComponent = () => (
        <View style={{ alignItems: 'center', paddingHorizontal: 20 }}>
            {error ? (
                <ThemedText style={[styles.emptyText, { color: '#ff6b6b' }]}>
                    {error}
                </ThemedText>
            ) : (
                <ThemedText style={styles.emptyText}>{t('contacts.empty')}</ThemedText>
            )}
        </View>
    );

    return (
        <ThemedView style={styles.container}>
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.header}>
                    <View style={{ width: 24 }} />
                    <ThemedText type="title" style={styles.headerTitle}>{t('contacts.title')}</ThemedText>
                    <TouchableOpacity onPress={() => router.push('/settings')}>
                        <IconSymbol name="gear" size={24} color={Colors[colorScheme].tint} />
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
                    <IconSymbol name="plus.circle.fill" size={56} color={Colors[colorScheme].tint} />
                </TouchableOpacity>
            </SafeAreaView>
        </ThemedView>
    );
}
