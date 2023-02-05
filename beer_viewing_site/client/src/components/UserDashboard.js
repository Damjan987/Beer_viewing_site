import React, { Fragment, useState, useEffect } from "react";
import { createCompany, getCompanies, deleteCompany } from "../api/company";
import { createBeer, getBeers, deleteBeer } from "../api/beer";
import isEmpty from "validator/lib/isEmpty";
import { showErrorMsg, showSuccessMsg } from "../helpers/message";
import { showLoading } from "../helpers/loading";

const UserDashboard = () => {
  const [companies, setCompanies] = useState(null);
  const [company, setCompany] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [beerData, setBeerData] = useState({
    beerImage: null,
    beerName: "",
    beerPrice: "",
    beerAlcoholPercentage: "",
    beerColor: "",
    beerType: "",
    beerCompany: "",
  });
  const [beers, setBeers] = useState(null);

  const {
    beerImage,
    beerName,
    beerPrice,
    beerAlcoholPercentage,
    beerColor,
    beerType,
    beerCompany,
  } = beerData;

  useEffect(() => {
    loadCompanies();
    loadBeers();
  }, [loading]);

  const loadCompanies = async () => {
    await getCompanies()
      .then((response) => {
        setCompanies(response.data.companies);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadBeers = async () => {
    await getBeers()
      .then((response) => {
        setBeers(response.data.beers);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <section>
      <div className="bg-dark text-white py-4">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h1>
                <i className="fas fa-home"> User Dashboard</i>
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-6">
          <ul className="list-group">
            <li className="list-group-item active">Beer Companies</li>
            {companies &&
              companies.map((c) => (
                <li
                  className="list-group-item d-flex justify-content-between align-items-center"
                  key={c._id}
                  value={c._id}
                >
                  {c.name}
                  <div className="col-6">
                    <a href={`/company/${c._id}`}>
                      <li className="badge badge-primary badge-pill">
                        Details
                      </li>
                    </a>
                  </div>
                </li>
              ))}
          </ul>
        </div>

        <div className="col-6">
          <ul className="list-group">
            <li className="list-group-item bg-warning">Beers</li>
            {beers &&
              beers.map((b) => (
                <li
                  className="list-group-item d-flex justify-content-between align-items-center"
                  key={b._id}
                  value={b._id}
                >
                  {b.name}
                  <div className="col-6">
                    <a href={`/beer/${b._id}`}>
                      <li className="badge badge-primary badge-pill">
                        Details
                      </li>
                    </a>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default UserDashboard;
