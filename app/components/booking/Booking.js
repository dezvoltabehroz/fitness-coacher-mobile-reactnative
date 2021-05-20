import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  ImageBackground,
  Image,
  NativeModules,
  Platform,
  Dimensions,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  ToastAndroid,
} from "react-native";
import { Colors } from "../../style/colors";
import { FontFamily } from "../../style/typograpy";
import BookingCard from "./BookingCard";
import NotificationCard from "../notifications/NotificationsCard";
import { connect } from 'react-redux';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { logindatakey } from "../../helper/globalKey";
import GlobalVariables from "../../helper/GlobalVariables";
import * as fetchBookingsService from "../../../services/FetchBookings";
import { BookingServices } from "../../services";

const height = Dimensions.get("window").height;
const BookingScreen = (props) => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [active, setActive] = useState(true);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getBookings();
  }, []);
  // const getBookings = async () => {
  //   let response = await fetchBookingsService.fetchBookingsFunc(
  //     GlobalVariables.authenticationToken,
  //     GlobalVariables.userDetails.id
  //   );
  //   if (response.data.success != undefined && response.data.success == true) {
  //     alert("hello");
  //     setState({
  //       bookingDetails: response.data.coursesDetail,
  //     });
  //   }
  //   console.log("booking details are", state.bookingDetails);
  // };

  const getBookings = async () => {
    setLoading(true)
    // console.log("booking details are", state.bookingDetails);
    BookingServices.getBookings(props?.user?.id, props?.token)
      .then((response) => {
        // alert("success");
        if (response.data.success) {
          let arr = Array(10);
          setLoading(false)
          // setBookings(response.data.coursesDetail.rows);
          setBookings(arr);
          console.log("booking details are", bookings);
        }
        else {
          ToastAndroid.show(`${response.data.msg}`, ToastAndroid.LONG)
          setLoading(false)
        }

      })
      .catch((error) => {
        ToastAndroid.show(`${error}`, ToastAndroid.LONG)
        setLoading(false)
        console.log("error =", error);
      });
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor={"transparent"}
      />
      <View style={styles.header}>
        <Text style={styles.text}>COACHER</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate("AccountSettings");
            }}
          >
            <Image
              source={require("../../assets/splash.jpg")}
              style={styles.image1}
            />
          </TouchableOpacity>
        </View>
      </View>
      {/* <NotificationCard item={item} navigation={props.navigation} /> */}
      <View style={styles.bottom}>
        <View
          style={{
            flexDirection: "row",
            marginLeft: 5,
            // justifyContent: "space-around",
            height: 50,
            width: "100%",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              setActive(true);
            }}
          >
            <Text
              style={[
                styles.text1,
                { color: !active ? Colors.textColor : Colors.blackColor },
              ]}
            >
              My Active Bookings
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginLeft: '5%' }}
            onPress={() => {
              setActive(false);
            }}
          >
            <Text
              style={[
                styles.text1,
                {
                  color: active ? Colors.textColor : Colors.blackColor,
                  // paddingRight: height > 667 ? 45 : 45,
                },
              ]}
            >
              Completed Bookings
            </Text>
          </TouchableOpacity>
        </View>
        {
          loading ?
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
              <ActivityIndicator size={20} color={'#030E2D'} />
            </View>
            :
            <FlatList
              contentContainerStyle={{ paddingBottom: "20%" }}
              showsVerticalScrollIndicator={false}
              data={bookings}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => {
                return (
                  <BookingCard navigation={props.navigation} active={active} />
                );
              }}
            />
        }

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottom: {
    height: "90%",
    width: "100%",
    backgroundColor: Colors.whiteColor,
    borderTopRightRadius: 35,
    borderTopLeftRadius: 35,
    marginTop: "4%",
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    height: "7%",
    marginTop: height > 667 ? "10%" : "7%",
    marginHorizontal: 20,
    alignItems: "center",
    justifyContent: "space-between",
  },
  text: {
    fontFamily: FontFamily.helveticaBold,
    fontSize: height > 667 ? 16 : 12,
  },
  previousBookingsText: {
    color: Colors.textColor,
    paddingRight: height > 667 ? 25 : 45,
    fontFamily: FontFamily.helveticaBold,
    fontSize: height > 667 ? 16 : 12,
  },
  image: {
    height: 35,
    width: 35,
    borderRadius: 35,
  },
  image1: {
    height: 25,
    width: 25,
    borderRadius: 25,
  },
  text1: {
    fontFamily: FontFamily.helveticaBold,
    fontSize: height > 667 ? 14 : 12,
  },
});
const mapStateToProps = (state) => ({
  user: state.authReducer.userData || {},
  token: state.authReducer.userToken || {}
});


export default connect(
  mapStateToProps,
)(BookingScreen);

