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
  TouchableOpacity,
} from 'react-native';
import { bindActionCreators } from "redux";
import { Colors } from '../../style/colors';
import { FontFamily } from '../../style/typograpy';
import moment from 'moment';
import { connect } from 'react-redux';
import { trainingActions } from '../../redux/actions/trainingType';
import { TrainingCategoryServices } from '../../services';
const height = Dimensions.get('window').height;
const NotificationsCard = ({ item, trainingTypes, subCategories, skills, navigation, actions }) => {
  const [id, setId] = useState("");
  const [instructor, setInstructor] = useState("")
  const [instruction, setInstruction] = useState("")
  const [skill, setSkill] = useState("");
  const [parsedObj, setParsedObj] = useState({});
  const [ageGroup, setAgeGroup] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true)
    let data = item;
    let parsedData = JSON.parse(data.obj);
    console.log(parsedData)
    if (data.obj != null) {
      setId(parseInt(parsedData.id))
      setParsedObj(parsedData);
      var trainingType = [...trainingTypes]
      trainingType.forEach((item, index) => {
        if (parsedData.TrainingTypeId == item.id) {

          setInstructor(item.title)
          TrainingCategoryServices.subCategories(item.id)
            .then((res) => {
              var subCategoriesArr = res.data.subCategories
              subCategoriesArr.forEach((items, index) => {
                if (parsedData != null && parsedData.TrainingSubCategoryId == items.id) {
                  setInstruction(items.title)
                  var skill = [...skills];
                  for (let index = 0; index < skill.length; index++) {
                    if (parsedData.SkillId == skill[index].id) {
                      console.log(skill[index].skill)
                      setSkill(skill[index].skill)
                      setAgeGroup(parsedData.coachAgeGroup)
                      setLoading(false)
                    }
                  }
                }
              })
            })
            .catch((err) => console.log(err.response))
        }
      })
    }

  }, [3])









  return (
    <View style={styles.container}>
      <View style={styles.outer}>
        <View style={styles.inner}>
          <Image
            source={require('../../assets/splash.png')}
            style={styles.image}
          />
          <View>
            <Text style={styles.text}>{item.title}</Text>
            {item.type == 'completed_booking' || item.type == 'coachRequest' ? (
              <View
                style={{
                  // justifyContent:'',
                  // backgroundColor: 'pink',
                  alignSelf: 'center',
                  // marginTop: 2,
                }}>

                <Text style={styles.text}>{item.body}</Text>
                <Text
                  style={[
                    styles.text,
                    {
                      fontSize: 11,
                      lineHeight: height > 667 ? 10 : 12,
                      color: Colors.textColor,
                    },
                  ]}>
                  {moment(item.createdAt).fromNow()}
                </Text>
              </View>
            ) : item.type == "acceptCompletionRequest" || item.type == "successfullyAccepted" || item.type == "rejectCompletionRequest" ? (
              <>
                <TouchableOpacity
                  onPress={() => navigation.navigate('AcceptBooking', { requestId: id, flag: false })}>
                  <Text style={styles.text}>{item.body}</Text>
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
                  {moment(item.createdAt).fromNow()}
                </Text>
              </>
            ) :
              (
                <>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('AcceptBooking', { requestId: id, flag: false })}>
                    <Text style={styles.text}>{item.body}</Text>
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
                    {moment(item.createdAt).fromNow()}
                  </Text>
                </>
              )}
          </View>
        </View>

        {item.type == 'completed_booking' || item.type == 'coachRequest' ? (
          <>
            <View style={styles.detailsView}>
              <View>
                <Text style={styles.text1}>Sport Type</Text>
                <Text style={styles.text1}>Instruction Type</Text>
                <Text style={styles.text1}>Skill Type</Text>
                <Text style={styles.text1}>Age Group</Text>
              </View>

              <View>
                <Text
                  style={[styles.text1, { color: 'black', textAlign: 'right' }]}>
                  {instructor}
                </Text>
                <Text
                  style={[styles.text1, { color: 'black', textAlign: 'right' }]}>
                  {instruction}
                </Text>
                <Text
                  style={[styles.text1, { color: 'black', textAlign: 'right' }]}>
                  {skill}
                </Text>
                <Text
                  style={[styles.text1, { color: 'black', textAlign: 'right' }]}>
                  {ageGroup}
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
                style={{ textAlign: 'center', fontSize: height > 667 ? 14 : 12 }}>
                You'll be earning an expected $200
              </Text>
            </View>
          </>
        ) : null}
      </View>
      {item.type == 'completed_booking' || item.type == 'coachRequest' ? (
        <View style={styles.buttonView}>
          <TouchableOpacity
            style={[styles.button, { borderBottomLeftRadius: 10 }]}
            onPress={() => {
              navigation.navigate('AcceptBooking', { requestId: parsedObj.id, flag: true });
            }}>
            <Text style={styles.text3}>Accept</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { borderBottomRightRadius: 10 }]}>
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

const mapStateToProps = (state) => ({
  user: state.authReducer.userData || {},
  token: state.authReducer.userToken || {},
});

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(trainingActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsCard)
