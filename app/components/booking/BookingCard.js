import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { Colors } from '../../style/colors';
import { FontFamily } from '../../style/typograpy';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import moment from "moment"
const height = Dimensions.get('window').height;
const BookingCard = props => {

  return (
    <View style={styles.container}>
      <View style={styles.outer}>
        <View style={styles.inner}>
          <Image
            resizeMode="contain"
            source={props.item.athlete.imageUrl != null ? { uri: props.item.athlete.imageUrl } : require('../../assets/splash.jpg')}
            style={styles.image}
          />
          <View>
            <Text style={styles.text}>{props.item.athlete.firstName} {props.item.athlete.lastName}</Text>
            <Text style={styles.text1}>Started {moment(props.item.athleteRequest.createdAt).format("MMM DD")}</Text>
          </View>
        </View>
        <View style={styles.act}>
          {props.active ? (
            <Text style={styles.smallText}>Active</Text>
          ) : (
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('BookingApproved', { bookingData: props.item });
              }}>
              <Text style={styles.smallText}>Review</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View style={styles.bar}></View>
      <View style={styles.bottom}>
        <Text style={styles.text2}>{props.item.athleteRequest.trainingType.title} Coaching</Text>
        {
          !props.active ?
            null
            :
            <TouchableOpacity
              style={{ flexDirection: 'row', alignItems: 'center', }}
              onPress={() => {
                props.navigation.navigate('Bookingdetails', { bookingId: props.item.id });
              }}>
              <Text style={[styles.text2, { color: '#030E2D' }]}>View Details</Text>
              <MaterialIcons
                name="arrow-right-alt"
                size={height > 667 ? 20 : 16}
                color={'#030E2D'}
              />
            </TouchableOpacity>
        }

      </View>
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
    padding: 5,
  },
  text: {
    fontFamily: FontFamily.helveticaBold,
    fontSize: height > 667 ? 14 : 13,
  },
  text1: {
    fontFamily: FontFamily.helveticaBold,
    fontSize: height > 667 ? 12 : 10,
    color: Colors.textColor,
    // marginTop: 5,
  },
  text2: {
    fontFamily: FontFamily.helveticaLight,
    fontSize: height > 667 ? 14 : 12,
    color: Colors.textColor,
  },
  image: {
    height: height > 667 ? 45 : 35,
    width: height > 667 ? 45 : 35,
    borderRadius: height > 667 ? 45 : 35,
    marginRight: 10,
  },
  image1: {
    height: 18,
    width: 18,
    marginLeft: 5,
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 45,
  },
  act: {
    height: height > 667 ? 23 : 20,
    borderRadius: 25,
    width: '18%',
    backgroundColor: '#c1ffd3',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: height > 667 ? -7 : -4,
  },
  acyText: {
    fontFamily: FontFamily.helveticaLight,
    fontSize: height > 667 ? 9 : 7,
  },
  outer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  smallText: {
    fontSize: height > 667 ? 12 : 10,
  },
});

export default BookingCard;
