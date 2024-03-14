import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import Geolocation, {
  GeolocationResponse,
} from "@react-native-community/geolocation";
import { Ttheme } from "../themes";
import { useCustomThemeColors } from "../hooks/useCustomThemeColors";
import { shadowBoxGenerator } from "../utils/shadowBoxGenerator";
import { distancePointToPoint } from "../utils/Helper";
import { useTranslation } from "react-i18next";
// @ts-ignore
import StarRate from "../media/svg/StarRate.svg";
// @ts-ignore
import StarFavorites from "../media/svg/StarFavorites.svg";
// @ts-ignore
import ArrowLocate from "../media/svg/ArrowLocate.svg";
// @ts-ignore
import Calendar from "../media/svg/Calendar.svg";
// @ts-ignore
import LocationNorthCircle from "../media/svg/LocationNorthCircle.svg";
// @ts-ignore
import ArrowMoreInfo from "../media/svg/ArrowMoreInfo.svg";
import { IGoogleBarInterface } from "../store/bars/barsTypes";
import env from "../env";
import { FlashList } from "@shopify/flash-list";
import { ButtonTypes, CustomButton } from "./CustomButton";

interface IBarCard {
  bar: IGoogleBarInterface;
}

export const BarCard = ({ bar }: IBarCard) => {
  const dimentions = useWindowDimensions();
  const { t } = useTranslation("barCardTranslation");
  const { theme } = useCustomThemeColors();
  const [currentPosition, setCurrentPosition] =
    useState<null | GeolocationResponse>(null);
  const [images, setImages] = useState([]);
  const [isFilled, setIsFilled] = useState(false);
  const filledStar = () => setIsFilled(!isFilled);

  const barArr = {
    name: bar.name,
    rate: bar.rating,
    id: bar.place_id,
    // @ts-ignore
    days: bar.opening_hours[0]?.periods,
    photos: bar.photos,
    // @ts-ignore
    latBar: bar.geometry.location.lat,
    // @ts-ignore
    lonBar: bar.geometry.location.lng,
  };

  useEffect(() => {
    Geolocation.getCurrentPosition(setCurrentPosition);
    fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${barArr.id}&fields=photo&key=${env.googleAuthToken}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.result?.photos) {
          setImages(
            data.result.photos.map(
              (photo: { photo_reference: string }) =>
                `https://maps.googleapis.com/maps/api/place/photo?maxwidth=128&photoreference=${photo.photo_reference}&key=${env.googleAuthToken}`
            )
          );
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [barArr.id, env.googleAuthToken]);

  const userGeo = {
    latUser: currentPosition?.coords.latitude,
    lonUser: currentPosition?.coords.longitude,
  };

  const distanceToBar = () => {
    let latUser = Number(userGeo.latUser);
    let lonUser = Number(userGeo.lonUser);
    let result = distancePointToPoint(
      latUser,
      lonUser,
      barArr.latBar,
      barArr.lonBar
    );
    if (result > 1000) {
      let kilometers = result / 1000;
      if (kilometers > 10) {
        return t("soFar");
      } else {
        let str = String(kilometers);
        return `${str.slice(0, 3)} ${t("km")}`;
      }
    } else return `${Math.round(result)} ${t("meters")}`;
  };

  const hours = String(new Date().getHours()) + "00";
  const day = new Date().getDay();

  const barOpenTime = () => {
    if (barArr.days) {
      if (hours >= barArr.days[day]?.open.time) {
        return `${t("openTo")} ${barArr.days[day]?.close.time.slice(
          0,
          2
        )}:${barArr.days[day]?.close.time.slice(2)}`;
      } else return t("todayClosed");
    } else null;
  };

  return (
    <View style={[styles(theme).container, { width: dimentions.width - 48 }]}>
      <View>
        <View style={styles(theme).spans}>
          <Text style={styles(theme).barTitle}>{barArr.name}</Text>
          <TouchableOpacity onPress={filledStar}>
            <StarFavorites
              style={styles(theme).starFavorite}
              strokeWidth="2"
              stroke={
                isFilled
                  ? theme.iconFillStarFavorites
                  : theme.iconStrokeStarFavorites
              }
              fill={isFilled ? theme.iconFillStarFavorites : null}
            />
          </TouchableOpacity>
        </View>
        <View style={styles(theme).rateAndLocate}>
          {barArr.rate ? (
            <View style={styles(theme).spanRate}>
              <StarRate />
              <Text style={styles(theme).fontGray}>{barArr.rate} / 5</Text>
            </View>
          ) : null}
          <View style={styles(theme).spanRoute}>
            <ArrowLocate />
            <Text style={styles(theme).fontGray}> {distanceToBar()}</Text>
          </View>
        </View>
      </View>
      <View style={styles(theme).imageScroll}>
        <FlashList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={images}
          renderItem={({ item }) => (
            <Image
              source={{ uri: env.isProd ? item : undefined }}
              style={styles(theme).images}
            />
          )}
          estimatedItemSize={128}
          ListEmptyComponent={
            <Image
              source={require("../media/png/BarImages.png")}
              style={styles(theme).images}
            />
          }
        />
      </View>
      <View style={styles(theme).calendar}>
        <Calendar fill={theme.blueButton} />
        <Text style={styles(theme).textOpenTo}>
          {barOpenTime() ? barOpenTime() : t("undefined")}
        </Text>
      </View>
      <View style={styles(theme).buttonSpan}>
        <CustomButton
          Icon={LocationNorthCircle}
          onPressHandler={() => console.log("Take Route - Primary button")}
          type={ButtonTypes.primary}
          buttonText={t("takeRoute")}
          containerStyles={{ width: "48,5%" }}
        />
        <CustomButton
          Icon={ArrowMoreInfo}
          onPressHandler={() => console.log("More Info - Secondary button")}
          type={ButtonTypes.secondary}
          buttonText={t("moreInfo")}
          containerStyles={{ width: "48,5%" }}
        />
      </View>
    </View>
  );
};

const styles = (theme: Ttheme) =>
  StyleSheet.create({
    container: {
      marginVertical: 22,
      marginHorizontal: 24,
      height: 335,
      padding: 23,
      borderRadius: 24,
      backgroundColor: theme.cardBackground,
      ...shadowBoxGenerator({
        shadowColorAndroid: "#171717",
        shadowColorIos: "#171717",
        shadowOpacity: 0.3,
        shadowRadius: 13,
        yOffset: 14,
        xOffset: 0,
      }),
    },
    spans: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    barTitle: {
      color: theme.defaultTextColor,
      fontFamily: "SFProDisplay-Bold",
      fontSize: 20,
      fontWeight: "700",
    },
    starFavorite: {
      marginLeft: 13,
    },
    rateAndLocate: {
      paddingTop: 6,
      width: 170,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
    },
    spanRate: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginRight: 13,
    },
    spanRoute: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    fontGray: {
      fontFamily: "SFProDisplay-Bold",
      fontSize: 12,
      fontWeight: "400",
      letterSpacing: -0.08,
      color: theme.grayText,
      marginLeft: 4,
    },
    imageScroll: {
      height: 138,
      width: "100%",
      paddingTop: 10,
    },
    images: {
      width: 128,
      height: 128,
      borderRadius: 12,
      marginRight: 8,
    },
    barImage: {
      height: 128,
      width: 178,
      borderRadius: 12,
      marginRight: 8,
    },
    calendar: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
      marginTop: 13,
      margin: 3,
    },
    textOpenTo: {
      fontFamily: "SFProDisplay-Bold",
      color: theme.textOpenTo,
      fontSize: 15,
      fontWeight: "400",
      letterSpacing: -0.24,
      marginLeft: 8,
    },
    buttonSpan: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingTop: 18,
    },
  });
