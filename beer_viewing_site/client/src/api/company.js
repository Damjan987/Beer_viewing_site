import axios from "axios";

export const createCompany = async (formData) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await axios.post("/api/company", formData, config);

  return response;
};

export const getCompanies = async () => {
  const response = await axios.get("/api/company");

  return response;
};

export const getCompany = async (companyId) => {
  const response = await axios.get(`/api/company/${companyId}`);

  return response;
};

export const updateCompany = async (companyId, formData) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await axios.put(`/api/company/${companyId}`, formData);

  return response;
};

export const deleteCompany = async (companyId) => {
  const response = await axios.delete(`/api/company/${companyId}`);

  return response;
};
