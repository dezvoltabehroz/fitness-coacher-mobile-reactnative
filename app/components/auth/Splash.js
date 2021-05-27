import AsyncStorage from '@react-native-async-storage/async-storage';
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
  NativeModules,
  Platform,
  Dimensions,
} from 'react-native';
import { Colors } from '../../style/colors';
import { authActions } from '../../redux/actions/auth';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { AuthServices } from '../../services';
import messaging from '@react-native-firebase/messaging';
const height = Dimensions.get('window').height;
const SplashScreen = props => {
  useEffect(() => {
    setTimeout(async () => {
      let token = await AsyncStorage.getItem('Token');
      let user = await AsyncStorage.getItem('USER');
      let userdata = JSON.parse(user)
      let userToken = JSON.parse(token)
      console.log(userToken)
      if (userToken) {
        AuthServices.validateUser(userToken)
          .then(async (res) => {
            let userData = {
              id: userdata.id,
              token: res.data.userData.tokenInfo
            }
            console.log(res.data)
            requestUserPermission(userData)
            // await props.authActions.getUserProfile(userData, props.navigation.replace);
          })
          .catch((err) => console.log(err))
      } else { props.navigation.replace('Login'); }
    }, 2000);
  });

  const requestUserPermission = async function (data) {
    try {
      const authStatus = await messaging().hasPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('permission granted');
        getFcmToken(data);
      }
    } catch (error) {
      // User has rejected permissions
      console.log('permission rejected');
    }

  }

  const getFcmToken = async (userData) => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      let data = {
        id: userData.id,
        fcmToken: fcmToken,
        token: userData.token
      }
      AuthServices.addFCMToken(data)
        .then(async (res) => {
          console.log("res.data :", res.data)
          if (res.data.status) {
            await props.authActions.getUserProfile(userData, props.navigation.replace);
          } else {
            await props.authActions.getUserProfile(userData, props.navigation.replace);
            // this.props.actions.removeUser(this.props.navigation.replace)
          }
        })
        .catch((err) => { console.log("err : ", err); props.authActions.removeUser(props.navigation.replace) })
    } else {
      console.log("Failed", "No token received");
    }

  }
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
          style={{ flex: 0.5, alignItems: 'center', justifyContent: 'center' }}>
        </View>
        <View
          style={{ flex: 0.5, alignItems: 'center', justifyContent: 'center' }}>
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

const mapStateToProps = (state) => ({
  user: state.user,

});

const mapDispatchToProps = dispatch => {
  return {
    authActions: bindActionCreators(authActions, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SplashScreen)
