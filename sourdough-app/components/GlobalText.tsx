import { Text, TextProps } from "react-native";

export function GlobalText(props: TextProps) {
  return (
    <Text
      {...props}
      style={[{ fontFamily: "RobotoMono_400Regular" }, props.style]}
    />
  );
}
