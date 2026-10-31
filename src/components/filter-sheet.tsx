import * as Haptics from 'expo-haptics';
import { Modal, Pressable, StyleSheet, Switch, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { hangoutActions, useHangoutStore } from '@/store/hangouts-store';
import { colors, fonts } from '@/theme';

import { whenOptions, type FilterSheetProps } from './filter-sheet.shared';

const distances = [5, 10, 25, 50];

/** Android / web fallback for the native SwiftUI sheet in filter-sheet.ios.tsx. */
export function FilterSheet({ open, onOpenChange }: FilterSheetProps) {
  const filters = useHangoutStore((s) => s.filters);
  const insets = useSafeAreaInsets();

  return (
    <Modal visible={open} transparent animationType="slide" onRequestClose={() => onOpenChange(false)}>
      <Pressable style={styles.scrim} onPress={() => onOpenChange(false)} />
      <View style={[styles.sheet, { paddingBottom: insets.bottom + 20 }]}>
        <View style={styles.grabber} />
        <Text style={styles.heading}>When</Text>
        <Segmented
          options={whenOptions}
          value={filters.when}
          onChange={(when) => hangoutActions.setFilters({ when })}
        />

        <Text style={styles.heading}>Distance</Text>
        <Segmented
          options={distances.map((d) => ({ id: d, label: `${d} km` }))}
          value={filters.maxDistanceKm}
          onChange={(maxDistanceKm) => hangoutActions.setFilters({ maxDistanceKm })}
        />

        <Row
          label="Free hangouts only"
          value={filters.freeOnly}
          onChange={(freeOnly) => hangoutActions.setFilters({ freeOnly })}
        />
        <Row
          label="Hide full hangouts"
          value={filters.hideFull}
          onChange={(hideFull) => hangoutActions.setFilters({ hideFull })}
        />

        <Pressable onPress={hangoutActions.resetFilters} style={styles.reset}>
          <Text style={styles.resetText}>Reset filters</Text>
        </Pressable>
      </View>
    </Modal>
  );
}

function Segmented<T extends string | number>({
  options,
  value,
  onChange,
}: {
  options: { id: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <View style={styles.segmented}>
      {options.map((o) => {
        const active = o.id === value;
        return (
          <Pressable
            key={o.id}
            onPress={() => {
              Haptics.selectionAsync();
              onChange(o.id);
            }}
            style={[styles.segment, active && styles.segmentActive]}>
            <Text style={[styles.segmentText, active && styles.segmentTextActive]}>{o.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

function Row({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Switch value={value} onValueChange={onChange} trackColor={{ true: colors.accentPurple }} />
    </View>
  );
}

const styles = StyleSheet.create({
  scrim: { flex: 1, backgroundColor: 'rgba(0,0,0,0.3)' },
  sheet: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  grabber: {
    alignSelf: 'center',
    width: 40,
    height: 5,
    borderRadius: 3,
    backgroundColor: colors.border,
    marginBottom: 8,
  },
  heading: { fontFamily: fonts.bold, fontSize: 15, color: colors.text, marginTop: 18, marginBottom: 10 },
  segmented: { flexDirection: 'row', backgroundColor: colors.surfaceMuted, borderRadius: 14, padding: 3 },
  segment: { flex: 1, paddingVertical: 9, borderRadius: 11, alignItems: 'center' },
  segmentActive: { backgroundColor: colors.surface, boxShadow: '0px 2px 6px rgba(0,0,0,0.08)' },
  segmentText: { fontFamily: fonts.medium, fontSize: 13.5, color: colors.textSecondary },
  segmentTextActive: { fontFamily: fonts.bold, color: colors.text },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 18 },
  rowLabel: { fontFamily: fonts.medium, fontSize: 16, color: colors.text },
  reset: { marginTop: 24, alignItems: 'center', paddingVertical: 12 },
  resetText: { fontFamily: fonts.semibold, fontSize: 15, color: colors.heart },
});
