import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  ImageBackground,
  Image,
  AsyncStorage,
  NativeModules,
  Platform,
  ActivityIndicator,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { color } from 'react-native-reanimated';
import { Colors } from '../style/colors';
const height = Dimensions.get('window').height;
import { FontFamily } from '../style/typograpy';

const Button = ({ text, onPress, flag, loading }) => {
  useEffect(() => { });
  return (
    <TouchableOpacity
      style={[
        styles.container,
        { backgroundColor: flag ? '#030e2d' : Colors.buttonColor },
      ]}
      onPress={onPress}>
      {
        loading ?
          <ActivityIndicator size={20} color="white" />
          :
          <Text style={[styles.text]}>{text}</Text>
      }

    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: height > 667 ? 50 : 40,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: Colors.buttonColor,
    borderRadius: 10,
    marginTop: 20,
  },
  text: {
    fontFamily: FontFamily.helveticaBold,
    color: Colors.whiteColor,
    fontSize: 15,
  },
});

export default Button;
