import React, { useState } from 'react';
import { View, Button, Text, StyleSheet, NativeModules } from 'react-native';
import InkCanvas from '../../components/InkCanvas';
import * as Settings from '../../modules/ml-ben'

export default function Page () {
  console.log("ink recg page");
  const [recognizedText, setRecognizedText] = useState('');

  const handleStrokeEnd = async (strokes) => {
    try {
      console.log(await Settings.getSupportedLanguages())
      // console.log(strokes);
      const result = await Settings.recognizeInkAsync(strokes);
      setRecognizedText(result);
    } catch (error) {
      console.error('Error recognizing ink:', error);
    }
  };

  return (
    <View style={styles.container}>
      <InkCanvas onStrokeEnd={handleStrokeEnd} />
      <Text style={styles.text}>{recognizedText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  text: {
    marginTop: 20,
    paddingHorizontal: 20,
    fontSize: 18,
    textAlign: 'center',
  },
});