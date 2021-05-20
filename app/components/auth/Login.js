import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  Platform,
  Dimensions,
  ToastAndroid
} from "react-native";
import { Colors } from "../../style/colors";
import { Tab, Tabs } from "native-base";
import Input from "../../common/Input";
import { FontFamily } from "../../style/typograpy";
import Button from "../../common/Button";
import { useKeyboard } from "./../index";
import { Link } from "@react-navigation/native";
import { authActions } from '../../redux/actions/auth';
import { connect } from 'react-redux';
import NetInfo from "@react-native-community/netinfo";
import { bindActionCreators } from "redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthServices } from "../../services";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
var keyheight = "";

const SplashScreen = (props) => {
  const [state, setState] = useState({
    email: "",
  });

  const [loginEmail, setLoginEmail] = useState("");
  const [first_name, setFirstname] = useState("");
  const [last_name, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [dob, setDob] = useState("");
  const [country, setCountry] = useState("");
  const [role, setRole] = useState("");

  const [checkFirst_name, setCheckFirstname] = useState(false);
  const [checkLast_name, setCheckLastname] = useState(false);
  const [checkEmail, setCheckEmail] = useState(false);
  const [checkLoginEmail, setCheckLoginEmail] = useState(false);
  const [checkPassword, setCheckPassword] = useState(false);
  const [checkLoginPassword, setCheckLoginPassword] = useState(false);
  const [checkConfirmPassword, setCheckConfirmPassword] = useState(false);
  const [checkPhone, setCheckPhone] = useState(false);
  const [checkAddress, setCheckAddress] = useState(false);
  const [checkDob, setCheckDob] = useState(false);
  const [checkCountry, setCheckCountry] = useState(false);
  const [checkRole, setCheckRole] = useState(false);
  const [loading, setLoading] = useState(false);
  const onHandleLoginInputs = (name, value) => {
    if (name == "loginEmail") {
      setCheckLoginEmail(false);
      setLoginEmail(value);
    } else if (name == "loginPassword") {
      setCheckLoginPassword(false);
      setLoginPassword(value);
    }
  };

  const loginValidations = () => {
    if (loginEmail == "") {
      setCheckLoginEmail(true);
    } else if (loginPassword == "") {
      setCheckLoginPassword(true);
    } else {
      loginService();
    }
  };

  const loginService = async () => {
    setLoading(true);
    let loginDetails = {
      email: loginEmail,
      password: loginPassword,
    };
    AuthServices.userLogin(loginDetails)
      .then(async (res) => {
        if (res.status == 200) {
          await AsyncStorage.setItem('Token', JSON.stringify(res.data.userData.tokenInfo))
          props.authActions.getUserProfile(res.data.userData.tokenInfo, props.navigation.replace);
          // props.navigation.replace("TabContainer");
          console.log("res :", res.data.userData.tokenInfo);
        }

      })
      .catch((err) => { setLoading(false);
        ToastAndroid.show(`${err}`, ToastAndroid.LONG)
        console.log(err) })
  };

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("logindatakey", jsonValue);
      // console.log("json Value is", jsonValue);
      // setTimeout(() => {
      //   setIsLoading(false);
      // }, 1000);
      // setTimeout(() => {
      props.navigation.navigate("TabContainer");
      // }, 1000);
    } catch (e) {
      // saving error
    }
  };

  const _onHandleChange = (name, value) => {
    if (name == "first_name") {
      setCheckFirstname(false);
      setFirstname(value);
    } else if (name == "email") {
      setCheckEmail(false);
      setState({ email: value });
    } else if (name == "last_name") {
      setCheckLastname(false);
      setLastname(value);
    } else if (name == "password") {
      setCheckPassword(false);
      setPassword(value);
    } else if (name == "confirmPassword") {
      setCheckConfirmPassword(false);
      setConfirmPassword(value);
    }
  };

  const checkNetwork = async () => {
    try {
      let state = await NetInfo.fetch();
      if (state.isConnected == true) {
        checkValidations();
      } else {
        ToastAndroid.show("Please check your internet connection and try again", ToastAndroid.LONG)
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const checkValidations = () => {
    if (first_name == "") {
      setCheckFirstname(true);
    } else if (last_name == "") {
      setCheckLastname(true);
    } else if (state.email == "") {
      setCheckEmail(true);
    } else if (password == "") {
      setCheckPassword(true);
    } else if (password == "") {
      setCheckConfirmPassword(true);
    } else if (String(first_name).length <= 2) {
      ToastAndroid.show("Firstname must be atleast 3 characters", ToastAndroid.LONG)
    } else if (String(last_name).length <= 2) {
     ToastAndroid.show("Lastname must be atleast 3 characters", ToastAndroid.LONG)
    } else if (!validateEmail()) {
      ToastAndroid.show("Please enter a proper email", ToastAndroid.LONG)
    } else if (String(password).length <= 7) {
      ToastAndroid.show("Password must be between 8 to 16 characters", ToastAndroid.LONG)
    } else if (confirmPassword != password) {
      ToastAndroid.show("Password Mismatch", ToastAndroid.LONG)
    } else {
      navigateToNextScreen();
    }
  };

  const validateEmail = () => {
    let email = state.email;
    let pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern.test(String(email).toLowerCase());
  };

  const navigateToNextScreen = () => {
    let data = {
      firstName: first_name,
      lastName: last_name,
      email: state.email,
      password: password,
      confirmPassword: confirmPassword,
    };
    props.navigation.navigate("CompleteProfile", data);
    console.log("data is ", data);
  };

  const didShow = (height) => {
    // console.log('Keyboard show. Height is ' + height);
    setViewHeight(screenHeight - height);
  };

  const didHide = () => {
    // console.log('Keyboard hide');
    setViewHeight(screenHeight);
  };
  const [keyboardHeigth] = useKeyboard(
    didShow,
    didHide
  ); /* initialize the hook (optional parameters) */

  const [viewHeight, setViewHeight] = useState(
    screenHeight
  ); /* for example with didShow and didHide */

  useEffect(() => {
    keyheight = keyboardHeigth;
  }, [keyboardHeigth]);

  return (
    // <KeyboardAvoidingView
    //   style={{flex: 1}}§
    //   behavior="padding"
    //   keyboardVerticalOffset={screenHeight > 667 ? -100 : 0}>
    /* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor={"transparent"}
      />
      <Image
        source={require("../../assets/coacherlogo.png")}
        style={[
          styles.logo,
          {
            marginTop:
              keyboardHeigth != 0
                ? screenHeight > 667
                  ? "-20%"
                  : "-30%"
                : screenHeight > 667
                  ? "20%"
                  : "15%",
          },
        ]}
      />

      <View style={styles.bottom}>
        <Tabs
          tabBarUnderlineStyle={[styles.tabUnderline]}
          tabContainerStyle={{
            elevation: 0,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            height: 70,
            borderWidth: 0,
            borderBottomColor: "white",
          }}
        >
          <Tab
            heading="Login"
            tabStyle={[
              styles.tab,
              {
                borderTopLeftRadius: 30,
              },
            ]}
            activeTabStyle={[styles.activeTab, { borderTopLeftRadius: 30 }]}
            textStyle={styles.tabText}
            activeTextStyle={styles.activeTabText}
          >
            {/* <ScrollView showsVerticalScrollIndicator={false}> */}
            <View style={{ height: "70%" }}>
              <Input
                text={"Email-Address"}
                value={loginEmail}
                onChangeText={(value) => {
                  onHandleLoginInputs("loginEmail", value);
                  setCheckLoginEmail(false);
                }}
              />
              {checkLoginEmail == true && (
                <Text style={styles.errorStyle}>Email cannot be empty</Text>
              )}
              <Input
                text={"Password"}
                secureTextEntry={true}
                value={loginPassword}
                onChangeText={(value) => {
                  onHandleLoginInputs("loginPassword", value);
                  setCheckLoginPassword(false);
                }}
              />
              {checkLoginPassword == true && (
                <Text style={styles.errorStyle}>Password cannot be empty</Text>
              )}

              <View style={{ paddingHorizontal: 20 }}>
                <Button
                  loading={loading}
                  text={"Login"}
                  onPress={() => {
                    loginValidations();
                    // props.navigation.navigate("EmailSent");
                  }}
                />
              </View>
              <Link style={styles.linkText} to="/ForgotPassword">
                Forgot your password?
              </Link>
            </View>
            {/* </ScrollView> */}
          </Tab>
          <Tab
            heading="Register"
            tabStyle={[styles.tab, { borderTopRightRadius: 30 }]}
            activeTabStyle={[styles.activeTab, { borderTopRightRadius: 30 }]}
            textStyle={styles.tabText}
            activeTextStyle={styles.activeTabText}
          >
            <ScrollView
              contentContainerStyle={{
                paddingBottom: screenHeight > 667 ? "25%" : "15%",
              }}
              showsVerticalScrollIndicator={false}
            >
              <View style={{
                // height: 610
              }}>
                <Input
                  text={"First Name"}
                  value={first_name}
                  onChangeText={(value) => {
                    _onHandleChange("first_name", value);
                    setCheckFirstname(false);
                  }}
                />
                {checkFirst_name == true && (
                  <Text style={styles.errorStyle}>
                    Fisrt Name cannot be empty
                  </Text>
                )}
                <Input
                  text={"Last Name"}
                  value={last_name}
                  onChangeText={(value) => {
                    _onHandleChange("last_name", value);
                    setCheckFirstname(false);
                  }}
                />
                {checkLast_name == true && (
                  <Text style={styles.errorStyle}>
                    Last Name cannot be empty
                  </Text>
                )}

                <Input
                  text={"Email Address"}
                  value={state.email}
                  onChangeText={(value) => {
                    _onHandleChange("email", value);
                    setCheckEmail(false);
                  }}
                />
                {checkEmail == true && (
                  <Text style={styles.errorStyle}>Email cannot be empty</Text>
                )}
                <Input
                  secureTextEntry={true}
                  text={"Password"}
                  value={password}
                  onChangeText={(value) => {
                    _onHandleChange("password", value);
                    setCheckPassword(false);
                  }}
                />
                {checkPassword == true && (
                  <Text style={styles.errorStyle}>
                    Password cannot be empty
                  </Text>
                )}
                <Input
                  secureTextEntry={true}
                  text={"Confirm Password"}
                  value={confirmPassword}
                  onChangeText={(value) => {
                    _onHandleChange("confirmPassword", value);
                    setCheckPassword(false);
                  }}
                />
                {checkPassword == true && (
                  <Text style={styles.errorStyle}>
                    Confirm password cannot be empty
                  </Text>
                )}
                <View style={{ paddingHorizontal: 20 }}>
                  <Button
                    text={"Next"}
                    loading={loading}
                    onPress={() => checkNetwork()}
                  />
                </View>
                <Text style={[styles.text, { textAlign: "center" }]}>
                  By signing up, you agree to ECHO's Terms of Use & Privacy
                  Policy
                </Text>
                <View style={{ marginBottom: 150 }}></View>
              </View>
            </ScrollView>
          </Tab>
        </Tabs>
      </View>
    </View>
    /* </TouchableWithoutFeedback> */
    // </KeyboardAvoidingView>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
  tab: {
    backgroundColor: Colors.whiteColor,
    // paddingTop:20
  },
  tabText: {
    fontSize: 14,
    fontWeight: "400",
    color: Colors.textColor,
    fontFamily: FontFamily.helveticaBold,
  },
  tabUnderline: {
    borderBottomColor: Platform.OS == "android" ? "#030E2D" : "#fff",
    borderBottomWidth: 2,
  },
  activeTabText: {
    fontSize: 15,
    fontWeight: "400",
    color: "black",
    fontFamily: FontFamily.helveticaBold,
  },
  activeTab: {
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  logo: {
    height: 100,
    width: 100,
    alignSelf: "center",
    marginTop: "23%",
    marginBottom: "10%",
  },
  text: {
    fontSize: 11,
    color: Colors.blackColor,
    fontFamily: FontFamily.helveticaBold,
    marginHorizontal: 25,
    marginTop: 10,
  },
  bottom: {
    height: "100%",
    width: "100%",
    backgroundColor: Colors.whiteColor,
    borderTopRightRadius: 35,
    borderTopLeftRadius: 35,
  },
  errorStyle: {
    fontSize: 12,
    color: "red",
    paddingLeft: 20,
  },
  dateTimeContainer: {
    paddingHorizontal: 20,
    marginTop: 17,
  },
  dateTimeStyle: {
    height: screenHeight > 667 ? 50 : 40,
    borderWidth: 1,
    borderColor: "#e0dede",
    borderRadius: 10,
    backgroundColor: Colors.whiteColor,
    color: Colors.blackColor,
    paddingLeft: 10,
    fontFamily: FontFamily.helveticaBold,
    fontSize: 13,
  },
  dateTimeText: {
    fontFamily: FontFamily.helveticaLight,
    color: Colors.textColor,
    fontSize: 13,
    marginBottom: 12,
  },
  linkText: {
    color: "orange",
    marginTop: "5%",
    textAlign: "center",
  },
});

const mapStateToProps = (state) => ({
  user: state.authReducer,

});

const mapDispatchToProps = dispatch => {
  return {
    authActions: bindActionCreators(authActions, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SplashScreen);

