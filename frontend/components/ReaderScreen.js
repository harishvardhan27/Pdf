import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import FilePicker from './FilePicker';
import PDFViewer from './PDFViewer';
import HighlightSaver from './HighlightSaver';
import AnnotationViewer from './AnnotationViewer';
import MCQChatbot from './MCQChatbot';
import ChatBubble from './ChatBubble';

export default function ReaderScreen() {
  const [fileUri, setFileUri] = useState(null);
  const [showChatbot, setShowChatbot] = useState(false);
  const [selectedText, setSelectedText] = useState('');

  const handleFilePick = (uri) => {
    setFileUri(uri);
    setSelectedText('');
  };

  const toggleChatbot = () => {
    setShowChatbot(prev => !prev);
  };

  return (
    <View style={styles.container}>
      <FilePicker onPick={handleFilePick} />
      {fileUri && (
        <>
          <PDFViewer uri={fileUri} onTextSelect={setSelectedText} />
          <HighlightSaver selectedText={selectedText} />
          <AnnotationViewer />
        </>
      )}
      {showChatbot && <MCQChatbot />}
      <ChatBubble onPress={toggleChatbot} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
