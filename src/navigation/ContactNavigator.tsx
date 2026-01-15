import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ContactStackParamList } from '../types';
import { ContactScreen } from '../screens/ContactScreen';
import { CallRequestScreen } from '../screens/CallRequestScreen';

const Stack = createNativeStackNavigator<ContactStackParamList>();

export const ContactNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="ContactMain">
      <Stack.Screen
        name="ContactMain"
        component={ContactScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CallRequest"
        component={CallRequestScreen}
        options={{
          headerShown: true,
          title: 'Request Call',
          headerBackTitle: 'Contact',
        }}
      />
    </Stack.Navigator>
  );
};
