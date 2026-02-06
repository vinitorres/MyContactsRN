import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors, Sizes, Spacing } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Contact } from '@/src/models/Contact';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

interface ContactItemProps {
    item: Contact;
    onPress: (item: Contact) => void;
    onLongPress: (item: Contact) => void;
}

export function ContactItem({ item, onPress, onLongPress }: ContactItemProps) {
    const colorScheme = useColorScheme() ?? 'light';

    return (
        <TouchableOpacity
            onLongPress={() => onLongPress(item)}
            onPress={() => onPress(item)}
            activeOpacity={0.7}
        >
            <ThemedView style={styles.itemContainer} lightColor="#f9f9f9" darkColor="#1f1f1f">
                <IconSymbol
                    name="person.fill"
                    size={Sizes.icon.xl}
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
}

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: Spacing.lg,
        marginBottom: Spacing.md,
        borderRadius: Sizes.borderRadius.lg,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 2,
    },
    avatar: {
        marginRight: Spacing.lg,
    },
    contactDetail: {
        marginTop: Spacing.xs,
        fontSize: 14,
    },
});
