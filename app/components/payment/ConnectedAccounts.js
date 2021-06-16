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
  TouchableOpacity,
  Platform,
  Dimensions,
  TextInput,
} from 'react-native';
import { Colors } from '../../style/colors';
import { RadioButton, Checkbox } from 'react-native-paper';
import { FontFamily } from '../../style/typograpy';
import Button from '../../common/Button';
import DetailsModal from '../../common/DetailsModal';
import { Header, Content, Tab, Tabs } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Divider } from 'react-native-elements';
import Modal from 'react-native-modal';
const height = Dimensions.get('window').height;
import Container from '../../common/Container';
import { connect } from 'react-redux';
import { initStripe, useStripe, CardField } from '@stripe/stripe-react-native';
import { PaymentServices } from '../../services';
import { errorUtils } from '../../common/Utilities';
const ConnectedAccounts = props => {
  const [modalVisible, setModalVisible] = useState(false);
  const [details, setDetails] = useState({})
  const [confirmLoading, setCofirmLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    initStripe({
      publishableKey: 'pk_test_51IVaauJYCYbx3gzyXHFSWqkzjQourDKiOCqDybwCgC1DxjXf7ilt5jEeyoHDJWo9SkdD6uIGasM9SomiSTl2HRPQ002trNTCop'
    });
  }, []);
  let { createToken } = useStripe();
  return (
    <Container onPress={() => setVisible(!visible)} message={message} visible={visible}>
      <View style={styles.container}>
        <StatusBar
          barStyle="dark-content"
          translucent
          backgroundColor={'transparent'}
        />
        <View style={styles.header}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => props.navigation.goBack()}>
              <Ionicons name="arrow-back" size={height > 667 ? 20 : 16} />
            </TouchableOpacity>
            <Text style={styles.headertext}>CONNECTED ACCOUNTS</Text>
          </View>
        </View>

        <View style={styles.bottom}>
          <ScrollView contentContainerStyle={{ paddingBottom: '40%' }}>
            <View
              style={{
                height: '40%',
                flexDirection: 'row',
                padding: 10,
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={{ paddingLeft: 15 }}>Default Payment Account</Text>
              <TouchableOpacity onPress={() => setModalVisible(true)}  >
                <Text
                  style={{
                    paddingRight: 15,
                    color: 'red',
                    fontSize: height > 667 ? 14 : 12,
                  }}>
                  Add New
              </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                marginTop: 10,
                backgroundColor: 'white',
                marginHorizontal: 20,
                height: 100,
                borderRadius: 10,
                borderWidth: 0.5,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    props.navigation.navigate('AthleteDetails');
                  }}>
                  <Image
                    source={require('../../assets/splash.png')}
                    style={styles.profile}
                  />
                </TouchableOpacity>
                <Text style={{ textAlign: 'left' }}>Porter Shue</Text>
                <Text
                  style={{
                    textAlign: 'right',
                    marginLeft: height > 667 ? '40%' : '25%',
                    fontSize: 12,
                  }}>
                  ******76352
              </Text>
              </View>
              <Divider style={{ width: '70%', alignSelf: 'center' }} />
              <Text style={{ paddingLeft: '13%', marginTop: 10 }}>
                Connected on 03/11/2021
            </Text>
            </View>
          </ScrollView>
        </View>

      </View>
      <Modal
        style={styles.modal}
        width={'90%'}
        isVisible={modalVisible}
        hasBackdrop={true}
        backdropColor={Colors.modalOverly}
        backdropOpacity={0.7}
        swipeDirection={['up']}
        animationIn={'slideInUp'}
        animationOut={'slideOutDown'}
        onBackdropPress={() => setModalVisible(false)}
      >
        <View style={styles.modalcontainer}>
          <Image source={require('../../assets/credit.png')} style={styles.modalimage} />
          <Text style={styles.modaltext}>Enter Card Details</Text>
          {/* <Text style={styles.modaltext1}></Text> */}
          <CardField
            postalCodeEnabled={false}
            placeholder={{ number: 'Card Number', expiration: "Exp.Date", cvc: "CVC" }}
            cardStyle={{ backgroundColor: '#FFFFFF', textColor: '#000000', }}
            style={{ width: '100%', height: 50, marginVertical: 30, }}
            onCardChange={(e) => { setDetails(e) }}
          />
          <View style={styles.modalbuttonView}>
            <TouchableOpacity
              // disabled={details?.complete == true ? false : true}
              style={[styles.modalbutton, { backgroundColor: Colors.buttonColor }]}
              onPress={async () => {
                console.log(details)
                setCofirmLoading(true)
                const { token, error } = await createToken({
                  type: "Card",
                  currency: "USD"
                });
                if (error) {
                  setCofirmLoading(false)
                  setModalVisible(false)
                  console.log('Payment confirmation error', error);
                  setMessage(`${errorUtils.getError(error)}`)
                  setVisible(true);
                } else if (token) {
                  console.log('Success from promise', token);
                  let data = {
                    UserId: props?.user.id,
                    stripe_information: token
                  }
                  PaymentServices.createStripeAccount(data, props?.token)
                    .then((res) => {
                      if (res.data.success) {
                        props.navigation.replace('TabContainer')
                      }
                      else {
                        setModalVisible(false)
                        setCofirmLoading(false)
                        setMessage(`${res.data.msg}`)
                        setVisible(true);
                      }
                    })
                    .catch((err) => {
                      setModalVisible(false)
                      setCofirmLoading(false)
                      setMessage(`${errorUtils.getError(err)}`)
                      setVisible(true);
                      console.log(err.response.data)
                    })
                }
              }} >
              {
                confirmLoading ?
                  <View style={{ justifyContent: "center", alignItems: "center" }}>
                    <ActivityIndicator size={20} color={'#FFFFFF'} />
                  </View>
                  :
                  <Text style={styles.modalbuttontext}>Submit</Text>
              }

            </TouchableOpacity>
            <TouchableOpacity style={styles.modalbutton1} onPress={() => { setModalVisible(false) }}>
              <Text style={styles.modalbuttontext1}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>

      </Modal>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profile: {
    height: 30,
    width: 30,
    borderRadius: 30,
    margin: 10,
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
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headertext: {
    fontFamily: FontFamily.helveticaBold,
    fontSize: height > 667 ? 16 : 13,
    marginLeft: 20,
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
  modal: {
    height: (height * 40) / 100,
  },
  modalcontainer: {
    width: '100%',
    backgroundColor: Colors.whiteColor,
    height: (height * 50) / 100,
    borderRadius: 20,
    alignItems: 'center',
    // justifyContent: 'center',
  },
  modalimage:
  {
    height: 40,
    width: 40,
    marginTop: 40
  },
  modaltext:
  {
    fontFamily: FontFamily.helveticaBold,
    color: 'red',
    fontSize: 15,
    marginTop: 10

  },
  modalbuttontext:
  {
    fontFamily: FontFamily.helveticaBold,
    color: Colors.whiteColor,
    fontSize: 15,

  },
  modalbuttontext1:
  {
    fontFamily: FontFamily.helveticaBold,
    color: Colors.textColor,
    fontSize: 15,

  },
  modaltext1:
  {
    fontFamily: FontFamily.helveticaBold,
    fontSize: 15,
    marginTop: 10,
    color: Colors.blackColor,
    width: '85%',
    textAlign: 'center'

  },
  modalbuttonView:
  {
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10
  },
  modalbutton:
  {
    height: 60,
    padding: '5%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 120,
    backgroundColor: Colors.buttonColor
  },
  modalbutton1:
  {
    height: 60,
    padding: '5%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.textColor,
    width: 120,
  }
});
const mapStateToProps = (state) => ({
  user: state.authReducer.userData || {},
  token: state.authReducer.userToken || {}
});
export default connect(mapStateToProps)(ConnectedAccounts);

