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
import { updateAddress } from "../features/profiles/profileSlice";

export default function Step2Address() {
  const draft = useAppSelector(state => state.profiles.draft);

  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");

  const dispatch = useAppDispatch();
  const navigation = useNavigation<any>();

  useEffect(() => {
    if (draft) {
      setCity(draft.address.city || "");
      setState(draft.address.state || "");
      setCountry(draft.address.country || "");
    }
  }, [draft]);

  const handleNext = () => {
    if (!city || !state || !country) {
      Alert.alert("Validation", "All fields are required");
      return;
    }

    dispatch(updateAddress({ city, state, country }));
    navigation.navigate("Step3");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Address Information</Text>

      <TextInput
        placeholder="City"
        value={city}
        onChangeText={setCity}
        style={styles.input}
      />

      <TextInput
        placeholder="State"
        value={state}
        onChangeText={setState}
        style={styles.input}
      />

      <TextInput
        placeholder="Country"
        value={country}
        onChangeText={setCountry}
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
