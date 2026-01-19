import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { useAppDispatch, useAppSelector } from "../app/hooks";
import { updateDraft } from "../features/profiles/profileSlice";

export default function Step1BasicInfo() {
  const draft = useAppSelector(state => state.profiles.draft);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");

  const dispatch = useAppDispatch();
  const navigation = useNavigation<any>();


  useEffect(() => {
    if (draft) {
      setFullName(draft.fullName || "");
      setEmail(draft.email || "");
      setAge(draft.age || "");
    }
  }, [draft]);

  const handleNext = () => {
    if (!fullName || !email || !age) {
      Alert.alert("Validation", "All fields are required");
      return;
    }

    dispatch(updateDraft({ fullName, email, age }));
    navigation.navigate("Step2");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Basic Information</Text>

      <TextInput
        placeholder="Full Name"
        value={fullName}
        onChangeText={setFullName}
        style={styles.input}
      />

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />

      <TextInput
        placeholder="Age"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
        style={styles.input}
      />

      <TouchableOpacity style={styles.btn} onPress={handleNext}>
        <Text style={styles.btnText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 6,
    marginBottom: 10
  },
  btn: {
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 8,
    alignItems: "center"
  },
  btnText: { color: "white", fontWeight: "bold" }
});
