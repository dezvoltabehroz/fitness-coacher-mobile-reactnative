import React from "react";
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
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import SplashScreen from "../components/auth/Splash";
import LoginScreen from "../components/auth/Login";
import CompleteProfile from "../components/completeProfile/CompleteProfile";
import EmailSent from "../components/completeProfile/EmailSent";
import ForgotPassword from "../components/completeProfile/ForgotPasswordScreen";
import ResetPassword from "../components/completeProfile/ResetPasswordScreen";

import BookingScreen from "../components/booking/Booking";
import NotificationsScreen from "../components/notifications/Notifications";
import CreateScreen from "../components/create/Create";
import ProfileScreen from "../components/profile/Profile";
import SettingsScreen from "../components/setting/Settings";
import AccountSettings from "../components/setting/AccountSettings";
import ChangePassword from "../components/setting/ChangePassword";
import NottificatiosSettings from "../components/setting/NotificationsSettings";
import Preview from "../components/create/Preview";
import BookingDetails from "../components/create/BookingDetails";
import AcceptBooking from "../components/create/AcceptBooking";
import BookingApproved from "../components/create/BookingApproved";
import Review from "../components/create/review";
import Earnings from "../components/payment/Earnings";
import ConnectedAccounts from "../components/payment/ConnectedAccounts";
import AthleteDetails from "../components/payment/PlayerDetails";
import { Colors } from "../style/colors";
import { FontFamily } from "../style/typograpy";
import Ionicons from "react-native-vector-icons/Ionicons";

