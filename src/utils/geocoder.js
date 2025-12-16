import geocoder from "node-geocoder";

const options = {
  provider: "openstreetmap",
  httpAdapter: "https",
  formatter: null,
};

const geo = geocoder(options);

export default geo;
