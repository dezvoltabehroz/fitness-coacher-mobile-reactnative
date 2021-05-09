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
const height = Dimensions.get("window").height;
const InstructionTypeModal = ({
  modalVisible,
  setModalVisible,
  navigation,
  setInstructionType,
  selectInstruction,
  isLoaderActive,
}) => {
  // const [arr, setArr] = useState([
  //   {
  //     flag: true,
  //     type: 'Hitting',
  //   },
  //   {
  //     flag: false,
  //     type: 'Defensive',
  //   },
  //   {
  //     flag: false,
  //     type: 'Aggressive',
  //   },
  // ]);

  const [isLoading, setIsLoading] = useState(true);
  var [dataArray, setDataArray] = useState([]);

  const [state, setState] = useState();

  useEffect(() => {
    setDataArray(setInstructionType);
  });

  const checkBoxFunc = (iteration, item) => {
    for (let index = 0; index < dataArray.length; index++) {
      dataArray[index].isDeleted = false;
    }
    dataArray[iteration].isDeleted = true;
    setDataArray(dataArray);
    setModalVisible(false);
    selectInstruction(item);
  };

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
        {isLoaderActive == true ? (
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <ActivityIndicator
              size="large"
              color={Colors.blackColor}
              animating
            />
          </View>
        ) : (
          <FlatList
            data={dataArray}
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
                    onPress={() => checkBoxFunc(index, item)}
                  />
                  <Text style={styles.text}>{item.title}</Text>
                </View>
              );
            }}
          />
        )}
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
    height: (height * 30) / 100,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: "center",
    // alignItems: 'center',
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

export default InstructionTypeModal;
