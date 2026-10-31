import { BottomSheet, Button, Form, Group, Host, Picker, Section, Slider, Text, Toggle } from '@expo/ui/swift-ui';
import {
  background,
  font,
  foregroundStyle,
  listRowBackground,
  listSectionSpacing,
  padding,
  pickerStyle,
  presentationDetents,
  presentationDragIndicator,
  scrollContentBackground,
  tag,
  tint,
} from '@expo/ui/swift-ui/modifiers';
import * as Haptics from 'expo-haptics';
import { StyleSheet } from 'react-native';

import type { When } from '@/data/hangouts';
import { hangoutActions, useHangoutStore } from '@/store/hangouts-store';
import { colors, nativeFonts } from '@/theme';

import { whenOptions, type FilterSheetProps } from './filter-sheet.shared';

// The app's palette and typeface, applied to the SwiftUI form.
// The first detent is tall enough to show every section, Reset included, without clipping.
const sheet = [
  presentationDetents([{ height: 560 }, 'large']),
  presentationDragIndicator('visible'),
  scrollContentBackground('hidden'),
  background(colors.background),
  tint(colors.accentPurple),
  foregroundStyle(colors.text),
  font({ family: nativeFonts.medium, size: 16 }),
];
// Clear the grabber at the top and keep rows off the sheet's rounded edges.
const form = [padding({ top: 20, horizontal: 6 }), listSectionSpacing(20)];
const row = [listRowBackground(colors.surface)];
const header = [font({ family: nativeFonts.bold, size: 15 }), foregroundStyle(colors.text)];
const footer = [font({ family: nativeFonts.regular, size: 13 }), foregroundStyle(colors.textSecondary)];

function Heading({ children }: { children: string }) {
  return <Text modifiers={header}>{children}</Text>;
}

/** Native SwiftUI filter sheet built with Expo UI, themed to match the app. */
export function FilterSheet({ open, onOpenChange }: FilterSheetProps) {
  const filters = useHangoutStore((s) => s.filters);

  return (
    <Host style={styles.host}>
      <BottomSheet isPresented={open} onIsPresentedChange={onOpenChange}>
        <Group modifiers={sheet}>
          <Form modifiers={form}>
            <Section header={<Heading>When</Heading>}>
              <Picker<When>
                selection={filters.when}
                onSelectionChange={(when) => {
                  Haptics.selectionAsync();
                  hangoutActions.setFilters({ when });
                }}
                modifiers={[pickerStyle('segmented'), ...row]}>
                {whenOptions.map((o) => (
                  <Text key={o.id} modifiers={[tag(o.id)]}>
                    {o.label}
                  </Text>
                ))}
              </Picker>
            </Section>

            <Section
              header={<Heading>Distance</Heading>}
              footer={<Text modifiers={footer}>{`Within ${Math.round(filters.maxDistanceKm)} km of you`}</Text>}>
              <Slider
                value={filters.maxDistanceKm}
                min={1}
                max={50}
                step={1}
                onValueChange={(maxDistanceKm) => hangoutActions.setFilters({ maxDistanceKm })}
                modifiers={row}
              />
            </Section>

            <Section header={<Heading>Preferences</Heading>}>
              <Toggle
                label="Free hangouts only"
                systemImage="gift"
                isOn={filters.freeOnly}
                onIsOnChange={(freeOnly) => hangoutActions.setFilters({ freeOnly })}
                modifiers={row}
              />
              <Toggle
                label="Hide full hangouts"
                systemImage="person.3.sequence"
                isOn={filters.hideFull}
                onIsOnChange={(hideFull) => hangoutActions.setFilters({ hideFull })}
                modifiers={row}
              />
            </Section>

            <Section>
              <Button
                label="Reset filters"
                systemImage="arrow.counterclockwise"
                onPress={() => {
                  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
                  hangoutActions.resetFilters();
                }}
                modifiers={[foregroundStyle(colors.heart), ...row]}
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
