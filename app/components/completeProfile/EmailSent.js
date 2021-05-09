import React, { useState } from "react";
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
import * as verifyEmailService from "../../../services/VerifyEmail";
import * as resendOtpService from "../../../services/ResendCode";
import NetInfo from "@react-native-community/netinfo";

const EmailSent = (props) => {
  const [code, setCode] = useState("");
  const [checkCode, setCheckCode] = useState("");

  const [state, setState] = useState({
    email: "",
  });

  const [checkEmail, setCheckEmail] = useState(false);

  _onHandleChange = (name, value) => {
    if (name == "email") {
      setCheckEmail(false);
      setState({
        email: value,
      });
    } else if (name == "code") {
      setCheckCode(false);
      setCode(value);
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
    if (state.email == "") {
      setCheckEmail(true);
    } else if (code == "") {
      setCheckCode(true);
    } else if (!validateEmail()) {
      alert("Please enter a proper email");
    } else if (String(code).length <= 3) {
      alert("Code must be 4 characters");
    } else {
      // resendCode();
      enterCode();
    }
  };

  const validateEmail = () => {
    let email = state.email;
    let pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern.test(String(email).toLowerCase());
  };

  const enterCode = async () => {
    let verificationCode = JSON.stringify({
      otp: Number(code),
      email: state.email,
    });
    console.log("userdata is", verificationCode);

    try {
      let response = await verifyEmailService.verificationEmail(
        verificationCode
      );
      if (response.data.success != undefined && response.data.success == true) {
        console.log("response", response);
        props.navigation.navigate("Login");
      } else {
        console.log("error in service");
      }
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };

  const resendCode = async () => {
    let newOtp = JSON.stringify({
      email: state.email,
    });
    console.log("new OTP is", newOtp);
    try {
      let response = await resendOtpService.resendOtpFunc(newOtp);
      if (response.data.success != undefined && response.data.success == true) {
        console.log("response", response);
        props.navigation.navigate("Login");
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
            Please enter the code sent to your email address to Verfiy your
            Account.
          </Text>
        </View>

        <View style={styles.inputContainer}>
          <Input
            text={"Enter your email here"}
            value={state.email}
            onChangeText={(value) => {
              _onHandleChange("email", value);
              setCheckEmail(false);
            }}
          />
          {checkEmail == true && (
            <Text style={styles.errorStyle}>Code cannot be empty</Text>
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
            <Text style={styles.btnText}>Verify</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnStyle}
            onPress={() => resendCode()}
          >
            <Text style={styles.btnText}>Resend Code</Text>
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
export default EmailSent;
