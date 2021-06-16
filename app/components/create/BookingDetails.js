import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Modal,
  Image,
  ImageBackground,
  ActivityIndicator,
  Platform,
  Dimensions,
  TextInput,
} from 'react-native';
import VideoPlayer from 'react-native-video-controls';
import Video from 'react-native-video';
import { Colors } from '../../style/colors';
import { RadioButton, Checkbox, Snackbar } from 'react-native-paper';
import { FontFamily } from '../../style/typograpy';
import Button from '../../common/Button';
import LinkPreview from 'react-native-link-preview';
import { TouchableOpacity } from 'react-native-gesture-handler';
import DetailsModal from '../../common/DetailsModal';
import { Header, Content, Tab, Tabs, Icon } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { BookingServices } from '../../services';
import { connect } from 'react-redux';
import moment from 'moment';
import Container from '../../common/Container';
import { errorUtils } from '../../common/Utilities';
const height = Dimensions.get('window').height;
const BookingDetails = props => {
  const [modalVisible, setModalVisible] = useState(false);
  const [visible, setVisible] = useState(false)
  const [message, setMessage] = useState("");
  const [bookingDetails, setBookingDetails] = useState({})
  const [loading, setLoading] = useState(true)
  const [videoModal, setVideoModal] = useState(false)
  const [preview, setPreview] = useState("");
  console.log(props.route.params)
  useEffect(() => {
    getBookingDetail();

  }, [])
  // useEffect(() => {
  //   if (props.route.params != undefined) {
  //     const {flag} = props?.route?.params;
  //     if (flag) {
  //       setModalVisible(true);
  //     }
  //   }
  // }, []);

  const getBookingDetail = () => {
    setLoading(true)
    BookingServices.getBookingDetails(props?.route?.params?.bookingId, props?.token)
      .then(async (response) => {
        if (response.data.success) {
          console.log(response.data.bookingDetail.rows[0].athleteRequest.file)
          setBookingDetails(response.data.bookingDetail.rows[0])
          console.log(response.data.bookingDetail.rows[0].athleteRequest.file);
          await LinkPreview.getPreview(response.data.bookingDetail.rows[0].athleteRequest.file)
            .then(data => {
              console.debug("Data : ", data);
              setPreview(data.images[0])
            })
            .catch((err) => {
              console.log(err.error)
            });
          setLoading(false)
        } else {
          console.log(response.data.msg)
          setMessage(`${response.data.msg}`)
          setVisible(true);
          setLoading(false)
          console.log(response.data)
          setModalVisible(false)
        }
      })
      .catch((err) => {
        setMessage(`${errorUtils.getError(err)}`)
        setLoading(false)
        setVisible(true); setModalVisible(false); console.log(err)
      })
  }

  const handleYes = () => {

    let userData = {
      "CoachId": bookingDetails.coach.id,
      "BookingId": bookingDetails.id
    }
    console.log(userData)
    BookingServices.completeBooking(userData, props?.token)
      .then((response) => {
        if (response.data.success) {
          console.log(response.data)
          setModalVisible(false)
        } else {
          setMessage(`${response.data.msg}`)
          setVisible(true);
          console.log(response.data)
          setModalVisible(false)
        }
        props.navigation.replace('TabContainer')
      })
      .catch((err) => {
        setMessage(`${errorUtils.getError(err)}`)
        setVisible(true); setModalVisible(false); console.log(err.response.data)
      })
  }

  return (
    <Container onPress={() => setVisible(!visible)} message={message} visible={visible}>
      <View style={styles.container}>
        <StatusBar
          barStyle="dark-content"
          translucent
          backgroundColor={'transparent'}
        />
        {
          loading ?
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
              <ActivityIndicator size={20} color={'#030E2D'} />
            </View>
            :
            <>
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
                  <Text style={styles.headertext}>{bookingDetails.athlete.firstName} {bookingDetails.athlete.lastName} - {bookingDetails.athlete.uniqueId} </Text>
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
                            justifyContent: "space-between",
                            alignItems: 'center',
                          }}>
                          <TouchableOpacity
                            onPress={() => {
                              props.navigation.navigate('AthleteDetails', { id: bookingDetails.AthleteId });
                            }} style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <View >
                              <Image
                                source={bookingDetails.athlete.imageUrl != null ? { uri: bookingDetails.athlete.imageUrl } : require('../../assets/splash.png')}
                                style={styles.profile}
                              />
                            </View>
                            <Text style={{ textAlign: 'left' }}>{bookingDetails.athlete.firstName} {bookingDetails.athlete.lastName}</Text>
                          </TouchableOpacity>
                          <View>
                            <Text
                              style={{
                                textAlign: 'right',
                                marginRight: "15%",
                                // marginLeft: height > 667 ? '40%' : '30%',
                                fontSize: 12,
                              }}>
                              {moment(bookingDetails.createdAt).fromNow()}
                            </Text>
                          </View>

                        </View>
                        <View style={styles.mainView}>
                          <Text style={styles.text1}>Requirements</Text>
                          <Image
                            style={styles.image}
                            source={require('../../assets/down-arrow.png')}
                          />
                        </View>
                        <View style={styles.mainView}>
                          <Text style={styles.text}>Sports</Text>
                          <Text style={styles.text1}>{bookingDetails.athleteRequest.trainingType.title}</Text>
                        </View>
                        <View style={styles.mainView}>
                          <Text style={styles.text}>Age Group</Text>
                          <Text style={styles.text1}>{bookingDetails.athleteRequest.coachAgeGroup}</Text>
                        </View>
                        <View style={styles.mainView}>
                          <Text style={styles.text}>Instruction type</Text>
                          <Text style={styles.text1}>{bookingDetails.athleteRequest.trainingSubCategory.title}</Text>
                        </View>
                        <View style={styles.mainView}>
                          <Text style={styles.text}>Skill Type</Text>
                          <Text style={styles.text1}>{bookingDetails?.athleteRequest?.subCategorySkill?.skill}</Text>
                        </View>
                        <Text style={[styles.text, { marginLeft: 10 }]}>Media</Text>
                        <TouchableOpacity onPress={() => setVideoModal(!videoModal)}>
                          <ImageBackground
                            source={{ uri: preview }}
                            style={{ height: 150, width: "95%", marginVertical: "5%", marginHorizontal: "5%", }}
                            imageStyle={{ borderRadius: 20 }}>
                            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                              <Icon type={"FontAwesome"} name={"play-circle"} style={{ fontSize: 40, color: "lightgray", }} />
                            </View>
                          </ImageBackground>
                        </TouchableOpacity>
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
                      <Text style={styles.text1}>{bookingDetails?.athlete.phone}</Text>
                    </View>
                    <View style={styles.mainView}>
                      <Text style={styles.text}>Email</Text>
                      <Text style={styles.text1}>{bookingDetails.athlete.email}</Text>
                    </View>
                    <View style={styles.mainView}>
                      <Text style={styles.text}>Whatsapp</Text>
                      <Text style={styles.text1}>{bookingDetails.athlete.phone}</Text>
                    </View>
                  </Tab>
                </Tabs>
              </View>
            </>
        }
        <Modal visible={videoModal}>
          <VideoPlayer
            source={{ uri: bookingDetails != {} ? bookingDetails?.athleteRequest?.file : "" }}
            onBack={() => setVideoModal(!videoModal)}
          />
        </Modal>
        <DetailsModal
          onYes={() => handleYes()}
          setModalVisible={setModalVisible}
          modalVisible={modalVisible}
          navigation={props.navigation}
        />

      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  snackbarContainerStyle: {
    // top: '30%',
    // justifyContent: "flex-end",
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
    width: '100%',
  },
  headertext: {
    textTransform: "uppercase",
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
