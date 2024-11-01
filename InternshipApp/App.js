import React, { useEffect, useRef, useContext } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import LoginScreen from "./Screens/LoginScreen";
import SignUp from "./Screens/SignUp";
import ProfileScreen from "./Screens/ProfileScreen";
import HomeScreen from "./Screens/HomeScreen";
import AdvertsScreen from "./Screens/AdvertsScreen";
import CreatePostScreen from "./Screens/CreatePost";
import CommentsScreen from "./Screens/CommentsScreen";
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
import EditAdvertScreen from "./Screens/EditAdvertScreen";
import ApplicantProfileScreen from "./Screens/ApplicantProfileScreen";
import ApplicationDetailsScreen from "./Screens/ApplicationDetailsScreen";
import MyPostsScreen from "./Screens/MyPostsScreen"; // Import the new screen
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
    <CAdvertsStack.Navigator>
      <CAdvertsStack.Screen 
        name="CAdvertsScreen" 
        component={CAdvertsScreen} 
        options={{ headerShown:false }}
      />
      <CAdvertsStack.Screen
        name="CAdvertDetailsScreen"
        component={CAdvertDetailsScreen}
        options={{ title: "İlan Detayları" }}
      />
      <CAdvertsStack.Screen
        name="EditAdvertScreen"
        component={EditAdvertScreen}
        options={{ title: "İlan Düzenle" }}
      />
      <CAdvertsStack.Screen
        name="CApplicationsScreen"
        component={CApplicationsScreen}
        options={{ title: "Başvurular" }}
      />
      <CAdvertsStack.Screen
        name="CreateAdvertScreen"
        component={CreateAdvertScreen}
        options={{ title: "İlan Oluştur" }}
      />
      <CAdvertsStack.Screen
        name="ApplicantProfileScreen"
        component={ApplicantProfileScreen}
        options={{ title: "Başvuran Profili" }}
      />
    </CAdvertsStack.Navigator>
  );
}

function AdvertStackScreens() {
  return (
    <AdvertStack.Navigator screenOptions={{ headerShown: false }}>
      <AdvertStack.Screen 
        name="Adverts" 
        component={AdvertsScreen} 
      />
      <AdvertStack.Screen
        name="AdvertDetailsScreen"
        component={AdvertDetailsScreen}
      />
    </AdvertStack.Navigator>
  );
}

function HomeStackScreens() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen 
        name="Main" 
        component={HomeScreen} 
        options={{ headerShown:false }}
      />
      <HomeStack.Screen 
        name="CreatePost" 
        component={CreatePostScreen} 
        options={{ title: "Gönderi Oluştur" }}
      />
      <HomeStack.Screen 
        name="Comments" 
        component={CommentsScreen} 
        options={{ title: "Yorumlar" }}
      />
    </HomeStack.Navigator>
  );
}

function StackScreens() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Login" 
        component={LoginScreen} 
        options={{ title: "Giriş Yap" }}
      />
      <Stack.Screen 
        name="SignUp" 
        component={ForkScreen} 
        options={{ title: "Kayıt Ol" }}
      />
      <Stack.Screen 
        name="CSignUp" 
        component={CSignUp} 
        options={{ title: "Şirket Kayıt Ol" }}
      />
      <Stack.Screen 
        name="StudentSignUp" 
        component={SignUp} 
        options={{ title: "Öğrenci Kayıt Ol" }}
      />
    </Stack.Navigator>
  );
}

function CTabScreen() {
  return (
    <CTab.Navigator
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
        options={{ tabBarLabel: "Anasayfa", title: "Anasayfa" }}
      />
      <CTab.Screen
        name="CProfile"
        component={CProfileScreen}
        options={{ tabBarLabel: "Profil", title: "Profil" }}
      />
      <CTab.Screen
        name="CAdverts"
        component={CAdvertStackScreen}
        options={{ tabBarLabel: "İlanlarım", title: "İlanlarım" }}
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
        options={{ tabBarLabel: "Profil", title: "Profil" }}
      />
      <Tab.Screen
        name="Home"
        component={HomeStackScreens}
        options={{ tabBarLabel: "Anasayfa", title: "Anasayfa" }}
      />
      <Tab.Screen
        name="Advert"
        component={AdvertStackScreens}
        options={{ tabBarLabel: "İlanlar", title: "İlanlar" }}
      />
      <Tab.Screen
        name="Application"
        component={ApplicationsStackScreen}
        options={{ tabBarLabel: "Başvurularım", title: "Başvurularım" }}
      />
    </Tab.Navigator>
  );
}

function NavigationScreens() {
  const { user } = useContext(AuthContext);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        user.role === "company" ? (
          <Stack.Screen name="CTab" component={CTabScreen} />
        ) : (
          <Stack.Screen name="Tab" component={TabScreens} />
        )
      ) : (
        <Stack.Screen name="Stack" component={StackScreens} />
      )}
      <Stack.Screen name="CreatePost" component={CreatePostScreen} />
      <Stack.Screen name="Comments" component={CommentsScreen} />
      <Stack.Screen name="MyPosts" component={MyPostsScreen} />
      <Stack.Screen
        name="ApplicationDetailsScreen"
        component={ApplicationDetailsScreen}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  const notificationListener = useRef();
  const responseListener = useRef();
  const navigationRef = useRef();

  useEffect(() => {
    // Bildirim izinlerini kontrol et ve al
    const registerForPushNotificationsAsync = async () => {
      let token;
      if (Device.isDevice) {
        const { status: existingStatus } =
          await Notifications.getPermissionsAsync();
        console.log("Existing Status: ", existingStatus); // Log existing status
        let finalStatus = existingStatus;
        if (existingStatus !== "granted") {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
          console.log("Requested Status: ", finalStatus); // Log requested status
        }
        if (finalStatus !== "granted") {
          alert("Failed to get push token for push notification!");
          return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log("Push token:", token); // Log push token
      } else {
        alert("Must use physical device for Push Notifications");
      }

      if (Platform.OS === "android") {
        Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: "#FF231F7C",
        });
      }

      return token;
    };

    registerForPushNotificationsAsync();

    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    });

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log("Notification received while app is open:", notification);
        // Bildirim verisini işleyebilirsiniz
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("Notification response received:", response);
        const { notification } = response;
        const { data } = notification.request.content;

        if (data && data.targetScreen) {
          navigationRef.current?.navigate(data.targetScreen, data);
        }
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <AuthProvider>
      <SafeAreaView style={styles.safeArea}>
        <NavigationContainer ref={navigationRef}>
          <NavigationScreens />
        </NavigationContainer>
      </SafeAreaView>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
