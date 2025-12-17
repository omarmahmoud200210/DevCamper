import geocoder from "node-geocoder";

const options = {
  provider: "openstreetmap",
  httpAdapter: "https",
  apiKey: "",
  formatter: null,
  email: "omar.mahmoud200210@gmail.com"
};

const geo = geocoder(options);

export default geo;
