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
  Dimensions,
  TextInput,
} from 'react-native';
import { Colors } from '../style/colors';
const height = Dimensions.get('window').height;
import { FontFamily } from '../style/typograpy';

const Input = ({ text,
  placeholder,
  placeholderTextColor,
  secureTextEntry,
  full,
  value,
  onChangeText,
  keyboardType, }) => {

  const styles = StyleSheet.create({
    container: {
      paddingHorizontal: full ? 0 : 20,
      marginTop: full ? 10 : 17
    },
    text:
    {
      fontFamily: FontFamily.helveticaLight,
      color: Colors.textColor,
      fontSize: 13,
      marginBottom: 12
    },
    input:
    {
      height: height > 667 ? 50 : 40,
      borderWidth: 1,
      borderColor: '#e0dede',
      borderRadius: 10,
      backgroundColor: Colors.whiteColor,
      color: Colors.blackColor,
      paddingLeft: 10,
      fontFamily: FontFamily.helveticaBold,
      fontSize: 13,

    }


  });
  useEffect(() => {

  })
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
      <TextInput
        secureTextEntry={secureTextEntry}
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
      />
    </View>
  );
};

export default Input;
