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
  TouchableOpacity,
} from 'react-native';
import {Colors} from '../../style/colors';
import {FontFamily} from '../../style/typograpy';
const height = Dimensions.get('window').height;
const NotificationsCard = ({item, navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.outer}>
        <View style={styles.inner}>
          <Image
            source={require('../../assets/splash.jpg')}
            style={styles.image}
          />
          <View>
            {item.type == 'completed_booking' ? (
              <View
                style={{
                  // justifyContent:'',
                  // backgroundColor: 'pink',
                  alignSelf: 'center',
                  // marginTop: 2,
                }}>
                <Text style={styles.text}>{item.message}</Text>
                <Text
                  style={[
                    styles.text,
                    {
                      fontSize: 11,
                      lineHeight: height > 667 ? 10 : 12,
                      color: Colors.textColor,
                    },
                  ]}>
                  12 mins ago
                </Text>
              </View>
            ) : (
              <>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Bookingdetails')}>
                  <Text style={styles.text}>{item.message}</Text>
                </TouchableOpacity>

                <Text
                  style={[
                    styles.text,
                    {
                      fontSize: 11,
                      lineHeight: height > 667 ? 10 : 12,
                      color: Colors.textColor,
                    },
                  ]}>
                  17 hours ago
                </Text>
              </>
            )}
          </View>
        </View>

        {item.type == 'completed_booking' && (
          <>
            <View style={styles.detailsView}>
              <View>
                <Text style={styles.text1}>Sport Time</Text>
                <Text style={styles.text1}>Category</Text>
                <Text style={styles.text1}>Age Group</Text>
              </View>

              <View>
                <Text
                  style={[styles.text1, {color: 'black', textAlign: 'right'}]}>
                  Baseball
                </Text>
                <Text
                  style={[styles.text1, {color: 'black', textAlign: 'right'}]}>
                  Hitting
                </Text>
                <Text
                  style={[styles.text1, {color: 'black', textAlign: 'right'}]}>
                  12u
                </Text>
              </View>
            </View>
            <View
              style={{
                height: height > 667 ? 40 : 35,
                marginVertical: 5,
                marginHorizontal: '5%',
                backgroundColor: '#EBECF3',
                borderRadius: 10,
                justifyContent: 'center',
                paddingHorizontal: 10,
              }}>
              <Text
                style={{textAlign: 'center', fontSize: height > 667 ? 14 : 12}}>
                You'll be earning an expected $200
              </Text>
            </View>
          </>
        )}
      </View>
      {item.type == 'completed_booking' ? (
        <View style={styles.buttonView}>
          <TouchableOpacity
            style={[styles.button, {borderBottomLeftRadius: 10}]}
            onPress={() => {
              navigation.navigate('AcceptBooking', {flag: true});
            }}>
            <Text style={styles.text3}>Accept</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, {borderBottomRightRadius: 10}]}>
            <Text style={styles.text3}>Reject</Text>
          </TouchableOpacity>
        </View>
      ) : item.type == 'booking_request' ? (
        <TouchableOpacity style={styles.booking}>
          <Text style={styles.text3}>View Profile</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    //   height:90,
    borderWidth: 1,
    borderColor: Colors.backgroundColor,
    borderRadius: 10,
    marginTop: 15,
    //   padding:5
  },
  text: {
    fontFamily: FontFamily.helvetica,
    fontSize: height > 667 ? 13 : 11,
    // width: height > 667 ? 300 : 350,
    // lineHeight: 22,
  },
  text1: {
    fontFamily: FontFamily.helvetica,
    fontSize: height > 667 ? 12 : 10,
    color: Colors.textColor,
    marginTop: 4,
  },
  text2: {
    fontFamily: FontFamily.helvetica,
    fontSize: height > 667 ? 14 : 12,
    color: Colors.textColor,
  },
  text3: {
    fontFamily: FontFamily.helvetica,
    fontSize: height > 667 ? 14 : 12,
    color: Colors.whiteColor,
  },
  image: {
    height: height > 667 ? 45 : 35,
    width: height > 667 ? 45 : 35,
    borderRadius: height > 667 ? 45 : 35,
    marginRight: 10,
  },

  outer: {
    justifyContent: 'space-between',
    // backgroundColor: 'green',
    // height: 140,
  },

  inner: {
    flexDirection: 'row',
    margin: 5,
    // backgroundColor: 'red',
    // justifyContent: 'center',
    alignItems: 'center',
  },

  detailsView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '3%',
    // backgroundColor: 'orange',
  },
  act: {
    height: 23,
    borderRadius: 25,
    width: '18%',
    backgroundColor: '#90ee90',
    alignItems: 'center',
    justifyContent: 'center',
  },
  acyText: {
    fontFamily: FontFamily.helveticaLight,
    fontSize: 9,
  },

  bar: {
    height: 2,
    backgroundColor: Colors.backgroundColor,
    marginTop: 5,
  },
  bottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  buttonView: {
    flexDirection: 'row',
    width: '100%',
  },
  button: {
    width: '50%',
    height: 40,
    backgroundColor: Colors.blackColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  booking: {
    width: '100%',
    height: 40,
    backgroundColor: Colors.blackColor,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
});

export default NotificationsCard;
