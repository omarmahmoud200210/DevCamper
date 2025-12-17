import geocoder from "node-geocoder";

const options = {
  provider: "openstreetmap",
  httpAdapter: "https",
  apiKey: "",
  formatter: null,
  email: "omar.mahmoud200210@gmail.com",
  userAgent: "DevCamper/1.0",
};

const geo = geocoder(options);

export default geo;
