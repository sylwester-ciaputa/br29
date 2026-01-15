export interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Type: string;
  Poster: string;
}

export type RootStackParamList = {
  Login: undefined;
  Main: undefined; // Main Tab Navigator
};

export type ContactStackParamList = {
  ContactMain: { phoneNumber?: string };
  CallRequest: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Favorites: undefined;
  Help: undefined;
  Contact: undefined;
  Test: undefined;
  TransQuery: undefined;
  Logout: undefined;
};
