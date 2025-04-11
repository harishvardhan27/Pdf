import React from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { saveHighlight } from '../services/fileManager';

export default function HighlightSaver({ selectedText }) {
  const [note, setNote] = React.useState(selectedText || '');

  const handleSave = () => {
    saveHighlight(note);
    setNote('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        multiline
        numberOfLines={4}
        placeholder="Highlight text..."
        value={note}
        onChangeText={setNote}
      />
      <Button title="Save Highlight" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 8 }
});
