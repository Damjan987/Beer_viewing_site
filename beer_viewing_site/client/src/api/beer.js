import axios from "axios";

export const createBeer = async (data) => {
  const response = await axios.post("/api/beer", data);

  return response;
};

export const getBeers = async () => {
  const response = await axios.get("/api/beer");

  return response;
};

export const getBeer = async (beerId) => {
  const response = await axios.get(`/api/beer/${beerId}`);

  return response;
};

export const updateBeer = async (beerId, formData) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await axios.put(`/api/beer/${beerId}`, formData);

  return response;
};

export const deleteBeer = async (beerId) => {
  const response = await axios.delete(`/api/beer/${beerId}`);

  return response;
};

// ---------------------------------------


export const getBeersByCompanyName = async (companyFilterName) => {
  console.log("odabrano ime je", companyFilterName);
  const response = await axios.get(`/api/beer/filter/${companyFilterName}`);

  return response;
};