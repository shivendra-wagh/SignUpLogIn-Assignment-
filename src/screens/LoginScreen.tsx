import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Switch } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Formik } from 'formik';
import * as Yup from 'yup';

const LoginScreen = () => {
  const [rememberMe, setRememberMe] = useState(false);
  const [savedEmail, setSavedEmail] = useState('');

  useEffect(() => {
    const loadEmail = async () => {
      const email = await AsyncStorage.getItem('rememberedEmail');
      if (email) setSavedEmail(email);
    };
    loadEmail();
  }, []);

  const handleRememberMe = async (email: string) => {
    if (rememberMe) {
      await AsyncStorage.setItem('rememberedEmail', email);
    } else {
      await AsyncStorage.removeItem('rememberedEmail');
    }
  };

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  return (
    <Formik
      initialValues={{ email: savedEmail, password: '' }}
      validationSchema={LoginSchema}
      onSubmit={(values) => {
        handleRememberMe(values.email);
        Alert.alert('Login Successful', `Welcome back, ${values.email}!`);
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <View style={styles.container}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            value={values.email}
            keyboardType="email-address"
            accessibilityLabel="Email Input"
          />
          {errors.email && touched.email && <Text style={styles.error}>{errors.email}</Text>}

          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            value={values.password}
            accessibilityLabel="Password Input"
          />
          {errors.password && touched.password && <Text style={styles.error}>{errors.password}</Text>}

          <View style={styles.rememberMe}>
            <Text>Remember Me</Text>
            <Switch
              value={rememberMe}
              onValueChange={setRememberMe}
              accessibilityLabel="Remember Me Toggle"
            />
          </View>

          <Button onPress={() => handleSubmit()} title="Sign Up" />

        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  label: { fontSize: 16, fontWeight: 'bold' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginVertical: 10, borderRadius: 5 },
  error: { color: 'red', fontSize: 12 },
  rememberMe: { flexDirection: 'row', alignItems: 'center', marginVertical: 10 },
});

export default LoginScreen;
