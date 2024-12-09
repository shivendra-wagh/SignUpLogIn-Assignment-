import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';

const SignUpScreen = () => {
  const [passwordStrength, setPasswordStrength] = useState<string>('Weak');

  const passwordStrengthIndicator = (password: string) => {
    if (password.length > 8 && /[A-Z]/.test(password) && /\d/.test(password)) {
      setPasswordStrength('Strong');
    } else if (password.length > 6) {
      setPasswordStrength('Medium');
    } else {
      setPasswordStrength('Weak');
    }
  };

  const SignUpSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Too short').required('Password is required'),
  });

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={SignUpSchema}
      onSubmit={(values) => Alert.alert('Sign Up Successful', `Welcome, ${values.email}!`)}
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
            onChangeText={(text) => {
              handleChange('password')(text);
              passwordStrengthIndicator(text);
            }}
            onBlur={handleBlur('password')}
            value={values.password}
            accessibilityLabel="Password Input"
          />
          {errors.password && touched.password && <Text style={styles.error}>{errors.password}</Text>}
          <Text style={styles.passwordStrength}>{`Password Strength: ${passwordStrength}`}</Text>

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
  passwordStrength: { marginBottom: 20 },
});

export default SignUpScreen;
