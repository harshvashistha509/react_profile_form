import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileDetailScreen from "../screens/ProfileDetailScreen";

import HomeScreen from "../screens/HomeScreen";
import Step1BasicInfo from "../screens/Step1BasicInfo";
import Step2Address from "../screens/Step2Address";
import Step3Summary from "../screens/Step3Summary";

export type RootStackParamList = {
  Home: undefined;
  Step1: undefined;
  Step2: undefined;
  Step3: undefined;
  ProfileDetail: { profileId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerTitleAlign: "center" }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Step1" component={Step1BasicInfo} />
      <Stack.Screen name="Step2" component={Step2Address} />
      <Stack.Screen name="Step3" component={Step3Summary} />
      <Stack.Screen
        name="ProfileDetail"
        component={ProfileDetailScreen}
        options={{ title: "Profile Details" }}
      />

    </Stack.Navigator>
  );
}
