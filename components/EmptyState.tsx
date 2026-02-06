import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import React from 'react';
import { StyleSheet, View } from 'react-native';

interface EmptyStateProps {
    error: string | null;
    message: string;
}

export function EmptyState({ error, message }: EmptyStateProps) {
    return (
        <View style={styles.container}>
            {error ? (
                <ThemedText style={[styles.text, { color: '#ff6b6b' }]}>
                    {error}
                </ThemedText>
            ) : (
                <ThemedText style={styles.text}>{message}</ThemedText>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingHorizontal: Spacing.xl,
    },
    text: {
        textAlign: 'center',
        marginTop: Spacing.giant,
        fontSize: 16,
    },
});
