import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Alert } from '../utils/alert';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { MainTabParamList, RootStackParamList } from '../types';
import { HomeScreen } from '../screens/HomeScreen';
import { FavoritesScreen } from '../screens/FavoritesScreen';
import { HelpScreen } from '../screens/HelpScreen';
import { ContactScreen } from '../screens/ContactScreen';
import { TestScreen } from '../screens/TestScreen';

const Tab = createBottomTabNavigator<MainTabParamList>();

// Placeholder component for Logout since we handle it in listeners
const LogoutComponent = () => null;

export const TabNavigator = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof MaterialIcons.glyphMap = 'help';

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Favorites') {
            iconName = 'favorite';
          } else if (route.name === 'Help') {
            iconName = 'help';
          } else if (route.name === 'Contact') {
            iconName = 'contact-mail';
          } else if (route.name === 'Test') {
            iconName = 'settings';
          } else if (route.name === 'Logout') {
            iconName = 'logout';
          }

          return (
            <MaterialIcons name={iconName} size={size - 4} color={color} />
          );
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
      <Tab.Screen name="Help" component={HelpScreen} />
      <Tab.Screen name="Contact" component={ContactScreen} />
      <Tab.Screen name="Test" component={TestScreen} />
      <Tab.Screen
        name="Logout"
        component={LogoutComponent}
        options={{
          tabBarLabel: 'Logout',
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();

            Alert.alert('Logout', 'Are you sure you want to logout?', [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              {
                text: 'Logout',
                style: 'destructive',
                onPress: () => {
                  navigation.reset({
                    index: 0,
                    routes: [{ name: 'Login' }],
                  });
                },
              },
            ]);
          },
        }}
      />
    </Tab.Navigator>
  );
};
