import React, { useEffect, useState } from "react";
import { getBeer } from "../api/beer";
import { getCompany } from "../api/company";

const BeerDetails = (props) => {
  const beerId = props.match.params.beerId;
  const [beer, setBeer] = useState({});
  const [company, setCompany] = useState("");

  useEffect(() => {
    getBeer(beerId).then((response) => {
      setBeer(response.data);

      getCompany(response.data.company).then((response2) => {
        setCompany(response2.data.name);
      });
    });

  }, []);

  return (
    <div>
      <div className="card" style={{ width: "18rem" }}>
        <div className="card-body">
          <h5 className="card-title">Name</h5>
          <p className="card-text">{beer.name}</p>

          <h5 className="card-title">Price</h5>
          <p className="card-text">{beer.price}</p>

          <h5 className="card-title">Alcohol percentage</h5>
          <p className="card-text">{beer.alcoholPercentage}</p>

          <h5 className="card-title">Color</h5>
          <p className="card-text">{beer.color}</p>

          <h5 className="card-title">Type</h5>
          <p className="card-text">{beer.type}</p>

          <h5 className="card-title">Company</h5>
          <p className="card-text">{company}</p>
        </div>
      </div>
    </div>
  );
};

export default BeerDetails;
