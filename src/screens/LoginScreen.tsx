import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormData = z.infer<typeof loginSchema>;

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = (data: LoginFormData) => {
    console.log('Login data:', data);
    if (data.username === 'admin' && data.password === 'haslo') {
      navigation.replace('Main');
    } else {
      Alert.alert('Login Failed', 'Invalid username or password');
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome Back</Text>

        <Text style={styles.label}>Username</Text>
        <Controller
          control={control}
          name="username"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              testID="username-input"
              style={[styles.input, errors.username && styles.inputError]}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              autoCapitalize="none"
            />
          )}
        />
        {errors.username && (
          <Text style={styles.errorText}>{errors.username.message}</Text>
        )}

        <Text style={styles.label}>Password</Text>
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              testID="password-input"
              style={[styles.input, errors.password && styles.inputError]}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              secureTextEntry
            />
          )}
        />
        {errors.password && (
          <Text style={styles.errorText}>{errors.password.message}</Text>
        )}

        <View style={styles.buttonContainer}>
          <Button
            testID="login-button"
            title="Login"
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#333',
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    fontSize: 14,
  },
  buttonContainer: {
    marginTop: 20,
  },
});
