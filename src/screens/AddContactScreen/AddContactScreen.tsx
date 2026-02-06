import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, Button, KeyboardAvoidingView, Platform, Pressable, StyleSheet, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
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
                        style={[styles.sheet, { paddingBottom: insets.bottom + 20 }]}
                        lightColor="#fff"
                        darkColor="#1c1c1e"
                    >
                        <View style={styles.handle} />

                        <ThemedText type="title" style={styles.title}>
                            {isEditing ? t('addContact.editTitle') : t('addContact.title')}
                        </ThemedText>

                        {isLoading ? (
                            <ActivityIndicator size="large" color={Colors[colorScheme].tint} style={{ marginVertical: 40 }} />
                        ) : (
                            <View style={styles.form}>
                                <TextInput
                                    placeholder={t('addContact.name')}
                                    value={name}
                                    onChangeText={setName}
                                    style={[styles.input, { color: Colors[colorScheme].text, borderColor: Colors[colorScheme].icon }]}
                                    placeholderTextColor={Colors[colorScheme].icon}
                                    autoFocus={!isEditing}
                                />
                                <TextInput
                                    placeholder={t('addContact.surname')}
                                    value={surname}
                                    onChangeText={setSurname}
                                    style={[styles.input, { color: Colors[colorScheme].text, borderColor: Colors[colorScheme].icon }]}
                                    placeholderTextColor={Colors[colorScheme].icon}
                                />
                                <TextInput
                                    placeholder={t('addContact.phone')}
                                    value={phone}
                                    onChangeText={setPhone}
                                    keyboardType="phone-pad"
                                    style={[styles.input, { color: Colors[colorScheme].text, borderColor: Colors[colorScheme].icon }]}
                                    placeholderTextColor={Colors[colorScheme].icon}
                                />

                                {isSaving ? (
                                    <ActivityIndicator size="small" color={Colors[colorScheme].tint} style={{ marginTop: 10 }} />
                                ) : (
                                    <View style={styles.buttonContainer}>
                                        <Button
                                            title={isEditing ? t('addContact.update') : t('addContact.save')}
                                            onPress={saveContact}
                                            color={Colors[colorScheme].tint}
                                        />
                                    </View>
                                )}
                            </View>
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
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal: 20,
        paddingTop: 12,
        width: '100%',
    },
    handle: {
        width: 40,
        height: 5,
        backgroundColor: '#ccc',
        borderRadius: 2.5,
        alignSelf: 'center',
        marginBottom: 20,
    },
    title: {
        textAlign: 'center',
        marginBottom: 24,
    },
    form: {
        gap: 4,
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 16,
        marginBottom: 12,
        fontSize: 16,
    },
    buttonContainer: {
        marginTop: 8,
    }
});
