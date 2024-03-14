import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import DatePicker from "react-native-date-picker";
import { useCustomThemeColors } from "../hooks/useCustomThemeColors";
import { Ttheme } from "../themes";
//@ts-ignore
import CalendarIcon from "../media/svg/Calendar.svg";

interface ICustomDatePicker {
  label: string;
  onDateChangeHandler: (date: Date) => void;
  value: Date | null;
}

export const CustomDatePicker = ({
  label,
  onDateChangeHandler,
  value,
}: ICustomDatePicker) => {
  const { theme } = useCustomThemeColors();
  const [date, setDate] = useState<string | Date>(
    value === null ? "" : new Date(value)
  );
  const [open, setOpen] = useState<boolean>(false);

  const getFormattedBirthDate = (dateProp: Date | string) => {
    //@ts-ignore
    if (typeof dateProp.getMonth === "function") {
      //@ts-ignore
      const day = dateProp.getDate();
      //@ts-ignore
      const month = dateProp.getMonth() + 1;
      //@ts-ignore
      const year = dateProp.getFullYear();

      return `${day}.${month}.${year}`;
    } else {
      return "your birth date";
    }
  };

  return (
    <View>
      <DatePicker
        modal
        mode={"date"}
        open={open}
        // @ts-ignore
        date={typeof date.getMonth === "function" ? date : new Date()}
        onConfirm={(date) => {
          setOpen(false);
          setDate(date);
          onDateChangeHandler(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
      <Text style={styles(theme).labelText}>{label}</Text>
      <View
        style={styles(theme).blockStyles}
        onTouchStart={() => setOpen(true)}
      >
        <Text style={styles(theme).birthdayText}>
          {date !== "" && "Born"} {getFormattedBirthDate(date)}
        </Text>
        <CalendarIcon style={styles(theme).iconStyles} fill={theme.grayText} />
      </View>
    </View>
  );
};

const styles = (theme: Ttheme) =>
  StyleSheet.create({
    labelText: {
      marginTop: 16,
      marginBottom: 8,
      color: theme.defaultTextColor,
      fontFamily: "SFProDisplay-Medium",
    },
    blockStyles: {
      position: "relative",
      width: "100%",
      backgroundColor: "transparent",
      height: 48,
      borderRadius: 48,
      paddingHorizontal: 20,
      paddingVertical: 13,
      borderWidth: 1,
      borderColor: theme.borderColor,
    },
    birthdayText: {
      color: theme.defaultTextColor,
      fontFamily: "SFProDisplay-Medium",
    },
    iconStyles: {
      position: "absolute",
      right: 20,
      top: 12,
    },
  });
