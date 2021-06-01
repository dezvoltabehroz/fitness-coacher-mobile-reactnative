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
  FlatList,
} from 'react-native';
import {Colors} from '../../style/colors';
import {FontFamily} from '../../style/typograpy';
import PlayerReviewsCard from './playerReviewsCard';
import {RadioButton, Checkbox} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

const height = Dimensions.get('window').height;
const AthleteDetails = props => {
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
          <Text style={styles.headertext}>ZIMR MATFIELD</Text>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.bottom}>
        <View style={{alignItems: 'center'}}>
          <Image
            source={require('../../assets/splash.png')}
            style={styles.profile}
          />
        </View>

        <View style={styles.mainView}>
          <Text style={styles.text}>Name</Text>
          <Text style={styles.text1}>Porter Shue</Text>
        </View>
        <View style={styles.mainView}>
          <Text style={styles.text}>Date of Birth</Text>
          <Text style={styles.text1}>20/01/1990</Text>
        </View>
        <View style={styles.mainView}>
          <Text style={styles.text}>Sport</Text>
          <Text style={styles.text1}>Baseball</Text>
        </View>
        <View style={styles.mainView}>
          <Text style={styles.text}>Skill Level</Text>
          <Text style={styles.text1}>Recreational</Text>
        </View>
        <View style={styles.mainView}>
          <Text style={styles.text}>Age Group</Text>
          <Text style={styles.text1}>18+</Text>
        </View>
        <Text style={styles.text1}>Reviews</Text>
        <FlatList
          data={[1, 2, 3]}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => {
            return <PlayerReviewsCard />;
          }}
        />
        <View style={{height: 40}}></View>
      </ScrollView>
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
    paddingHorizontal: 20,
    paddingTop: 20,
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
  headerLeft: {
    height: 20,
    width: 20,
  },

  mainView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginTop: 10
  },
  text: {
    fontSize: height > 667 ? 15 : 12,
    color: Colors.textColor,
    fontFamily: FontFamily.helvetica,
    marginVertical: 3,
  },
  text1: {
    fontSize: height > 667 ? 15 : 12,
    color: Colors.blackColor,
    fontFamily: FontFamily.helvetica,
    marginVertical: 3,
  },
  video: {
    height: 150,
    marginTop: 10,
    width: '100%',
    borderRadius: 10,
    marginBottom: 10,
  },
  button: {
    height: height > 667 ? 50 : 40,
    width: '99%',
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 50,
    borderWidth: 1,
    borderColor: Colors.textColor,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profile: {
    height: 75,
    width: 75,
    borderRadius: 75,
  },
});

export default AthleteDetails;
