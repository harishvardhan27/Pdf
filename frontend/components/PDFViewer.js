// PDFViewer.js
import React, { useState } from 'react';
import { View, Button, Alert, Text, StyleSheet } from 'react-native';
import Pdf from 'react-native-pdf';
import { saveHighlight } from './highlightStorage';

const PDFViewer = ({ file }) => {
  const [selectedText, setSelectedText] = useState('');

  const handleSaveHighlight = async () => {
    if (!selectedText.trim()) {
      Alert.alert('No text selected');
      return;
    }

    await saveHighlight(selectedText);
    Alert.alert('Saved', 'Highlight saved successfully!');
    setSelectedText('');
  };

  return (
    <View style={styles.container}>
      <Pdf
        source={{ uri: file.uri }}
        style={styles.pdf}
        onError={error => {
          console.error('PDF render error:', error);
        }}
      />
      
      {/* Simulated selection for now */}
      <Text style={styles.selectionLabel}>Selected Text (Simulated)</Text>
      <Text
        style={styles.selectableText}
        onPress={() => setSelectedText('Example highlighted text')}
      >
        Tap here to simulate selecting "Example highlighted text"
      </Text>

      <Button title="Save Highlight" onPress={handleSaveHighlight} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  pdf: { flex: 1 },
  selectionLabel: {
    marginTop: 10,
    fontWeight: 'bold',
  },
  selectableText: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
  },
});

export default PDFViewer;
