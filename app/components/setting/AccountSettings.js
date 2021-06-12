import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  FlatList,
  Image,
  AsyncStorage,
  ActivityIndicator,
  Platform,
  Dimensions,
  TouchableOpacity,
  ToastAndroid,
  ImageBackground,
} from 'react-native';
import Modal from 'react-native-modal';
import AccountInput from '../../common/AccountInput';
import { Colors } from '../../style/colors';
import { FontFamily } from '../../style/typograpy';
import Button from '../../common/Button';
import Ionicons from 'react-native-vector-icons/Ionicons';
import InstructorTypeModal from '../../common/instructorTypeModal';
import InstructionTypeModal from '../../common/instructionTypeModal';
import * as ImagePicker from 'react-native-image-picker';
import ImagePickerModal from '../../common/ImagePickerModal';
import moment from 'moment';
import NetInfo from "@react-native-community/netinfo";
import Input from "../../common/Input";
import CountryPicker, { FlagButton } from 'react-native-country-picker-modal';
import { launchImageLibrary } from 'react-native-image-picker';
import Calendar from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { AuthServices, TrainingCategoryServices } from '../../services';
import { connect } from 'react-redux';
import { authActions } from '../../redux/actions/auth';
import { bindActionCreators } from "redux";
import { Buffer } from 'buffer';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import axios from 'axios';
import { errorUtils } from '../../common/Utilities';
import Container from '../../common/Container';
const height = Dimensions.get('window').height;
const width = Dimensions.get("window").width;

