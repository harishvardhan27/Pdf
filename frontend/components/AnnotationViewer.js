import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { getHighlights } from '../services/fileManager';

export default function AnnotationViewer() {
  const [highlights, setHighlights] = useState([]);

  useEffect(() => {
    const fetchHighlights = async () => {
      const saved = await getHighlights();
      setHighlights(saved);
    };
    fetchHighlights();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Saved Highlights</Text>
      <FlatList
        data={highlights}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text style={styles.highlight}>• {item}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontWeight: 'bold', fontSize: 18, marginBottom: 10 },
  highlight: { marginVertical: 5 }
});
