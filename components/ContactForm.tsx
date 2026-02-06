import { Colors, Sizes, Spacing } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, Button, StyleSheet, TextInput, View } from 'react-native';

interface ContactFormProps {
    name: string;
    setName: (value: string) => void;
    surname: string;
    setSurname: (value: string) => void;
    phone: string;
    setPhone: (value: string) => void;
    onSave: () => void;
    isSaving: boolean;
    isEditing: boolean;
    autoFocus?: boolean;
}

export function ContactForm({
    name, setName,
    surname, setSurname,
    phone, setPhone,
    onSave,
    isSaving,
    isEditing,
    autoFocus
}: ContactFormProps) {
    const { t } = useTranslation();
    const colorScheme = useColorScheme() ?? 'light';

    return (
        <View style={styles.form}>
            <TextInput
                placeholder={t('addContact.name')}
                value={name}
                onChangeText={setName}
                style={[styles.input, { color: Colors[colorScheme].text, borderColor: Colors[colorScheme].icon }]}
                placeholderTextColor={Colors[colorScheme].icon}
                autoFocus={autoFocus}
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
                        onPress={onSave}
                        color={Colors[colorScheme].tint}
                    />
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    form: {
        gap: Spacing.xs,
    },
    input: {
        height: Sizes.input,
        borderWidth: 1,
        borderRadius: Sizes.borderRadius.md,
        paddingHorizontal: Spacing.lg,
        marginBottom: Spacing.md,
        fontSize: 16,
    },
    buttonContainer: {
        marginTop: Spacing.sm,
    }
});
