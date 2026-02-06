import { Sizes, Spacing } from '@/constants/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: Spacing.lg,
        paddingVertical: Spacing.md,
    },
    headerTitle: {
        flex: 1,
        textAlign: 'center',
    },
    listContent: {
        padding: Spacing.lg,
        paddingBottom: 80, // Add padding to bottom to avoid FAB overlap
    },
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
    emptyText: {
        textAlign: 'center',
        marginTop: Spacing.giant,
        fontSize: 16,
    },
    fab: {
        position: 'absolute',
        right: Spacing.xl,
        bottom: Spacing.xl,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
