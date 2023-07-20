import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

import styles from '../myComponents/welcome/welcome.style';
import { COLORS, SIZES } from '../constants';
import { set } from 'react-native-reanimated';

const auth = getAuth();

const SignIn = ({navigation}) => {
  const [value, setValue] = useState({
    email: '',
    password: '',
    error: ''
  })

  async function signIn() {
    if (value.email === '' || value.password === '') {
      setValue({
        ...value,
        error: 'Email and password are mandatory.'
      })
      return;
    }

    signInWithEmailAndPassword(auth, value.email, value.password)
      .catch((error) => {
        setValue({
          ...value,
          error: error.message
        });
      });
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightBeige }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1, padding: SIZES.medium, }}>

          <View style={styles.signupView}>
            <Text style={styles.welcomeText}>Log In</Text>
          </View>

          {!!value.error && <View><Text style={styles.errorText}>{value.error}</Text></View>}

          <View>
            <Input
              style={styles.signupInput}
              placeholder='Email'
              value={value.email}
              onChangeText={(text) => setValue({ ...value, email: text })}
            />

            <Input
              style={styles.signupInput}
              placeholder='Password'
              value={value.password}
              onChangeText={(text) => setValue({ ...value, password: text })}
              secureTextEntry={true}
            />

            <View style={{ paddingLeft: 8, paddingTop: SIZES.xSmall, paddingBottom: SIZES.xLarge }}>
              <TouchableOpacity style={styles.signupButton} onPress={signIn} >
                <Text style={styles.signupText}>Sign In</Text>
              </TouchableOpacity>
            </View>

            <View style={{ padding: 8 }}>
              <TouchableOpacity onPress={() => navigation.navigate('SignUp')} >
                <Text style={styles.noAccountText}>Don't have an account? Sign up</Text>
              </TouchableOpacity>
            </View>

            <View style={{ padding: 8 }}>
              <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')} >
                <Text style={styles.forgotText}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn;
