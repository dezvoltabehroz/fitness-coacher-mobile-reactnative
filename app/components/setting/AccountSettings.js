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
  TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal';
import AccountInput from '../../common/AccountInput';
import {Colors} from '../../style/colors';
import {FontFamily} from '../../style/typograpy';
import Button from '../../common/Button';
import {RadioButton} from 'react-native-paper';
import AccountModal from '../../common/AccountModal';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AgeGroupModal from '../../common/ageGroupModal';
import InstructorTypeModal from '../../common/instructorTypeModal';
import InstructionTypeModal from '../../common/instructionTypeModal';
import * as ImagePicker from 'react-native-image-picker';
import ImagePickerModal from '../../common/ImagePickerModal';

const height = Dimensions.get('window').height;

const AccountSettingsScreen = props => {
  const [checked, setChecked] = useState('baseBall');
  const [skillLevel, setSkillLevel] = useState('recreational');
  const [ageGroup, setAgeGroup] = useState('9');
  const [modalVisible, setModalVisible] = useState(false);
  const [instructorModalVisible, setInstructorModalVisible] = useState(false);
  const [ageModalVisible, setAgeModalVisible] = useState(false);
  const [instructionModalVisible, setInstructionModalVisible] = useState(false);
  const [age, setAge] = useState('');
  const [instructor, setInstructor] = useState('');
  const [instruction, setInstruction] = useState('');
  // const [pickImage, setPickImage] = useState('');
  const [state, setState] = useState({
    resourcePath: {},
  });

  const [filePath, setFilePath] = useState();

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
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        let source = response;
        setFilePath(source);
      }
    });
  };

  // launchCamera = () => {
  //   let options = {
  //     storageOptions: {
  //       skipBackup: true,
  //       path: 'images',
  //     },
  //   };
  //   ImagePicker.launchCamera(options, response => {
  //     console.log('Response = ', response);

  //     if (response.didCancel) {
  //       console.log('User cancelled image picker');
  //     } else if (response.error) {
  //       console.log('ImagePicker Error: ', response.error);
  //     } else if (response.customButton) {
  //       console.log('User tapped custom button: ', response.customButton);
  //       alert(response.customButton);
  //     } else {
  //       const source = {uri: response.uri};
  //       console.log('response', JSON.stringify(response));
  //       this.setState({
  //         filePath: response,
  //         fileData: response.data,
  //         fileUri: response.uri,
  //       });
  //     }
  //   });
  // };

  // launchImageLibrary = () => {
  //   let options = {
  //     storageOptions: {
  //       skipBackup: true,
  //       path: 'images',
  //     },
  //   };
  //   ImagePicker.launchImageLibrary(options, response => {
  //     console.log('Response = ', response);

  //     if (response.didCancel) {
  //       console.log('User cancelled image picker');
  //     } else if (response.error) {
  //       console.log('ImagePicker Error: ', response.error);
  //     } else if (response.customButton) {
  //       console.log('User tapped custom button: ', response.customButton);
  //       alert(response.customButton);
  //     } else {
  //       const source = {uri: response.uri};
  //       console.log('response', JSON.stringify(response));
  //       this.setState({
  //         filePath: response,
  //         fileData: response.data,
  //         fileUri: response.uri,
  //       });
  //     }
  //   });
  // };

  const renderFileData = () => {
    if (filePath) {
      return <Image source={filePath} style={styles.image} />;
    } else {
      return (
        <Image
          source={require('../../assets/splash.jpg')}
          style={styles.image}
        />
      );
    }
  };

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
              style={{paddingLeft: 20}}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.titleView}>
          <Text style={[styles.innertext, {fontSize: height > 667 ? 16 : 13}]}>
            ACCOUNT SETTINGS
          </Text>
        </View>
      </View>

      <ScrollView style={styles.bottom}>
        <View>
          {renderFileData()}
          <TouchableOpacity
            style={styles.imageView}
            onPress={() => setModalVisible(!modalVisible)}>
            <Ionicons
              name="pencil-outline"
              color={'white'}
              size={height > 667 ? 14 : 12}
              style={{textAlign: 'center'}}
            />
          </TouchableOpacity>
        </View>
        <AccountInput text={'Name'} placeholder="John Doe" />
        <AccountInput text={'Email-Address'} placeholder="john@example.com" />
        <AccountInput text={'Password'} placeholder="*******" secureTextEntry />
        <Text style={[styles.text, {marginTop: 20}]}>Instructor Type</Text>

        <View style={styles.dropDownOuterView}>
          <TouchableOpacity
            style={styles.dropDown}
            onPress={() => setInstructorModalVisible(true)}>
            {instructor == '' ? (
              <Text style={styles.innertext}>Select</Text>
            ) : (
              <Text style={styles.innertext}>{instructor}</Text>
            )}
            <Image
              source={require('../../assets/drop-down.png')}
              style={styles.dropImage}
            />
          </TouchableOpacity>
        </View>
        <Text style={[styles.text, {marginTop: 15}]}>Skill Level</Text>
        <View style={styles.outerView}>
          <View style={[styles.innerView1, {width: '35%'}]}>
            <RadioButton
              size={20}
              color={Colors.blackColor}
              uncheckedColor={Colors.blackColor}
              value="recreational"
              status={skillLevel === 'recreational' ? 'checked' : 'unchecked'}
              onPress={() => setSkillLevel('recreational')}
            />
            <Text style={styles.innertext}>Recreational</Text>
          </View>
          <View style={[styles.innerView1, {width: '28%'}]}>
            <RadioButton
              color={Colors.blackColor}
              uncheckedColor={Colors.blackColor}
              value="travel"
              status={skillLevel === 'travel' ? 'checked' : 'unchecked'}
              onPress={() => setSkillLevel('travel')}
            />
            <Text style={styles.innertext}>Travel</Text>
          </View>
          <View style={[styles.innerView1]}>
            <RadioButton
              color={Colors.blackColor}
              uncheckedColor={Colors.blackColor}
              value="collegiate"
              status={skillLevel === 'collegiate' ? 'checked' : 'unchecked'}
              onPress={() => setSkillLevel('collegiate')}
            />
            <Text style={styles.innertext}>Collegiate</Text>
          </View>
        </View>
        <View style={[styles.outerView1]}>
          <View style={[styles.innerView1]}>
            <RadioButton
              size={20}
              color={Colors.blackColor}
              uncheckedColor={Colors.blackColor}
              value="division"
              status={skillLevel === 'division' ? 'checked' : 'unchecked'}
              onPress={() => setSkillLevel('division')}
            />
            <Text style={styles.innertext}>Division-1</Text>
          </View>
          <View style={[styles.innerView1, {marginLeft: 10}]}>
            <RadioButton
              color={Colors.blackColor}
              uncheckedColor={Colors.blackColor}
              value="professional"
              status={skillLevel === 'professional' ? 'checked' : 'unchecked'}
              onPress={() => setSkillLevel('professional')}
            />
            <Text style={styles.innertext}>Professional</Text>
          </View>
        </View>
        <Text style={[styles.text, {marginTop: 15}]}>Instruction Types</Text>
        <View style={styles.dropDownOuterView}>
          <TouchableOpacity
            style={styles.dropDown}
            onPress={() => setInstructionModalVisible(true)}>
            {instruction == '' ? (
              <Text style={styles.innertext}>Select</Text>
            ) : (
              <Text style={styles.innertext}>{instruction}</Text>
            )}
            <Image
              source={require('../../assets/drop-down.png')}
              style={styles.dropImage}
            />
          </TouchableOpacity>
        </View>
        <Text style={[styles.text, {marginTop: 15}]}>
          Age Group Qualified to Coach
        </Text>
        <View style={styles.dropDownOuterView}>
          <TouchableOpacity
            style={styles.dropDown}
            onPress={() => setAgeModalVisible(true)}>
            {age == '' ? (
              <Text style={styles.innertext}>Select</Text>
            ) : (
              <Text style={styles.innertext}>{age}</Text>
            )}
            <Image
              source={require('../../assets/drop-down.png')}
              style={styles.dropImage}
            />
          </TouchableOpacity>
        </View>
        <Button
          text={'Save Details'}
          onPress={() => {
            // setModalVisible(!modalVisible);
            props.navigation.navigate('Booking');
          }}
        />
        <View style={{marginTop: 20}}></View>
      </ScrollView>
      <InstructorTypeModal
        modalVisible={instructorModalVisible}
        setModalVisible={setInstructorModalVisible}
        setInstructorType={setInstructor}
      />
      <InstructionTypeModal
        modalVisible={instructionModalVisible}
        setModalVisible={setInstructionModalVisible}
        setInstructionType={setInstruction}
      />
      <AgeGroupModal
        modalVisible={ageModalVisible}
        setModalVisible={setAgeModalVisible}
        setAge={setAge}
      />
      {/* <AccountModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        // setPickImage={chooseImage}
      /> */}

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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    // marginTop: '22%',
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
  dropDown: {
    height: 40,
    width: '100%',
    borderWidth: 1,
    borderColor: Colors.textColor,
    borderRadius: 10,
    // marginTop: 10,\
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
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

  image: {
    height: height > 667 ? 100 : 70,
    width: height > 667 ? 100 : 70,
    borderRadius: height > 667 ? 50 : 35,
    alignSelf: 'center',
    marginTop: 20,
    backgroundColor: Colors.textColor,
  },
  imageView: {
    height: height > 667 ? 25 : 20,
    width: height > 667 ? 25 : 20,
    borderRadius: height > 667 ? 12.5 : 10,
    borderWidth: 2,
    borderColor: Colors.whiteColor,
    backgroundColor: Colors.buttonColor,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    left: height > 667 ? 200 : 155,
    top: height > 667 ? 90 : 65,
  },
  pen: {
    height: 10,
    width: 10,
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
    fontSize: height > 667 ? 12 : 9,
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

export default AccountSettingsScreen;
