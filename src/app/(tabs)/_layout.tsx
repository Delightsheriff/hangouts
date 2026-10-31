import { NativeTabs } from 'expo-router/native-tabs';

import { colors, fonts } from '@/theme';

/** Native tab bar: Liquid Glass on iOS 26, Material 3 on Android. */
export default function TabsLayout() {
  return (
    <NativeTabs
      tintColor={colors.text}
      iconColor={{ default: colors.textMuted, selected: colors.text }}
      labelStyle={{
        default: { fontFamily: fonts.medium, fontSize: 11, color: colors.textMuted },
        selected: { fontFamily: fonts.bold, fontSize: 11, color: colors.text },
      }}>
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Icon sf="house" md="home" />
        <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="explore">
        <NativeTabs.Trigger.Icon sf="safari" md="explore" />
        <NativeTabs.Trigger.Label>Explore</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="chats">
        <NativeTabs.Trigger.Icon sf="bubble" md="chat_bubble" />
        <NativeTabs.Trigger.Label>Chats</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Badge>2</NativeTabs.Trigger.Badge>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="profile">
        <NativeTabs.Trigger.Icon sf="person" md="person" />
        <NativeTabs.Trigger.Label>Profile</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
