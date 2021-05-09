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
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {Colors} from '../../style/colors';
import {RadioButton, Checkbox} from 'react-native-paper';
import {FontFamily} from '../../style/typograpy';
const height = Dimensions.get('window').height;
const PlayerReviewsCard = props => {
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={require('../../assets/splash.jpg')}
            style={styles.profile}
          />
          <View style={{marginLeft: 10}}>
            <Text style={styles.text}>Dmitri Albov</Text>
            <Text style={styles.text1}>Feb 27 ,2021</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            // alignItems: 'center',
          }}>
          <Image
            style={styles.star}
            source={require('../../assets/star.png')}
          />
          <Text style={[styles.text1, {marginLeft: 10}]}>4.7</Text>
        </View>
      </View>
      <Text style={styles.text2}>This is text. This is text. This is text</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.textColor,
    padding: 10,
    marginTop: 20,
  },
  main: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  profile: {
    height: 35,
    width: 35,
    borderRadius: 35,
  },
  star: {
    height: 15,
    width: 15,
    marginTop: Platform.OS == 'ios' ? -2 : 2,
  },
  text: {
    fontSize: 14,
    color: Colors.blackColor,
    fontFamily: FontFamily.helveticaBold,
  },
  text1: {
    fontSize: 12,
    color: Colors.textColor,
    fontFamily: FontFamily.helvetica,
  },
  text2: {
    fontSize: 15,
    color: Colors.textColor,
    fontFamily: FontFamily.helvetica,
    marginTop: 5,
  },
});

export default PlayerReviewsCard;
