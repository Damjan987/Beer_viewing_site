import React, { useEffect, useState } from "react";
import { getBeer, updateBeer } from "../api/beer";
import { getCompany, updateCompany } from "../api/company";

const BeerEditForm = (props) => {
  const [name, setName] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [alcoholPercentage, setAlcoholPercentage] = React.useState("");
  const [color, setColor] = React.useState("");
  const [type, setType] = React.useState("");
  const [company, setCompany] = React.useState("");

  const beerId = props.match.params.beerId;

  useEffect(() => {
    getBeer(beerId).then((response) => {
      setName(response.data.name);
      setPrice(response.data.price);
      setAlcoholPercentage(response.data.alcoholPercentage);
      setColor(response.data.color);
      setType(response.data.type);
      setCompany(response.data.company);
    });
  }, []);

  const updateBeerData = async () => {
    updateBeer(beerId, {
      name: name,
      price: price,
      alcoholPercentage: alcoholPercentage,
      color: color,
      type: type,
      company: company,
    });
  };

  return (
    <div>
      <form onSubmit={updateBeerData}>
        <label className="col-sm-2 col-form-label">Update beer</label>
        <div className="col-sm-10">
          <input
            type="text"
            placeholder="Name"
            className="form-control"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />

          <input
            type="text"
            placeholder="Price"
            className="form-control"
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />

          <input
            type="text"
            placeholder="Alcohol percentage"
            className="form-control"
            value={alcoholPercentage}
            onChange={(e) => {
              setAlcoholPercentage(e.target.value);
            }}
          />

          <input
            type="text"
            placeholder="Color"
            className="form-control"
            value={color}
            onChange={(e) => {
              setColor(e.target.value);
            }}
          />

          <input
            type="text"
            placeholder="Type"
            className="form-control"
            value={type}
            onChange={(e) => {
              setType(e.target.value);
            }}
          />

          <input
            type="text"
            placeholder="Company"
            className="form-control"
            value={company}
            onChange={(e) => {
              setCompany(e.target.value);
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

export default BeerEditForm;
