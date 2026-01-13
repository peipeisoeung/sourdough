import React from "react";
import { StyleProp, View, ViewStyle } from "react-native";

interface ScreenProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export function Screen({ children, style }: ScreenProps) {
  return (
    <View
      style={[
        {
          flex: 1,
          paddingHorizontal: 20,
          paddingTop: 60,
          backgroundColor: "#fdac8e",
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}
