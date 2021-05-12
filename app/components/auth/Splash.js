import React, {useEffect, useState} from 'react';
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
} from 'react-native';
import {Colors} from '../../style/colors';
const height = Dimensions.get('window').height;
const SplashScreen = props => {
  useEffect(() => {
    setTimeout(() => {
      props.navigation.navigate('Login');
    }, 2000);
  });
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor={'transparent'}
      />
      <ImageBackground
        source={require('../../assets/splash.jpg')}
        style={styles.image}>
        <View
          style={{flex: 0.5, alignItems: 'center', justifyContent: 'center'}}>
          {/* <Image
            source={require('../../assets/logo.png')}
            style={styles.logo}
          /> */}
        </View>
        <View
          style={{flex: 0.5, alignItems: 'center', justifyContent: 'center'}}>
          {/* <Text style={styles.text}>Athlete</Text> */}
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  logo: {
    height: 300,
    width: 300,
    alignSelf: 'center',
    marginTop: 150,
  },
  text: {
    fontSize: 20,
    color: Colors.whiteColor,
    fontWeight: '400',
    marginTop: height > 667 ? '80%' : '65%',
  },
});

export default SplashScreen;
