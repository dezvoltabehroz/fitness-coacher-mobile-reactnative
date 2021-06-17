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
  TouchableOpacity,
  Platform,
  Dimensions,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import { Colors } from '../../style/colors';
import { FontFamily } from '../../style/typograpy';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { BarChart, Grid, YAxis, XAxis } from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import * as scale from 'd3-scale'
import { PaymentServices } from '../../services';
import { connect } from 'react-redux';
import { errorUtils } from '../../common/Utilities';
import Modal from 'react-native-modal';
import Input from '../../common/Input';
import Container from '../../common/Container'
const height = Dimensions.get('window').height;
const Earnings = props => {
  const [visible, setVisible] = useState(false)
  const [message, setMessage] = useState("")
  const [submit, setSubmit] = useState(false)
  const [totalAmount, setTotalAmount] = useState("")
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const fill = 'rgb(4, 11, 34)';
  const [withdrawModal, setWithdrawModal] = useState(false)
  const [graphData, setGraphData] = useState([]);
  const [labelData, setLabelData] = useState([]);
  const [respData, setResData] = useState({});
  const [amount, setAmount] = useState('');
  const [withdrawLoading, setWithdrawLoading] = useState(false)
  let label = [];
  let value = [];
  const handleWithdraw = () => {
    if (amount.length) {
      setWithdrawLoading(true)
      let userData = {
        id: props?.user?.id,
        token: props?.token,
        price: amount
      }
      console.log(userData)
      PaymentServices.coachPayout(userData)
        .then((response) => {
          if (response.data.success) {
            setWithdrawModal(false)
            setWithdrawLoading(false)
            props.navigation.replace('TabContainer')
          } else {
            setWithdrawModal(false)
            setWithdrawLoading(false)
            setMessage(`${response.data.msg}`)
            setVisible(true);
          }
        })
        .catch((error) => {
          setWithdrawModal(false)
          setWithdrawLoading(false)
          setMessage(`${errorUtils.getError(error)}`)
          setVisible(true);
          console.log(error.response.data)
        })
    }
    else {
      setSubmit(true)
    }

  }
  useEffect(() => {
    getAmounts()
  }, [])
  const getAmounts = () => {
    setLoading(true);
    PaymentServices.coachGraphData(props?.user.id, props?.token)
      .then((resData) => {
        console.log(resData.data)
        let res = [...resData.data.result.coachBookings];
        let data = [];
        let array = []
        res.forEach((item, index) => {
          data.push({ value: parseInt(item.price), label: item.monthName })
          array.push(parseInt(item.price))
        })
        setLabelData(array)
        console.log(data)
        setGraphData(data)
        setResData(resData.data.result);
        console.log(graphData)

        console.log(graphData)

        console.log(graphData)
        PaymentServices.getAmountOfCoaches(props?.user.id, props?.token)
          .then((response) => {
            if (response.data.success) {
              setTotalAmount(response.data.bookings[0].total_amount)
              console.log(response.data)
              setLoading(false);
            }
            else {
              setMessage(`${response.data.msg}`)
              setVisible(true);
              setLoading(false);
            }
          })
          .catch((error) => {
            setLoading(false);
            setMessage(`${errorUtils.getError(error)}`)
            setVisible(true);
          })
      })
      .catch((err) => {
        setMessage(`${errorUtils.getError(err)}`)
        setVisible(true); console.log(err)
        setLoading(false);
      })

  }
  // const data = [...graphData]

  return (
    <Container onPress={() => setVisible(!visible)} message={message} visible={visible}>
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
                contentContainerStyle={{ paddingBottom: '45%' }}
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
                    ${totalAmount}
                  </Text>
                </View>

                {/* <View style={{ position: "absolute", top: "25%", left: 50 }}>
                  <YAxis
                    style={{ height: 140 }}
                    svg={{ fontSize: 10, fill: 'black' }}
                    data={graphData}
                    yAccessor={({ item, index }) => item.label}
                    scale={scale.scaleBand}
                    contentInset={{ left: 0, bottom: 0 }}
                    spacing={0.2}
                    formatLabel={(_, index) => graphData[index].value}
                  />

                </View> */}
                <View style={[styles.barChartContainer, { flex: 1, }]}>
                  <BarChart
                    style={{ height: height > 667 ? 200 : 150, }}
                    data={graphData}
                    width={250}
                    barStyle={{ borderRadius: 120 }}
                    yAccessor={({ item }) => item.value}
                    xAccessor={({ item }) => item.value}
                    svg={{ fill }}
                    curve={shape.curveNatural}
                    contentInset={{ top: 30, left: 1, right: 1, bottom: 30 }}
                    spacing={0.3}
                    gridMin={0}
                  >

                    <Grid direction={Grid.Direction.HORIZONTAL} />
                    <View style={{ flexDirection: "row", width: "100%", justifyContent: "space-around" }}>
                      {
                        graphData.map((item, index) => {
                          return (
                            <Text style={{ fontSize: 10, textAlign: "center" }} >
                              ${item.value}
                            </Text>
                          )
                        })

                      }
                    </View>
                  </BarChart>
                  <XAxis
                    style={{ marginHorizontal: 1, marginTop: -20 }}
                    data={graphData}
                    yAccessor={({ item }) => item.label}
                    formatLabel={(value, index) => graphData[index].label}
                    contentInset={{ left: 30, right: 30, }}
                    svg={{ fontSize: 10, fill: 'black' }}
                  />
                </View>


                <View style={[styles.barChartContainer, { height: '40%' }]}>
                  <View style={styles.mainView}>
                    <Text style={{ fontSize: 14, marginTop: 15 }}>Sales Analytics</Text>
                  </View>
                  <View style={[styles.mainView, { marginTop: 15 }]}>
                    <Text style={styles.text}>Earned this month</Text>
                    <Text style={styles.text1}>$ {respData?.earnedThisMonth}</Text>
                  </View>
                  {/* <View style={styles.mainView}>
                    <Text style={styles.text}>Average selling price</Text>
                    <Text style={styles.text1}>$ 50</Text>
                  </View> */}
                  <View style={styles.mainView}>
                    <Text style={styles.text}>Active bookings</Text>
                    <Text style={styles.text1}>{respData?.activeBooking}</Text>
                  </View>
                  <View style={styles.mainView}>
                    <Text style={styles.text}>Completed this month</Text>
                    <Text style={styles.text1}>{respData?.completedThisMonth}</Text>
                  </View>
                  <View style={styles.mainView}>
                    <Text style={styles.text}>Available for withdrawal</Text>
                    <Text style={styles.text1}>$ {respData?.availableForWithdraw}</Text>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => setWithdrawModal(true)}
                  style={styles.btnStyle}>
                  <Text style={{ color: 'white', fontWeight: '700' }}>Withdraw</Text>
                </TouchableOpacity>
                <View style={{ height: 50 }}></View>
              </ScrollView>
          }
        </View>
      </View >
      <Modal isVisible={withdrawModal}
        onBackdropPress={() => setWithdrawModal(false)}
      >
        <View style={{ backgroundColor: "white", padding: "5%", borderRadius: 20 }}>
          <Input
            text={"Add aomunt to withdraw"}
            value={amount}
            keyboardType={'number-pad'}
            onChangeText={(value) => {
              setAmount(value)
            }}
          />
          {
            submit && !amount.length ?
              <Text style={styles.errorStyle}>Please add amount to withdraw</Text>
              : null
          }
          <TouchableOpacity
            onPress={() => handleWithdraw()}
            style={styles.btnStyle}>
            {
              withdrawLoading ?
                <ActivityIndicator size="small" color="white" />
                :
                <Text style={{ color: 'white', fontWeight: '700' }}>Withdraw Amount</Text>
            }

          </TouchableOpacity>

        </View>

      </Modal>
    </Container>
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
    padding: "2.5%",
    // backgroundColor: 'pink',
    marginHorizontal: 20,
    // height: height > 667 ? 220 : 170,
    borderRadius: 10,
    borderWidth: 0.5,
  },
  errorStyle: {
    fontSize: 12,
    color: "red",
    paddingLeft: "7%",
    paddingBottom: 5
  },
});
const mapStateToProps = (state) => ({
  user: state.authReducer.userData || {},
  token: state.authReducer.userToken || {}
});
export default connect(
  mapStateToProps,
)(Earnings);


