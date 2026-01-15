import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const HelpScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <View style={styles.content}>
        <Text style={styles.text}>Help Screen</Text>
        <Text style={styles.subtext}>How to use the app:</Text>
        <Text>1. Login with admin/haslo</Text>
        <Text>2. Search for movies</Text>
        <Text>3. Add favorites with ❤️</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtext: {
    fontSize: 18,
    marginBottom: 10,
  },
});
