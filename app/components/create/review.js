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
const height = Dimensions.get('window').height;
const BookingDetails = props => {
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
            <Ionicons
              name="arrow-back"
              size={height > 667 ? 20 : 16}
              style={{paddingLeft: 0}}
            />
          </TouchableOpacity>
          <Text style={styles.headertext}>ZIMR MATFIELD - CCH67888</Text>
        </View>
      </View>

      <View style={styles.bottom}>
        <View style={styles.border}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              margin: 10,
              justifyContent: 'center',
            }}>
            <Image
              source={require('../../assets/star.png')}
              style={styles.profile}
            />
            <Image
              source={require('../../assets/star.png')}
              style={styles.profile}
            />
            <Image
              source={require('../../assets/star.png')}
              style={styles.profile}
            />
            <Image
              source={require('../../assets/star.png')}
              style={styles.profile}
            />
            <Image
              source={require('../../assets/star.png')}
              style={styles.profile}
            />
          </View>
          <Text style={styles.text1}>Add booking review</Text>
          <TextInput style={styles.input} />
        </View>
        <View style={{marginHorizontal: 20}}>
          <Button
            text={'Submit'}
            onPress={() => {
              props.navigation.navigate('Billings');
            }}
          />
        </View>
      </View>
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
    marginTop: '4%',
    height: 600,
    // paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    marginTop: '15%',
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headertext: {
    fontFamily: FontFamily.helveticaBold,
    fontSize: height > 667 ? 16 : 13,
    marginLeft: 20,
  },
  headerLeft: {
    height: 20,
    width: 20,
  },

  mainView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,

    // marginTop: 10
  },
  text: {
    fontSize: 15,
    color: Colors.textColor,
    fontFamily: FontFamily.helvetica,
  },
  text1: {
    fontSize: 15,
    color: Colors.textColor,
    fontFamily: FontFamily.helvetica,
    margin: 10,
  },
  input: {
    height: 110,
    marginTop: 10,
    width: '95%',
    borderRadius: 10,
    marginBottom: 20,
    alignSelf: 'center',
    backgroundColor: Colors.backgroundColor,
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
    marginTop: 20,
  },
  profile: {
    height: 20,
    width: 20,
    marginRight: 5,
  },
  backIconView: {
    width: '15%',
    justifyContent: 'center',
  },
});

export default BookingDetails;
