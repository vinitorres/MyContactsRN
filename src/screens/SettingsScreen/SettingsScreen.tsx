import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { SettingsRow } from '@/components/SettingsRow';
import { SettingsSection } from '@/components/SettingsSection';
import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors, Sizes, Spacing } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

const LANGUAGES = [
    { code: 'en', label: 'English' },
    { code: 'pt-BR', label: 'Português (Brasil)' },
];

export function SettingsScreen() {
    const { t, i18n } = useTranslation();
    const colorScheme = useColorScheme() ?? 'light';
    const router = useRouter();

    const changeLanguage = (languageCode: string) => {
        i18n.changeLanguage(languageCode);
    };

    const backgroundColor = colorScheme === 'light' ? '#f2f2f7' : '#151718';

    return (
        <View style={[styles.container, { backgroundColor }]}>
            <SafeAreaView edges={['top']} style={{ backgroundColor: 'transparent' }}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                        <IconSymbol name="chevron.right" size={Sizes.icon.md} color={Colors[colorScheme].tint} style={{ transform: [{ rotate: '180deg' }] }} />
                    </TouchableOpacity>
                    <ThemedText style={styles.headerTitle}>{t('settings.title')}</ThemedText>
                    <View style={{ width: Spacing.giant }} />
                </View>
            </SafeAreaView>
            <ScrollView style={styles.scrollView}>
                <SettingsSection title={t('settings.language.title')}>
                    {LANGUAGES.map((lang, index) => (
                        <SettingsRow
                            key={lang.code}
                            label={lang.label}
                            onPress={() => changeLanguage(lang.code)}
                            showCheckmark={i18n.language.includes(lang.code)}
                            isLast={index === LANGUAGES.length - 1}
                        />
                    ))}
                </SettingsSection>

                <SettingsSection title={t('settings.about.title')}>
                    <SettingsRow
                        label={t('settings.about.version')}
                        value="1.0.0"
                        isLast={true}
                    />
                </SettingsSection>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: Spacing.sm,
        paddingVertical: Spacing.md,
        backgroundColor: 'transparent',
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        width: Spacing.giant,
    },
    headerTitle: {
        fontSize: 17,
        fontWeight: '600',
    },
    scrollView: {
        flex: 1,
    },
});

export default SettingsScreen;
