import React, { useState, useEffect } from "react";
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
import * as resetPasswordService from "../../../services/ResetPassword";
import NetInfo from "@react-native-community/netinfo";
import { ActivityIndicator } from "react-native";
import { AuthServices } from "../../services";
import { errorUtils } from "../../common/Utilities";
import Container from "../../common/Container";

const ResetPassword = ({ navigation, route }) => {
  console.log(navigation)
  console.log(route)
  const newOtp = route.params.email;
  console.log("new otp is", route.params.email);

  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [checkCode, setCheckCode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checkPassword, setCheckPassword] = useState(false);
  const [updateEmail, setUpdateEmail] = useState(false);
  const [visible, setVisible] = useState(false)
  const [message, setMessage] = useState("")
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

  const _onHandleChange = (name, value) => {

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
        setMessage(`Please check your internet connection and try again`)
        setVisible(true);
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const checkValidations = () => {

    if (password == "") {
      setCheckPassword(true);
    } else if (code == "") {
      setCheckCode(true);
    }

    else if (String(password).length <= 7) {
      setMessage(`Password must be between 8 to 16 characters`)
      setVisible(true);
    } else if (String(code).length <= 3) {
      setMessage(`Code must be 4 characters`)
      setVisible(true);
    } else {
      setLoading(true);
      resetPasswordDetails();
    }
  };


  const resetPasswordDetails = async () => {
    let newCredentials = {
      email: updateEmail,
      password: password,
      otp: Number(code),
    };
    console.log("userdata is", newCredentials);
    AuthServices.resetPassword(newCredentials)
      .then((response) => {
        if (response.data.success != undefined && response.data.success == true) {
          setLoading(false);
          navigation.navigate("Login");
        } else {
          setLoading(false);
          setMessage(`${response.data.msg}`)
          setVisible(true);

          console.log("error in service");
        }
      })
      .catch((error) => {
        setMessage(`${errorUtils.getError(error)}`)
        setVisible(true);
        setLoading(false)
        console.log(error);
      })

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
            Please enter your new password to update it.
          </Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={{ textAlign: "center" }}>{newOtp}</Text>
          <Input
            text={"New Password "}
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
            text={"Code"}
            value={code}
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
          >{
              loading ?
                <ActivityIndicator color={"white"} />
                :
                <Text style={styles.btnText}>Update</Text>}
          </TouchableOpacity>
        </View>

      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: Colors.backgroundColor,
    // height: "100%",
  },
  snackbarContainerStyle: {
    justifyContent: "flex-end",
    alignItems: "center"
  },
  logoContainer: {
    // height: "40%",
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
export default ResetPassword;
