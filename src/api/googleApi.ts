import env from "../env";

const fecthWrapper = ({
  url,
  method = "GET",
  queryParams,
}: Record<string, any>) => {
  const location = "50.450001,30.523333";
  const options = {
    method,
    headers: {
      accept: "application/json",
    },
  };
  const query = new URLSearchParams(queryParams);
  const unparsedUrl =
    env.googleUrl +
    url +
    `?${query.toString()}${`&location=${location}&key=${env.googleAuthToken}`}`;

  return fetch(unparsedUrl, options);
};

export const getBasicPlaceInfoGoogle = (queryParams: any) =>
  fecthWrapper({
    url: "/findplacefromtext/json",
    queryParams: { ...queryParams, inputtype: "textquery", radius: 500 },
  }).then((response) => response.json());

export const getDetailedPlaceInfoGoogle = (queryParams: any) =>
  fecthWrapper({
    url: "/details/json",
    queryParams: queryParams,
  }).then((response) => response.json());
