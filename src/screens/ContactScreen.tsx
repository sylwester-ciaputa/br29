import React, { useCallback, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  useNavigation,
  useRoute,
  RouteProp,
  useFocusEffect,
} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ContactStackParamList } from '../types';

type ContactScreenNavigationProp = NativeStackNavigationProp<
  ContactStackParamList,
  'ContactMain'
>;
type ContactScreenRouteProp = RouteProp<ContactStackParamList, 'ContactMain'>;

export const ContactScreen: React.FC = () => {
  const navigation = useNavigation<ContactScreenNavigationProp>();
  const route = useRoute<ContactScreenRouteProp>();
  const { phoneNumber } = route.params || {};
  const [isMessageVisible, setIsMessageVisible] = useState(false);

  // Show message when phoneNumber changes (and is present)
  useEffect(() => {
    if (phoneNumber) {
      setIsMessageVisible(true);
    }
  }, [phoneNumber]);

  // Hide message when leaving the screen
  useFocusEffect(
    useCallback(() => {
      return () => {
        setIsMessageVisible(false);
      };
    }, [])
  );

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <View style={styles.content}>
        <Text style={styles.text}>Contact Us</Text>
        <Text style={styles.infoText}>Email: support@movieapp.com</Text>
        <Text style={styles.infoText}>Phone: +48 123 456 789</Text>

        {phoneNumber && isMessageVisible && (
          <View style={styles.messageContainer}>
            <Text style={styles.messageText}>
              We will call you at {phoneNumber} within 24h.
            </Text>
          </View>
        )}

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('CallRequest')}
        >
          <Text style={styles.buttonText}>Request a Call</Text>
        </TouchableOpacity>
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
    padding: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },
  messageContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#e8f5e9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#c8e6c9',
    width: '100%',
    alignItems: 'center',
  },
  messageText: {
    color: '#2e7d32',
    fontSize: 16,
    textAlign: 'center',
  },
  button: {
    marginTop: 30,
    backgroundColor: 'tomato',
    paddingVertical: 12,
    paddingHorizontal: 30,    borderRadius: 25,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
