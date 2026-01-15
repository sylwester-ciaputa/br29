import React from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useMovieStore } from '../store/useMovieStore';
import { MovieCard } from '../components/MovieCard';

export const FavoritesScreen: React.FC = () => {
  const favorites = useMovieStore((state) => state.favorites);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      {favorites.length === 0 ? (
        <View style={styles.center}>
          <Text style={styles.emptyText}>No favorite movies yet.</Text>
        </View>
      ) : (
        <FlatList
          testID="favorites-list"
          data={favorites}
          keyExtractor={(item) => item.imdbID}
          renderItem={({ item }) => <MovieCard movie={item} />}
          contentContainerStyle={styles.list}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
  list: {
    paddingVertical: 20,
  },
});
