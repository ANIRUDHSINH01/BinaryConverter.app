// app/index.tsx
import { View, Text, TextInput, ScrollView, Pressable, StyleSheet, ToastAndroid, Platform } from 'react-native';
import { useState } from 'react';
import * as Clipboard from 'expo-clipboard';

export default function HomeScreen() {
  const [inputText, setInputText] = useState('');
  const [binaryOutput, setBinaryOutput] = useState('');

  const convertToBinary = () => {
    if (!inputText.trim()) {
      setBinaryOutput('');
      return;
    }
    
    const result = inputText
      .split('')
      .map(char => char.charCodeAt(0).toString(2).padStart(8, '0'))
      .join(' ');
    setBinaryOutput(result);
  };

  const copyToClipboard = async () => {
    if (binaryOutput) {
      await Clipboard.setStringAsync(binaryOutput);
      
      // Show toast notification instead of alert
      if (Platform.OS === 'android') {
        ToastAndroid.show('Copied to clipboard!', ToastAndroid.SHORT);
      } else {
        // For iOS, you might want to use a library like `react-native-toast-message`
        alert('Copied to clipboard!'); // Fallback for iOS
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Binary Converter</Text>
        <Text style={styles.subtitle}>Convert text to binary instantly</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Enter Text</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Type something..."
          value={inputText}
          onChangeText={setInputText}
          multiline
          textAlignVertical="top"
        />
        <Pressable
          onPress={convertToBinary}
          style={({ pressed }) => [
            styles.button,
            { opacity: pressed ? 0.8 : 1 }
          ]}
        >
          <Text style={styles.buttonText}>Convert to Binary</Text>
        </Pressable>
      </View>

      {binaryOutput ? (
        <View style={styles.card}>
          <View style={styles.outputHeader}>
            <Text style={styles.label}>Binary Output</Text>
            <Pressable onPress={copyToClipboard} style={styles.copyButton}>
              <Text style={styles.copyText}>Copy</Text>
            </Pressable>
          </View>
          <ScrollView style={styles.scrollView}>
            <Text style={styles.outputText} selectable>
              {binaryOutput}
            </Text>
          </ScrollView>
        </View>
      ) : null}

      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>How it works</Text>
        <Text style={styles.infoText}>
          Each character is converted to its 8-bit binary representation using ASCII values. 
          Spaces separate each character's binary code.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f5f9',
    padding: 20,
    paddingTop: 60,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 12,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    minHeight: 120,
    textAlignVertical: 'top',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#0ea5e9',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  outputHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  copyButton: {
    backgroundColor: '#dbeafe',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  copyText: {
    color: '#0ea5e9',
    fontSize: 16,
    fontWeight: '600',
  },
  scrollView: {
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    padding: 16,
    maxHeight: 200,
  },
  outputText: {
    fontSize: 16,
    fontFamily: 'monospace',
    color: '#0f172a',
    lineHeight: 24,
  },
  infoSection: {
    backgroundColor: '#e2e8f0',
    borderRadius: 16,
    padding: 20,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#475569',
    lineHeight: 20,
  },
});