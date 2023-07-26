import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import styles from '../myComponents/welcome/welcome.style';
import { COLORS, SIZES } from '../constants';

const Welcome: React.FC<NativeStackScreenProps<any>> = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightBeige }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1, padding: SIZES.medium, }}>

          <View style={{ alignItems: 'center', padding: SIZES.xLarge }}>
            <Text style={styles.welcomeText}>Welcome to Flowtime</Text>
          </View>

          <View style={{ alignItems: 'center', padding: SIZES.xLarge }}>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SignIn')}>
              <Text style={styles.text}>Sign In</Text>
            </TouchableOpacity>
          </View>

          <View style={{ alignItems: 'center', padding: SIZES.xLarge }}>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SignUp')}>
              <Text style={styles.text}>Sign Up</Text>
            </TouchableOpacity>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Welcome;