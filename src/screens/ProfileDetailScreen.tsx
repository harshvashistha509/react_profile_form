import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useAppSelector } from "../app/hooks";

export default function ProfileDetailScreen() {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { profileId } = route.params;

  const profile = useAppSelector((state) =>
    state.profiles.profiles.find((p) => p.id === profileId)
  );

  if (!profile) {
    return (
      <View style={styles.container}>
        <Text>Profile not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile Details</Text>

      <Text style={styles.label}>Full Name</Text>
      <Text style={styles.value}>{profile.fullName}</Text>

      <Text style={styles.label}>Email</Text>
      <Text style={styles.value}>{profile.email}</Text>

      <Text style={styles.label}>Age</Text>
      <Text style={styles.value}>{profile.age}</Text>

      <Text style={styles.label}>Address</Text>
      <Text style={styles.value}>
        {profile.address.city}, {profile.address.state}, {profile.address.country}
      </Text>

      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.btnText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 16 },
  label: { fontSize: 14, fontWeight: "600", marginTop: 10 },
  value: { fontSize: 16 },
  backBtn: {
    marginTop: 30,
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 8,
    alignItems: "center"
  },
  btnText: { color: "white", fontWeight: "bold" }
});
