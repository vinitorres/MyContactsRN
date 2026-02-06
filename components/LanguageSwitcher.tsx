import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

const LANGUAGES = [
    { code: 'en', label: 'English' },
    { code: 'pt-BR', label: 'Português' },
];

export function LanguageSwitcher() {
    const { i18n } = useTranslation();
    const colorScheme = useColorScheme() ?? 'light';
    const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

    const changeLanguage = (languageCode: string) => {
        i18n.changeLanguage(languageCode);
        setCurrentLanguage(languageCode);
    };

    return (
        <ThemedView style={styles.container}>
            {LANGUAGES.map((lang) => {
                const isSelected = currentLanguage === lang.code;
                return (
                    <TouchableOpacity
                        key={lang.code}
                        style={[
                            styles.button,
                            {
                                backgroundColor: isSelected
                                    ? Colors[colorScheme].tint
                                    : 'transparent',
                                borderColor: Colors[colorScheme].tint,
                            },
                        ]}
                        onPress={() => changeLanguage(lang.code)}
                    >
                        <ThemedText
                            style={[
                                styles.buttonText,
                                {
                                    color: isSelected
                                        ? (colorScheme === 'dark' ? '#000' : '#fff')
                                        : Colors[colorScheme].text,
                                },
                            ]}
                        >
                            {lang.label}
                        </ThemedText>
                    </TouchableOpacity>
                );
            })}
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: 10,
        padding: 10,
        backgroundColor: 'transparent',
    },
    button: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
    },
    buttonText: {
        fontSize: 14,
        fontWeight: '600',
    },
});
