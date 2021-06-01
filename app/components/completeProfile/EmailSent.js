import React, { useState } from "react";
import {
  View,
  ScrollView,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Input from "../../common/Input";
import { FontFamily } from "../../style/typograpy";
import { Colors } from "../../style/colors";
import NetInfo from "@react-native-community/netinfo";
import { errorUtils } from "../../common/Utilities";
import Container from "../../common/Container";
import { AuthServices } from "../../services";
import RegisterationModal from "../../common/RegisterationModal";
const EmailSent = (props) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [code, setCode] = useState("");
  const [checkCode, setCheckCode] = useState("");
  const [loading, setLoading] = useState(false)
  const [resetLoading, resetSetLoading] = useState(false)
  const [visible, setVisible] = useState(false)
  const [message, setMessage] = useState("")
  const [state, setState] = useState({
    email: props.route.params.email,
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
    setLoading(true)
    try {
      let state = await NetInfo.fetch();
      if (state.isConnected == true) {
        checkValidations();
      } else {
        setMessage(`Please check your internet connection and try again`)
        setVisible(true);
        setLoading(false)
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const checkValidations = () => {
    if (state.email == "") {
      setCheckEmail(true);
      setLoading(false)
    } else if (code == "") {
      setCheckCode(true);
      setLoading(false)
    } else if (!validateEmail()) {
      setMessage(`Please enter a proper email`)
      setLoading(false)
      setVisible(true);
    } else if (String(code).length <= 3) {
      setMessage(`Please enter a proper code`)
      setLoading(false)
      setVisible(true);
    } else {
      enterCode();
    }
  };

  const validateEmail = () => {
    let email = state.email;
    let pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern.test(String(email).toLowerCase());
  };

  const enterCode = async () => {
    let verificationCode = {
      otp: parseInt(code),
      email: `${state.email}`
    };
    console.log("userdata is", verificationCode);

    try {
      let response = await AuthServices.verifyOtp(verificationCode);
      if (response.data.success != undefined && response.data.success == true) {
        console.log("response", response);
        setModalVisible(!modalVisible)
        setLoading(false)
      } else {
        setMessage(`${response.data.msg}`)
        setVisible(true);
        setLoading(false)
        console.log("error in service");
      }
    } catch (error) {
      setMessage(`${errorUtils.getError(error)}`)
      setVisible(true);
      setLoading(false)
      console.log(error);
    }
  };

  const resendCode = async () => {
    resetSetLoading(true)
    try {
      let response = await AuthServices.reSendOtp(state.email);
      if (response.data.success != undefined && response.data.success == true) {
        console.log("response", response);
        setMessage(`${response.data.msg}`)
        setVisible(true);
        resetSetLoading(false)
      } else {
        setMessage(`${response.data.msg}`)
        setVisible(true);
        resetSetLoading(false)
      }
    } catch (error) {
      setMessage(`${errorUtils.getError(error)}`)
      setVisible(true);
      resetSetLoading(false)
      console.log(error);
    }
  };

  return (
    <Container onPress={() => setVisible(!visible)} message={message} visible={visible}>
      <View style={styles.safeArea}>
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
            text={"Email"}
            value={state.email}
            editable={false}
            onChangeText={(value) => {
              _onHandleChange("email", value);
              setCheckEmail(false);
            }}
          />
          {checkEmail == true && (
            <Text style={styles.errorStyle}>Code cannot be empty</Text>
          )}
          <Input
            text={"Code"}
            value={code}
            maxLength={4}
            keyboardType={'number-pad'}
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
            {
              loading ?
                <ActivityIndicator size="small" color="white" />
                :
                <Text style={styles.btnText}>Verify</Text>
            }
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnStyle}
            onPress={() => resendCode()}
          >
            {
              resetLoading ?
                <ActivityIndicator size="small" color="white" />
                :
                <Text style={styles.btnText}>Resend Code</Text>
            }
          </TouchableOpacity>
        </View>
      </View>
      <RegisterationModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        navigation={props.navigation} />
    </Container>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
    // height: "100%",
  },
  snackbarContainerStyle: {
    alignItems: "center"
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
    // height: "100%",
    justifyContent: "space-evenly",
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
export default EmailSent;
