import React, { useEffect, useState, useRef, createRef } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  Dimensions,
  TouchableOpacity,
  FlatList,
  ToastAndroid,
} from "react-native";
import { Colors } from "../../style/colors";
import { FontFamily } from "../../style/typograpy";
import Button from "../../common/Button";
import { RadioButton } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";
import RegisterationModal from "../../common/RegisterationModal";
import AgeGroupModal from "../../common/ageGroupModal";
import InstructorTypeModal from "../../common/instructorTypeModal";
import InstructionTypeModal from "../../common/instructionTypeModal";
import { AuthServices, TrainingCategoryServices } from '../../services'
// import {Checkbox} from '../../common/Checkbox';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import NetInfo from "@react-native-community/netinfo";
import * as coachRegister from "../../../services/registerCoach";
import moment from 'moment';
import Input from "../../common/Input";
import PhoneInput from 'react-native-phone-input';
import CountryPicker, { FlagButton } from 'react-native-country-picker-modal';
import { launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import Calendar from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;
function CompleteProfile({ navigation, route }) {
  // const data = route.params;
  // console.log("data is", data);

  // const [checked, setChecked] = useState("baseBall");
  const [ageGroup, setAgeGroup] = useState("9");
  const [modalVisible, setModalVisible] = useState(false);

  const [ageModalVisible, setAgeModalVisible] = useState(false);

  const [age, setAge] = useState([]);

  const [instructorModalVisible, setInstructorModalVisible] = useState(false);
  const [instructionModalVisible, setInstructionModalVisible] = useState(false);
  const [instructor, setInstructor] = useState("");
  const [instruction, setInstruction] = useState("");

  const [checkInstructorTypes, setCheckInstructorTypes] = useState(false);
  const [checkInstructionTypes, setCheckInstructionTypes] = useState(false);
  const [checkAgeGroup, setCheckAgeGroup] = useState(false);

  const [selectInstruction, setSelectInstruction] = useState({});
  const [selectInstructor, setSelectInstructor] = useState({});
  const [dob, setDob] = useState("")
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [coachSkills, setCoachSkills] = useState([]);
  const [country, setCountry] = useState("")
  const [dummy, setDummy] = useState(false);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [countryModal, setCountryModal] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(``);
  const [date, setDate] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  // const [subCategoriesLoading, setSubCategoriesLoading] = useState(true);
  const [skillsLoading, setSkillsLoading] = useState(true);
  const phoneRef = createRef(null);
  const [address, setAddress] = useState("");
  const [submit, setSubmit] = useState(false)
  const [image, setImage] = useState('');
  const [subCatVal, setSubCat] = useState(false)
  const [arr, setArr] = useState([
    {
      flag: false,
      age: "Under-9",
    },
    {
      flag: false,
      age: "10-11",
    },
    {
      flag: false,
      age: "12-14",
    },
    {
      flag: false,
      age: "15-16",
    },
    {
      flag: false,
      age: "18+",
    },
  ]);
  const [prev, setPrev] = useState(0);
  useEffect(() => {
    // getCategories();
    getSkills();
  }, []);

  const getCategories = () => {
    TrainingCategoryServices.allTrainingTypes()
      .then((response) => {
        setCategoriesLoading(false)
        console.log(response)
        setCategories(response.data.trainingTypes);
      })
      .catch((err) => console.log(err))
  };

  const getSubCategories = (item) => {
    TrainingCategoryServices.subCategories(item.id)
      .then((response) => {
        setCategoriesLoading(false)
        var skill = response.data.subCategories;
        console.log("skill level", skill);
        for (let index = 0; index < response.data.subCategories.length; index++) {
          skill[index].selected = false;
        }
        setSubCategories(skill);
      })
      .catch((err) => console.log(err))
  };

  const getSkills = async () => {
    TrainingCategoryServices.getSkillsBy()
      .then((response) => {
        var skill = response.data.skills;
        console.log("skill level", skill);
        for (let index = 0; index < response.data.skills.length; index++) {
          skill[index].selected = false;
        }
        setCoachSkills(skill);
      })
      .catch((err) => {
        console.log("error =", err);
      });
  };

  const checkNetwork = async () => {
    console.log("internet called");
    try {
      let state = await NetInfo.fetch();
      if (state.isConnected == true) {
        // call your function here
        checkValidations();
        // getCoachDetails();
      } else {
        ToastAndroid.show(`Please check your internet connection and try again`, ToastAndroid.LONG)
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const checkValidations = () => {
    var selectedSkill = [];
    for (let index = 0; index < coachSkills.length; index++) {
      if (coachSkills[index].selected == true) {
        selectedSkill.push(coachSkills[index]);
      }
    }

    //  if (instruction == "") {
    //   setCheckInstructionTypes(true);
    // } else if (age == "") {
    //   setCheckAgeGroup(true);
    // } else if (!submit) {
    //   setSubmit(true);
    //   console.log(submit)
    // }
    // else {
    if (selectInstructor != undefined && selectedSkill.length != 0 && subCatVal && age.length != 0 && date && submit && country && address && phoneNumber && isPhoneValid(phoneNumber)) {
      getCoachDetails();
    } else {
      setSubmit(true);
      console.log(submit)
    }

    // }
  };

  const isPhoneValid = (phone) => {
    return /^\+[0-9]{10,13}$/.test(phone)
  }

  const getCoachDetails = async () => {
    var selectedSkill = [];
    var selectedSubCategories = [];
    for (let index = 0; index < coachSkills.length; index++) {
      if (coachSkills[index].selected == true) {
        selectedSkill.push(coachSkills[index]);
      }
    }
    for (let index = 0; index < subCategories.length; index++) {
      if (subCategories[index].selected == true) {
        selectedSubCategories.push({ TrainingSubCategoryId: subCategories[index].id });
      }
    }
    console.log(selectedSkill)
    console.log(selectedSubCategories)
    var trainingType = {
      TrainingTypeId: selectInstructor.id,
      SkillId: selectedSkill[0].id,
      SubCategoryIds: selectedSubCategories,
    };

    let ageObject = age;
    let userData = {
      firstName: route.params.firstName,
      lastName: route.params.lastName,
      email: route.params.email,
      password: route.params.password,
      phone: phoneNumber,
      address: address,
      dob: moment(date).format('YYYY-MM-DD'),
      role: 'coach',
      country: country,
      ageGroupCoach: ageObject,
      trainingType: trainingType,
    };
    console.log("userdata is", userData);
    AuthServices.userRegister(userData)
      .then((response) => {
        if (response.data.success != undefined && response.data.success == true) {
          console.log("response", response);
          navigation.navigate("EmailSent");
        } else {
          console.log("error in service");
        }
      })
      .catch((error) => {
        ToastAndroid.show(`${error}`, ToastAndroid.LONG) 
        console.log(error);
      })
    // navigation.navigate("EmailSent");
    // try {
    //   let response = await coachRegister.coachRegisterService(userData);
    //   if (response.data.success != undefined && response.data.success == true) {
    //     console.log("response", response);
    //     navigation.navigate("EmailSent");
    //   } else {
    //     console.log("error in service");
    //   }
    // } catch (error) {

    // }
  };

  const settingValue = (item) => {
    setSelectInstruction(item);
    getSkills(item);
  };
  
  const settingInstructor = (item) => {
    setSelectInstructor(item);
    getSubCategories(item);
  };

  const selectingSkills = (iteration) => {
    var skill = coachSkills;
    // if (skill[iteration].selected) {
    //   skill[iteration].selected = false;
    // } else {
    //   skill[iteration].selected = true;
    // }
    for (let index = 0; index < skill.length; index++) {
      skill[index].selected = false;
    }
    skill[iteration].selected = true;
    console.log("skill level is ", skill);
    setCoachSkills(skill);
    setDummy(!dummy);
  };

  const hideDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  const handleConfirm = (selectedDate) => {
    var date = moment(selectedDate).format('YYYY-MM-DD')
    setDate(date);
    hideDatePicker();
  };

  const onSelect = async (country) => {
    console.log(country)
    console.log(phoneRef?.current?.selectCountry(country.cca2))
    await setCountry(country.name);
    await setPhoneNumber(`+${country.callingCode[0]}`);
    await phoneRef?.current?.selectCountry(country.cca2);
    // await phoneRef?.current?.setState({ iputValue: `+${country.callingCode[0]}` });

    await setCountryModal(false)

  };

  const _flagButton = () => {
    return (
      <TouchableOpacity activeOpacity={0.9} onPress={() => setCountryModal(!countryModal)} >
        <View style={{}}>
          <FlagButton
            onOpen={() => setCountryModal(!countryModal)}
            onClose={() => setCountryModal(!countryModal)}
            placeholder={""}
            withEmoji={false}
            withFlagButton={false}
            // countryCode={countryCode != "" ? countryCode : ""}
            containerButtonStyle={{ height: 0 }}
          />
        </View>
      </TouchableOpacity>
    )
  }

  const launchGallery = () => {
    launchImageLibrary(
      {
        title: "Pick photo from storage",
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      },
      async (response) => {
        if (response.error) { }
        else if (response.uri != undefined) {
          setImage(response.uri);
        }
      })
  }

  const checkBoxFunc = (iteration) => {
    var instruction = [...subCategories];

    // instruction[iteration].selected = true;
    if (instruction[iteration].selected) {
      instruction[iteration].selected = false;
      setSubCat(false);
    } else {
      instruction[iteration].selected = true;
    }
    console.log("skill level is ", instruction);
    setSubCategories(instruction);
    for (let index = 0; index < instruction.length; index++) {
      if (instruction[index].selected) {
        setSubCat(true);
      }
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor={"transparent"}
      />
      <View style={styles.completeProfileContainer}>
        <View style={styles.backIconView}>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Ionicons
              name="arrow-back"
              size={height > 667 ? 20 : 16}
              style={{ paddingLeft: 20, marginTop: 5 }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.titleView}>
          <Text style={styles.titleText}>REGISTRATION</Text>
        </View>
      </View>
      <ScrollView
        contentContainerStyle={{ paddingBottom: "10%" }}
        style={styles.bottom}
      >
        <View style={styles.profile}>
          {
            image ?
              <Image source={{ uri: image }} style={styles.avatarStyle} />
              :
              <Image source={require('../../assets/avatar.png')} style={styles.avatar} />
          }
          <TouchableOpacity onPress={() => launchGallery()} style={styles.icon}>
            {
              image ?
                <Icon name="edit" color="white" size={15} />
                :
                <Image source={require('../../assets/plus.png')} style={styles.avatar1} />
            }
          </TouchableOpacity>
        </View>
        <Text style={styles.text}>Instructor Type</Text>
        <View style={styles.outerView}>
          <TouchableOpacity
            style={styles.dropDown}
            onPress={() => {
              setInstructorModalVisible(true);
              setCategoriesLoading(true);
              getCategories();
              setCheckInstructorTypes(false)
            }}
          >
            {selectInstructor != undefined &&
              Object.keys(selectInstructor).length > 0 ? (
              // setCheckInstructorTypes(false)
              <Text style={styles.innertext}>{selectInstructor.title}</Text>
            ) : (
              <Text style={styles.innertext}>Select</Text>
            )}
            <Image
              source={require("../../assets/drop-down.png")}
              style={styles.dropImage}
            />
          </TouchableOpacity>
        </View>
        {submit && selectInstructor.title == undefined && (
          <Text style={styles.errorStyle}>Instructor Type cannot be empty</Text>
        )}

        <Text style={styles.text}>Date Of Birth</Text>
        <View style={styles.outerView}>
          <TouchableOpacity
            style={styles.dropDown}
            onPress={() => {
              setShowDatePicker(!showDatePicker)
              console.log("showDatePicker: ", showDatePicker)
            }}
          >
            {date != undefined && date != '' ? (

              <Text style={styles.innertext}>{moment(date).format('M / DD / YYYY')}</Text>
            ) : (
              <Text style={styles.innertext}>- / -- / ----</Text>
            )}
            <Calendar
              name="calendar"
              color="grey" size={15}
            />
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={showDatePicker}
            onConfirm={(date) => handleConfirm(date)}
            onCancel={() => hideDatePicker}
          />
        </View>
        {submit == true && date == "" && (
          <Text style={styles.errorStyle}>Please select your date of birth</Text>
        )}

        <Text style={styles.text}>Country</Text>
        <View style={styles.outerView}>
          <TouchableOpacity
            style={styles.dropDown}
            onPress={() => {
              setCountryModal(!countryModal)
              console.log("countryModal : ", countryModal)
            }}
          >
            {country != undefined && country != '' ? (
              // setCheckInstructorTypes(false)
              <Text style={styles.innertext}>{country}</Text>
            ) : (
              <Text style={styles.innertext}>Select</Text>
            )}
            <Image
              source={require("../../assets/drop-down.png")}
              style={styles.dropImage}
            />
          </TouchableOpacity>
        </View>
        {submit == true && country == '' && (
          <Text style={styles.errorStyle}>Please select a Country</Text>
        )}
        <Input
          full={true}
          text={"Address"}
          value={address}
          onChangeText={(value) => {
            setAddress(value);
          }}
        />
        {submit == true && address == "" && (
          <Text style={styles.errorStyle}>
            Address cannot be empty
          </Text>
        )}
        {/* <Text style={styles.text}>Phone</Text>

        <View style={styles.outerView}>
          <View style={styles.dropDown}>
            <PhoneInput
              ref={phoneRef}
              onPressFlag={() => setCountryModal(!countryModal)}
              autoFormat={true}
              allowZeroAfterCountryCode={false}
              textStyle={styles.phoneTextStyle}
              returnKeyType="next"
              // blur={() => this.disabled()}
              onChangePhoneNumber={(phonenumber) => { console.log(phonenumber); setPhoneNumber(phonenumber) }}
              value={phoneNumber}
              textProps={{
                placeholder: 'Phone Number',
                placeholderTextColor: "grey",
              }}
            />

          </View>
        </View> */}
        <Input
          full={true}
          text={"Phone"}
          keyboardType={'number-pad'}
          value={phoneNumber}
          onChangeText={(value) => {
            setPhoneNumber(value)
          }}
        />
        {
          submit && phoneNumber == "" ? <Text style={styles.errorStyle}> Phonenumber cannot be empty </Text> : null
        }
        {
          submit && phoneNumber.length && !isPhoneValid(phoneNumber) ? <Text style={[styles.errorStyle]}>Phone number is incomplete </Text> : null
        }

        <Text style={styles.text}>Instruction Types</Text>
        <View style={styles.outerView}>
          {subCategories.length == 0 ?
            <TouchableOpacity
              style={styles.dropDown}
              onPress={() => {
                if (categories.length != 0) {
                  setInstructionModalVisible(true);

                } else {
                  ToastAndroid.show(`Please select instructor first`, ToastAndroid.LONG)
                }
                // setSubCategoriesLoading(true);
              }}
            >
              {selectInstruction.title != undefined &&
                Object.keys(selectInstruction).length > 0 ? (
                <Text style={styles.innertext}>{selectInstruction.title}</Text>
              ) : (
                <Text style={styles.innertext}>Select</Text>
              )}
              <Image
                source={require("../../assets/drop-down.png")}
                style={styles.dropImage}
              />
            </TouchableOpacity>
            :
            <FlatList
              data={subCategories}
              contentContainerStyle={styles.contentContainerStyle}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => {
                return (
                  <View style={styles.outerView}>
                    <View style={[styles.innerView1]}>
                      <MaterialIcons onPress={() => checkBoxFunc(index)}
                        size={20}
                        name={item.selected ? "check-box" : "check-box-outline-blank"} />
                      <Text style={styles.innertext}>{item.title}</Text>
                    </View>
                  </View>
                );
              }}
            />}
        </View>
        {submit && subCatVal != true && (
          <Text style={styles.errorStyle}>
            Instruction Type cannot be empty
          </Text>
        )}
        <Text style={[styles.text, { marginTop: 5 }]}>Skill Level</Text>

        <FlatList
          data={coachSkills}
          // showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainerStyle}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => {
            return (
              <View style={styles.outerView}>
                <View style={[styles.innerView1]}>
                  <MaterialIcons onPress={() => selectingSkills(index)}
                    size={20}
                    name={item.selected ? "check-box" : "check-box-outline-blank"} />
                  {/* <TouchableOpacity
                    style={{
                      height: 20,
                      width: 20,
                      borderRadius: 20,
                      borderWidth: 1,
                      borderColor: "grey",
                      marginHorizontal: 10,
                      backgroundColor: item.selected == true ? "red" : "white",
                    }}
                    onPress={() => selectingSkills(index)}
                  ></TouchableOpacity> */}

                  <Text style={styles.innertext}>{item.skill}</Text>
                </View>
              </View>
            );
          }}
        />
        {submit == true && dummy == false ? (
          <Text style={styles.errorStyle}>
            Please select atleast one skill level
          </Text>
        ) : null}

        <Text style={styles.text}>Age Group Qualified to Coach</Text>
        <FlatList
          data={arr}
          // showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainerStyle}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => {
            return (
              <View style={styles.outerView}>
                <View style={[styles.innerView1]}>
                  <MaterialIcons onPress={() => {
                    let ageArr = [...age];
                    let array = arr;
                    // array[prev].flag = false;
                    array[index].flag = true;
                    setArr(arr);
                    ageArr.push({ ageGroup: item.age })
                    setAge(ageArr);
                    // setPrev(index);
                  }}
                    size={20}
                    name={item.flag ? "check-box" : "check-box-outline-blank"} />
                  {/* <RadioButton
                    color={Colors.blackColor}
                    size={10}
                    uncheckedColor={Colors.blackColor}
                    status={item.flag ? "checked" : "unchecked"}
                    onPress={() => {
                      let ageArr = [...age];
                      let array = arr;
                      // array[prev].flag = false;
                      array[index].flag = true;
                      setArr(arr);
                      ageArr.push({ ageGroup: item.age })
                      setAge(ageArr);
                      // setPrev(index);
                    }}
                  /> */}
                  <Text style={styles.innertext}>{item.age}</Text>
                </View>
              </View>
            );
          }}
        />
        {submit && age.length == 0 && (
          <Text style={styles.errorStyle}>  Please select atleast one age group qualified coach</Text>
        )}
        <Button
          text={"Register"}
          onPress={() => {
            // setModalVisible(!modalVisible);
            setSubmit(true);
            console.log(submit)
            checkNetwork();
          }}
        />
        <View style={{ marhinBottom: 20 }}></View>
      </ScrollView>

      <AgeGroupModal
        modalVisible={ageModalVisible}
        setModalVisible={setAgeModalVisible}
        setAge={setAge}
      // setGroupAge={categories}
      // selectInstruction={settingValue}
      />
      <RegisterationModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        navigation={navigation}
      />
      <InstructorTypeModal
        modalVisible={instructorModalVisible}
        setModalVisible={setInstructorModalVisible}
        setInstructorType={categories}
        selectedItem={settingInstructor}
        isLoaderActive={categoriesLoading}
      />
      <InstructionTypeModal
        modalVisible={instructionModalVisible}
        setModalVisible={setInstructionModalVisible}
        setInstructionType={subCategories}
        selectInstruction={settingValue}
      // isLoaderActive={subCategoriesLoading}
      />

      <CountryPicker
        // countryCodes={['PK']}
        theme={styles.themeText}
        withFilter={true}
        visible={countryModal}
        onSelect={(country) => onSelect(country)}
        withAlphaFilter={true}
        withCountryNameButton={true}
        renderFlagButton={_flagButton}
      >
        <View />
      </CountryPicker>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
  completeProfileContainer: {
    height: "7%",
    marginTop: "10%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  backIconView: {
    width: "15%",
    // justifyContent: 'center',
  },
  titleView: {
    width: "85%",
    // justifyContent: 'center',
  },
  titleText: {
    fontFamily: FontFamily.helveticaBold,
    fontSize: height > 667 ? 16 : 13,
  },
  bottom: {
    height: "100%",
    width: "100%",
    backgroundColor: Colors.whiteColor,
    borderTopRightRadius: 35,
    borderTopLeftRadius: 35,
    paddingHorizontal: 20,
  },
  contentContainerStyle: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: "5%",
    width: width,
  },
  profile: {
    height: height > 667 ? 120 : 100,
    width: height > 667 ? 120 : 100,
    borderRadius: height > 667 ? 60 : 50,
    alignItems: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.backgroundColor,
    alignSelf: "center",
    marginVertical: 20,
  },
  avatar: {
    height: 30,
    width: 30,
  },
  avatar1: {
    height: 12,
    width: 12,
  },
  avatarStyle: {
    height: 120,
    width: 120,
    borderRadius: 120,
  },
  icon: {
    height: height > 667 ? 25 : 20,
    width: height > 667 ? 25 : 20,
    borderRadius: height > 667 ? 12.5 : 10,
    backgroundColor: "red",
    position: "absolute",
    alignSelf: "flex-end",
    left: height > 667 ? 95 : 75,
    top: height > 667 ? 80 : 70,
    elevation: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 12,
    color: Colors.textColor,
    fontFamily: FontFamily.helveticaLight,
  },
  phoneTextStyle: {
    marginTop: 2,
    lineHeight: 25,
    fontSize: 14,
    color: 'black',
  },
  outerView: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 8,
  },
  outerView1: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    marginBottom: 15,
  },
  innerView: {
    height: 40,
    width: "48%",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.textColor,
    alignItems: "center",
    flexDirection: "row",
  },
  innertext: {
    fontFamily: FontFamily.helveticaBold,
    fontSize: height > 667 ? 14 : 12,
    // paddingRight: 25,
  },

  innerView1: {
    height: 40,
    // width: '33%',
    borderWidth: 1,
    borderRadius: 10,
    marginRight: "3%",
    borderColor: Colors.textColor,
    // borderColor: 'red',
    paddingRight: 10,
    paddingHorizontal: 5,
    alignItems: "center",
    flexDirection: "row",
    // backgroundColor: 'red',
  },
  dropDown: {
    height: 40,
    width: "100%",
    borderWidth: 1,
    borderColor: Colors.textColor,
    borderRadius: 10,
    // marginTop: 10,\
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
  dropImage: {
    height: 14,
    width: 14,
  },
  errorStyle: {
    fontSize: 12,
    color: "red",
    paddingLeft: 0,
    paddingBottom: 5
  },
});

export default CompleteProfile;
