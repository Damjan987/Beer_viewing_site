import React, { useEffect, useState } from "react";
import { getCompany, updateCompany } from "../api/company";

const CompanyEditForm = (props) => {
  const [name, setName] = React.useState("");
  const [country, setCountry] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [yearOfCreation, setYearOfCreation] = React.useState("");

  const companyId = props.match.params.companyId;

  useEffect(() => {
    getCompany(companyId).then((response) => {
      setName(response.data.name);
      setCountry(response.data.country);
      setDescription(response.data.description);
      setYearOfCreation(response.data.yearOfCreation);
    });
  }, []);

  const updateCompanyData = async () => {
    updateCompany(companyId, {
      name: name,
      country: country,
      description: description,
      yearOfCreation,
      yearOfCreation,
    });
  };

  return (
    <div>
      <form onSubmit={updateCompanyData}>
        <label className="col-sm-2 col-form-label">Update beer company</label>
        <div className="col-sm-10">
          <input
            type="text"
            placeholder="Company name"
            className="form-control"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />

          <input
            type="text"
            placeholder="Country"
            className="form-control"
            value={country}
            onChange={(e) => {
              setCountry(e.target.value);
            }}
          />

          <input
            type="text"
            placeholder="Description"
            className="form-control"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />

          <input
            type="text"
            placeholder="Year of creation"
            className="form-control"
            value={yearOfCreation}
            onChange={(e) => {
              setYearOfCreation(e.target.value);
            }}
          />
          <br></br>
          <div class="form-group row">
            <div class="col-sm-10">
              <button type="submit" class="btn btn-primary">
                Update
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CompanyEditForm;
