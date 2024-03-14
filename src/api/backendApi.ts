import env from "../env";
import { IGoogleBarInterface } from "../store/bars/barsTypes";
import { IuserMediaObject, IUserReducer } from "../store/user/userTypes";

export interface IweatherJSON {
  description: string;
  humidity: number;
  pressure: number;
  rain: number;
  temp: number;
  weathercode: number;
}

export interface IuserInstagramPicturesData {
  userId: number;
  user_media: IuserMediaObject[];
}

const fetchWrapper = ({
  url,
  method = "GET",
  data,
  contentType = "application/json",
  query = "",
}: any): Promise<Response> => {
  const options = {
    method,
    headers: {
      accept: "application/json",
      "Content-Type": contentType,
    },
    body: contentType !== "multipart/form-data" ? JSON.stringify(data) : data,
  };
  const urlWithQuery =
    env.backendUrl +
    url +
    (query !== "" ? `?${new URLSearchParams(query).toString()}` : "");

  console.log({ urlWithQuery });

  return fetch(urlWithQuery, options);
};

export const checkUserUserEndpoint = (
  data: IUserReducer
): Promise<{ newUser: boolean; user: IUserReducer }> =>
  fetchWrapper({ url: "/user/checkUser", method: "POST", data }).then(
    (response: any) => response.json()
  );

export const registerUserWithAvatar = (body: FormData) =>
  fetchWrapper({
    url: "/user/registerWithAvatar",
    method: "POST",
    contentType: `multipart/form-data`,
    data: body,
  })
    .then()
    .catch((e) => console.log({ e }));

export const uploadAvatar = (body: FormData) =>
  fetchWrapper({
    url: "/user/uploadAvatar",
    method: "POST",
    contentType: "multipart/form-data",
    data: body,
  })
    .then((data) => data.json())
    .catch((e) => {
      throw e;
    });

export const deleteAvatar = (data: Record<string, any>) =>
  fetchWrapper({
    url: "/user/deleteAvatar",
    method: "POST",
    data,
  })
    .then((data) => data.json())
    .catch((e) => {
      throw e;
    });

export const saveCurrentBar = (data: IGoogleBarInterface) =>
  fetchWrapper({ url: "/bar/postBar", method: "POST", data }).then((response) =>
    response.json()
  );

export const getWeather = (data: Record<string, string | null>) =>
  fetchWrapper({
    url: "/weather/getWeather",
    method: "POST",
    data,
  }).then((response) => response.json());

export const getAllBars = () =>
  fetchWrapper({
    url: "/bar/getAllBars",
    method: "GET",
  }).then((data) => data.json());

export const postUserInstagramPictures = (data: IuserInstagramPicturesData) =>
  fetchWrapper({
    url: "/user/saveUserMedia",
    method: "POST",
    data,
  }).catch((e) => console.log({ e }));

export const updateUserSettingsEndpoint = (data: Record<string, any>) => {
  fetchWrapper({
    url: "/user/updateUserSettings",
    method: "POST",
    data,
  })
    .then((data) => {
      return data.json();
    })
    .catch((e) => {
      throw e;
    });
};

export const getAllFriendsEndpoint = (userId: number) =>
  fetchWrapper({
    url: "/friend/getAllFriends",
    query: { userId },
    method: "GET",
  })
    .then((data) => data.json())
    .catch((e) => console.log({ e }));

export const addNewFriend = (data: Record<string, string>) =>
  fetchWrapper({
    url: "/friend/addFriend",
    method: "POST",
    data: data,
  });

export const getUser = (data: Record<string, any>) =>
  fetchWrapper({
    url: "/user/getUser",
    query: { userId: data.userId },
    method: "GET",
  });
