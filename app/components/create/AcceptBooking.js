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

const height = Dimensions.get('window').height;
const AcceptBooking = props => {
  const [modalVisible, setModalVisible] = useState(false);
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
            <Ionicons name="arrow-back" size={height > 667 ? 20 : 16} />
          </TouchableOpacity>
          <Text style={styles.headertext}>BOOKING DETAILS</Text>
        </View>
        {/* <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Image
            style={styles.headerLeft}
            source={require('../../assets/menu.png')}
          />
        </TouchableOpacity> */}
      </View>

      <View style={styles.bottom}>
        <ScrollView
          contentContainerStyle={{paddingBottom: '25%'}}
          showsVerticalScrollIndicator={false}>
          <View style={styles.border}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                // style={{width: '25%'}}
                onPress={() => {
                  props.navigation.navigate('AthleteDetails');
                }}>
                <Image
                  source={require('../../assets/splash.jpg')}
                  style={styles.profile}
                />
              </TouchableOpacity>
              <View
                style={{
                  width: height > 667 ? '83%' : '82%',
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                }}>
                <Text style={{fontSize: height > 667 ? 11 : 10}}>
                  You have a new booking opportunity
                </Text>
                <Text
                  style={{
                    fontSize: height > 667 ? 10 : 9,
                    color: Colors.textColor,
                    marginTop: 1,
                  }}>
                  12 mins ago
                </Text>
              </View>
            </View>
            <View style={styles.mainView}>
              <Text style={styles.text}>Athlete</Text>
              <Text style={styles.text1}>Porter Shue</Text>
            </View>
            <View style={styles.mainView}>
              <Text style={styles.text}>Gig ID</Text>
              <Text style={styles.text1}>CCH3HSR</Text>
            </View>
            <View style={styles.mainView}>
              <Text style={styles.text}>Sport Time</Text>
              <Text style={styles.text1}>Baseball</Text>
            </View>
            <View style={styles.mainView}>
              <Text style={styles.text}>Category</Text>
              <Text style={styles.text1}>Hitting</Text>
            </View>
            <View style={styles.mainView}>
              <Text style={styles.text}>Age Group</Text>
              <Text style={styles.text1}>12u</Text>
            </View>
            <View style={styles.mainView}>
              <Text style={styles.text}>Instruction type</Text>
              <Text style={styles.text1}>Dartfish Ananlytics</Text>
            </View>
            <View style={styles.mainView}>
              <Text style={styles.text}>Baseball Category</Text>
              <Text style={styles.text1}>Hitting</Text>
            </View>
            <Text style={[styles.text, {marginLeft: 10}]}>Media</Text>
            <Image
              style={styles.video}
              source={require('../../assets/splash.jpg')}
            />
          </View>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Booking')}
            style={styles.btnStyle}>
            <Text style={{color: 'white', fontWeight: '700'}}>Accept</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.btnStyle,
              {backgroundColor: 'white', borderWidth: 0.4},
            ]}>
            <Text style={{color: Colors.textColor, fontWeight: '700'}}>
              Reject
            </Text>
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
    fontSize: 11,
    color: Colors.textColor,
    fontFamily: FontFamily.helvetica,
    marginTop: 4,
  },
  text1: {
    fontSize: 11,
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
});

export default AcceptBooking;
