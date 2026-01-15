import { useQuery } from '@tanstack/react-query';
import { apiClient } from './client';
import { Movie } from '../types';

interface SearchResponse {
  Search: Movie[];
  totalResults: string;
  Response: string;
  Error?: string;
}

const fetchMovies = async (query: string): Promise<Movie[]> => {
  // Mock implementation
  console.log('Fetching movies (MOCK) for query:', query);
  await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate delay

  if (!query) return [];

  const response = await apiClient.get<SearchResponse>('', {
    params: { s: query },
  });

  if (response.data.Response === 'False') {
    // API returns error 200 OK with Error message in body
    if (response.data.Error === 'Movie not found!') {
      return [];
    }
    throw new Error(response.data.Error || 'Failed to fetch movies');
  }

  return response.data.Search;
};

export const useMovies = (query: string) => {
  return useQuery({
    queryKey: ['movies', query],
    queryFn: () => fetchMovies(query),
    enabled: query.length > 2, // Search only if query is long enough
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });
};
