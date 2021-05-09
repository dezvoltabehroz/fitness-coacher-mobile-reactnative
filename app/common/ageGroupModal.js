import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  ImageBackground,
  Image,
  TextInput,
  Dimensions,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { FontFamily } from "../style/typograpy";
import { Colors } from "../style/colors";
import Modal from "react-native-modal";
import { RadioButton, Checkbox } from "react-native-paper";
import { fetchCategories } from "../../services/FetchCategories";

const height = Dimensions.get("window").height;
const AgeGroupModal = ({
  modalVisible,
  setModalVisible,
  navigation,
  setAge,
}) => {
  const [arr, setArr] = useState([
    {
      flag: true,
      age: "Under-9",
    },
    {
      flag: false,
      age: "10-11",
    },
    {
      flag: false,
      age: "12-14",
    },
    {
      flag: false,
      age: "15-16",
    },
    {
      flag: false,
      age: "18+",
    },
  ]);

  const [prev, setPrev] = useState(0);
  return (
    <Modal
      style={styles.modal}
      width={"90%"}
      isVisible={modalVisible}
      hasBackdrop={true}
      backdropColor={Colors.modalOverly}
      backdropOpacity={0.5}
      swipeDirection={["up"]}
      animationIn={"slideInUp"}
      animationOut={"slideOutDown"}
    >
      <View style={styles.container}>
        <FlatList
          data={arr}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => {
            return (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 10,
                }}
              >
                <RadioButton
                  color={Colors.blackColor}
                  size={10}
                  uncheckedColor={Colors.blackColor}
                  status={item.flag ? "checked" : "unchecked"}
                  onPress={() => {
                    let array = arr;
                    array[prev].flag = false;
                    array[index].flag = true;
                    setArr(arr);
                    setAge(item.age);
                    setModalVisible(false);
                    setPrev(index);
                  }}
                />
                <Text style={styles.text}>{item.age}</Text>
              </View>
            );
          }}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    height: (height * 45) / 100,
  },
  container: {
    width: "100%",
    backgroundColor: Colors.whiteColor,
    // height: (height * 48) / 100,
    height: height > 667 ? (height * 45) / 100 : (height * 55) / 100,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    // justifyContent: 'center',
  },
  image: {
    height: 30,
    width: 30,
    marginTop: 50,
  },
  text: {
    fontFamily: FontFamily.helveticaBold,
    fontSize: 15,
    marginLeft: 5,
  },
  text1: {
    fontFamily: FontFamily.helveticaLight,
    fontSize: 15,
    marginTop: 10,
    color: Colors.blackColor,
    width: "95%",
    textAlign: "center",
  },
});

export default AgeGroupModal;
