import { DarkTheme, DefaultTheme, Theme } from "@react-navigation/native";

export interface Ithemes {
  lightTheme: Ttheme;
  darkTheme: Ttheme;
}

export type Ttheme = Theme & {
  linearGradient: string;
  pageColor: string;
  grey1: string;
  menuActiveColor: string;
  textColor: string;
  defaultTextColor: string;
  secondaryDefaultTextColor: string;
  lightTextColor: string;
  borderColor: string;
  headerIconColor: string;
  profileButtonBg: string;
  tabSwitcherBgColor: string;
  tabActiveColor: string;
  dark: boolean;
  blueButton: string;
  grayButton: string;
  grayText: string;
  cardBackground: string;
  textButtonInfo: string;
  textButtonRoute: string;
  textOpenTo: string;
  iconCircleTakeRoute: string;
  iconFillMoreInfo: string;
  iconCalendarOpen: string;
  iconStrokeStarFavorites: string;
  iconFillStarFavorites: string;
  warningLight: string;
  warningText: string
};

export const themes: Ithemes = {
  lightTheme: {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: "#ffffff",
    },
    linearGradient: "rgba(255,255,255,0)",
    pageColor: "#ffffff",
    grey1: "#EFEFF5",
    menuActiveColor: "#FFFFFF",
    textColor: "#15AABF",
    defaultTextColor: "#000000",
    secondaryDefaultTextColor: "#868E96",
    lightTextColor: "rgba(0, 0, 0, 0.6);",
    borderColor: "rgba(0, 0, 0, 0.06)",
    headerIconColor: "#495057",
    profileButtonBg: "rgba(239, 239, 245, 0.5)",
    tabSwitcherBgColor: "rgba(118, 118, 128, 0.12)",
    tabActiveColor: '#FFFFFF',
    dark: false,
    blueButton: "#15AABF",
    grayButton: "#E9ECEF",
    grayText: "#868E96",
    cardBackground: "#FFFFFF",
    textButtonInfo: "#343A40",
    textButtonRoute: "#ffffff",
    textOpenTo: "#000000",
    iconCircleTakeRoute: "#FFFFFF",
    iconFillMoreInfo: "#495057",
    iconCalendarOpen: "#FFFFFF",
    iconStrokeStarFavorites: "#ADB5BD",
    iconFillStarFavorites: "#F7D001",
    warningLight: "#FFE1E1",
    warningText: "#FA5252"
  },
  darkTheme: {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      background: "#212529",
    },
    linearGradient: "rgba(0,0,0,0)",
    pageColor: "#212529",
    grey1: "#676C71",
    menuActiveColor: "#495057",
    textColor: "#3BC9DB",
    defaultTextColor: "#ffffff",
    secondaryDefaultTextColor: "##ADB5BD",
    lightTextColor: "rgba(255, 255, 255, 0.6);",
    borderColor: "rgba(255, 255, 255, 0.08)",
    headerIconColor: "#fff",
    profileButtonBg: "rgba(103, 108, 113, 0.26)",
    tabSwitcherBgColor: "rgba(118, 118, 128, 0.24)",
    tabActiveColor: '#636366',
    dark: true,
    blueButton: "#15AABF",
    grayButton: "#495057",
    grayText: "#868E96",
    cardBackground: "#343A40",
    textButtonInfo: "#F8F9FA",
    textButtonRoute: "#000005",
    textOpenTo: "#FFFFFF",
    iconCircleTakeRoute: "#000005",
    iconFillMoreInfo: "#F8F9FA",
    iconCalendarOpen: "#000005",
    iconStrokeStarFavorites: "#ADB5BD",
    iconFillStarFavorites: "#F7D001",
    warningLight: "#FFE1E1",
    warningText: "#FA5252"
  },
};

export const mapThemes = {
  lightTheme: [
    {
      elementType: "geometry",
      stylers: [
        {
          color: "#f5f5f5",
        },
      ],
    },
    {
      elementType: "labels.icon",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#616161",
        },
      ],
    },
    {
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#f5f5f5",
        },
      ],
    },
    {
      featureType: "administrative.land_parcel",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#bdbdbd",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "geometry",
      stylers: [
        {
          color: "#eeeeee",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#757575",
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [
        {
          color: "#e5e5e5",
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#9e9e9e",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [
        {
          color: "#ffffff",
        },
      ],
    },
    {
      featureType: "road.arterial",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#757575",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [
        {
          color: "#dadada",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#616161",
        },
      ],
    },
    {
      featureType: "road.local",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#9e9e9e",
        },
      ],
    },
    {
      featureType: "transit.line",
      elementType: "geometry",
      stylers: [
        {
          color: "#e5e5e5",
        },
      ],
    },
    {
      featureType: "transit.station",
      elementType: "geometry",
      stylers: [
        {
          color: "#eeeeee",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [
        {
          color: "#c9c9c9",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#9e9e9e",
        },
      ],
    },
  ],
  darkTheme: [
    {
      elementType: "geometry",
      stylers: [
        {
          color: "#212121",
        },
      ],
    },
    {
      elementType: "labels.icon",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#757575",
        },
      ],
    },
    {
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#212121",
        },
      ],
    },
    {
      featureType: "administrative",
      elementType: "geometry",
      stylers: [
        {
          color: "#757575",
        },
      ],
    },
    {
      featureType: "administrative.country",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#9e9e9e",
        },
      ],
    },
    {
      featureType: "administrative.land_parcel",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "administrative.locality",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#bdbdbd",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#757575",
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [
        {
          color: "#181818",
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#616161",
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#1b1b1b",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#2c2c2c",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#8a8a8a",
        },
      ],
    },
    {
      featureType: "road.arterial",
      elementType: "geometry",
      stylers: [
        {
          color: "#373737",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [
        {
          color: "#3c3c3c",
        },
      ],
    },
    {
      featureType: "road.highway.controlled_access",
      elementType: "geometry",
      stylers: [
        {
          color: "#4e4e4e",
        },
      ],
    },
    {
      featureType: "road.local",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#616161",
        },
      ],
    },
    {
      featureType: "transit",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#757575",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [
        {
          color: "#000000",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#3d3d3d",
        },
      ],
    },
  ],
};
