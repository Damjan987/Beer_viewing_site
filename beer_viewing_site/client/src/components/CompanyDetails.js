import React, { useEffect, useState } from "react";
import { getCompany } from "../api/company";

const CompanyDetails = (props) => {
  const companyId = props.match.params.companyId;
  const [company, setCompany] = useState({});

  useEffect(() => {
      getCompany(companyId).then(response => {
          setCompany(response.data);
      })
  }, []);

  return (
    <div>
      <div className="card" style={{ width: "18rem" }}>
        <div className="card-body">
          <h5 className="card-title">Company name</h5>
          <p className="card-text">{company.name}</p>

          <h5 className="card-title">Country</h5>
          <p className="card-text">{company.country}</p>

          <h5 className="card-title">Description</h5>
          <p className="card-text">{company.description}</p>

          <h5 className="card-title">Year of creation</h5>
          <p className="card-text">{company.yearOfCreation}</p>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetails;
