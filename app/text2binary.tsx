// app/text2binary.tsx
import { View, Text, TextInput, ScrollView, Pressable, StyleSheet } from 'react-native';
import { useState } from 'react';
import * as Clipboard from 'expo-clipboard';

export default function TextToBinaryScreen() {
  const [inputText, setInputText] = useState('');
  const [binaryOutput, setBinaryOutput] = useState('');

  const convertToBinary = () => {
    const result = inputText
      .split('')
      .map((char) => char.charCodeAt(0).toString(2).padStart(8, '0'))
      .join(' ');
    setBinaryOutput(result);
  };

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(binaryOutput);
    alert('Copied to clipboard!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Text ➜ Binary Converter
      </Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>
          Enter Text:
        </Text>
        <TextInput
          style={styles.textInput}
          placeholder="Type something..."
          value={inputText}
          onChangeText={setInputText}
          multiline
          textAlignVertical="top"
          numberOfLines={4}
        />
      </View>

      <Pressable
        onPress={convertToBinary}
        style={({ pressed }) => [
          styles.convertButton,
          { opacity: pressed ? 0.8 : 1 } // Simple press effect
        ]}
      >
        <Text style={styles.buttonText}>
          Convert to Binary
        </Text>
      </Pressable>

      {binaryOutput ? (
        <View style={styles.outputContainer}>
          <View style={styles.outputHeader}>
            <Text style={styles.label}>
              Binary Output:
            </Text>
            <Pressable onPress={copyToClipboard}>
              <Text style={styles.copyText}>Copy</Text>
            </Pressable>
          </View>
          <ScrollView style={styles.scrollView}>
            <Text style={styles.outputText}>
              {binaryOutput}
            </Text>
          </ScrollView>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb', // gray-50
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
    color: '#1f2937', // gray-800
  },
  inputContainer: {
    backgroundColor: 'white',
    borderRadius: 12, // rounded-xl
    padding: 16,
    marginBottom: 16,
    // Note: Shadow properties are platform-specific and more complex in RN
    // You might need to add shadow styles for iOS/Android separately or use elevation
    // For simplicity, omitting detailed shadow here
  },
  label: {
    fontSize: 18,
    fontWeight: '600', // font-semibold
    marginBottom: 8,
    color: '#374151', // gray-700
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#d1d5db', // gray-300
    borderRadius: 8, // rounded-lg
    padding: 12,
    fontSize: 16,
  },
  convertButton: {
    backgroundColor: '#2563eb', // blue-600
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8, // rounded-lg
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500', // font-medium
  },
  outputContainer: {
    backgroundColor: 'white',
    borderRadius: 12, // rounded-xl
    padding: 16,
    // Shadow omitted for simplicity
  },
  outputHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  copyText: {
    color: '#2563eb', // blue-600
    fontSize: 16,
    fontWeight: '500', // font-medium
  },
  scrollView: {
    backgroundColor: '#f9fafb', // gray-50
    padding: 12,
    borderRadius: 4, // rounded
    borderWidth: 1,
    borderColor: '#e5e7eb', // gray-200
  },
  outputText: {
    fontSize: 14,
    fontFamily: 'Courier New', // Approximating font-mono
    color: '#1f2937', // gray-800
  },
});