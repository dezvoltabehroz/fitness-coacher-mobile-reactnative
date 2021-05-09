import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {buttonColor} from '../style/colors';

const TabBar = ({navigation, route}) => {
  return (
    <View style={styles.barContainer}>
      <View style={styles.iconContainer}>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => {
            navigation.navigate('Booking');
          }}>
          {route.name == 'Booking' ? (
            <>
              <Ionicons name="home-outline" color={buttonColor} size={20} />
              <Text style={styles.selectedIconTextStyle}>Home</Text>
            </>
          ) : (
            <>
              <Ionicons name="home-outline" color="#fff" size={20} />
              <Text style={styles.unselectedIconTextStyle}>Home</Text>
            </>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => {
            navigation.navigate('NotificationsStack');
          }}>
          {route.name == 'NotificationsStack' ? (
            <>
              <Ionicons name="create-outline" color={buttonColor} size={20} />
              <Text style={styles.selectedIconTextStyle}>Edit</Text>
            </>
          ) : (
            <>
              <Ionicons name="create-outline" color="#fff" size={20} />
              <Text style={styles.unselectedIconTextStyle}>Edit</Text>
            </>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => {
            navigation.navigate('Create');
          }}>
          {route.name == 'Create' ? (
            <>
              <Ionicons name="cellular-outline" color={buttonColor} size={20} />
              <Text style={styles.selectedIconTextStyle}>Testing 1</Text>
            </>
          ) : (
            <>
              <Ionicons name="cellular-outline" color="#fff" size={20} />
              <Text style={styles.unselectedIconTextStyle}>Testing 1</Text>
            </>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => {
            navigation.navigate('Preview');
          }}>
          {route.name == 'Preview' ? (
            <>
              <Ionicons name="person-outline" color={buttonColor} size={20} />
              <Text style={styles.selectedIconTextStyle}>Profile</Text>
            </>
          ) : (
            <>
              <Ionicons name="person-outline" color="#fff" size={20} />
              <Text style={styles.unselectedIconTextStyle}>Profile</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = {
  barContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    paddingTop: 10,
    paddingBottom: 20,
    backgroundColor: '#08080D',
    borderTopWidth: 0.7,
    borderTopColor: 'grey',
  },
  iconContainer: {
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonStyle: {
    flex: 0.25,
    backgroundColor: '#08080D',
    alignItems: 'center',
    justifyContent: 'center',
  },
  unselectedIconTextStyle: {
    paddingTop: 5,
    fontSize: 12,
    color: '#fff',
  },
  selectedIconTextStyle: {
    paddingTop: 5,
    fontSize: 12,
    color: buttonColor,
  },
};

export default TabBar;
