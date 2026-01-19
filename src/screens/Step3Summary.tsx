import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { useAppDispatch, useAppSelector } from "../app/hooks";
import { saveProfile } from "../features/profiles/profileSlice";

export default function Step3Summary() {
  const draft = useAppSelector((state) => state.profiles.draft);
  const dispatch = useAppDispatch();
  const navigation = useNavigation<any>();

  if (!draft) return null;

  const handleSubmit = () => {
    dispatch(saveProfile());
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Summary</Text>

      <Text>Name: {draft.fullName}</Text>
      <Text>Email: {draft.email}</Text>
      <Text>Age: {draft.age}</Text>
      <Text>City: {draft.address.city}</Text>
      <Text>State: {draft.address.state}</Text>
      <Text>Country: {draft.address.country}</Text>

      <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
        <Text style={styles.btnText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  btn: {
    marginTop: 20,
    backgroundColor: "green",
    padding: 12,
    borderRadius: 8,
    alignItems: "center"
  },
  btnText: { color: "white", fontWeight: "bold" }
});

