import React, { useState } from "react";
import {
  View,
  ScrollView,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import Input from "../../common/Input";
import { FontFamily } from "../../style/typograpy";
import { Colors } from "../../style/colors";
import * as verifyEmailService from "../../../services/VerifyEmail";
import * as resendOtpService from "../../../services/ForgotPassword";
import NetInfo from "@react-native-community/netinfo";
import { AuthServices } from "../../services";
import { ActivityIndicator } from "react-native";
import { Snackbar } from 'react-native-paper';
const ForgotPassword = (props) => {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    email: "",
  });
  const [visible, setVisible] = useState(false)
  const [message, setMessage] = useState("")

  const [checkEmail, setCheckEmail] = useState(false);

  const _onHandleChange = (name, value) => {
    if (name == "email") {
      setCheckEmail(false);
      setState({
        email: value,
      });
    }
  };

  const checkNetwork = async () => {
    try {
      let state = await NetInfo.fetch();
      if (state.isConnected == true) {
        checkValidations();
      } else {
        setMessage(`Please check your internet connection and try again`)
        setVisible(true);
        // alert("Please check your internet connection and try again");
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const checkValidations = () => {
    if (state.email == "") {
      setCheckEmail(true);
    } else if (!validateEmail()) {
      setMessage(`Please enter a proper email`)
      setVisible(true);
      // alert("Please enter a proper email");
      // ToastAndroid.show(`${error}`, ToastAndroid.LONG)
    } else {
      setLoading(true);
      resetPassword();
    }
  };

  const validateEmail = () => {
    let email = state.email;
    let pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern.test(String(email).toLowerCase());
  };

  const resetPassword = async () => {
    let newOtp = {
      email: state.email,
    };
    console.log("new OTP is", newOtp);
    AuthServices.forgotPassword(state.email)
      .then((response) => {
        if (response.data.success != undefined && response.data.success == true) {
          console.log("response", response.data);
          props.navigation.navigate("ResetPassword", { email: newOtp.email });
          setLoading(false)
        } else {
          setMessage(`${response.data.msg}`)
          setVisible(true);
          // ToastAndroid.show(`${response.data.msg}`, ToastAndroid.LONG)
          console.log("error in service");
          setLoading(false)
        }
      })
      .catch((err) => {
        setMessage(`${err}`)
        setVisible(true);
        // ToastAndroid.show(`${err}`, ToastAndroid.LONG)
        console.log(err);
        setLoading(false)
      })
    // try {
    //   let response = await resendOtpService.resendOtpFunc(newOtp);
    //   if (response.data.success != undefined && response.data.success == true) {
    //     console.log("response", response);
    //     props.navigation.navigate("ResetPassword");
    //   } else {
    //     console.log("error in service");
    //   }
    // } catch (error) {
    //   alert(error);
    //   console.log(error);
    // }
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
            Forgot your password? No worries! Enter your email to get an OTP
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
          <TouchableOpacity
            style={styles.btnStyle}
            onPress={() => checkNetwork()}
          >{
              loading ?
                <ActivityIndicator color={'white'} />
                :
                <Text style={styles.btnText}>Get new OTP</Text>}
          </TouchableOpacity>
        </View>

      </ScrollView>
      <View style={styles.snackbarContainerStyle}>
        <Snackbar
          visible={visible}
          onDismiss={() => setVisible(!visible)}
          action={{
            label: 'OK',
            onPress: () => {
              console.log("hello")
            },
          }}>
          {message}
        </Snackbar>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: Colors.backgroundColor,
    height: "100%",
  },
  snackbarContainerStyle: {
    justifyContent: "flex-end",
    alignItems: "center"
  },
  logoContainer: {
    height: "60%",
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
export default ForgotPassword;
