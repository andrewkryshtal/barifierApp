import React, { useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { saveCurrentBar } from "../api/backendApi";
import {
  getBasicPlaceInfoGoogle,
  getDetailedPlaceInfoGoogle,
} from "../api/googleApi";
import { addGoogleFoundBars, clearAllBars } from "../store/bars/barsActions";
import { IGoogleBarInterface } from "../store/bars/barsTypes";
import { RootState } from "../store/store";

export const SearchBarScreen = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const dispatch = useDispatch();
  const allGoogleBars = useSelector<RootState, IGoogleBarInterface[]>(
    ({ barsReducer }) => barsReducer.googleBars
  );

  const onPressHandler = async () => {
    dispatch(clearAllBars());
    getBasicPlaceInfoGoogle({
      input: inputValue,
    })
      .then(async (response) => {
        const barsArray = [];

        for (const { place_id } of response.candidates) {
          try {
            const detailedInfo = await getDetailedPlaceInfoGoogle({
              place_id,
            });
            barsArray.push(detailedInfo.result);
          } catch (e) {
            console.log({ e });
          }
        }
        dispatch(
          addGoogleFoundBars(barsArray as unknown as IGoogleBarInterface[])
        );
      })
      .catch((e) => {
        console.log({ e });
      });

    // getBasicPlaceInfoFsq({
    //   query: inputValue,
    // })
    //   .then((response) => {
    //     console.log({ response: response.results });

    //     dispatch(addFoundBars(response.results));
    //   })
    //   .catch((err) => console.error({ err }));
  };

  const onItemPressHandler = (item: IGoogleBarInterface) => {
    saveCurrentBar(item)
      .then((data) => console.log({ data123: data }))
      .catch((e) => console.log({ e }));
  };

  return (
    <>
      <TextInput onChangeText={setInputValue} value={inputValue} />
      <Button color={"grey"} title={"search bars"} onPress={onPressHandler} />
      {allGoogleBars.map((item, index) => (
        <TouchableOpacity onPress={() => onItemPressHandler(item)}>
          <View style={styles.itemWrapper}>
            <View style={styles.leftBlock}>
              <Text>{index + 1}</Text>
            </View>
            <View>
              <Text>{item.name}</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  itemWrapper: {
    width: "100%",
    height: 40,
    flexDirection: "row",
  },
  leftBlock: {
    width: "10%",
    borderWidth: 1,
    borderColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
});
