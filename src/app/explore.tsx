import React, { useState } from 'react';
import { View, StyleSheet, Modal } from 'react-native';
import { ExploreMapView } from '@/components/map/ExploreMapView';
import { HangoutDetailView } from '@/components/hangouts/HangoutDetailView';
import { HANGOUTS } from '@/data/mockHangouts';
import { Hangout } from '@/types/hangout';

export default function ExploreScreen() {
  const [selectedHangout, setSelectedHangout] = useState<Hangout | null>(null);

  return (
    <View style={styles.container}>
      <ExploreMapView
        hangouts={HANGOUTS}
        onSelectHangout={(hangout) => setSelectedHangout(hangout)}
      />

      <Modal
        visible={selectedHangout !== null}
        animationType="slide"
        presentationStyle="fullScreen"
        onRequestClose={() => setSelectedHangout(null)}>
        {selectedHangout && (
          <HangoutDetailView
            hangout={selectedHangout}
            onBack={() => setSelectedHangout(null)}
          />
        )}
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
