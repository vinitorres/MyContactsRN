import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, KeyboardAvoidingView, Platform, Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ContactForm } from '@/components/ContactForm';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors, Sizes, Spacing } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useAddContactViewModel } from './useAddContactViewModel';

export function AddContactScreen() {
    const { t } = useTranslation();
    const colorScheme = useColorScheme() ?? 'light';
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const {
        name, setName,
        surname, setSurname,
        phone, setPhone,
        saveContact,
        isSaving,
        isLoading,
        isEditing
    } = useAddContactViewModel();

    const handleClose = () => {
        router.back();
    };

    return (
        <Pressable style={styles.overlay} onPress={handleClose}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardView}
            >
                <Pressable onPress={(e) => e.stopPropagation()}>
                    <ThemedView
                        style={[styles.sheet, { paddingBottom: insets.bottom + Spacing.xl }]}
                        lightColor="#fff"
                        darkColor="#1c1c1e"
                    >
                        <View style={styles.handle} />

                        <ThemedText type="title" style={styles.title}>
                            {isEditing ? t('addContact.editTitle') : t('addContact.title')}
                        </ThemedText>

                        {isLoading ? (
                            <ActivityIndicator size="large" color={Colors[colorScheme].tint} style={{ marginVertical: Spacing.giant }} />
                        ) : (
                            <ContactForm
                                name={name}
                                setName={setName}
                                surname={surname}
                                setSurname={setSurname}
                                phone={phone}
                                setPhone={setPhone}
                                onSave={saveContact}
                                isSaving={isSaving}
                                isEditing={isEditing}
                                autoFocus={!isEditing}
                            />
                        )}
                    </ThemedView>
                </Pressable>
            </KeyboardAvoidingView>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    keyboardView: {
        width: '100%',
    },
    sheet: {
        borderTopLeftRadius: Sizes.borderRadius.xl,
        borderTopRightRadius: Sizes.borderRadius.xl,
        paddingHorizontal: Spacing.xl,
        paddingTop: Spacing.md,
        width: '100%',
    },
    handle: {
        width: Spacing.giant,
        height: 5,
        backgroundColor: '#ccc',
        borderRadius: 2.5,
        alignSelf: 'center',
        marginBottom: Spacing.xl,
    },
    title: {
        textAlign: 'center',
        marginBottom: Spacing.xxl,
    },
});

export default AddContactScreen;
