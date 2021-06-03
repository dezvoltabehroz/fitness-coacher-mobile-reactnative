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
  ToastAndroid,
} from 'react-native';
import { Colors } from '../../style/colors';
import { RadioButton, Checkbox, Snackbar } from 'react-native-paper';
import { FontFamily } from '../../style/typograpy';
import Button from '../../common/Button';
import { TouchableOpacity } from 'react-native-gesture-handler';
import DetailsModal from '../../common/DetailsModal';
import { Container, Header, Content, Tab, Tabs } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AccountInput from '../../common/AccountInput';
import StarRating from 'react-native-star-rating';
import { BookingServices } from '../../services';
import { connect } from 'react-redux'
import { errorUtils } from '../../common/Utilities';
const WATER_IMAGE = require('../../assets/star.png');

const height = Dimensions.get('window').height;
const AcceptBooking = props => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [starCount, setStarCount] = useState(0);
  const [review, setReview] = useState('');
  const [visible, setVisible] = useState(false)
  const [message, setMessage] = useState("")
  const [submit, setSubmit] = useState(false)
  let { bookingData } = props.route.params
  console.log("bookingData : ", props?.token)



  const handleSubmit = () => {
    if ( starCount > 0 && review) {
      let userData = {
        "AthleteId": bookingData.AthleteId,
        "stars": starCount,
        "review": review,
        "ratingBy": bookingData.CoachId
      }
      console.log(userData)
      BookingServices.addRatingtoAthele(userData, props?.token)
        .then((response) => {
          console.log(response.data)
          if (response.data.success) {
            console.log(response.data)
            props.navigation.replace('TabContainer');
          }
          else {
            setMessage(`${response.data.msg}`)
            setVisible(true);
          }
        })
        .catch((err) => {
          console.log(err)
          setMessage(`${errorUtils.getError(err)}`)
          setVisible(true);
        })
    }
    else {
      setSubmit(true)
    }

  }


  return (
    <Container onPress={() => setVisible(!visible)} message={message} visible={visible}>
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor={'transparent'}
      />
      <View style={styles.header}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <Ionicons
              name="arrow-back"
              size={height > 667 ? 20 : 16}
              style={{ marginTop: 3 }}
            />
          </TouchableOpacity>
          <Text style={styles.headertext}>{bookingData.athlete.firstName} {bookingData.athlete.lastName} - {bookingData.athlete.uniqueId} </Text>
        </View>
      </View>

      <View style={styles.bottom}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flex: 1,
            paddingBottom: height > 667 ? '30%' : '90%'
          }}>
          <View style={styles.congratulationsContainer}>
            <View style={styles.congratulationView}>
              <Ionicons name="checkmark-circle" size={20} />
              <Text style={[styles.text, { marginTop: 0, color: 'black' }]}>
                Congratulations, your booking has been approved
              </Text>
            </View>
            <Text
              style={{
                textAlign: 'center',
                fontSize: height > 667 ? 14 : 12,
                color: 'red',
              }}>
              You have successfully earned ${bookingData.price}
            </Text>
          </View>
          <View style={styles.border}>
            <View
              style={{
                paddingVertical: "2.5%",
                // height: '25%',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <StarRating
                disabled={false}
                maxStars={5}
                starSize={25}
                starStyle={{ paddingHorizontal: 5 }}
                rating={starCount}
                selectedStar={(rating) => setStarCount(rating)}
                fullStarColor={'yellow'}
              />

            </View>
            {
              submit == true && starCount == 0 ?
                <Text style={styles.errorStyle}>Please select atleast one star</Text>
                :
                null
            }
            <AccountInput
              multiline={true}
              value={review}
              text={'Add a booking review'}
              isActive={isActive}
              onChangeText={(e) => setReview(e)}
            />
            {
              submit == true && !review ?
                <Text style={styles.errorStyle}>Please add a review</Text>
                :
                null
            }
          </View>
          <TouchableOpacity
            onPress={() => handleSubmit()}
            style={styles.btnStyle}>
            <Text style={{ color: 'white', fontWeight: '700' }}>Submit</Text>
          </TouchableOpacity>
          <View style={styles.snackbarContainerStyle}>
            <Snackbar
              visible={visible}
              onDismiss={() => setVisible(!visible)}
              action={{
                label: 'OK',
                onPress: () => {
                  console.log("hello")
                },
              }}>
              {message}
            </Snackbar>
          </View>
        </ScrollView>

      </View>
    </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  snackbarContainerStyle: {
    top: '20%',
    justifyContent: "flex-end",
    alignItems: "center"
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
  errorStyle: {
    fontSize: 12,
    color: "red",
    // margin:10,
    paddingLeft: 10,
    bottom: 5
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
const mapStateToProps = (state) => ({
  user: state.authReducer.userData || {},
  token: state.authReducer.userToken || {}
});


export default connect(
  mapStateToProps,
)(AcceptBooking);

