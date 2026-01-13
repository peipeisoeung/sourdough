import React, { useState } from "react";
import { Animated, Pressable, StyleSheet, TextInput, View } from "react-native";
import { GlobalText } from "../components/GlobalText";
import { Screen } from "../components/Screen";
import { useStarterStore } from '../stores/useStarterStore';

export default function Index() {
  const { starter, createStarter, feedStarter, resetStarter } = useStarterStore();
  const [inputName, setInputName] = useState("");

  const scale = React.useRef(new Animated.Value(1)).current;
  const animatePop = () => {
    Animated.sequence([
      Animated.timing(scale, { toValue: 1.4, duration: 150, useNativeDriver: true }),
      Animated.timing(scale, { toValue: 0.9, duration: 100, useNativeDriver: true }),
      Animated.timing(scale, { toValue: 1, duration: 100, useNativeDriver: true }),
    ]).start();
  };

  return (
    <Screen style={{ flex: 1 }}>
      {/* Reset button top-right */}
      {starter && (
        <Pressable onPress={resetStarter} style={styles.resetButton}>
          <GlobalText style={styles.buttonText}>Reset Starter</GlobalText>
        </Pressable>
      )}

      {/* Main content */}
      <View style={styles.centerContent}>
        {!starter ? (
          <>
            <TextInput
              value={inputName}
              onChangeText={setInputName}
              placeholder="Enter starter name"
              style={styles.input}
            />
            <Pressable
              onPress={() => {
                if (inputName.trim().length > 0) createStarter(inputName);
              }}
              style={styles.createButton}
            >
              <GlobalText style={styles.buttonText}>Create Starter</GlobalText>
            </Pressable>
          </>
        ) : (
          <>
            <Animated.View
              style={[styles.blob, { transform: [{ scale }] }]}
            />

            {/* Stats under blob, left-aligned */}
            <View style={styles.statsWrapper}>
              <GlobalText style={styles.statText}>Name: {starter.name}</GlobalText>
              <GlobalText style={styles.statText}>Maturity: {starter.maturity}</GlobalText>
              <GlobalText style={styles.statText}>Health: {starter.health}</GlobalText>
              <GlobalText style={styles.statText}>Stage: {starter.stage}</GlobalText>
            </View>
          </>
        )}
      </View>

      {/* Feed button bottom-right */}
      {starter && (
        <Pressable
          onPress={() => {
            feedStarter();
            animatePop();
          }}
          style={styles.feedButton}
        >
          <GlobalText style={styles.buttonText}>Feed</GlobalText>
        </Pressable>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  resetButton: {
    position: "absolute",
    top: 40,
    right: 20,
    padding: 10,
    backgroundColor: "red",
    borderRadius: 5,
    zIndex: 1,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 8,
    width: 200,
    marginBottom: 10,
    borderRadius: 5,
  },
  createButton: {
    padding: 10,
    backgroundColor: "green",
    borderRadius: 5,
  },
  blob: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#f07f68",
    borderWidth: 2,
    borderColor: "#a7563f",
    shadowColor: "#a7563f",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    marginBottom: 20,
  },
  statsWrapper: {
    alignSelf: "flex-start",
    paddingHorizontal: 30,
  },
  statText: {
    fontSize: 20,
    marginBottom: 5,
  },
  feedButton: {
    position: "absolute",
    bottom: 40,
    right: 30,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#4b8bf4",
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },
});
