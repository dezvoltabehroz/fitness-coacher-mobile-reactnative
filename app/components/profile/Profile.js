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
  Dimensions
} from 'react-native';
import {Colors} from '../../style/colors'
const height=Dimensions.get('window').height
const ProfileScreen = (props) => {

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor={'transparent'}
      />
          <Text style={styles.text}>this is screen</Text>
        
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
 

});

export default ProfileScreen;
