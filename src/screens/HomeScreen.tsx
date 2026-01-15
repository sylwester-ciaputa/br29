import React, { useState } from 'react';
import {
  View,
  TextInput,
  FlatList,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, MainTabParamList } from '../types';
import { useMovies } from '../api/useMovies';
import { MovieCard } from '../components/MovieCard';
import { useDebounce } from '../utils/useDebounce';

type Props = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'Home'>,
  NativeStackScreenProps<RootStackParamList>
>;

export const HomeScreen: React.FC<Props> = ({ navigation: _navigation }) => {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);
  const { data: movies, isLoading, error } = useMovies(debouncedSearch);

  console.log('HomeScreen render:', {
    search,
    debouncedSearch,
    moviesCount: movies?.length,
    moviesType: typeof movies,
    isLoading,
    error,
  });

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for movies..."
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {isLoading && (
        <View style={styles.center}>
          <ActivityIndicator size="large" />
        </View>
      )}

      {error && (
        <View style={styles.center}>
          <Text style={styles.error}>
            {(error as Error).message || 'Something went wrong'}
          </Text>
        </View>
      )}

      {!isLoading && !error && movies && movies.length === 0 && (
        <View style={styles.center}>
          <Text>No movies found</Text>
        </View>
      )}

      <FlatList
        data={movies || []}
        keyExtractor={(item) => item.imdbID}
        renderItem={({ item }) => <MovieCard movie={item} />}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 8,
    marginRight: 10,
    backgroundColor: '#fff',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    color: 'red',
  },
  list: {
    paddingBottom: 20,
  },
});
