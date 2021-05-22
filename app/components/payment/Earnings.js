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
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import { Colors } from '../../style/colors';
import { RadioButton, Checkbox, Snackbar } from 'react-native-paper';
import { FontFamily } from '../../style/typograpy';
import Button from '../../common/Button';
import { TouchableOpacity } from 'react-native-gesture-handler';
import DetailsModal from '../../common/DetailsModal';
import { Container, Header, Content, Tab, Tabs } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Divider } from 'react-native-elements';
import { BarChart, Grid } from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import { PaymentServices } from '../../services';
import { connect } from 'react-redux';
const height = Dimensions.get('window').height;
const Earnings = props => {
  const [visible, setVisible] = useState(false)
  const [message, setMessage] = useState("")
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const fill = 'rgb(4, 11, 34)';
  const data = [50, 10, 40, 95, 4, 24];
  const handleWithdraw = () => {
    PaymentServices.coachPayout()
      .then((response) => {
        if (response.data.success) {
          props.navigation.replace('TabContainer')
        }
      })
      .catch((error) => {
        setMessage(`${error}`)
        setVisible(true);
        console.log(error)
      })
  }
  useEffect(() => {
    getAmounts()
  }, [])
  const getAmounts = () => {
    setLoading(true);
    PaymentServices.getAmountOfCoaches(props?.user.id, props?.token)
      .then((response) => {
        if (response.data.success) {
          console.log(response.data)
          PaymentServices.coachGraphData(props?.user.id, props?.token)
            .then((resData) => {
              console.log(resData.data)
              setLoading(false);
            })
            .catch((err) => {
              setMessage(`${err}`)
              setVisible(true); console.log(err)
            })
        }
        else {
          setMessage(`${response.data.msg}`)
          setVisible(true);
        }
      })
      .catch((error) => {
        setMessage(`${error}`)
        setVisible(true);
      })
  }

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor={'transparent'}
      />
      <View style={styles.header}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <Ionicons name="arrow-back" size={height > 667 ? 20 : 16} />
          </TouchableOpacity>
          <Text style={styles.headertext}>EARNINGS</Text>
        </View>
      </View>

      <View style={styles.bottom}>
        {
          loading ?
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
              <ActivityIndicator size={20} color={'#030E2D'} />
            </View>
            :
            <ScrollView
              contentContainerStyle={{ flex: 1, paddingBottom: '45%' }}
              showsVerticalScrollIndicator={false}>
              <View
                style={{
                  marginTop: 10,
                  marginHorizontal: 20,
                  height: height > 667 ? 100 : 70,
                  backgroundColor: Colors.lightGreyColor,
                  padding: 10,
                  borderRadius: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{ fontSize: height > 667 ? 14 : 12 }}>
                  Personal Available Balance
            </Text>
                <Text
                  style={{
                    fontSize: height > 667 ? 18 : 14,
                    color: 'red',
                    marginTop: 10,
                    fontWeight: 'bold',
                  }}>
                  $728
            </Text>
              </View>
              <View style={styles.barChartContainer}>
                <BarChart
                  style={{ height: height > 667 ? 200 : 150 }}
                  data={data}
                  barStyle={{ borderRadius: 120 }}
                  svg={{ fill }}
                  spacingOuter={0.5}
                  curve={shape.curveNatural}
                  contentInset={{ top: 30, bottom: 30 }}>
                  <Grid />
                </BarChart>
              </View>

              <View style={[styles.barChartContainer, { height: '40%' }]}>
                <View style={styles.mainView}>
                  <Text style={{ fontSize: 14, marginTop: 5 }}>Sales Analytics</Text>
                </View>
                <View style={styles.mainView}>
                  <Text style={styles.text}>Earned this month</Text>
                  <Text style={styles.text1}>$300</Text>
                </View>
                <View style={styles.mainView}>
                  <Text style={styles.text}>Average selling price</Text>
                  <Text style={styles.text1}>$50</Text>
                </View>
                <View style={styles.mainView}>
                  <Text style={styles.text}>Active bookings</Text>
                  <Text style={styles.text1}>6</Text>
                </View>
                <View style={styles.mainView}>
                  <Text style={styles.text}>Completed this month</Text>
                  <Text style={styles.text1}>10</Text>
                </View>
                <View style={styles.mainView}>
                  <Text style={styles.text}>Available for withdrawal</Text>
                  <Text style={styles.text1}>$500</Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => handleWithdraw()}
                style={styles.btnStyle}>
                <Text style={{ color: 'white', fontWeight: '700' }}>Withdraw</Text>
              </TouchableOpacity>
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
            </ScrollView>
        }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  snackbarContainerStyle: {
    // top: '30%',
    justifyContent: "flex-end",
    alignItems: "center"
  },
  profile: {
    height: 30,
    width: 30,
    borderRadius: 30,
    margin: 10,
  },
  bottom: {
    width: '100%',
    backgroundColor: Colors.whiteColor,
    borderTopRightRadius: 35,
    borderTopLeftRadius: 35,
    marginTop: '4%',
    height: '100%',
    // paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    height: '7%',
    marginTop: height > 667 ? '10%' : '7%',
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headertext: {
    fontFamily: FontFamily.helveticaBold,
    fontSize: height > 667 ? 16 : 13,
    marginLeft: 20,
  },

  mainView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,

    // marginTop: 10
  },
  text: {
    fontSize: 11,
    color: Colors.textColor,
    fontFamily: FontFamily.helvetica,
    marginTop: 4,
  },
  text1: {
    fontSize: 11,
    color: Colors.blackColor,
    fontFamily: FontFamily.helvetica,
    marginTop: 4,
  },
  video: {
    height: 150,
    marginTop: 10,
    width: '90%',
    borderRadius: 10,
    marginBottom: 10,
    marginHorizontal: 10,
    alignSelf: 'center',
  },
  button: {
    height: height > 667 ? 50 : 40,
    width: '90%',
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 50,
    borderWidth: 1,
    borderColor: Colors.textColor,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  border: {
    width: '90%',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: Colors.textColor,
    borderRadius: 10,
    marginTop: 10,
  },
  profile: {
    height: 30,
    width: 30,
    borderRadius: 30,
    margin: 10,
  },
  image: {
    height: 15,
    width: 15,
  },
  btnStyle: {
    backgroundColor: Colors.buttonColor,
    height: height > 667 ? 50 : 40,
    marginHorizontal: 20,
    marginTop: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  barChartContainer: {
    marginTop: 10,
    // backgroundColor: 'pink',
    marginHorizontal: 20,
    height: height > 667 ? 200 : 150,
    borderRadius: 10,
    borderWidth: 0.5,
  },
});
const mapStateToProps = (state) => ({
  user: state.authReducer.userData || {},
  token: state.authReducer.userToken || {}
});


export default connect(
  mapStateToProps,
)(Earnings);


