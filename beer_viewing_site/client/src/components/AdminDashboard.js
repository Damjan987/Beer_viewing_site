import React, { Fragment, useState, useEffect } from "react";
import { createCompany, getCompanies, deleteCompany } from "../api/company";
import {
  createBeer,
  getBeers,
  deleteBeer,
  getBeersByCompanyName,
} from "../api/beer";
import isEmpty from "validator/lib/isEmpty";
import { showErrorMsg, showSuccessMsg } from "../helpers/message";
import { showLoading } from "../helpers/loading";
import { getBasicUsers } from "../api/auth";

const AdminDashboard = () => {
  const [companies, setCompanies] = useState(null);
  const [basicUsers, setBasicUsers] = useState(null);
  const [company, setCompany] = useState({
    companyName: "",
    companyCountry: "",
    companyDescription: "",
    companyYearOfCreation: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [companyFilterName, setCompanyFilterName] = useState("");
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

  const {
    companyName,
    companyCountry,
    companyDescription,
    companyYearOfCreation,
  } = company;

  useEffect(() => {
    loadCompanies();
    loadBeers();
    loadBasicUsers();
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
        setBeers(response.data.beers.sort(sortOn("name")));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadBasicUsers = async () => {
    await getBasicUsers()
      .then((response) => {
        setBasicUsers(response.data.users);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function sortOn(property) {
    return function (a, b) {
      if (a[property] < b[property]) {
        return -1;
      } else if (a[property] > b[property]) {
        return 1;
      } else {
        return 0;
      }
    };
  }

  const handleMessages = (evt) => {
    setErrorMsg("");
    setSuccessMsg("");
  };

  const handleCompanyChange = (evt) => {
    setErrorMsg("");
    setSuccessMsg("");
    // setCompany(evt.target.value);
    setCompany({
      ...company,
      [evt.target.name]: evt.target.value,
    });
  };

  // const handleCompanySubmit = (evt) => {
  //   evt.preventDefault();

  //   if (isEmpty(company)) {
  //     setErrorMsg("Please enter a company name");
  //   } else {
  //     const data = { company };

  //     setLoading(true);
  //     createCompany(data)
  //       .then((response) => {
  //         setLoading(false);
  //         setSuccessMsg(response.data.successMessage);
  //         setCompany("");
  //       })
  //       .catch((err) => {
  //         setLoading(false).setErrorMsg(err.response.data.errorMessage);
  //       });
  //   }
  // };

  const handleCompanySubmit = (evt) => {
    evt.preventDefault();

    if (
      isEmpty(companyName) ||
      isEmpty(companyCountry) ||
      isEmpty(companyDescription) ||
      isEmpty(companyYearOfCreation)
    ) {
      setErrorMsg("All fields are required");
    } else {
      // success
      let formData = new FormData();

      formData.append("companyName", companyName);
      formData.append("companyCountry", companyCountry);
      formData.append("companyDescription", companyDescription);
      formData.append("companyYearOfCreation", companyYearOfCreation);

      createCompany(formData)
        .then((response) => {
          setCompany({
            companyName: "",
            companyCountry: "",
            companyDescription: "",
            companyYearOfCreation: "",
          });
          setSuccessMsg(response.data.successMessage);
        })
        .catch((err) => {
          console.log(err);
          setErrorMsg(err.response.data.errorMessage);
        });
    }
  };

  const handleBeerImage = (evt) => {
    setBeerData({
      ...beerData,
      [evt.target.name]: evt.target.files[0],
    });
  };

  const handleBeerChange = (evt) => {
    setBeerData({
      ...beerData,
      [evt.target.name]: evt.target.value,
    });
  };

  const handleFilterChange = (evt) => {
    setCompanyFilterName(evt.target.value);
  };

  const handleCompanyNameFilterSubmit = async (evt) => {
    evt.preventDefault();

    // setCompanyFilterName(evt.target.value);

    const data = { companyFilterName };

    console.log(data);

    await getBeersByCompanyName(companyFilterName)
      .then((response) => {
        setBeers(response.data.beers);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleBeerSubmit = (evt) => {
    evt.preventDefault();

    if (beerImage === null) {
      setErrorMsg("Please select an image");
    } else if (
      isEmpty(beerName) ||
      isEmpty(beerPrice) ||
      isEmpty(beerAlcoholPercentage) ||
      isEmpty(beerColor) ||
      isEmpty(beerType)
    ) {
      setErrorMsg("All fields are required");
    } else if (isEmpty(beerCompany)) {
      setErrorMsg("Please select a beer company");
    } else {
      // success
      let formData = new FormData();

      formData.append("beerImage", beerImage);
      formData.append("beerName", beerName);
      formData.append("beerPrice", beerPrice);
      formData.append("beerAlcoholPercentage", beerAlcoholPercentage);
      formData.append("beerColor", beerColor);
      formData.append("beerType", beerType);
      formData.append("beerCompany", beerCompany);

      createBeer(formData)
        .then((response) => {
          setBeerData({
            beerImage: null,
            beerName: "",
            beerPrice: "",
            beerAlcoholPercentage: "",
            beerColor: "",
            beerType: "",
            beerCompany: "",
          });
          setSuccessMsg(response.data.successMessage);
        })
        .catch((err) => {
          console.log(err);
          setErrorMsg(err.response.data.errorMessage);
        });
    }
  };

  return (
    <section>
      <div className="bg-dark text-white py-4">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h1>
                <i className="fas fa-home"> Admin Dashboard</i>
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-light my-2">
        <div className="container">
          <div className="row pb-3">
            <div className="col-md-6 my-1">
              <button
                className="btn btn-outline-info btn-block"
                data-toggle="modal"
                data-target="#addCompanyModal"
              >
                <i className="fas fa-plus">+ Add Beer Company</i>
              </button>
            </div>

            <div className="col-md-6 my-1">
              <button
                className="btn btn-outline-warning btn-block"
                data-toggle="modal"
                data-target="#addBeerModal"
              >
                <i className="fas fa-plus">+ Add beer</i>
              </button>
            </div>

            {/* damjan */}
            <div hidden className="col-md-6 my-1">
              <form onSubmit={handleCompanyNameFilterSubmit}>
                <select
                  className="custom-select mr-sm-2"
                  name="companyFilterName"
                  onChange={handleFilterChange}
                >
                  {/* <option>Choose one...</option> */}
                  {companies &&
                    companies.map((c) => (
                      <option key={c._id} value={c._id}>
                        {c.name}
                      </option>
                    ))}
                </select>
                <button type="submit" className="btn btn-info">
                  Filter
                </button>
              </form>
            </div>
            {/* damjan */}
          </div>
        </div>
      </div>

      <div id="addCompanyModal" className="modal" onClick={handleMessages}>
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <form onSubmit={handleCompanySubmit}>
              <div className="modal-header bg-info text-white">
                <h5 className="modal-title">Add company</h5>
                <button className="close" data-dismiss="modal">
                  <span>X</span>
                </button>
              </div>
              <div className="modal-body my-2">
                {errorMsg && showErrorMsg(errorMsg)}
                {successMsg && showSuccessMsg(successMsg)}

                {loading ? (
                  <div className="text-secondary">{showLoading()}</div>
                ) : (
                  <Fragment>
                    <div className="form-group">
                      <label className="text-secondary">Company name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="companyName"
                        onChange={handleCompanyChange}
                      />
                    </div>

                    <div className="form-group">
                      <label className="text-secondary">Country</label>
                      <input
                        type="text"
                        className="form-control"
                        name="companyCountry"
                        onChange={handleCompanyChange}
                      />
                    </div>

                    <div className="form-group">
                      <label className="text-secondary">Description</label>
                      <input
                        type="text"
                        className="form-control"
                        name="companyDescription"
                        onChange={handleCompanyChange}
                      />
                    </div>

                    <div className="form-group">
                      <label className="text-secondary">Year of creation</label>
                      <input
                        type="text"
                        className="form-control"
                        name="companyYearOfCreation"
                        onChange={handleCompanyChange}
                      />
                    </div>
                  </Fragment>
                )}
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" data-dismiss="modal">
                  Close
                </button>
                <button type="submit" className="btn btn-info">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div id="addBeerModal" className="modal" onClick={handleMessages}>
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <form onSubmit={handleBeerSubmit}>
              <div className="modal-header bg-warning text-white">
                <h5 className="modal-title">Add beer</h5>
                <button className="close" data-dismiss="modal">
                  <span>X</span>
                </button>
              </div>
              <div className="modal-body my-2">
                {errorMsg && showErrorMsg(errorMsg)}
                {successMsg && showSuccessMsg(successMsg)}

                {loading ? (
                  <div className="text-secondary">{showLoading()}</div>
                ) : (
                  <Fragment>
                    <div className="custom-file" mb-2>
                      <input
                        type="file"
                        className="custom-file-input"
                        name="beerImage"
                        onChange={handleBeerImage}
                      />
                      <label className="custom-file-label">Choose file</label>
                    </div>

                    <div className="form-group">
                      <label className="text-secondary">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="beerName"
                        onChange={handleBeerChange}
                      />
                    </div>

                    <div className="form-group">
                      <label className="text-secondary">Price</label>
                      <input
                        type="text"
                        className="form-control"
                        name="beerPrice"
                        onChange={handleBeerChange}
                      />
                    </div>

                    <div className="form-group">
                      <label className="text-secondary">
                        Alcohol percentage
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="beerAlcoholPercentage"
                        onChange={handleBeerChange}
                      />
                    </div>

                    <div className="form-group">
                      <label className="text-secondary">Color</label>
                      <input
                        type="text"
                        className="form-control"
                        name="beerColor"
                        onChange={handleBeerChange}
                      />
                    </div>

                    <div className="form-group">
                      <label className="text-secondary">Type</label>
                      <input
                        type="text"
                        className="form-control"
                        name="beerType"
                        onChange={handleBeerChange}
                      />
                    </div>

                    <div className="form-row">
                      <div className="form-group col-md-6">
                        <label className="text-secondary">Beer company</label>
                        <select
                          className="custom-select mr-sm-2"
                          name="beerCompany"
                          onChange={handleBeerChange}
                        >
                          <option>Choose one...</option>
                          {companies &&
                            companies.map((c) => (
                              <option key={c._id} value={c._id}>
                                {c.name}
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>
                  </Fragment>
                )}
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" data-dismiss="modal">
                  Close
                </button>
                <button type="submit" className="btn btn-warning text-white">
                  Submit
                </button>
              </div>
            </form>
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
                    <a href={`/company/edit/${c._id}`}>
                      <li className="badge badge-primary badge-pill">Edit</li>
                    </a>
                    <li
                      className="badge badge-primary badge-pill"
                      onClick={() => deleteCompany(c._id)}
                    >
                      Delete
                    </li>
                  </div>
                </li>
              ))}
          </ul>
        </div>

        {/* ---------------------------------------------------- */}
        <div className="col-6">
          <ul className="list-group">
            <li className="list-group-item active">Basic users</li>
            {basicUsers &&
              basicUsers.map((u) => (
                <li
                  className="list-group-item d-flex justify-content-between align-items-center"
                  key={u._id}
                  value={u._id}
                >
                  {u.username}
                </li>
              ))}
          </ul>
        </div>
        {/* ---------------------------------------------------- */}

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
                    <a href={`/beer/edit/${b._id}`}>
                      <li className="badge badge-primary badge-pill">Edit</li>
                    </a>
                    <li
                      className="badge badge-primary badge-pill"
                      onClick={() => deleteBeer(b._id)}
                    >
                      Delete
                    </li>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
