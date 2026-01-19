import React from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { useAppDispatch, useAppSelector } from "../app/hooks";
import { startDraft, deleteProfile, editProfile } from "../features/profiles/profileSlice";

export default function HomeScreen() {
  const profiles = useAppSelector((state) => state.profiles.profiles);
  const dispatch = useAppDispatch();
  const navigation = useNavigation<any>();

  const handleAdd = () => {
    dispatch(startDraft());
    navigation.navigate("Step1");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Saved Profiles</Text>

      <FlatList
        data={profiles}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate("ProfileDetail", { profileId: item.id })
            }
          >

            <Text style={styles.name}>{item.fullName}</Text>
            <Text>{item.email}</Text>
            <Text>
              {item.address.city}, {item.address.state}, {item.address.country}
            </Text>

            <TouchableOpacity
              style={styles.deleteBtn}
              onPress={() => dispatch(deleteProfile(item.id))}
            >
              <Text style={styles.btnText}>Delete</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.editBtn}
              onPress={() => {
                dispatch(editProfile(item.id));
                navigation.navigate("Step1");
              }}
            >
              <Text style={styles.btnText}>Edit</Text>
            </TouchableOpacity>

          </TouchableOpacity>

        )}
      />

      <TouchableOpacity style={styles.addBtn} onPress={handleAdd}>
        <Text style={styles.btnText}>+ Add Profile</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  card: {
    padding: 12,
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
    marginBottom: 10
  },
  name: { fontSize: 16, fontWeight: "bold" },
  deleteBtn: {
    marginTop: 8,
    backgroundColor: "#ff4d4d",
    padding: 6,
    borderRadius: 6
  },
  addBtn: {
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10
  },
  editBtn: {
    marginTop: 8,
    backgroundColor: "#ffa500",
    padding: 6,
    borderRadius: 6
  },
  btnText: { color: "white", fontWeight: "bold" }
});
