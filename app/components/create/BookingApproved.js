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
} from 'react-native';
import {Colors} from '../../style/colors';
import {RadioButton, Checkbox} from 'react-native-paper';
import {FontFamily} from '../../style/typograpy';
import Button from '../../common/Button';
import {TouchableOpacity} from 'react-native-gesture-handler';
import DetailsModal from '../../common/DetailsModal';
import {Container, Header, Content, Tab, Tabs} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AccountInput from '../../common/AccountInput';

const WATER_IMAGE = require('../../assets/star.png');

const height = Dimensions.get('window').height;
const AcceptBooking = props => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isActive, setIsActive] = useState(true);
  //   useEffect(() => {
  //     if (props.route.params != undefined) {
  //       const {flag} = props?.route?.params;
  //       if (flag) {
  //         setModalVisible(true);
  //       }
  //     }
  //   }, []);
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor={'transparent'}
      />
      <View style={styles.header}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <Ionicons
              name="arrow-back"
              size={height > 667 ? 20 : 16}
              style={{marginTop: 3}}
            />
          </TouchableOpacity>
          <Text style={styles.headertext}>PORTER SHUE - CCH643311</Text>
        </View>
      </View>

      <View style={styles.bottom}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: height > 667 ? '30%' : '90%'}}>
          <View style={styles.congratulationsContainer}>
            <View style={styles.congratulationView}>
              <Ionicons name="checkmark-circle" size={20} />
              <Text style={[styles.text, {marginTop: 0, color: 'black'}]}>
                Congratulations, your booking has been approved
              </Text>
            </View>
            <Text
              style={{
                textAlign: 'center',
                fontSize: height > 667 ? 14 : 12,
                color: 'red',
              }}>
              You have successfully earned $220.20
            </Text>
          </View>
          <View style={styles.border}>
            <View
              style={{
                height: '30%',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <Ionicons
                name="star"
                size={25}
                color="yellow"
                style={{marginHorizontal: 2}}
              />
              <Ionicons
                name="star"
                size={25}
                color="yellow"
                style={{marginHorizontal: 2}}
              />
              <Ionicons
                name="star"
                size={25}
                color="yellow"
                style={{marginHorizontal: 2}}
              />
              <Ionicons
                name="star"
                size={25}
                color="yellow"
                style={{marginHorizontal: 2}}
              />
              <Ionicons
                name="star"
                size={25}
                color="yellow"
                style={{marginHorizontal: 2}}
              />
            </View>
            {/* <Text
              style={{
                fontSize: height > 667 ? 13 : 11,
                color: Colors.textColor,
                paddingLeft: 15,
              }}>
              Add a booking review
            </Text> */}
            {/* <View
              style={[
                styles.congratulationsContainer,
                {height: 100, marginVertical: 5},
              ]}> */}
            {/* <View
                style={{
                  backgroundColor: Colors.lightGreyColor,
                  height: 100,
                  borderRadius: 10,
                  padding: 10,
                }}> */}
            {/* <Text style={[styles.text, {marginTop: 0, color: 'black'}]}>
                Extremely professional and dedicated individuals with
                exceptional dedication and eagerness to learn.
              </Text> */}
            <AccountInput
              multiline={true}
              text={'Add a booking review'}
              isActive={isActive}
            />
            {/* </View> */}
            {/* </View> */}
          </View>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Bookingdetails')}
            style={styles.btnStyle}>
            <Text style={{color: 'white', fontWeight: '700'}}>Submit</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottom: {
    width: '100%',
    backgroundColor: Colors.whiteColor,
    borderTopRightRadius: 35,
    borderTopLeftRadius: 35,
    marginTop: '4%',
    height: '100%',
    // paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    height: '7%',
    marginTop: height > 667 ? '10%' : '7%',
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  titleContainer: {
    height: '7%',
    marginTop: height > 667 ? '8%' : '7%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 20,
  },

  headertext: {
    fontFamily: FontFamily.helveticaBold,
    fontSize: height > 667 ? 16 : 13,
    marginLeft: 20,
  },
  headerLeft: {
    height: 20,
    width: 20,
  },
  tab: {
    backgroundColor: Colors.whiteColor,
    // paddingTop:20
  },
  tabText: {
    fontSize: 14,
    fontWeight: '400',
    color: Colors.textColor,
    fontFamily: FontFamily.helveticaBold,
  },
  tabUnderline: {
    // borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  activeTabText: {
    fontSize: 15,
    fontWeight: '400',
    color: 'black',
    fontFamily: FontFamily.helveticaBold,
  },
  activeTab: {
    backgroundColor: '#fff',
  },
  mainView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,

    // marginTop: 10
  },
  text: {
    fontSize: height > 667 ? 11 : 9,
    color: Colors.textColor,
    fontFamily: FontFamily.helvetica,
    marginTop: 4,
  },
  text1: {
    fontSize: height > 667 ? 11 : 9,
    color: Colors.blackColor,
    fontFamily: FontFamily.helvetica,
    marginTop: 4,
  },
  video: {
    height: 150,
    marginTop: 10,
    width: '90%',
    borderRadius: 10,
    marginBottom: 10,
    marginHorizontal: 10,
    alignSelf: 'center',
  },
  button: {
    height: height > 667 ? 50 : 40,
    width: '90%',
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 50,
    borderWidth: 1,
    borderColor: Colors.textColor,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  border: {
    width: '90%',
    height: 250,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: Colors.textColor,
    borderRadius: 10,
    marginTop: 10,
  },
  profile: {
    height: 30,
    width: 30,
    borderRadius: 30,
    margin: 10,
  },
  image: {
    height: 15,
    width: 15,
  },
  btnStyle: {
    backgroundColor: Colors.buttonColor,
    height: height > 667 ? 50 : 40,
    marginHorizontal: 20,
    marginTop: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  congratulationsContainer: {
    height: 70,
    margin: 20,
    borderRadius: 10,
    backgroundColor: Colors.lightGreyColor,
    justifyContent: 'center',
  },
  congratulationView: {
    flexDirection: 'row',
    paddingHorizontal: '6%',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '50%',
  },
});

export default AcceptBooking;
