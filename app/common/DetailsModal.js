import React, {useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  ImageBackground,
  Image,
  TextInput,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {FontFamily} from '../style/typograpy';
import {Colors} from '../style/colors';
import Modal from 'react-native-modal';
import {Col} from 'native-base';
import Button from './Button';
const height = Dimensions.get('window').height;
const DetailsModal = ({modalVisible, setModalVisible, navigation}) => {
  return (
    <Modal
      style={styles.modal}
      width={'90%'}
      isVisible={modalVisible}
      hasBackdrop={true}
      backdropColor={Colors.modalOverly}
      backdropOpacity={0.7}
      swipeDirection={['up']}
      animationIn={'slideInUp'}
      animationOut={'slideOutDown'}>
      <View style={styles.container}>
        <Image
          source={require('../assets/triangle.png')}
          style={styles.image}
        />
        <Text style={styles.text}>Booking Completion Confirmation</Text>
        <Text style={styles.text1}>
          Are you sure you want to mark this booking as complete?
        </Text>
        <View style={{flexDirection: 'row', marginTop: '5%'}}>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(false);
              navigation.navigate('Booking');
            }}
            style={[
              styles.button,
              {backgroundColor: '#030E2D', borderWidth: 0},
            ]}>
            <Text style={[styles.text2, {color: 'white'}]}>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            style={styles.button}>
            <Text style={styles.text2}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    height: (height * 60) / 100,
  },
  container: {
    width: '95%',
    alignSelf: 'center',
    backgroundColor: Colors.whiteColor,
    height: (height * 33) / 100,
    borderRadius: 20,
    alignItems: 'center',
    paddingHorizontal: 20,
    // justifyContent: 'center',
  },
  image: {
    height: 30,
    width: 30,
    marginTop: height > 667 ? 30 : 20,
  },
  text: {
    fontFamily: FontFamily.helveticaBold,
    fontSize: height > 667 ? 15 : 12,
    marginTop: 10,
    color: 'red',
    width: '98%',
    textAlign: 'center',
  },
  text1: {
    fontFamily: FontFamily.helveticaLight,
    fontSize: height > 667 ? 15 : 12,
    marginTop: 10,
    color: Colors.blackColor,
    width: '95%',
    textAlign: 'center',
  },
  text2: {
    fontFamily: FontFamily.helveticaLight,
    fontSize: height > 667 ? 15 : 12,
    color: Colors.blackColor,
  },
  button: {
    height: height > 667 ? 50 : 35,
    width: '40%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.textColor,
    marginTop: 10,
    marginHorizontal: 10,
  },
});

export default DetailsModal;
