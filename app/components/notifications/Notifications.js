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
  AsyncStorage,
  NativeModules,
  Platform,
  Dimensions,
  FlatList,
} from 'react-native';
import { throttle } from 'lodash';
import { Colors } from '../../style/colors';
import { FontFamily } from '../../style/typograpy';
import NotificationCard from './NotificationsCard';
import { NotificationServices } from '../../services';
import { connect } from 'react-redux'
import { ActivityIndicator } from 'react-native';
const height = Dimensions.get('window').height;
const NotificationsScreen = props => {
  const [loading, setLoading] = useState(true)
  const [offset, setOffSet] = useState(0)
  const [reachLoading, setReachLoading] = useState(false)
  const [data, setdata] = useState([])

  useEffect(() => {
    getNotifications();
  }, [])
  // {
  //   type: 'completed_booking',
  //   message: 'You have a new booking opportunity',
  // },
  // // {
  // //   type: 'booking_request',
  // //   message: 'Zimry Mayfield has responded to your booking request',
  // // },
  // {
  //   type: 'started_booking',
  //   message: 'Your booking with Porter Shue has started',
  // },
  // {
  //   type: 'review',
  //   message: 'Porter Shue left a 5 star review',
  // },
  // {
  //   type: 'review',
  //   message: 'Porter Shue left a 5 star review',
  // },
  // {
  //   type: 'review',
  //   message: 'Porter Shue left a 5 star review',
  // },
  // ]);


  const getNotifications = () => {
    NotificationServices.getNotifications(0, props?.token)
      .then((res) => {
        console.log(res.data)
        setdata(res.data.notifications)
        setLoading(false)
        setOffSet(offset + 10)
      })
      .catch((err) => console.log(err))
  }
  const getMoreNotifications = () => {
    setReachLoading(true)
    NotificationServices.getNotifications(offset, props?.token)
      .then((res) => {
        let array = [...data, ...res.data.notifications]
        if (data.length != array.length) {
          setdata(array)
          setOffSet(offset + 10)
          setReachLoading(false)
        }
        else {
          setReachLoading(false)
        }
      })
      .catch((err) => console.log(err))
  }


  return (
    <View style={styles.container}>

      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor={'transparent'}
      />
      <View style={styles.titleContainer}>
        <Text style={styles.text}>NOTIFICATIONS</Text>
      </View>

      <ScrollView style={styles.bottom}>
        {
          loading ?
            <View style={{ flex: 1, marginTop: 200, justifyContent: "center", alignItems: "center" }}>
              <ActivityIndicator size={20} color={'#030E2D'} />
            </View>
            :
            <>
              {data.length == 0 ?
                <View style={{ marginTop: 200, justifyContent: "center", alignItems: "center" }}>
                  <Text>No notification found!</Text>
                </View>
                :
                <FlatList
                  data={data}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={(item, index) => index.toString()}
                  onEndReached={() => {
                    throttle(getMoreNotifications, 1000, { leading: true, trailing: false })
                    // throttled()
                  }}
                  // extraData={data}
                  ListFooterComponent={() => {
                    if (data?.length > 0 && reachLoading == true) {
                      return <ActivityIndicator size={'small'} color={'#030E2D'} />
                    }

                    return <View />
                  }}
                  renderItem={({ item, index }) => {
                    return (
                      item != null ?
                        <NotificationCard
                          trainingTypes={props?.trainingTypes}
                          subCategories={props?.subCategories}
                          skills={props?.skills}
                          item={item}
                          navigation={props.navigation} />
                        : null);
                  }}
                />}
            </>}
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
    height: '100%',
    backgroundColor: Colors.whiteColor,
    borderTopRightRadius: 35,
    borderTopLeftRadius: 35,
    paddingHorizontal: 20,
  },
  titleContainer: {
    height: '7%',
    marginTop: height > 667 ? '10%' : '7%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 20,
  },

  text: {
    fontFamily: FontFamily.helveticaBold,
    fontSize: height > 667 ? 16 : 13,
    // marginTop: '5%',
  },
});
const mapStateToProps = (state) => ({
  user: state.authReducer.userData || {},
  token: state.authReducer.userToken || {},
  trainingTypes: state.trainingReducer.trainingTypes || {},
  skills: state.trainingReducer.skills || {},
  subCategories: state.trainingReducer.subCategories || {}
});
export default connect(mapStateToProps)(NotificationsScreen);
