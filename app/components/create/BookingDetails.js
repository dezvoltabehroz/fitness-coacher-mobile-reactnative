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
  AsyncStorage,
  NativeModules,
  Platform,
  Dimensions,
  TextInput,
} from 'react-native';
import { Colors } from '../../style/colors';
import { RadioButton, Checkbox } from 'react-native-paper';
import { FontFamily } from '../../style/typograpy';
import Button from '../../common/Button';
import { TouchableOpacity } from 'react-native-gesture-handler';
import DetailsModal from '../../common/DetailsModal';
import { Container, Header, Content, Tab, Tabs } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { BookingServices } from '../../services';
import { connect } from 'react-redux';
const height = Dimensions.get('window').height;
const BookingDetails = props => {
  const [modalVisible, setModalVisible] = useState(false);
  // useEffect(() => {
  //   if (props.route.params != undefined) {
  //     const {flag} = props?.route?.params;
  //     if (flag) {
  //       setModalVisible(true);
  //     }
  //   }
  // }, []);

  const handleYes = () => {
    let userData = {
      "CoachId": props?.user?.id,
      "BookingId": 1
    }
    BookingServices.completeBooking(userData, props?.token)
      .then((response) => {
        console.log(response.data)
        setModalVisible(false)
        props.navigation.replace('TabContainer')
      })
      .catch((err) => { setModalVisible(false); console.log(err) })
  }

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor={'transparent'}
      />

      <View style={styles.completeProfileContainer}>
        <View style={styles.backIconView}>
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <Ionicons
              name="arrow-back"
              size={height > 667 ? 20 : 16}
              style={{ paddingLeft: 20 }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.titleView}>
          <Text style={styles.headertext}>PORTER SHUE - CCH67684</Text>
        </View>
        <View style={styles.backIconView}>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Ionicons
              name="ellipsis-horizontal"
              size={height > 667 ? 20 : 16}
              style={{ paddingLeft: 20 }}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.bottom}>
        <Tabs
          tabBarUnderlineStyle={[styles.tabUnderline]}
          tabContainerStyle={{
            elevation: 0,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            height: height > 667 ? 60 : 50,
            borderWidth: 0,
            borderColor: 'white',
          }}>
          <Tab
            heading="Details"
            tabStyle={[styles.tab, { borderTopLeftRadius: 30 }]}
            activeTabStyle={[styles.activeTab, { borderTopLeftRadius: 30 }]}
            textStyle={styles.tabText}
            activeTextStyle={styles.activeTabText}>
            <ScrollView
              contentContainerStyle={{
                paddingBottom: '30%',
              }}>
              <View style={styles.border}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      props.navigation.navigate('AthleteDetails');
                    }}>
                    <Image
                      source={require('../../assets/splash.jpg')}
                      style={styles.profile}
                    />
                  </TouchableOpacity>
                  <Text style={{ textAlign: 'left' }}>Porter Shue</Text>
                  <Text
                    style={{
                      textAlign: 'right',
                      marginLeft: height > 667 ? '40%' : '30%',
                      fontSize: 12,
                    }}>
                    12 mins ago
                  </Text>
                </View>
                <View style={styles.mainView}>
                  <Text style={styles.text1}>Requirements</Text>
                  <Image
                    style={styles.image}
                    source={require('../../assets/down-arrow.png')}
                  />
                </View>
                <View style={styles.mainView}>
                  <Text style={styles.text}>Sports Time</Text>
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
                <Text style={[styles.text, { marginLeft: 10 }]}>Media</Text>
                <Image
                  style={styles.video}
                  source={require('../../assets/splash.jpg')}
                />
              </View>
              <TouchableOpacity
                onPress={() => setModalVisible(true)}
                style={styles.btnStyle}>
                <Text style={{ color: 'white', fontWeight: '700' }}>
                  Mark as Delivered
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </Tab>
          <Tab
            heading="Contact Information"
            tabStyle={[styles.tab, { borderTopRightRadius: 30 }]}
            activeTabStyle={[styles.activeTab, { borderTopRightRadius: 30 }]}
            textStyle={styles.tabText}
            activeTextStyle={styles.activeTabText}>
            <View style={[styles.mainView, { marginTop: 10 }]}>
              <Text style={styles.text}>Mobile Phone</Text>
              <Text style={styles.text1}>+92 3333 3333333</Text>
            </View>
            <View style={styles.mainView}>
              <Text style={styles.text}>Email</Text>
              <Text style={styles.text1}>xyz@gmail.com</Text>
            </View>
            <View style={styles.mainView}>
              <Text style={styles.text}>Whatsapp</Text>
              <Text style={styles.text1}>+92 3333 3333333</Text>
            </View>
          </Tab>
        </Tabs>
      </View>
      <DetailsModal
        onYes={() => handleYes()}
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
        navigation={props.navigation}
      />
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
    width: '100%',
  },
  headertext: {
    fontFamily: FontFamily.helveticaBold,
    fontSize: height > 667 ? 16 : 12,
    // marginLeft: 20,
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
    fontSize: height > 667 ? 14 : 12,
    fontWeight: '400',
    color: Colors.textColor,
    fontFamily: FontFamily.helveticaBold,
  },
  tabUnderline: {
    // borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  activeTabText: {
    fontSize: height > 667 ? 15 : 13,
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
    paddingHorizontal: 15,

    // marginTop: 10
  },
  text: {
    fontSize: height > 667 ? 13 : 11,
    color: Colors.textColor,
    fontFamily: FontFamily.helvetica,
    marginTop: 4,
  },
  text1: {
    fontSize: height > 667 ? 13 : 11,
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
  completeProfileContainer: {
    height: '7%',
    marginTop: '10%',
    flexDirection: 'row',
    justifyContent: 'center',
  },

  backIconView: {
    width: '15%',
    justifyContent: 'center',
  },
  titleView: {
    width: '70%',
    justifyContent: 'center',
  },
});
const mapStateToProps = (state) => ({
  user: state.authReducer.userData || {},
  token: state.authReducer.userToken || {}
});


export default connect(
  mapStateToProps,
)(BookingDetails);
