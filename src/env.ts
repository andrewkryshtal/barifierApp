const variablesInstance = {
  LOCAL_ENV: {
    backendUrl: "http://127.0.0.1:3000",
    socketUrl: "http://127.0.0.1:3002",
    filesUrl: "http://127.0.0.1:3000/files/",
    foursquareUrl: "https://api.foursquare.com/v3/places",
    googleUrl: "https://maps.googleapis.com/maps/api/place",
    fsqAuthToken: "fsq3m3pbTqmhxhZWXjehq6EZxaz1gJBq9r9v9u/s1tSCUtI=",
    googleAuthToken: "AIzaSyARfNjiGix0is_ecu9r74U2eYpV7HAbznE",
    deeplinkUrlScheme: "brfrapp://",
    isProd: false,
  },
  PROD_ENV: {
    backendUrl: "http://18.225.35.74:3000", // change this and add stage if needed
    socketUrl: "http://18.225.35.74:3002", // change this and add stage if needed
    filesUrl: "http://18.225.35.74:3000/files/", // change this and add stage if needed
    foursquareUrl: "https://api.foursquare.com/v3/places",
    googleUrl: "https://maps.googleapis.com/maps/api/place",
    fsqAuthToken: "fsq3m3pbTqmhxhZWXjehq6EZxaz1gJBq9r9v9u/s1tSCUtI=",
    googleAuthToken: "AIzaSyARfNjiGix0is_ecu9r74U2eYpV7HAbznE",
    deeplinkUrlScheme: "brfrapp://",
    isProd: true,
  },
  DEVICE_LOCAL_ENV: {
    backendUrl: "http://192.168.0.13:3000",
    socketUrl: "http://192.168.0.13:3002",
    filesUrl: "http://192.168.0.13:3000/files/",
    foursquareUrl: "https://api.foursquare.com/v3/places",
    googleUrl: "https://maps.googleapis.com/maps/api/place",
    fsqAuthToken: "fsq3m3pbTqmhxhZWXjehq6EZxaz1gJBq9r9v9u/s1tSCUtI=",
    googleAuthToken: "AIzaSyARfNjiGix0is_ecu9r74U2eYpV7HAbznE",
    deeplinkUrlScheme: "brfrapp://",
    isProd: false,
  },
};

export default variablesInstance["LOCAL_ENV"];
