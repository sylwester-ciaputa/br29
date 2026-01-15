import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Movie } from '../types';
import { useMovieStore } from '../store/useMovieStore';

interface MovieCardProps {
  movie: Movie;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const isFavorite = useMovieStore((state) =>
    state.favorites.some((m) => m.imdbID === movie.imdbID)
  );
  const addFavorite = useMovieStore((state) => state.addFavorite);
  const removeFavorite = useMovieStore((state) => state.removeFavorite);

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFavorite(movie.imdbID);
    } else {
      addFavorite(movie);
    }
  };

  return (
    <View style={styles.card} testID={`movie-card-${movie.imdbID}`}>
      <Image
        source={{
          uri:
            movie.Poster !== 'N/A'
              ? movie.Poster
              : 'https://via.placeholder.com/150',
        }}
        style={styles.poster}
        resizeMode="cover"
      />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>
          {movie.Title}
        </Text>
        <Text style={styles.year}>{movie.Year}</Text>
      </View>
      <TouchableOpacity
        onPress={toggleFavorite}
        style={styles.favoriteButton}
        testID="favorite-button"
      >
        <Text style={styles.favoriteText}>{isFavorite ? '❤️' : '🤍'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    alignItems: 'center',
  },
  poster: {
    width: 60,
    height: 90,
    borderRadius: 4,
    backgroundColor: '#eee',
  },
  info: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  year: {
    fontSize: 14,
    color: '#666',
  },
  favoriteButton: {
    padding: 10,
  },
  favoriteText: {
    fontSize: 24,
  },
});
