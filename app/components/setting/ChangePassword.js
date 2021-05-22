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
    TouchableOpacity,
    ToastAndroid,
} from 'react-native';
import { Colors } from '../../style/colors';
import { FontFamily } from '../../style/typograpy';
import { Switch } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Input from "../../common/Input";
import { AuthServices, } from '../../services';
import Button from '../../common/Button';
const height = Dimensions.get('window').height;
import NetInfo from "@react-native-community/netinfo";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
const ChangePassword = props => {
    const [oldPassword, setOldPassword] = React.useState("");
    const [newPassword, setNewPassword] = React.useState("");
    const [confirmNewPassword, setConfirmNewPassword] = React.useState("");
    const [submit, setSubmit] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [visible, setVisible] = useState(false)
    const [message, setMessage] = useState("")
    const checkNetwork = async () => {
        setLoading(true)
        console.log("internet called");
        setSubmit(true);
        console.log(submit)
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

        if (oldPassword && newPassword && confirmNewPassword && submit && confirmNewPassword == newPassword) {
            changePassword();
        } else {
            setSubmit(true);
            console.log(submit)
        }
    };

    const changePassword = () => {
        let userData = {
            oldPassword: oldPassword,
            newPassword: newPassword
        }
        AuthServices.changePassword(props?.user?.id, userData, props?.token)
            .then((respone) => {
                if (respone.data.success) {
                    setMessage(`${respone.data.msg}`)
                    setVisible(true);
                    setLoading(false);
                    props.navigation.replace('TabContainer')
                } else {
                    setLoading(false);
                    setMessage(`${respone.data.msg}`)
                    setVisible(true);;
                }

            })
            .catch((error) => {
                setMessage(`${error}`)
                setVisible(true); setLoading(false);
            })
    }

    return (
        <View style={styles.container}>
            <StatusBar
                barStyle="dark-content"
                translucent
                backgroundColor={'transparent'}
            />
            <View style={styles.titleContainer}>
                <View style={styles.backIconView}>
                    <TouchableOpacity
                        onPress={() => props.navigation.navigate('Settings')}>
                        <Ionicons
                            name="arrow-back"
                            size={height > 667 ? 20 : 16}
                            style={{ paddingLeft: 20, marginTop: 3 }}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.titleView}>
                    <Text style={styles.titleText}>CHANGE PASSWORD</Text>
                </View>
            </View>

            <View style={styles.bottom}>
                <KeyboardAwareScrollView style={{}} showsVerticalScrollIndicator={false}>


                    <View style={{ marginTop: '5%' }}>
                        <Input
                            full={true}
                            text={"Old Password"}
                            value={oldPassword}
                            onChangeText={(value) => {
                                setOldPassword(value);
                            }}
                        />
                        {
                            submit && oldPassword == "" ? <Text style={styles.errorStyle}>Old Password cannot be empty </Text> : null
                        }
                    </View>
                    <View style={styles.inner}>
                        <Input
                            full={true}
                            text={"New Password"}
                            value={newPassword}
                            onChangeText={(value) => {
                                setNewPassword(value);
                            }}
                        />
                        {
                            submit && newPassword == "" ? <Text style={styles.errorStyle}>New Password cannot be empty </Text> : null
                        }
                        {
                            submit ? newPassword.length <= 7 ? <Text style={[styles.errorStyle]}>New Password must be between 8 to 16 characters </Text> : newPassword.length > 16 ? <Text style={[styles.errorStyle]}>New Password must be between 8 to 16 characters </Text> : null : null
                        }
                    </View>
                    <View style={styles.inner}>
                        <Input
                            full={true}
                            text={"Confirm New Password"}
                            value={confirmNewPassword}
                            onChangeText={(value) => {
                                setConfirmNewPassword(value);
                            }}
                        />
                        {
                            submit && confirmNewPassword == "" ? <Text style={styles.errorStyle}>Confirm New Password cannot be empty </Text> : null
                        }
                        {
                            submit && confirmNewPassword.length && confirmNewPassword != newPassword ? <Text style={[styles.errorStyle]}>Password Mismatch</Text> : null
                        }
                    </View>
                    <Button
                        text={'Update'}
                        loading={loading}
                        onPress={() => {
                            checkNetwork()
                            // props.navigation.navigate('Booking');
                        }}
                    />
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
                </KeyboardAwareScrollView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    bottom: {
        height: '90%',
        width: '100%',
        paddingTop: "10%",
        backgroundColor: Colors.whiteColor,
        borderTopRightRadius: 35,
        borderTopLeftRadius: 35,
        // marginTop: '22%',
        paddingHorizontal: 20,
    },
    text: {
        fontFamily: FontFamily.helveticaBold,
        fontSize: height > 667 ? 14 : 12,
    },
    text1: {
        fontFamily: FontFamily.helveticaLight,
        fontSize: height > 667 ? 12 : 10,
    },
    inner: {
        marginTop: 10,
    },
    titleContainer: {
        height: '7%',
        marginTop: height > 667 ? '10%' : '7%',
        flexDirection: 'row',
        justifyContent: 'center',
    },

    backIconView: {
        width: '15%',
        justifyContent: 'center',
    },
    errorStyle: {
        fontSize: 12,
        color: "red",
        paddingLeft: 0,
        paddingBottom: 5
    },
    titleView: {
        width: '85%',
        justifyContent: 'center',
    },
    titleText: {
        fontFamily: FontFamily.helveticaBold,
        fontSize: height > 667 ? 16 : 13,
    },
});
const mapStateToProps = (state) => {
    return {
        user: state.authReducer.userData || {},
        token: state.authReducer.userToken
    };
};

export default connect(mapStateToProps)(ChangePassword);

