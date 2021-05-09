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
  TouchableOpacity
} from 'react-native';
import {FontFamily} from '../style/typograpy';
import {Colors} from '../style/colors';
import Modal from 'react-native-modal';
import { Col } from 'native-base';
import Button from './Button';
const height = Dimensions.get('window').height;
const SuccessRequestModal = ({successModalVisible,setSuccessModalVisible,navigation}) => {
  return (
    <Modal
      style={styles.modal}
      width={'90%'}
      isVisible={successModalVisible}
      hasBackdrop={true}
      backdropColor={Colors.modalOverly}
      backdropOpacity={0.7}
      swipeDirection={['up']}
      animationIn={'slideInUp'}
      animationOut={'slideOutDown'}
      >
      <View style={styles.container}>
       <Image source={require('../assets/lifetime.png')} style={styles.image} />
       <Text style={styles.text}>New Booking Request Is Live</Text>
       <Text style={styles.text1}>Your Booking has been approved, Hold on while we connect you to a coach</Text>
     <Button onPress={()=>{setSuccessModalVisible(false), navigation.navigate("Booking")}}  text={'Return to Home'}/>
    
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    height: (height * 43) / 100,
  },
  container: {
    width: '100%',
    backgroundColor: Colors.whiteColor,
    height: (height * 43) / 100,
    borderRadius: 20,
    alignItems: 'center',
    paddingHorizontal:20
    // justifyContent: 'center',
  },
  image:
  {
      height:30,
      width:30,
      marginTop:50
  },
  text:
  {
      fontFamily:FontFamily.helveticaBold,
      fontSize:15,
      marginTop:10,
      color:'red'

  },
  text1:
  {
      fontFamily:FontFamily.helveticaLight,
      fontSize:15,
      marginTop:10,
      color:Colors.blackColor,
      width:'95%',
      textAlign:'center'

  }

});

export default SuccessRequestModal;
