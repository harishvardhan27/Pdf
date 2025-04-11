import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, FlatList } from 'react-native';
import { generateMCQs } from '../utils/api';

export default function MCQChatbot() {
  const [input, setInput] = useState('');
  const [mcqs, setMcqs] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    const result = await generateMCQs(input);
    setMcqs(result);
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter page range and number of questions"
        value={input}
        onChangeText={setInput}
      />
      <Button title="Generate MCQs" onPress={handleGenerate} />
      {loading && <Text>Loading...</Text>}
      <FlatList
        data={mcqs}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.mcqItem}>
            <Text style={styles.question}>{item.question}</Text>
            {item.options.map((option, idx) => (
              <Text key={idx} style={styles.option}>• {option}</Text>
            ))}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 8 },
  mcqItem: { marginVertical: 10 },
  question: { fontWeight: 'bold' },
  option: { marginLeft: 10 }
});
