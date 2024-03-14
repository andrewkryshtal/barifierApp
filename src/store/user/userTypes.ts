export interface IUserReducer {
  access_token: string;
  isAdmin: boolean;
  userId?: number;
  //type for instagram login
  user_id?: number;
  username: string;
  user_media?: IuserMediaObject[] | [];
  loggedIn?: boolean;
  fileName: string;
  showCheckIns?: boolean;
  showFavourites?: boolean;
  hideMyselfOnMap?: boolean;
  fullName?: string;
  birthDate?: Date | undefined;
}

export interface IuserMediaObject {
  id: number;
  media_type: string;
  media_url: string;
  timestamp: string;
  username: string;
}
