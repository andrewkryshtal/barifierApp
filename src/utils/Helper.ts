import { Platform } from "react-native";

export const distancePointToPoint = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) => {
  let radiusEarth = 6371000; // 6,371km in meters
  let dLat = deg2rad(lat2 - lat1); // deg2rad below
  let dLon = deg2rad(lon2 - lon1);
  let a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return radiusEarth * c; // Distance in meters
};

const deg2rad = (deg: number) => deg * (Math.PI / 180);

export const createFormData = (photo: any, body: any = {}) => {
  const data = new FormData();

  data.append("photo", {
    name: photo.fileName,
    type: photo.type,
    uri: Platform.OS === "ios" ? photo.uri.replace("file://", "") : photo.uri,
  });

  Object.keys(body).forEach((key) => {
    data.append(key, body[key]);
  });

  return data;
};
