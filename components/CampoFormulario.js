import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
} from "react-native";

export default function CampoFormulario({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = "default",
  error,
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <TextInput
        style={[
          styles.input,
          error && styles.inputError,
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#999"
        keyboardType={keyboardType}
        autoCapitalize="none"
      />

      {error && (
        <Text style={styles.error}>
          {error}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 18,
  },

  label: {
    fontSize: 15,
    fontWeight: "700",
    color: "#27222d",
    marginBottom: 8,
  },

  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 13,
    fontSize: 16,
    color: "#222",
  },

  inputError: {
    borderColor: "#d93636",
  },

  error: {
    color: "#d93636",
    fontSize: 13,
    marginTop: 5,
  },
});