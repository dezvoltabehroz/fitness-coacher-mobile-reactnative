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
  TouchableOpacity,
} from 'react-native';
import {Colors} from '../../style/colors';
import {RadioButton, Checkbox} from 'react-native-paper';
import {FontFamily} from '../../style/typograpy';
import Button from '../../common/Button';
import AgeGroupModal from '../../common/ageGroupModal';
const height = Dimensions.get('window').height;
const SettingScreen = props => {
  const [modalVisible, setmodalVisible] = useState(false);
  const [checked, setChecked] = useState('baseBall');
  const [hitting, sethitting] = useState(false);
  const [pitching, setPitching] = useState(false);
  const [catcher, setcatcher] = useState(false);
  const [infield, setInfield] = useState(false);
  const [outfield, setOutfield] = useState(false);
  const [instruction, setInstruction] = useState('draft');
  const [ihitting, setihitting] = useState(false);
  const [ipitching, setiPitching] = useState(false);
  const [icatcher, seticatcher] = useState(false);
  const [iinfield, setiInfield] = useState(false);
  const [ioutfield, setiOutfield] = useState(false);
  const [age, setAge] = useState('');
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor={'transparent'}
      />
      <ScrollView style={styles.bottom}>
        <Text style={styles.text}>Instructor Type</Text>
        <View style={styles.outerView}>
          <TouchableOpacity
            style={styles.dropDown}
            onPress={() => setmodalVisible(true)}>
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
        <Text style={[styles.text, {marginTop: 15}]}>Skill Level</Text>
        <View style={styles.outerView}>
          <View style={[styles.innerView1, {width: '35%'}]}>
            <Checkbox
              color={Colors.blackColor}
              uncheckedColor={Colors.blackColor}
              status={hitting ? 'checked' : 'unchecked'}
              onPress={() => sethitting(!hitting)}
            />
            <Text style={styles.innertext}>Recreational</Text>
          </View>
          <View style={[styles.innerView1, {width: '28%'}]}>
            <Checkbox
              color={Colors.blackColor}
              uncheckedColor={Colors.blackColor}
              status={pitching ? 'checked' : 'unchecked'}
              onPress={() => setPitching(!pitching)}
            />
            <Text style={styles.innertext}>Travel</Text>
          </View>
          <View style={[styles.innerView1]}>
            <Checkbox
              size={20}
              color={Colors.blackColor}
              uncheckedColor={Colors.blackColor}
              status={catcher ? 'checked' : 'unchecked'}
              onPress={() => setcatcher(!catcher)}
            />
            <Text style={styles.innertext}>Collegiate</Text>
          </View>
        </View>
        <View style={[styles.outerView1]}>
          <View style={[styles.innerView1]}>
            <Checkbox
              color={Colors.blackColor}
              uncheckedColor={Colors.blackColor}
              status={infield ? 'checked' : 'unchecked'}
              onPress={() => setInfield(!infield)}
            />
            <Text style={styles.innertext}>Division-1</Text>
          </View>
          <View style={[styles.innerView1, {marginLeft: 10}]}>
            <Checkbox
              color={Colors.blackColor}
              uncheckedColor={Colors.blackColor}
              status={outfield ? 'checked' : 'unchecked'}
              onPress={() => setOutfield(!outfield)}
            />
            <Text style={styles.innertext}>Professional</Text>
          </View>
        </View>
        <Text style={[styles.text, {marginTop: 15}]}>Instruction Types</Text>
        <View style={styles.outerView}>
          <TouchableOpacity
            style={styles.dropDown}
            onPress={() => setmodalVisible(true)}>
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
        <Text style={[styles.text, {marginTop: 15}]}>
          Age Group Qualified to Coach
        </Text>
        <View style={styles.outerView}>
          <TouchableOpacity
            style={styles.dropDown}
            onPress={() => setmodalVisible(true)}>
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
          text={'Create Booking Request'}
          onPress={() => {
            props.navigation.navigate('Preview');
          }}
        />
        <View style={{height: 50}}></View>
      </ScrollView>
      <AgeGroupModal
        modalVisible={modalVisible}
        setModalVisible={setmodalVisible}
        setAge={setAge}
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
    marginTop: '22%',
    paddingHorizontal: 20,
    paddingTop: 20,
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
    fontSize: 12,
  },

  innerView1: {
    height: 40,
    // width: '33%',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.textColor,
    paddingRight: 10,
    alignItems: 'center',
    flexDirection: 'row',
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
  imageOuter: {
    height: 150,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: Colors.backgroundColor,
    marginTop: 20,
  },
  profileView: {
    height: 70,
    width: 70,
    backgroundColor: Colors.whiteColor,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  image: {
    height: 20,
    width: 20,
  },
  imageText: {
    fontSize: 14,
    color: Colors.blackColor,
    fontFamily: FontFamily.helveticaBold,
    marginTop: 10,
  },
  input: {
    height: 120,
    width: '100%',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.textColor,
    marginTop: 10,
    padding: 10,
  },
  dropDown: {
    height: 40,
    width: '100%',
    borderWidth: 1,
    borderColor: Colors.textColor,
    borderRadius: 10,
    // marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  dropImage: {
    height: 14,
    width: 14,
  },
});

export default SettingScreen;
