import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
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

    const backgroundColor = colorScheme === 'light' ? '#f2f2f7' : '#151718'; // Match theme or iOS style

    return (
        <View style={[styles.container, { backgroundColor }]}>
            <SafeAreaView edges={['top']} style={{ backgroundColor: 'transparent' }}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                        <IconSymbol name="chevron.right" size={24} color={Colors[colorScheme].tint} style={{ transform: [{ rotate: '180deg' }] }} />
                    </TouchableOpacity>
                    <ThemedText style={styles.headerTitle}>{t('settings.title')}</ThemedText>
                    <View style={{ width: 44 }} />
                </View>
            </SafeAreaView>
            <ScrollView style={styles.scrollView}>
                {/* Language Section */}
                <View style={styles.section}>
                    <ThemedText style={styles.sectionHeader}>
                        {t('settings.language.title')}
                    </ThemedText>
                    <ThemedView
                        style={styles.sectionContent}
                        lightColor="#fff"
                        darkColor="#2c2c2e"
                    >
                        {LANGUAGES.map((lang, index) => (
                            <TouchableOpacity
                                key={lang.code}
                                style={[
                                    styles.row,
                                    index !== LANGUAGES.length - 1 && styles.rowBorder,
                                ]}
                                onPress={() => changeLanguage(lang.code)}
                            >
                                <ThemedText style={styles.rowText}>{lang.label}</ThemedText>
                                {i18n.language.includes(lang.code) && (
                                    <IconSymbol
                                        name="checkmark"
                                        size={20}
                                        color={Colors[colorScheme].tint}
                                    />
                                )}
                            </TouchableOpacity>
                        ))}
                    </ThemedView>
                </View>

                {/* App Info Section */}
                <View style={styles.section}>
                    <ThemedText style={styles.sectionHeader}>
                        {t('settings.about.title')}
                    </ThemedText>
                    <ThemedView
                        style={styles.sectionContent}
                        lightColor="#fff"
                        darkColor="#2c2c2e"
                    >
                        <View style={styles.row}>
                            <ThemedText style={styles.rowText}>
                                {t('settings.about.version')}
                            </ThemedText>
                            <ThemedText style={styles.rowValue}>1.0.0</ThemedText>
                        </View>
                    </ThemedView>
                </View>
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
        paddingHorizontal: 8,
        paddingVertical: 12,
        backgroundColor: 'transparent',
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 44,
    },
    headerTitle: {
        fontSize: 17,
        fontWeight: '600',
    },
    scrollView: {
        flex: 1,
    },
    section: {
        marginTop: 32,
        backgroundColor: 'transparent',
    },
    sectionHeader: {
        fontSize: 13,
        textTransform: 'uppercase',
        color: '#8e8e93',
        paddingHorizontal: 16,
        paddingBottom: 8,
    },
    sectionContent: {
        borderRadius: 10,
        marginHorizontal: 16,
        overflow: 'hidden',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
        minHeight: 44,
    },
    rowBorder: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: 'rgba(128, 128, 128, 0.2)',
    },
    rowText: {
        fontSize: 17,
    },
    rowValue: {
        fontSize: 17,
        opacity: 0.6,
    },
});
