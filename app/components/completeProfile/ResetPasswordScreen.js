import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Input from "../../common/Input";
import { FontFamily } from "../../style/typograpy";
import { Colors } from "../../style/colors";
import * as resetPasswordService from "../../../services/ResetPassword";
import NetInfo from "@react-native-community/netinfo";

const ResetPassword = ({ navigation, route }) => {
  const newOtp = route.params;
  console.log("new otp is", newOtp);

  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [checkCode, setCheckCode] = useState(false);
  const [checkPassword, setCheckPassword] = useState(false);
  const [updateEmail, setUpdateEmail] = useState(false);

  const [state, setState] = useState({
    email: "",
  });

  useEffect(() => {
    userDetails();
  }, []);

  const userDetails = () => {
    setUpdateEmail(newOtp);
    console.log("email is: ", updateEmail);
  };

  _onHandleChange = (name, value) => {
    // if (name == "email") {
    //   setCheckEmail(false);
    //   setState({
    //     email: value,
    //   });
    // }
    if (name == "code") {
      setCheckCode(false);
      setCode(value);
    } else if (name == "password") {
      setCheckPassword(false);
      setPassword(value);
    }
  };

  const checkNetwork = async () => {
    try {
      let state = await NetInfo.fetch();
      if (state.isConnected == true) {
        checkValidations();
      } else {
        alert("Please check your internet connection and try again");
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const checkValidations = () => {
    // if (state.email == "") {
    //   setCheckEmail(true);
    // }
    if (password == "") {
      setCheckPassword(true);
    } else if (code == "") {
      setCheckCode(true);
    }
    // else if (!validateEmail()) {
    //   alert("Please enter a proper email");
    // }
    else if (String(password).length <= 7) {
      alert("Password must be between 8 to 16 characters");
    } else if (String(code).length <= 3) {
      alert("Code must be 4 characters");
    } else {
      resetPasswordDetails();
    }
  };

  // const validateEmail = () => {
  //   let email = state.email;
  //   let pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //   return pattern.test(String(email).toLowerCase());
  // };

  const resetPasswordDetails = async () => {
    let newCredentials = JSON.stringify({
      // email: state.email,
      password: password,
      otp: Number(code),
    });
    console.log("userdata is", newCredentials);

    try {
      let response = await resetPasswordService.resetPasswordFunc(
        newCredentials
      );
      if (response.data.success != undefined && response.data.success == true) {
        console.log("response", response);
        navigation.navigate("Login");
      } else {
        console.log("error in service");
      }
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={{ paddingBottom: "100%" }}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../../assets/coacherlogo.png")}
            style={styles.logo}
          />
          <Text style={{ textAlign: "center" }}>
            Please enter your new password to update it.
          </Text>
        </View>

        <View style={styles.inputContainer}>
          {/* <Input
            text={"Enter your email here"}
            value={state.email}
            onChangeText={(value) => {
              _onHandleChange("email", value);
              setCheckEmail(false);
            }}
          />
          {checkEmail == true && (
            <Text style={styles.errorStyle}>Code cannot be empty</Text>
          )}  */}
          <Text>{newOtp}</Text>
          <Input
            text={"Enter your new password here"}
            secureTextEntry={true}
            value={password}
            onChangeText={(value) => {
              _onHandleChange("password", value);
              setCheckPassword(false);
            }}
          />
          {checkPassword == true && (
            <Text style={styles.errorStyle}>Password cannot be empty</Text>
          )}
          <Input
            text={"Enter your code here"}
            value={code}
            onChangeText={(value) => {
              _onHandleChange("code", value);
              setCheckCode(false);
            }}
          />
          {checkCode == true && (
            <Text style={styles.errorStyle}>Code cannot be empty</Text>
          )}

          <TouchableOpacity
            style={styles.btnStyle}
            onPress={() => checkNetwork()}
          >
            <Text style={styles.btnText}>Update</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: Colors.backgroundColor,
    height: "100%",
  },
  logoContainer: {
    height: "40%",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  logo: {
    height: 100,
    width: 100,
    alignSelf: "center",
    marginBottom: "10%",
  },
  inputContainer: {
    height: "100%",
    justifyContent: "space-evenly",
    // backgroundColor: "pink",
  },
  btnStyle: {
    backgroundColor: Colors.buttonColor,
    width: "80%",
    height: 50,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    color: "white",
    fontFamily: FontFamily.helveticaBold,
  },
});
export default ResetPassword;
