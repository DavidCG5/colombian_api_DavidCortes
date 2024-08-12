import axios from "axios";

const BASE_URL = "https://api-colombia.com/api/v1";

export const fetchPresidents = async () => {
  const response = await axios.get(`${BASE_URL}/President`);
  return response.data;
};

export const fetchAirports = async () => {
  const response = await axios.get(`${BASE_URL}/Airport`);
  return response.data;
};

export const fetchAttractions = async () => {
  const response = await axios.get(`${BASE_URL}/TouristicAttraction`);
  return response.data;
};

export const fetchDepartments = async () => {
  const response = await axios.get(`${BASE_URL}/Department`);
  return response.data;
};

export const fetchRegions = async () => {
  const response = await axios.get(`${BASE_URL}/Region`);
  return response.data;
};
