import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors, Sizes, Spacing } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

interface SettingsRowProps {
    label: string;
    value?: string;
    onPress?: () => void;
    showCheckmark?: boolean;
    isLast?: boolean;
}

export function SettingsRow({ label, value, onPress, showCheckmark, isLast }: SettingsRowProps) {
    const colorScheme = useColorScheme() ?? 'light';

    const Content = (
        <View style={[styles.row, !isLast && styles.rowBorder]}>
            <ThemedText style={styles.rowText}>{label}</ThemedText>
            <View style={styles.rightContent}>
                {value && <ThemedText style={styles.rowValue}>{value}</ThemedText>}
                {showCheckmark && (
                    <IconSymbol
                        name="checkmark"
                        size={Sizes.icon.sm}
                        color={Colors[colorScheme].tint}
                    />
                )}
            </View>
        </View>
    );

    if (onPress) {
        return (
            <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
                {Content}
            </TouchableOpacity>
        );
    }

    return Content;
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: Spacing.md,
        paddingHorizontal: Spacing.lg,
        minHeight: Spacing.giant,
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
    rightContent: {
        flexDirection: 'row',
        alignItems: 'center',
    }
});
