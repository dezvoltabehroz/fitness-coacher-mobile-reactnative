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
import Button from './Button';
const height = Dimensions.get('window').height;
const ImagePickerModal = ({modalVisible, setModalVisible, navigation}) => {
  return (
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
      <View style={styles.container}>
        <View style={styles.bar}></View>
        <TouchableOpacity
          style={[styles.outerView]}
          onPress={() => setModalVisible(false)}>
          <View style={styles.left}>
            <Image
              source={require('../assets/avatar.png')}
              style={styles.image}
            />
          </View>
          <Text style={styles.text}>Camera</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.outerView]}
          onPress={() => setModalVisible(false)}>
          <View style={styles.left}>
            <Image
              source={require('../assets/gallery.png')}
              style={styles.image}
            />
          </View>
          <Text style={styles.text}>Gallery</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.outerView]}
          onPress={() => setModalVisible(false)}>
          <View style={styles.left}>
            <Image
              source={require('../assets/delete.png')}
              style={styles.image}
            />
          </View>
          <Text style={styles.text}>remove</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    height: (height * 40) / 100,
    top: (height * 60) / 100,
    alignSelf: 'center',
  },
  container: {
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
  outerView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 25,
    paddingHorizontal: 20,
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
    height: 17,
    width: 17,
  },
  text: {
    fontFamily: FontFamily.helveticaBold,
    fontSize: 14,
    marginLeft: 10,
  },
});

export default ImagePickerModal;
