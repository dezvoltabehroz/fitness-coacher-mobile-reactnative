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
} from 'react-native';
import {Colors} from '../../style/colors';
import {RadioButton, Checkbox} from 'react-native-paper';
import {FontFamily} from '../../style/typograpy';
import Button from '../../common/Button';
import {TouchableOpacity} from 'react-native-gesture-handler';
import DetailsModal from '../../common/DetailsModal';
import {Container, Header, Content, Tab, Tabs} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Divider} from 'react-native-elements';
const height = Dimensions.get('window').height;
const ConnectedAccounts = props => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor={'transparent'}
      />
      <View style={styles.header}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <Ionicons name="arrow-back" size={height > 667 ? 20 : 16} />
          </TouchableOpacity>
          <Text style={styles.headertext}>CONNECTED ACCOUNTS</Text>
        </View>
      </View>

      <View style={styles.bottom}>
        <ScrollView contentContainerStyle={{paddingBottom: '40%'}}>
          <View
            style={{
              height: '40%',
              flexDirection: 'row',
              padding: 10,
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={{paddingLeft: 15}}>Default Payment Account</Text>
            <TouchableOpacity>
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
                  source={require('../../assets/splash.jpg')}
                  style={styles.profile}
                />
              </TouchableOpacity>
              <Text style={{textAlign: 'left'}}>Porter Shue</Text>
              <Text
                style={{
                  textAlign: 'right',
                  marginLeft: height > 667 ? '40%' : '25%',
                  fontSize: 12,
                }}>
                ******76352
              </Text>
            </View>
            <Divider style={{width: '70%', alignSelf: 'center'}} />
            <Text style={{paddingLeft: '13%', marginTop: 10}}>
              Connected on 03/11/2021
            </Text>
          </View>
        </ScrollView>
      </View>
    </View>
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
});

export default ConnectedAccounts;
