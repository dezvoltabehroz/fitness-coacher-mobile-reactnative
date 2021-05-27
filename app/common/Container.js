import React from 'react';
import { View, TouchableOpacity, ScrollView, Text, Image, Dimensions, FlatList } from 'react-native';
import { Snackbar } from 'react-native-paper';
const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;

const Container = ({ children, visible, message, onPress }) => {


    return (
        <>
            <View style={{ flex: 1 }}>
                <View style={{ flex: visible ? 0.9 : 1 }}>
                    {children}
                </View>
                {
                    visible && message ?
                        <View style={{ flex: 0.1, flexDirection: "column", justifyContent: "flex-end", backgroundColor: "white", }}>
                            <View style={{ alignItems: 'center' }}>
                                <Snackbar
                                    visible={visible}
                                    onDismiss={() => onPress()}
                                    action={{label: 'OK',onPress: () => {console.log("hello")}, }}>
                                    {message}
                                </Snackbar>
                            </View>
                        </View>
                        : null
                }
            </View>

        </>
    )
};

export default Container;
