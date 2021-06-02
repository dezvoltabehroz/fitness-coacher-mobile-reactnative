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
  ActivityIndicator,
  Modal,
  Platform,
  Dimensions,
  TextInput,
  ToastAndroid,
} from 'react-native';
import { Colors } from '../../style/colors';
import VideoPlayer from 'react-native-video-controls';
import { FontFamily } from '../../style/typograpy';
import Button from '../../common/Button';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Icon } from 'native-base';
import { BookingServices, TrainingCategoryServices } from '../../services';
import { connect } from 'react-redux';
import { errorUtils } from '../../common/Utilities';
import Container from '../../common/Container';
import moment from 'moment'
import LinkPreview from 'react-native-link-preview';
const height = Dimensions.get('window').height;
const AcceptBooking = props => {
  const [modalVisible, setModalVisible] = useState(false);
  const [bookingDetails, setBookingDetails] = useState({})
  const [loading, setLoading] = useState(true)
  const [acceptLoading, setAcceptLoading] = useState(false)
  const [visible, setVisible] = useState(false)
  const [message, setMessage] = useState("")
  const [instructor, setInstructor] = useState("")
  const [instruction, setInstruction] = useState("")
  const [skill, setSkill] = useState("");
  const [videoModal, setVideoModal] = useState(false)
  const [preview, setPreview] = useState("");
  useEffect(() => {
    // if (props.route.params != undefined) {
    //   const { flag } = props?.route?.params;
    //   if (flag) {
    //     setModalVisible(true);
    //   }
    // }
    getRequestDetails()
  }, []);

  const getRequestDetails = () => {
    setLoading(true)
    console.log(props.route.params);
    console.log("props?.route?.params?.requestId : ", props?.route?.params)
    BookingServices.getRequestDetails(parseInt(props.route.params.requestId), props?.token)
      .then(async (response) => {
        if (!response.data.success) {
          console.log(response.data)
          await LinkPreview.getPreview(response.data.requestDetail.file)
            .then(data => {
              console.debug("Data : ", data);
              setPreview(data.images[0])
            });
          setBookingDetails(response.data.requestDetail)
          var trainingType = props?.trainingTypes
          trainingType.forEach((item, index) => {
            if (response.data.requestDetail != null && response.data.requestDetail.TrainingTypeId == item.id) {
              setInstructor(item.title)
              TrainingCategoryServices.subCategories(item.id)
                .then((res) => {
                  var subCategoriesArr = res.data.subCategories
                  subCategoriesArr.forEach((items, index) => {
                    if (response.data.requestDetail != null && response.data.requestDetail.TrainingSubCategoryId == items.id) {
                      setInstruction(items.title)
                      var skill = [...props?.skills];
                      for (let index = 0; index < skill.length; index++) {
                        if (response.data.requestDetail.SkillId == skill[index].id) {
                          setSkill(skill[index].skill)
                          setLoading(false)
                        }
                      }
                    }
                  })
                })
                .catch((err) => console.log(err.response))
            }
          })
          setLoading(false)
        }
        else {
          setBookingDetails(response.data.requestDetail)
          await LinkPreview.getPreview(response.data.requestDetail.file)
            .then(data => {
              console.debug("Data : ", data);
              setPreview(data.images[0])
            });
          console.log(response.data)
          setMessage(`${response.data.msg}`)
          setLoading(false)
          setVisible(true);
        }

      })
      .catch((err) => {
        console.log(err.response.data)
        setMessage(`${errorUtils.getError(err)}`)
        setVisible(true);
        setLoading(false)
        console.log(err)
      })
  }

  const handleAccept = () => {
    setAcceptLoading(true)
    let userData = {
      "RequestId": parseInt(props.route.params.requestId),
      "CoachId": props?.user?.id
    }
    console.log(userData)
    BookingServices.acceptRequest(userData, props?.token)
      .then((res) => {
        console.log(res.data)
        if (res.data.success) {
          console.log(res.data)
          setMessage(`${res.data.msg}`)
          setVisible(true);
          setAcceptLoading(false)
          // setTimeout(() => {
          props.navigation.replace('TabContainer')
          // }, 2000);
        }
        else {
          setMessage(`${res.data.msg}`)
          setVisible(true);
          setAcceptLoading(false)
        }
      })
      .catch((err) => {
        console.log(err.response.data)
        setAcceptLoading(false)
        setMessage(`${errorUtils.getError(err)}`)
        setVisible(true);
      })
  }
  console.log(bookingDetails.athlete)
  return (
    // <>
    // </>
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
              <View style={styles.header}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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
                  contentContainerStyle={{ paddingBottom: '45%' }}
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
                          props.navigation.navigate('AthleteDetails', { id: bookingDetails.AthleteId });
                        }}>
                        <Image
                          source={bookingDetails.athlete.imageUrl != null ? { uri: bookingDetails.athlete.imageUrl } : require('../../assets/splash.png')}
                          style={styles.profile}
                        />
                      </TouchableOpacity>
                      <View
                        style={{
                          width: height > 667 ? '83%' : '82%',
                          justifyContent: 'space-between',
                          flexDirection: 'row',
                        }}>
                        <Text style={{ fontSize: height > 667 ? 11 : 10 }}>
                          You have a new booking opportunity
                </Text>
                        <Text
                          style={{
                            fontSize: height > 667 ? 10 : 9,
                            color: Colors.textColor,
                            marginTop: 1,
                          }}>
                          {moment(bookingDetails.createdAt).fromNow()}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.mainView}>
                      <Text style={styles.text}>Athlete</Text>
                      <Text style={styles.text1}>{bookingDetails.athlete.firstName} {bookingDetails.athlete.lastName}</Text>
                    </View>
                    <View style={styles.mainView}>
                      <Text style={styles.text}>Sports</Text>
                      <Text style={styles.text1}>{instructor}</Text>
                    </View>
                    <View style={styles.mainView}>
                      <Text style={styles.text}>Age Group</Text>
                      <Text style={styles.text1}>{bookingDetails.coachAgeGroup}</Text>
                    </View>
                    <View style={styles.mainView}>
                      <Text style={styles.text}>Instruction type</Text>
                      <Text style={styles.text1}>{instruction}</Text>
                    </View>
                    <View style={styles.mainView}>
                      <Text style={styles.text}>Skill Type</Text>
                      <Text style={styles.text1}>{skill}</Text>
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
                  {props.route.params.flag ?

                    <>
                      <TouchableOpacity
                        onPress={handleAccept}
                        style={styles.btnStyle}>
                        {
                          acceptLoading ?
                            <ActivityIndicator size={20} color={'#FFFFFF'} />
                            :
                            <Text style={{ color: 'white', fontWeight: '700' }}>Accept</Text>
                        }

                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[
                          styles.btnStyle,
                          { backgroundColor: 'white', borderWidth: 0.4 },
                        ]}>
                        <Text style={{ color: Colors.textColor, fontWeight: '700' }}>
                          Reject
            </Text>
                      </TouchableOpacity>
                    </>
                    : null
                  }

                </ScrollView>
              </View>
            </>
        }
      </View>
      <Modal visible={videoModal}>
        <VideoPlayer
          source={{ uri: 'https://youtu.be/EngW7tLk6R8.mp4' }}
          onBack={() => setVideoModal(!videoModal)}
        />
      </Modal>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  snackbarContainerStyle: {
    justifyContent: "flex-end",
    alignItems: "center"
  },
  bottom: {
    width: '100%',
    backgroundColor: Colors.whiteColor,
    borderTopRightRadius: 35,
    borderTopLeftRadius: 35,
    marginTop: '4%',
    // height: '100%',
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
const mapStateToProps = (state) => ({
  user: state.authReducer.userData || {},
  token: state.authReducer.userToken || {},
  trainingTypes: state.trainingReducer.trainingTypes || {},
  skills: state.trainingReducer.skills || {},
  subCategories: state.trainingReducer.subCategories || {}
});


export default connect(
  mapStateToProps,
)(AcceptBooking);

