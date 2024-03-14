export interface IFsqBarInterface {
  categories: Record<string, any>[];
  chains: Record<string, any>[];
  distance: number;
  fsq_id: string;
  geocodes: Record<string, any>;
  link: string;
  location: Record<string, any>;
  name: string;
  related_places: Record<string, any>;
  timezone: string;
}

export interface IGooglePhotoInterface {
  height: number;
  html_attributions: string[];
  photo_reference: string;
  width: number;
}

export interface IGoogleBarInterface {
  address_components: Record<string, any>[];
  adr_address: string;
  business_status: string;
  delivery: boolean;
  dine_in: boolean;
  formatted_address: string;
  formatted_phone_number: string;
  geometry: {
    location: Record<"lat" | "lng", any>[];
  };
  icon: string;
  icon_background_color: string;
  icon_mask_base_uri: string;
  international_phone_number: string;
  name: string;
  opening_hours: Record<string, any>[];
  photos: IGooglePhotoInterface[];
  place_id: string;
  plus_code: Record<string, any>;
  rating: number;
  reference: string;
  reviews: Record<string, any>[];
  types: string[];
  url: string;
  user_ratings_total: number;
  utc_offset: number;
  vicinity: string;
  website: string;
}

export interface IBarsReducer {
  fsqBars: IFsqBarInterface[];
  googleBars: IGoogleBarInterface[];
}
