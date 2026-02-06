import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Sizes, Spacing } from '@/constants/theme';
import React from 'react';
import { StyleSheet, View } from 'react-native';

interface SettingsSectionProps {
    title: string;
    children: React.ReactNode;
}

export function SettingsSection({ title, children }: SettingsSectionProps) {
    return (
        <View style={styles.section}>
            <ThemedText style={styles.sectionHeader}>{title}</ThemedText>
            <ThemedView
                style={styles.sectionContent}
                lightColor="#fff"
                darkColor="#2c2c2e"
            >
                {children}
            </ThemedView>
        </View>
    );
}

const styles = StyleSheet.create({
    section: {
        marginTop: Spacing.huge,
        backgroundColor: 'transparent',
    },
    sectionHeader: {
        fontSize: 13,
        textTransform: 'uppercase',
        color: '#8e8e93',
        paddingHorizontal: Spacing.lg,
        paddingBottom: Spacing.sm,
    },
    sectionContent: {
        borderRadius: Sizes.borderRadius.md,
        marginHorizontal: Spacing.lg,
        overflow: 'hidden',
    },
});
