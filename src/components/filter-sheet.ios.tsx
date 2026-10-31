import { BottomSheet, Button, Form, Group, Host, Picker, Section, Slider, Text, Toggle } from '@expo/ui/swift-ui';
import { pickerStyle, presentationDetents, presentationDragIndicator, tag, tint } from '@expo/ui/swift-ui/modifiers';
import * as Haptics from 'expo-haptics';
import { StyleSheet } from 'react-native';

import type { When } from '@/data/hangouts';
import { hangoutActions, useHangoutStore } from '@/store/hangouts-store';
import { colors } from '@/theme';

import { whenOptions, type FilterSheetProps } from './filter-sheet.shared';

/** Native SwiftUI filter sheet built with Expo UI. */
export function FilterSheet({ open, onOpenChange }: FilterSheetProps) {
  const filters = useHangoutStore((s) => s.filters);

  return (
    <Host style={styles.host}>
      <BottomSheet isPresented={open} onIsPresentedChange={onOpenChange}>
        <Group
          modifiers={[
            presentationDetents(['medium', 'large']),
            presentationDragIndicator('visible'),
            tint(colors.accentPurple),
          ]}>
          <Form>
            <Section title="When">
              <Picker<When>
                selection={filters.when}
                onSelectionChange={(when) => {
                  Haptics.selectionAsync();
                  hangoutActions.setFilters({ when });
                }}
                modifiers={[pickerStyle('segmented')]}>
                {whenOptions.map((o) => (
                  <Text key={o.id} modifiers={[tag(o.id)]}>
                    {o.label}
                  </Text>
                ))}
              </Picker>
            </Section>

            <Section title="Distance" footer={<Text>{`Within ${Math.round(filters.maxDistanceKm)} km of you`}</Text>}>
              <Slider
                value={filters.maxDistanceKm}
                min={1}
                max={50}
                step={1}
                onValueChange={(maxDistanceKm) => hangoutActions.setFilters({ maxDistanceKm })}
              />
            </Section>

            <Section title="Preferences">
              <Toggle
                label="Free hangouts only"
                systemImage="gift"
                isOn={filters.freeOnly}
                onIsOnChange={(freeOnly) => hangoutActions.setFilters({ freeOnly })}
              />
              <Toggle
                label="Hide full hangouts"
                systemImage="person.3.sequence"
                isOn={filters.hideFull}
                onIsOnChange={(hideFull) => hangoutActions.setFilters({ hideFull })}
              />
            </Section>

            <Section>
              <Button
                label="Reset filters"
                systemImage="arrow.counterclockwise"
                role="destructive"
                onPress={() => {
                  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
                  hangoutActions.resetFilters();
                }}
              />
            </Section>
          </Form>
        </Group>
      </BottomSheet>
    </Host>
  );
}

const styles = StyleSheet.create({
  host: { position: 'absolute', width: 1, height: 1 },
});
