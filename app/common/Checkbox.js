import React from 'react';
import {StyleSheet, View, Text, Platform} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
// import { COLOR_BLUE } from "../../constants";

export const Checkbox = props => {
  return (
    <View style={[styles.container, props.containerStyle]}>
      <CheckBox
        style={[styles.checkBoxStyle, props.checkBoxStyle]}
        value={props.value}
        boxType={props.boxType}
        tintColors={{true: 'red'}}
        onCheckColor={'red'}
        onAnimationType={'bounce'}
        onValueChange={props.onValueChange}
      />
      <Text style={props.textStyle}>{props.text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  checkBoxStyle: {
    height: 18,
    width: 20,
    marginRight: Platform.OS === 'ios' ? '3%' : '5%',
  },
  container: {
    flexBasis: 'auto',
    flexDirection: 'row',
    padding: '2%',
    alignItems: 'flex-start',
  },
});
