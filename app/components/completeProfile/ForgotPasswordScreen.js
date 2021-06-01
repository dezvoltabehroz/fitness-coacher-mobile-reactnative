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
import { errorUtils } from "../../common/Utilities";
import Container from "../../common/Container";
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
          props.navigation.navigate("ResetPassword", { email: newOtp.email });
          setLoading(false)
        } else {
          setMessage(`${response.data.msg}`)
          setVisible(true);
          setLoading(false)
        }
      })
      .catch((err) => {
        setMessage(`${errorUtils.getError(err)}`)
        setVisible(true);
        setLoading(false)
      })
  };

  return (
    <Container onPress={() => setVisible(!visible)} message={message} visible={visible}>
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
              text={"Email"}
              value={state.email}
              keyboardType={"email-address"}
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
      </SafeAreaView>
    </Container>
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
    marginTop: "5%",
    borderRadius: 15,
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
