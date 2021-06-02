import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  Image,
  Dimensions,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Colors } from "../../style/colors";
import { FontFamily } from "../../style/typograpy";
import BookingCard from "./BookingCard";
import { connect } from 'react-redux';
import { BookingServices } from "../../services";
import { Snackbar } from 'react-native-paper';
import Container from "../../common/Container";
import { errorUtils } from "../../common/Utilities";

const height = Dimensions.get("window").height;
const BookingScreen = (props) => {
  const [bookings, setBookings] = useState([]);
  const [completedBookings, setCompletedBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [active, setActive] = useState(true);
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false)
  const [message, setMessage] = useState("")
  useEffect(() => {
    getActiveBookings();
    getCompletedBookings()
  }, []);

  const getActiveBookings = async () => {
    setLoading(true)
    BookingServices.getActiveBookings(props?.user?.id, props?.token)
      .then((response) => {
        if (response.data.success) {
          setMessage(`${response.data.msg}`)
          setVisible(true);
          setLoading(false)
          setBookings(response.data.coursesDetail.rows);
          console.log("booking details are", bookings);
        }
        else {
          setMessage(`${response.data.msg}`)
          setVisible(true);
          setLoading(false)
        }

      })
      .catch((error) => {
        setMessage(`${errorUtils.getError(error)}`)
        setVisible(true);
        setLoading(false)
        console.log("error =", error);
      });
  };

  const getCompletedBookings = async () => {
    setLoading(true)
    BookingServices.getActiveBookings(props?.user?.id, props?.token)
      .then((response) => {
        if (response.data.success) {
          setLoading(false)
          setCompletedBookings(response.data.coursesDetail.rows);
          console.log("booking details are", bookings);
        }
        else {
          setMessage(`${response.data.msg}`)
          setVisible(true);
          setLoading(false)
        }

      })
      .catch((error) => {
        setMessage(`${errorUtils.getError(error)}`)
        setVisible(true);
        setLoading(false)
        console.log("error =", error);
      });
  };

  return (
    <Container onPress={() => setVisible(!visible)} message={message} visible={visible}>
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
                source={props?.user?.imageUrl != null ? { uri: props?.user?.imageUrl } : require('../../assets/splash.png')}
                resizeMode="contain"
                style={styles.image1}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.bottom}>
          <View
            style={{
              flexDirection: "row",
              marginLeft: 5,
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
                  styles.text1, { color: active ? Colors.textColor : Colors.blackColor, },
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
              active ?
                bookings.length == 0 ?
                  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <Text>No Bookings Found</Text>
                  </View>
                  :
                  <FlatList
                    contentContainerStyle={{ paddingBottom: "20%" }}
                    showsVerticalScrollIndicator={false}
                    data={bookings}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => {
                      return (
                        <BookingCard navigation={props.navigation} item={item} active={active} />
                      );
                    }}
                  />
                :
                completedBookings.length == 0 ?
                  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <Text>No Bookings Found</Text>
                  </View>
                  :
                  <FlatList
                    contentContainerStyle={{ paddingBottom: "20%" }}
                    showsVerticalScrollIndicator={false}
                    data={completedBookings}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => {
                      return (
                        <BookingCard navigation={props.navigation} item={item} active={false} />
                      );
                    }}
                  />
          }
        </View>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  snackbarContainerStyle: {
    bottom: 30,
    alignItems: "center"
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

