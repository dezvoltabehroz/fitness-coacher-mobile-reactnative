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
  NativeModules,
  Platform,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {Colors} from '../../style/colors';
import {FontFamily} from '../../style/typograpy';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BottomTabBar from '../../common/BottomTabBar';
import AsyncStorage from '@react-native-async-storage/async-storage';

const height = Dimensions.get('window').height;
const SettingsScreen = props => {
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor={'transparent'}
      />
      <View style={styles.header}>
        {/* <View style={{flexDirection: 'row', alignItems: 'center'}}> */}
        <Text style={styles.headertext}>SETTINGS</Text>
        {/* </View> */}
      </View>

      <ScrollView
        contentContainerStyle={{paddingBottom: '10%'}}
        style={styles.bottom}>
        <TouchableOpacity
          style={[styles.outerView, {marginTop: 30}]}
          onPress={() => {
            props.navigation.navigate('NotificationsSettings');
          }}>
          <View style={styles.left}>
            <Image
              source={require('../../assets/notification.png')}
              style={styles.image}
            />
          </View>
          <Text style={styles.text1}>Notifications Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.outerView, {marginTop: 40}]}
          onPress={() => {
            props.navigation.navigate('AccountSettings');
          }}>
          <View style={styles.left}>
            <Image
              source={require('../../assets/user.png')}
              style={styles.image}
            />
          </View>
          <Text style={styles.text1}>Account Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.outerView, {marginTop: 40}]}
          onPress={() => {
            props.navigation.navigate('Earnings');
          }}>
          <View style={styles.left}>
            <Image
              source={require('../../assets/payment.png')}
              style={styles.image}
            />
          </View>
          <Text style={styles.text1}>Earnings</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.outerView, {marginTop: 40}]}
          onPress={() => {
            props.navigation.navigate('ConnectedAccounts');
          }}>
          <View style={styles.left}>
            <Ionicons name="card" size={height > 667 ? 20 : 17} />
          </View>
          <Text style={styles.text1}>Payment Options</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.outerView, {marginTop: 40}]}>
          <View style={styles.left}>
            <Image
              source={require('../../assets/terms.png')}
              style={styles.image}
            />
          </View>
          <Text style={styles.text1}>Term of Services</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.outerView, {marginTop: 40}]}>
          <View style={styles.left}>
            <Image
              source={require('../../assets/privacy.png')}
              style={styles.image}
            />
          </View>
          <Text style={styles.text1}>Privacy Policy</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={async()=>{
          await AsyncStorage.removeItem('Token');
          props.navigation.replace('Login')
        }} style={[styles.outerView, {marginTop: 40}]}>
          <View style={styles.left}>
            <Image
              source={require('../../assets/logout.png')}
              style={styles.image}
            />
          </View>
          <Text style={styles.text1}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
      {/* <BottomTabBar {...props} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottom: {
    height: '90%',
    width: '100%',
    backgroundColor: Colors.whiteColor,
    borderTopRightRadius: 35,
    borderTopLeftRadius: 35,
    // marginTop: '22%',
    paddingHorizontal: 20,
  },
  header: {
    // flexDirection: 'row',
    height: '7%',
    marginTop: height > 667 ? '10%' : '7%',
    paddingLeft: 20,
    // alignItems: 'center',
    justifyContent: 'center',
  },
  headertext: {
    fontFamily: FontFamily.helveticaBold,
    fontSize: height > 667 ? 16 : 13,
    marginLeft: 15,
    marginBottom: height > 667 ? 5 : 10,
  },
  text: {
    fontFamily: FontFamily.helveticaBold,
    fontSize: 16,
    marginTop: 10,
  },
  text1: {
    fontFamily: FontFamily.helveticaBold,
    fontSize: height > 667 ? 14 : 12,
    marginLeft: 10,
  },
  outerView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
  },
  left: {
    height: height > 667 ? 30 : 25,
    width: height > 667 ? 30 : 25,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.textColor,
  },
  image: {
    height: height > 667 ? 17 : 15,
    width: height > 667 ? 17 : 15,
  },
});

export default SettingsScreen;
