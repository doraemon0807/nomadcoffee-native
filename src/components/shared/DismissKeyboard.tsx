import React from "react";
import { Keyboard, Platform, TouchableWithoutFeedback } from "react-native";

interface IDismissKeyboardProps {
  children: React.ReactNode;
}

export default function DismissKeyboard({ children }: IDismissKeyboardProps) {
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback style={{ flex: 1 }} onPress={dismissKeyboard}>
      {children}
    </TouchableWithoutFeedback>
  );
}
