import React, { useContext } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoginScreen from "./Screens/LoginScreen";
import SignUp from "./Screens/SignUp";
import ProfileScreen from "./Screens/ProfileScreen";
import HomeScreen from "./Screens/HomeScreen";
import AdvertsScreen from "./Screens/AdvertsScreen";
import CreatePost from "./Screens/CreatePost";
import ApplicationScreen from "./Screens/ApplicationScreen";
import Icon from "react-native-vector-icons/FontAwesome";
import AdvertDetailsScreen from "./Screens/AdvertDetailsScreen";
import ForkScreen from "./Screens/ForkScreen";
import CAdvertsScreen from "./Screens/CAdvertsScreen";
import CProfileScreen from "./Screens/CProfileScreen";
import CAdvertDetailsScreen from "./Screens/CAdvertDetailsScreen";
import CApplicationsScreen from "./Screens/CApplicationsScreen";
import CSignUp from "./Screens/CSignUp";
import CreateAdvertScreen from "./Screens/CreateAdvertScreen";
import ApplicantProfileScreen from "./Screens/ApplicantProfileScreen";
import ApplicationDetailsScreen from "./Screens/ApplicationDetailsScreen";
import { AuthProvider, AuthContext } from "./src/context/AuthContext";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const CTab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const AdvertStack = createNativeStackNavigator();
const CAdvertsStack = createNativeStackNavigator();
const ApplicationsStack = createNativeStackNavigator();

function ApplicationsStackScreen() {
  return (
    <ApplicationsStack.Navigator screenOptions={{ headerShown: false }}>
      <ApplicationsStack.Screen
        name="ApplicationScreen"
        component={ApplicationScreen}
      />
      <ApplicationsStack.Screen
        name="ApplicationDetailsScreen"
        component={ApplicationDetailsScreen}
      />
    </ApplicationsStack.Navigator>
  );
}

function CAdvertStackScreen() {
  return (
    <CAdvertsStack.Navigator screenOptions={{ headerShown: false }}>
      <CAdvertsStack.Screen name="CAdvertsScreen" component={CAdvertsScreen} />
      <CAdvertsStack.Screen
        name="CAdvertDetailsScreen"
        component={CAdvertDetailsScreen}
      />
      <CAdvertsStack.Screen
        name="CApplicationsScreen"
        component={CApplicationsScreen}
      />
      <CAdvertsStack.Screen
        name="CreateAdvertScreen"
        component={CreateAdvertScreen}
      />
      <CAdvertsStack.Screen
        name="ApplicantProfileScreen"
        component={ApplicantProfileScreen}
      />
    </CAdvertsStack.Navigator>
  );
}

function AdvertStackScreens() {
  return (
    <AdvertStack.Navigator screenOptions={{ headerShown: false }}>
      <AdvertStack.Screen name="Adverts" component={AdvertsScreen} />
      <AdvertStack.Screen
        name="AdvertDetailsScreen"
        component={AdvertDetailsScreen}
      />
    </AdvertStack.Navigator>
  );
}

function HomeStackScreens() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="Main" component={HomeScreen} />
      <HomeStack.Screen name="Post" component={CreatePost} />
    </HomeStack.Navigator>
  );
}

function StackScreens() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={ForkScreen} />
      <Stack.Screen name="CSignUp" component={CSignUp} />
      <Stack.Screen name="StudentSignUp" component={SignUp} />
    </Stack.Navigator>
  );
}

function CTabScreen() {
  return (
    <CTab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "CProfile") {
            iconName = focused ? "user" : "user-o";
          } else if (route.name === "CAdverts") {
            iconName = focused ? "bullhorn" : "bullhorn";
          } else if (route.name === "Home") {
            iconName = focused ? "home" : "home";
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#1C1678",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <CTab.Screen
        name="Home"
        component={HomeScreen}
        options={{ tabBarLabel: "Anasayfa" }}
      />
      <CTab.Screen
        name="CProfile"
        component={CProfileScreen}
        options={{ tabBarLabel: "Profil" }}
      />
      <CTab.Screen
        name="CAdverts"
        component={CAdvertStackScreen}
        options={{ tabBarLabel: "İlanlarım" }}
      />
    </CTab.Navigator>
  );
}

function TabScreens() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: true,
        headerStyle: {
          backgroundColor: "#1C1678",
        },
        headerTitleStyle: {
          color: "#FFFFFF",
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Profile") {
            iconName = focused ? "user" : "user-o";
          } else if (route.name === "Home") {
            iconName = focused ? "home" : "home";
          } else if (route.name === "Advert") {
            iconName = focused ? "bullhorn" : "bullhorn";
          } else if (route.name === "Application") {
            iconName = focused ? "briefcase" : "briefcase";
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#1C1678",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ tabBarLabel: "Profil" }}
      />
      <Tab.Screen
        name="Home"
        component={HomeStackScreens}
        options={{ tabBarLabel: "Anasayfa" }}
      />
      <Tab.Screen
        name="Advert"
        component={AdvertStackScreens}
        options={{ tabBarLabel: "İlanlar" }}
      />
      <Tab.Screen
        name="Application"
        component={ApplicationsStackScreen}
        options={{ tabBarLabel: "Başvurularım" }}
      />
    </Tab.Navigator>
  );
}

function NavigationScreens() {
  const { user } = useContext(AuthContext);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <>
          <Stack.Screen name="Tab" component={TabScreens} />
          <Stack.Screen name="CTab" component={CTabScreen} />
        </>
      ) : (
        <Stack.Screen name="Stack" component={StackScreens} />
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <SafeAreaView style={styles.safeArea}>
        <NavigationContainer>
          <NavigationScreens />
        </NavigationContainer>
      </SafeAreaView>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff", // This can be adjusted to match your app's design
  },
});