const height = Dimensions.get("window").height;

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
function SettingsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          // headerTitle: 'SETTINGS',
          // headerTitleAllowFontScaling: true,
          // headerTransparent: true,
          // headerLeft: null,
          headerShown: false,
          headerTitleStyle: {
            fontFamily: FontFamily.helveticaBold,
            fontSize: height > 667 ? 16 : 13,
          },
        }}
      />
      {/* <Stack.Screen
        name="AccountSettings"
        component={AccountSettings}
        options={{
          // headerTitle: 'ACCOUNT SETTINGS',
          // headerTitleAllowFontScaling: true,
          // headerTransparent: true,
          headerShown: false,
          headerTitleStyle: {
            fontFamily: FontFamily.helveticaBold,
            fontSize: 16,
          },
        }}
      /> */}
      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{
          // headerTitle: 'ACCOUNT SETTINGS',
          // headerTitleAllowFontScaling: true,
          // headerTransparent: true,
          headerShown: false,
          headerTitleStyle: {
            fontFamily: FontFamily.helveticaBold,
            fontSize: 16,
          },
        }}
      />
      <Stack.Screen
        name="NotificationsSettings"
        component={NottificatiosSettings}
        options={{
          // headerTitle: 'NOTIFICATIONS SETTINGS',
          // headerTitleAllowFontScaling: true,
          // headerTransparent: true,
          headerShown: false,
          headerTitleStyle: {
            fontFamily: FontFamily.helveticaBold,
            fontSize: 16,
          },
        }}
      />
      <Stack.Screen
        name="Earnings"
        component={Earnings}
        options={{
          // headerTitle: 'MY BILLINGS',
          // headerTitleAllowFontScaling: true,
          // headerTransparent: true,
          headerShown: false,
          headerTitleStyle: {
            fontFamily: FontFamily.helveticaBold,
            fontSize: 16,
          },
        }}
      />
      <Stack.Screen
        name="ConnectedAccounts"
        component={ConnectedAccounts}
        options={{
          // headerTitle: 'MY BILLINGS',
          // headerTitleAllowFontScaling: true,
          // headerTransparent: true,
          headerShown: false,
          headerTitleStyle: {
            fontFamily: FontFamily.helveticaBold,
            fontSize: 16,
          },
        }}
      />
      <Stack.Screen
        name="Bookingdetails"
        component={BookingDetails}
        options={{
          headerShown: false,
          headerTitleAllowFontScaling: true,
          headerTransparent: true,
          headerTitleStyle: {
            fontFamily: FontFamily.helveticaBold,
            fontSize: 16,
          },
        }}
      />
    </Stack.Navigator>
  );
}
function NotificationsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{
          headerShown: false,
          headerTitleStyle: {
            fontFamily: FontFamily.helveticaBold,
            fontSize: 16,
          },
        }}
      />
      <Stack.Screen
        name="Bookingdetails"
        component={BookingDetails}
        options={{
          headerShown: false,
          headerTitleAllowFontScaling: true,
          headerTransparent: true,
          headerTitleStyle: {
            fontFamily: FontFamily.helveticaBold,
            fontSize: 16,
          },
        }}
      />
      <Stack.Screen
        name="AcceptBooking"
        component={AcceptBooking}
        options={{
          headerShown: false,
          headerTitleAllowFontScaling: true,
          headerTransparent: true,
          headerTitleStyle: {
            fontFamily: FontFamily.helveticaBold,
            fontSize: 16,
          },
        }}
      />
    </Stack.Navigator>
  );
}
function CreateStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Create"
        component={CreateScreen}
        options={{
          headerTitle: "NEW BOOKING",
          headerTitleAllowFontScaling: true,
          headerTransparent: true,
          headerTitleStyle: {
            fontFamily: FontFamily.helveticaBold,
            fontSize: 16,
          },
        }}
      />
      <Stack.Screen
        name="Preview"
        component={Preview}
        options={{
          headerTitle: "PREVIEW",
          headerTitleAllowFontScaling: true,
          headerTransparent: true,
          headerTitleStyle: {
            fontFamily: FontFamily.helveticaBold,
            fontSize: 16,
          },
        }}
      />
    </Stack.Navigator>
  );
}
function BookingStack() {
  return (
    <Stack.Navigator initialRouteName={"Booking"}>
      <Stack.Screen
        name="Booking"
        component={BookingScreen}
        options={{
          headerTitleAllowFontScaling: true,
          headerTransparent: true,
          headerShown: false,
          headerTitleStyle: {
            fontFamily: FontFamily.helveticaBold,
            fontSize: 16,
          },
        }}
      />
      <Stack.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{
          // headerTitle: 'NOTIFICATIONS',
          // headerTitleAllowFontScaling: true,
          // headerTransparent: true,
          // headerLeft: null,
          headerShown: false,
          headerTitleStyle: {
            fontFamily: FontFamily.helveticaBold,
            fontSize: 16,
          },
        }}
      />
      <Stack.Screen
        name="Bookingdetails"
        component={BookingDetails}
        options={{
          headerShown: false,
          headerTitleAllowFontScaling: true,
          headerTransparent: true,
          headerTitleStyle: {
            fontFamily: FontFamily.helveticaBold,
            fontSize: 16,
          },
        }}
      />
      <Stack.Screen
        name="Create"
        component={CreateStack}
        options={{
          headerTitleAllowFontScaling: true,
          headerTransparent: true,
          headerShown: false,
          headerTitleStyle: {
            fontFamily: FontFamily.helveticaBold,
            fontSize: 16,
          },
        }}
      />
      <Stack.Screen
        name="AccountSettings"
        component={AccountSettings}
        options={{
          // headerTitle: 'ACCOUNT SETTINGS',
          // headerTitleAllowFontScaling: true,
          // headerTransparent: true,
          headerShown: false,
          headerTitleStyle: {
            fontFamily: FontFamily.helveticaBold,
            fontSize: 16,
          },
        }}
      />
      <Stack.Screen
        name="BookingApproved"
        component={BookingApproved}
        options={{
          headerShown: false,
          headerTitleAllowFontScaling: true,
          headerTransparent: true,
          headerTitleStyle: {
            fontFamily: FontFamily.helveticaBold,
            fontSize: 16,
          },
        }}
      />
      <Stack.Screen
        name="AcceptBooking"
        component={AcceptBooking}
        options={{
          headerShown: false,
          headerTitleAllowFontScaling: true,
          headerTransparent: true,
          headerTitleStyle: {
            fontFamily: FontFamily.helveticaBold,
            fontSize: 16,
          },
        }}
      />
      <Stack.Screen
        name="AthleteDetails"
        component={AthleteDetails}
        options={{
          headerShown: null,
          headerTitleAllowFontScaling: true,
          headerTransparent: true,
          headerTitleStyle: {
            fontFamily: FontFamily.helveticaBold,
            fontSize: 16,
          },
        }}
      />
      <Stack.Screen
        name="Review"
        component={Review}
        options={{
          headerShown: false,
          headerTitleAllowFontScaling: true,
          headerTransparent: true,
          headerTitleStyle: {
            fontFamily: FontFamily.helveticaBold,
            fontSize: 16,
          },
        }}
      />
      <Stack.Screen name="ChangePassword" component={ChangePassword} options={{
        headerTitle: 'CHANGE PASSWORD',
        headerTitleAllowFontScaling: true,
        headerShown: false,
        headerTransparent: true,
        headerTitleStyle: {
          fontFamily: FontFamily.helveticaBold,
          fontSize: 16,
        }
      }} />
    </Stack.Navigator>
  );
}
function TabContainer() {
  return (
    <Tab.Navigator
      shifting={false}
      tabBarOptions={{
        headerShown: true,
        activeTintColor: Colors.buttonColor,
        inactiveTintColor: "gray",
        style: {
          paddingBottom: "2.5%",
          height: 60,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
        },
      }}
      barStyle={{
        backgroundColor: Colors.whiteColor,
        borderTopWidth: 0,
        borderTopColor: "transparent",
        padding: 30,
      }}
    >
      {/* <Tab.Screen
        name="Booking"
        component={BookingStack}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({inactiveTintColor, activeTintColor, focused}) => (
            <Ionicons
              name="home-sharp"
              size={22}
              color={focused ? Colors.buttonColor : 'grey'}
            />
          ),
        }}
      /> */}
      <Tab.Screen
        name="Booking"
        component={BookingStack}
        options={{
          tabBarLabel: "Booking",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="list-outline"
              size={height > 667 ? 22 : 20}
              color={focused ? Colors.buttonColor : "grey"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="NotificationsStack"
        component={NotificationsStack}
        options={{
          tabBarLabel: "Notifications",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="notifications"
              size={height > 667 ? 22 : 20}
              color={focused ? Colors.buttonColor : "grey"}
            />
          ),
        }}
      />

      {/* <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({focused}) => (
            <Ionicons
              name="person"
              size={height > 667 ? 22 : 20}
              color={focused ? Colors.buttonColor : 'grey'}
            />
          ),
        }}
      /> */}
      <Tab.Screen
        name="SettingsStack"
        component={SettingsStack}
        options={({ navigation }) => {
          const { routes, index } = navigation.dangerouslyGetState();
          const { state: exploreState } = routes[index];
          let tabBarVisible = true;
          if (exploreState) {
            const { routes: exploreRoutes, index: exploreIndex } = exploreState;
            const exploreActiveRoute = exploreRoutes[exploreIndex];
            if (exploreActiveRoute.name === "ChangePassword") { tabBarVisible = false };
          }
          return {
            headerShown: false,
            tabBarVisible,
            tabBarLabel: "Settings",
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="settings-sharp"
                size={height > 667 ? 22 : 20}
                color={focused ? Colors.buttonColor : "grey"}
              />
            ),
          };
        }}
      />
    </Tab.Navigator>
  );
}

function Router() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={"Splash"}>
        <Stack.Screen
          name={"TabContainer"}
          component={TabContainer}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="EmailSent"
          component={EmailSent}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ResetPassword"
          component={ResetPassword}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="CompleteProfile"
          component={CompleteProfile}
          options={{
            headerShown: false,
            headerTitleStyle: {
              fontFamily: FontFamily.helveticaBold,
              fontSize: 16,
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default Router;
