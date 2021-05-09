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
  FlatList,
} from 'react-native';
import {Colors} from '../../style/colors';
import {FontFamily} from '../../style/typograpy';
import NotificationCard from './NotificationsCard';
const height = Dimensions.get('window').height;
const NotificationsScreen = props => {
  const [data, setdata] = useState([
    {
      type: 'completed_booking',
      message: 'You have a new booking opportunity',
    },
    // {
    //   type: 'booking_request',
    //   message: 'Zimry Mayfield has responded to your booking request',
    // },
    {
      type: 'started_booking',
      message: 'Your booking with Porter Shue has started',
    },
    {
      type: 'review',
      message: 'Porter Shue left a 5 star review',
    },
    {
      type: 'review',
      message: 'Porter Shue left a 5 star review',
    },
    {
      type: 'review',
      message: 'Porter Shue left a 5 star review',
    },
  ]);
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor={'transparent'}
      />
      <View style={styles.titleContainer}>
        <Text style={styles.text}>NOTIFICATIONS</Text>
      </View>

      <ScrollView style={styles.bottom}>
        <FlatList
          data={data}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => {
            return (
              <NotificationCard item={item} navigation={props.navigation} />
            );
          }}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottom: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.whiteColor,
    borderTopRightRadius: 35,
    borderTopLeftRadius: 35,
    paddingHorizontal: 20,
  },
  titleContainer: {
    height: '7%',
    marginTop: height > 667 ? '10%' : '7%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 20,
  },

  text: {
    fontFamily: FontFamily.helveticaBold,
    fontSize: height > 667 ? 16 : 13,
    // marginTop: '5%',
  },
});

export default NotificationsScreen;
