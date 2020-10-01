import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Text style={styles.header}>This is the header</Text>
      <TextInput style={styles.input} placeholder='Enter some text' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    fontFamily: 'SansitaSwashed-Bold'
  },
  input: {
    fontSize: 16,
    fontFamily: 'SansitaSwashed-Regular'
  }
});
