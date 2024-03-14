import React, { Dispatch, SetStateAction, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useCustomThemeColors } from "../hooks/useCustomThemeColors";
import { Ttheme } from "../themes";

interface ICustomTextInput {
  placeHolder: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  label: string;
  onPressHandler?: () => void;
  disabled?: boolean;
}

export const CustomTextInput = ({
  placeHolder = "Type text here",
  setValue,
  value,
  label,
  onPressHandler,
  disabled,
}: ICustomTextInput) => {
  const { t } = useTranslation();
  const { theme } = useCustomThemeColors();
  const [isFocused, setIsFocused] = useState(false);

  const onPressButtonHandler = () => {
    typeof onPressHandler === "function" && onPressHandler();
    setIsFocused(false);
  };

  return (
    <View style={styles(theme).container}>
      <Text style={styles(theme).labelStyles}>{label}</Text>
      <TextInput
        value={value}
        placeholderTextColor={theme.secondaryDefaultTextColor}
        placeholder={placeHolder}
        style={styles(theme).inputStyles}
        onChangeText={setValue}
        editable={!disabled}
        onFocus={(e) => {
          //@ts-ignore
          setIsFocused(e.target.isFocused());
        }}
        onBlur={(e) => {
          //@ts-ignore
          setIsFocused(e.target.isFocused());
        }}
      />
      {onPressHandler && isFocused && !disabled && (
        <TouchableOpacity
          style={styles(theme).customButtonStyles}
          onPress={onPressButtonHandler}
        >
          <Text style={styles(theme).customButtonTextStyles}>{t("save")}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = (theme: Ttheme) =>
  StyleSheet.create({
    inputStyles: {
      width: "100%",
      backgroundColor: "transparent",
      height: 48,
      borderRadius: 48,
      paddingHorizontal: 20,
      paddingVertical: 13,
      borderWidth: 1,
      borderColor: theme.borderColor,
      color: theme.defaultTextColor,
    },
    customButtonStyles: {
      position: "absolute",
      right: 16,
      top: 40,
    },
    customButtonTextStyles: {
      color: theme.textColor,
    },
    container: {
      marginTop: 16,
      position: "relative",
    },
    labelStyles: {
      marginBottom: 8,
      color: theme.defaultTextColor,
      fontFamily: "SFProDisplay-Medium",
    },
  });
