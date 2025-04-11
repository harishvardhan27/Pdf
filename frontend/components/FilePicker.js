// FilePicker.js
import React from 'react';
import { Button, Alert } from 'react-native';
import DocumentPicker from 'react-native-document-picker';

const FilePicker = ({ onFilePicked }) => {
  const pickPDFFile = async () => {
    try {
      const res = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.pdf],
      });

      if (res && onFilePicked) {
        onFilePicked(res);
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled file picker');
      } else {
        console.error('DocumentPicker Error:', err);
        Alert.alert('Error', 'Failed to pick the file');
      }
    }
  };

  return <Button title="Pick a PDF File" onPress={pickPDFFile} />;
};

export default FilePicker;