const AccountSettingsScreen = (props) => {
  const [instructorModalVisible, setInstructorModalVisible] = useState(false);
  const [instructionModalVisible, setInstructionModalVisible] = useState(false);

  const [instruction, setInstruction] = useState("");
  const [first_name, setFirstname] = useState(props?.user?.firstName);
  const [last_name, setLastname] = useState(props?.user?.lastName);
  const [email, setEmail] = useState(props?.user?.email)

  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [state, setState] = useState(props?.user?.state);
  const [postalCode, setPostalCode] = useState(props?.user?.zipCode);
  const [city, setCity] = useState(props?.user?.city);
  const [ssn, setSsn] = useState(props?.user?.ssn);
  const [pId, setPID] = useState(props?.user?.nationalId);
  const [selectInstructor, setSelectInstructor] = useState({});
  const [uploading, setUploading] = useState(false)
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [coachSkills, setCoachSkills] = useState([]);
  const [country, setCountry] = useState(props?.user?.country)
  const [dummy, setDummy] = useState(false);
  const [countryModal, setCountryModal] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(props?.user?.phone);
  const [date, setDate] = useState(props?.user?.dob);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [age, setAge] = useState(props?.user?.ageGroupCoach);
  const [address, setAddress] = useState(props?.user?.address);
  const [submit, setSubmit] = useState(false)
  const [loading, setLoading] = useState(false)
  const [btnLoading, setBtnLoading] = useState(false);
  const [subCatVal, setSubCat] = useState(false);
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
  const [modalVisible, setModalVisible] = useState(false);
  const [filePath, setFilePath] = useState(props?.user?.imageUrl);
  const [visible, setVisible] = useState(false)
  const [message, setMessage] = useState("")
  useEffect(() => {
    setLoading(true)
    getCategories();
    getSkills()
    for (let index = 0; index < arr.length; index++) {
      props.user.ageGroupCoach.map((item) => {
        if (item.ageGroup == arr[index].age) {
          arr[index].flag = true;
        }
      })
    }
    //console.log(arr)
    setTimeout(() => {
      setLoading(false)
    }, 3000);
  }, []);

  const getCategories = () => {
    TrainingCategoryServices.allTrainingTypes()
      .then((response) => {
        var trainingTypes = response.data.trainingTypes
        trainingTypes.forEach((item, index) => {
          console.log(item.id)
          console.log(props?.user?.TrainingTypeId)
          if (props?.user?.TrainingTypeId == item.id) {
            trainingTypes[index] = { ...trainingTypes[index], selected: true };

            setSelectInstructor(trainingTypes[index])
            getSubCategories(trainingTypes[index]);
          } else {
            trainingTypes[index] = { ...trainingTypes[index], selected: false };
          }
        })
        setCategories(trainingTypes);
      })
      .catch((err) => console.log(err))
  };

  const getSubCategories = (item) => {
    //console.log(item.id)
    TrainingCategoryServices.subCategories(item.id)
      .then((response) => {
        setCategoriesLoading(false)
        var subCategoriesArr = response.data.subCategories;
        let data = props.user.coachTrainingSubCategory.filter((elem, index, self) => self.findIndex(
          (t) => { return (t.id === elem.id) }) === index);
        // console.log(data)
        for (let index = 0; index < subCategoriesArr.length; index++) {
          subCategoriesArr[index] = { ...subCategoriesArr[index], selected: false };
        }
        subCategoriesArr.forEach((item, i) => {
          for (let index = 0; index < data.length; index++) {
            if (item.id == data[index].id) {
              subCategoriesArr[index] = { ...subCategoriesArr[index], selected: true };
            }
          }
        })
        setSubCategories(subCategoriesArr);
        setSubCat(true);
      })
      .catch((err) => console.log(err))
  };

  const getSkills = async () => {
    TrainingCategoryServices.getSkillsBy()
      .then((response) => {
        var skill = response.data.skills;
        for (let index = 0; index < response.data.skills.length; index++) {
          if (props.user.SkillId == skill[index].id) {
            skill[index].selected = true;
          } else {
            skill[index].selected = false;
          }
        }
        setCoachSkills(skill);
        setDummy(true);
      })
      .catch((err) => {
        console.log("error =", err);
      });
  };

  const chooseFile = () => {
    let options = {
      title: 'Select Image',
      customButtons: [
        {
          name: 'customOptionKey',
          title: 'Choose Photo from Custom Option',
        },
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchImageLibrary(options, response => {
      //console.log('Response = ', response);

      if (response.didCancel) {
        //console.log('User cancelled image picker');
      } else if (response.error) {
        //console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        //console.log('User tapped custom button: ', response.customButton);
        setMessage(`${response.customButton}`)
        setVisible(true);
      } else {
        let source = response;
        let userData = {
          fileName: new Date().getTime() + response.fileName,
          fileType: response.type
        }
        AuthServices.getUrl(userData)
          .then((res) => {
            //console.log(res.data)
            let formData = new FormData();
            formData.append(`${userData.fileName}`, {
              uri: response.uri,
              name: `${new Date().getTime().toString()}.jpg`,
              filename: new Date().getTime().toString() + '.jpg',
              type: 'image/jpg'
            })
            axios.put(res.data.postUrl, formData)
              .then((responseData) => {
                //console.log(responseData)
                setFilePath(res.data.getUrl);
              }).catch((err) => { console.log(err) })
          })
          .catch((err) => { console.log(err) })
        setFilePath(source.uri);
      }
    });
  };

  const hideDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  const handleConfirm = (selectedDate) => {
    var date = moment(selectedDate).format('YYYY-MM-DD')
    setDate(date);
    hideDatePicker();
  };

  const settingInstructor = (item) => {
    setSelectInstructor(item);
    getSubCategories(item);
  };

  const selectingSkills = (iteration) => {
    var skill = [...coachSkills];
    for (let index = 0; index < skill.length; index++) {
      skill[index].selected = false;
    }
    skill[iteration].selected = true;
    setCoachSkills(skill);
    setDummy(true);
  };

  const renderFileData = () => {
    if (uploading) {
      return <ImageBackground imageStyle={{ borderRadius: 150 }} source={{ uri: filePath }} style={styles.image}>
        <ActivityIndicator size={20} color={Colors.buttonColor} />
      </ImageBackground>
    } else if (filePath != null) {
      return <Image source={{ uri: filePath }} style={styles.image} />;
    } else {
      return (
        <Image
          source={require('../../assets/splash.png')}
          style={styles.image}
        />
      );
    }
  };

  const onSelect = async (country) => {
    //console.log(country)
    await setCountry(country.name);
    await setPhoneNumber(`+${country.callingCode[0]}`);
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
        includeBase64: true,
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      },
      async (response) => {
        if (response.error) { }
        else if (response.uri != undefined) {
          let userData = {
            fileName: response.fileName,
            fileType: response.type
          }
          setFilePath(response.uri);
          setUploading(true)
          AuthServices.getUrl(userData)
            .then((res) => {
              const buffer = Buffer(`${response.base64}`, "base64");
              axios.put(res.data.postUrl, buffer, {
                headers: {
                  "Content-Type": `${response.type}; charset=utf-8`,
                  "x-amz-acl": "public-read",
                },
              })
                .then((responseData) => {
                  console.log(responseData.data.status)
                  setFilePath(res.data.getUrl);
                  setUploading(false)
                }).catch((err) => { console.log(err) })
            })
            .catch((err) => { console.log(err) })

        }
      })
  }

  const checkBoxFunc = (iteration) => {
    var instruction = [...subCategories];
    if (instruction[iteration].selected) {
      instruction[iteration].selected = false;
    } else {
      instruction[iteration].selected = true;
    }
    //console.log("skill level is ", instruction);
    setSubCategories(instruction);
    for (let index = 0; index < instruction.length; index++) {
      if (instruction[index].selected) {
        setSubCat(true);
      }
    }
  };

  const checkNetwork = async () => {
    setBtnLoading(true)
    setSubmit(true);
    //console.log(submit)
    try {
      let state = await NetInfo.fetch();
      if (state.isConnected == true) {
        checkValidations();
      } else {
        setMessage(`Please check your internet connection and try again`)
        setVisible(true);
        setBtnLoading(false)
      }
    } catch (error) {
      //console.log(error);
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

    if (country == "United States" && ssn.length && postalCode.length && pId.length && first_name && last_name && selectInstructor != undefined && selectedSkill.length != 0 && subCatVal && age.length != 0 && date && country && address && phoneNumber && isPhoneValid(phoneNumber) && state.length && city.length) {
      getCoachDetails();
    } else if (first_name && last_name && selectInstructor != undefined && selectedSkill.length != 0 && subCatVal && age.length != 0 && date && country && address && phoneNumber && isPhoneValid(phoneNumber) && state.length && city.length) {
      getCoachDetails();
    } else {
      setBtnLoading(false)
      setSubmit(true);
      //console.log(submit)
    }
  };

  const updateCoach = (userData) => {
    console.log(userData)
    console.log(props.navigation)
    AuthServices.updateProfile(props?.user?.id, userData, props?.token)
      .then(async (response) => {
        console.log(response.data)
        if (response.data.success != undefined && response.data.success == true) {
          let data = {
            id: response.data.user.id,
            token: props?.token
          }
          await props.authActions.getUserProfile(data, props.navigation.replace);
        } else {
          setMessage(`${response.data.msg}`)
          setVisible(true);
          setBtnLoading(false)
        }
      })
      .catch((error) => {
        console.log(error.response)
        setMessage(`${errorUtils.getError(error)}`)
        setVisible(true);
        setBtnLoading(false)
      })
  }

  const getCoachDetails = async () => {

    var selectedSkill = [];
    var selectedSubCategories = [];
    let ageArr = []
    arr.forEach((item, index) => {
      if (item.flag) {
        let obj = { ageGroup: item.age }
        ageArr.push(obj);
      }
    })
    let data = props.user.ageGroupCoach.filter((elem, index, self) => self.findIndex(
      (t) => { return (t.ageGroup === elem.ageGroup) }) === index);
    console.log(data)
    data.forEach((item) => {
      for (let index = 0; index < ageArr.length; index++) {
        if (item.ageGroup == ageArr[index].ageGroup) {
          ageArr[index].id = item.id;
        }
      }
    })

    for (let index = 0; index < coachSkills.length; index++) {
      if (coachSkills[index].selected == true) {
        selectedSkill.push(coachSkills[index]);
      }
    }

    let reduceDuplicateSubCat = props.user.coachTrainingSubCategory.filter((elem, index, self) => self.findIndex(
      (t) => { return (t.id === elem.id) }) === index);
    console.log("reduceDuplicateSubCat : ", reduceDuplicateSubCat)

    subCategories.forEach((item, index) => {
      if (item.selected) {
        let obj = { TrainingSubCategoryId: item.id }
        selectedSubCategories.push(obj);
      }
    })
    reduceDuplicateSubCat.forEach((item) => {
      for (let index = 0; index < selectedSubCategories.length; index++) {
        if (item.id == selectedSubCategories[index].TrainingSubCategoryId) {
          selectedSubCategories[index].id = item.CoachTrainingSubCategoryId;
        }
      }
    })
    let userData;
    if (country == 'United States') {
      userData = {
        firstName: first_name,
        lastName: last_name,
        email: email,
        phone: phoneNumber,
        address: address,
        age: props?.user?.age,
        imageUrl: filePath,
        state: state,
        city: city,
        zipCode: postalCode,
        ssn: ssn,
        nationalId: pId,
        dob: moment(date).format('YYYY-MM-DD'),
        role: 'coach',
        country: country,
        ageGroupCoach: ageArr,
        trainingType: {
          id: props?.user?.CoachTrainingId,
          TrainingTypeId: selectInstructor.id,
          SkillId: selectedSkill[0].id,
          subCategory: selectedSubCategories
        }
      };
    }
    else {
      userData = {
        firstName: first_name,
        lastName: last_name,
        email: email,
        phone: phoneNumber,
        address: address,
        age: props?.user?.age,
        imageUrl: filePath,
        state: state,
        city: city,
        zipCode: postalCode,
        ssn: "",
        nationalId: "",
        dob: moment(date).format('YYYY-MM-DD'),
        role: 'coach',
        country: country,
        ageGroupCoach: ageArr,
        trainingType: {
          id: props?.user?.CoachTrainingId,
          TrainingTypeId: selectInstructor.id,
          SkillId: selectedSkill[0].id,
          subCategory: selectedSubCategories
        }
      };
    }
    // let userData = {
    //   firstName: first_name,
    //   lastName: last_name,
    //   email: email,
    //   imageUrl: filePath,
    //   age: props?.user?.age,
    //   phone: phoneNumber,
    //   address: address,
    //   dob: moment(date).format('YYYY-MM-DD'),
    //   role: 'coach',
    //   country: country,
    //   ageGroupCoach: ageArr,
    //   trainingType: {
    //     id: props?.user?.CoachTrainingId,
    //     TrainingTypeId: selectInstructor.id,
    //     SkillId: selectedSkill[0].id,
    //     subCategory: selectedSubCategories
    //   }
    // };
    console.log("userdata is", userData);
    updateCoach(userData)
  };

  const isPhoneValid = (phone) => {
    return /^\+[0-9]{10,13}$/.test(phone)
  }

  const selectingTrainingType = async (iteration) => {
    var categoriesArr = [...categories];
    for (let index = 0; index < categoriesArr.length; index++) {
      categoriesArr[index].selected = false;
    }
    categoriesArr[iteration].selected = true;
    setSelectInstructor(categoriesArr[iteration])
    getSubCategories(categoriesArr[iteration])
    await setCategories(categoriesArr);
    await setCat(true);
  };

  return (
    <Container onPress={() => setVisible(!visible)} message={message} visible={visible}>
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
            <Text style={[styles.innertext, { fontSize: height > 667 ? 16 : 13 }]}>
              ACCOUNT SETTINGS
          </Text>
          </View>
        </View>

        <ScrollView style={styles.bottom}>
          {
            loading ?
              <View style={{ marginTop: '50%', justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size={20} color={'#030E2D'} />
              </View>
              :
              <>
                <View>
                  {renderFileData()}
                  <TouchableOpacity onPress={() => launchGallery()} style={styles.imageView}>
                    <Image source={require('../../assets/pen.png')} style={styles.pen} />
                  </TouchableOpacity>
                </View>
                <AccountInput text={'First Name'} placeholder=" " value={first_name} onChangeText={(val) => setFirstname(val)} />
                {submit == true && first_name == "" && (
                  <Text style={styles.errorStyle}>First Name canot be empty</Text>
                )}
                <AccountInput text={'Last Name'} placeholder=" " value={last_name} onChangeText={(val) => setLastname(val)} />
                {submit == true && last_name == "" && (
                  <Text style={styles.errorStyle}>Last Name canot be empty</Text>
                )}
                <AccountInput editable={false} text={'Email Address'} value={email} placeholder="john@example.com" />
                <Text style={styles.inputText}>Password</Text>
                <View style={styles.input}>
                  <Text style={styles.passwordText}>*********</Text>
                  <TouchableOpacity onPress={() => props.navigation.navigate('ChangePassword')}>
                    <Text style={styles.changeTextStyle} >Change</Text>
                  </TouchableOpacity>
                </View>

                <Text style={styles.text}>Date Of Birth</Text>
                <View style={styles.outerView}>
                  <TouchableOpacity
                    style={styles.dropDown}
                    onPress={() => {
                      setShowDatePicker(!showDatePicker)
                      //console.log("showDatePicker: ", showDatePicker)
                    }}
                  >
                    {date != undefined && date != '' ? (

                      <Text style={styles.innertext}>{moment(date).format('M / DD / YYYY')}</Text>
                    ) : (
                      <Text style={styles.innertext}>- / -- / ----</Text>
                    )}
                    <Calendar
                      name="calendar"
                      color={Colors.buttonColor} size={15}
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
                      //console.log("countryModal : ", countryModal)
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
                  text={"State"}
                  value={state}
                  onChangeText={(value) => {
                    setState(value);
                  }}
                />
                {submit == true && state == "" && (
                  <Text style={styles.errorStyle}>
                    State cannot be empty
                  </Text>
                )}
                <Input
                  full={true}
                  text={"City"}
                  value={city}
                  onChangeText={(value) => {
                    setCity(value);
                  }}
                />
                {submit == true && city == "" && (
                  <Text style={styles.errorStyle}>
                    City cannot be empty
                  </Text>
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
                <Input
                  full={true}
                  text={"Postal Code"}
                  value={postalCode}
                  onChangeText={(value) => {
                    setPostalCode(value);
                  }}
                />
                {submit == true && postalCode == "" && (
                  <Text style={styles.errorStyle}>
                    Postal Code cannot be empty
                  </Text>
                )}

                {country == 'United States' ?
                  <>
                    <Input
                      full={true}
                      text={"Social Security Number"}
                      keyboardType={'number-pad'}
                      value={ssn}
                      onChangeText={(value) => {
                        setSsn(value)
                      }}
                    />
                    {submit == true && ssn == "" && (
                      <Text style={styles.errorStyle}>
                        Social Security Number cannot be empty
                      </Text>
                    )}
                    <Input
                      full={true}
                      text={"Personal Id"}
                      keyboardType={'number-pad'}
                      value={pId}
                      onChangeText={(value) => {
                        setPID(value)
                      }}
                    />
                    {submit == true && pId == "" && (
                      <Text style={styles.errorStyle}>
                        Personal ID cannot be empty
                      </Text>
                    )}
                  </>
                  :
                  null
                }
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
                <View style={{ marginTop: "5%" }}>
                  <Text style={styles.text}>Instructor Type</Text>
                </View>
                <FlatList
                  data={categories}
                  // showsVerticalScrollIndicator={false}
                  contentContainerStyle={styles.contentContainerStyle}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item, index }) => {
                    return (
                      <View style={styles.outerView}>
                        <TouchableOpacity onPress={() => selectingTrainingType(index)} style={[styles.innerView1]}>
                          <MaterialIcons
                            size={20}
                            name={item.selected ? "check-box" : "check-box-outline-blank"} />
                          <Text style={styles.innertext}>{item.title}</Text>
                        </TouchableOpacity>
                      </View>
                    );
                  }}
                />
                {submit && selectInstructor.title == undefined && (
                  <Text style={styles.errorStyle}>Instructor Type cannot be empty</Text>
                )}



                <Text style={styles.text}>Instruction Types</Text>
                <FlatList
                  data={subCategories}
                  contentContainerStyle={styles.contentContainerStyle}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item, index }) => {
                    return (
                      <View style={styles.outerView}>
                        <TouchableOpacity onPress={() => checkBoxFunc(index)} style={[styles.innerView1]}>
                          <MaterialIcons
                            size={20}
                            name={item.selected ? "check-box" : "check-box-outline-blank"} />
                          <Text style={styles.innertext}>{item.title}</Text>
                        </TouchableOpacity>
                      </View>
                    );
                  }}
                />

                {submit && subCatVal != true && (
                  <Text style={styles.errorStyle}>
                    Instruction Type cannot be empty
                  </Text>
                )}
                <Text style={[styles.text, { marginTop: 5 }]}>Skill Level</Text>

                <FlatList
                  data={coachSkills}
                  // numColumns={4}
                  // showsVerticalScrollIndicator={false}
                  contentContainerStyle={styles.contentContainerStyle}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item, index }) => {
                    return (
                      <View style={styles.outerView}>
                        <TouchableOpacity onPress={() => selectingSkills(index)} style={[styles.innerView1]}>
                          <MaterialIcons
                            size={20}
                            name={item.selected ? "check-box" : "check-box-outline-blank"} />
                          <Text style={styles.innertext}>{item.skill}</Text>
                        </TouchableOpacity>
                      </View>
                    );
                  }}
                />
                {submit == true && dummy == false ? (
                  <Text style={styles.errorStyle}>
                    Please select atleast one skill level
                  </Text>
                ) : null}

                <Text style={styles.text}>Age Group</Text>
                <FlatList
                  data={arr}
                  // showsVerticalScrollIndicator={false}
                  contentContainerStyle={styles.contentContainerStyle}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item, index }) => {
                    return (
                      <View style={styles.outerView}>
                        <TouchableOpacity onPress={() => {
                          let ageArr = [...age];
                          let array = arr;
                          if (array[index].flag) {
                            array[index].flag = false
                          } else
                            array[index].flag = true;
                          setArr(arr);
                          ageArr.push({ ageGroup: item.age })
                          setAge(ageArr);
                        }} style={[styles.innerView1]}>
                          <MaterialIcons
                            size={20}
                            name={item.flag ? "check-box" : "check-box-outline-blank"} />

                          <Text style={styles.innertext}>{item.age}</Text>
                        </TouchableOpacity>
                      </View>
                    );
                  }}
                />
                {submit && age.length == 0 && (
                  <Text style={styles.errorStyle}>  Please select atleast one age group qualified coach</Text>
                )}
                <Button
                  disabled={uploading}
                  loading={btnLoading}
                  text={'Update'}
                  onPress={() => {
                    checkNetwork()
                  }}
                />
                <View style={{ marginTop: 20 }}></View>
              </>}
        </ScrollView>

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
          setInstructionType={setInstruction}
        />
        <Modal
          style={styles.modal}
          width={'100%'}
          isVisible={modalVisible}
          hasBackdrop={true}
          backdropColor={Colors.modalOverly}
          backdropOpacity={0.7}
          swipeDirection={['up']}
          animationIn={'slideInUp'}
          animationOut={'slideOutDown'}
          onBackdropPress={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            {/* <View style={styles.bar}></View> */}
            <TouchableOpacity
              style={[styles.modalOuterView]}
              onPress={() => {
                setModalVisible(false);
                chooseFile();
              }}>
              <View style={styles.modalLeft}>
                <Image
                  source={require('../../assets/avatar.png')}
                  style={styles.modalImage}
                />
              </View>
              <Text style={styles.modalText}>Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalOuterView]}
              onPress={() => setModalVisible(false)}>
              <View style={styles.modalLeft}>
                <Image
                  source={require('../../assets/gallery.png')}
                  style={styles.modalImage}
                />
              </View>
              <Text style={styles.modalText}>Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalOuterView]}
              onPress={() => setModalVisible(false)}>
              <View style={styles.modalLeft}>
                <Image
                  source={require('../../assets/delete.png')}
                  style={styles.modalImage}
                />
              </View>
              <Text style={styles.modalText}>Remove</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <CountryPicker
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
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  snackbarContainerStyle: {
    bottom: 30,
    alignItems: "center"
  },
  completeProfileContainer: {
    height: '7%',
    marginTop: height > 667 ? '10%' : '7%',
    flexDirection: 'row',
    justifyContent: 'center',
  },

  backIconView: {
    width: '15%',
    justifyContent: 'center',
  },
  titleView: {
    width: '85%',
    justifyContent: 'center',
  },
  bottom: {
    height: '90%',
    width: '100%',
    backgroundColor: Colors.whiteColor,
    borderTopRightRadius: 35,
    borderTopLeftRadius: 35,
    paddingHorizontal: 20,
  },
  outerView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
  },
  dropDownOuterView: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  contentContainerStyle: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: "5%",
    width: width * 0.9,
  },
  dropDown: {
    height: 40,
    width: '100%',
    borderWidth: 1,
    borderColor: Colors.textColor,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  changeTextStyle: {
    marginRight: 10,
    color: "#60A7EE",
    fontFamily: FontFamily.helveticaBold,
    fontSize: 12
  },
  dropImage: {
    height: 14,
    width: 14,
  },
  left: {
    height: 30,
    width: 30,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.textColor,
  },
  image:
  {
    height: 100,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 150,
    alignSelf: 'center',
    marginTop: 20
  },
  imageView:
  {
    height: 25,
    width: 25,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: Colors.whiteColor,
    backgroundColor: Colors.buttonColor,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    left: '56%',
    top: 90
  },
  pen:
  {
    height: 10,
    width: 10
  },
  text: {
    fontSize: 12,
    color: Colors.textColor,
    fontFamily: FontFamily.helveticaLight,
  },
  outerView: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  outerView1: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  innerView: {
    height: 40,
    width: '48%',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.textColor,
    alignItems: 'center',
    flexDirection: 'row',
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
    marginRight: '3%',
    borderColor: Colors.textColor,
    // borderColor: 'red',
    paddingHorizontal: 5,
    paddingRight: 10,
    alignItems: 'center',
    flexDirection: 'row',
    // backgroundColor: 'red',
  },
  innerView2: {
    height: 40,
    width: '31%',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.textColor,
    paddingRight: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
  inputText: {
    fontFamily: FontFamily.helveticaLight,
    color: Colors.textColor,
    fontSize: 13,
    marginBottom: 7,
    marginTop: 17,
  },
  input: {
    height: height > 667 ? 50 : 40,
    borderRadius: 10,
    backgroundColor: Colors.backgroundColor,
    color: Colors.blackColor,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  passwordText: {
    fontFamily: FontFamily.helveticaBold,
    fontSize: 13,
  },
  passIcon: {
    height: 20,
    width: 20,
  },
  errorStyle: {
    fontSize: 12,
    color: "red",
    paddingLeft: 0,
  },
  modal: {
    top: height > 667 ? (height * 75) / 100 : (height * 65) / 100,
    alignSelf: 'center',
  },
  modalContainer: {
    backgroundColor: Colors.whiteColor,
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  bar: {
    height: 5,
    borderRadius: 5,
    width: '20%',
    marginTop: 10,
    backgroundColor: Colors.backgroundColor,
    alignSelf: 'center',
  },
  modalOuterView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  modalLeft: {
    height: 30,
    width: 30,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.lightGreyColor,
  },
  modalImage: {
    height: 17,
    width: 17,
  },
  modalText: {
    fontFamily: FontFamily.helveticaBold,
    fontSize: 14,
    marginLeft: 10,
  },
});

const mapStateToProps = (state) => {
  return {
    user: state.authReducer.userData || {},
    token: state.authReducer.userToken
  };
};
const mapDispatchToProps = dispatch => {
  return {
    authActions: bindActionCreators(authActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountSettingsScreen);

