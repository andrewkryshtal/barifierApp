import { GeocodingObject } from "react-native-geocoder-reborn";

export interface IcoreReducer {
  pageIndex: number;
  locale: string;
  geolocationInfo: GeocodingObject | {};
  weatherInfo: Record<string, string> | {};
}
