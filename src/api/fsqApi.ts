import env from "../env";

const fecthWrapper = ({
  url,
  method = "GET",
  queryParams,
  basedOnLocationMethod = false,
}: Record<string, any>) => {
  const ll = "50.450001,30.523333";
  const options = {
    method,
    headers: {
      accept: "application/json",
      Authorization: env.fsqAuthToken,
    },
  };
  const query = new URLSearchParams(queryParams);
  const unparsedUrl =
    env.foursquareUrl +
    url +
    `?${query.toString()}${basedOnLocationMethod && `&ll=${ll}`}`;

  return fetch(unparsedUrl, options);
};

export const getBasicPlaceInfoFsq = (queryParams: any) =>
  fecthWrapper({
    url: "/search",
    queryParams,
    basedOnLocationMethod: true,
  }).then((response) => response.json());
