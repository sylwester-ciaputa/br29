import { useFocusEffect } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import React, { useCallback } from 'react';
import { delay } from '../utils/delay';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const TransQueryScreen: React.FC = () => {
  const { isPending, error, data, refetch } = useQuery({
    queryKey: ['repoData'],
    queryFn: async () => {
      const res = await fetch('https://api.github.com/repos/TanStack/query');
      await delay(2000);
      return res.json();
    },
  });

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

  console.log({ isPending, error, data });

  if (isPending) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) return 'An error has occurred: ' + error.message;

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <View style={styles.content}>
        <Text>{data.name}</Text>
        <Text>{data.description}</Text>
        <Text>👀 {data.subscribers_count}</Text>
        <Text>✨ {data.stargazers_count}</Text>
        <Text>🍴 {data.forks_count}</Text>
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
    margin: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
