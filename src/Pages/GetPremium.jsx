import React from "react";
import HomeNavbar from "../Components/Home/HomeNavbar";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
function GetPremium() {
  return (
    <div><HomeNavbar />
    <div className="AboutusHeader">Personal Details</div>
    <div className="container my-4 User_Details_section">
      <form>
        <div className="row">
          <div className="col-xl-4 col-lg-4 col-md-6 col-12 mb-3">
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                className="form-control "
                placeholder="Enter Full Name"
              />
            </div>
            <p className="text-danger" style={{ fontSize: "14px" }}>
              {" "}
              *Full Name in Capital Letters
            </p>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-12 mb-3">
            <div className="form-group">
              <label>Business Name</label>
              <input
                type="text"
                className="form-control "
                placeholder="Enter Business Name"
              />
            </div>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-12 mb-3">
            <div className="form-group">
              <label>Father’s Name</label>
              <input
                type="text"
                className="form-control "
                placeholder="Enter Father’s Name"
              />
            </div>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-12 mb-3">
            <div className="form-group">
              <label>Gender</label>
              <div className="input-group d-flex">
                <div className="input-group-append w-75">
                  <input
                    type="text"
                    className="form-control "
                    placeholder="Gender"
                  />
                </div>
                <select
                  className="form-select w-25 rounded"
                  style={{ maxWidth: "25%" }}
                >
                  <option selected>Male</option>
                  <option value="1">Female</option>
                </select>
              </div>
            </div>
          </div>

          <div className="col-xl-4 col-lg-4 col-md-6 col-12 mb-3">
            <div className="form-group">
              <label>Contact Number</label>
              <input
                type="number"
                className="form-control "
                placeholder="Enter Contact Number"
              />
            </div>
            <p className="text-danger" style={{ fontSize: "14px" }}>
              {" "}
              *Number used to create Aao Ni Saa ID
            </p>
          </div>

          <div className="col-xl-4 col-lg-4 col-md-6 col-12 mb-3">
            <div className="form-group">
              <label>Qualification</label>
              <input
                type="text"
                className="form-control "
                placeholder="Enter Qualification"
              />
            </div>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-12 mb-3">
            <div className="form-group">
              <label>Date Of Birth</label>
              <input
                type="date"
                className="form-control "
                placeholder="Enter Date Of Birth"
              />
            </div>
          </div>

          <div className="col-xl-4 col-lg-4 col-md-6 col-12 mb-3">
            <div className="form-group">
              <label>E-mail ID</label>
              <input
                type="email"
                className="form-control "
                placeholder="Enter E-mail ID"
              />
            </div>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-12 mb-3">
            <div className="form-group">
              <label>Address</label>
              <input
                type="text"
                className="form-control "
                placeholder="Enter Address"
              />
            </div>
          </div>

          <div className="col-xl-4 col-lg-4 col-md-6 col-12 mb-3">
            <div className="form-group">
              <label>Refer Code</label>
              <input
                type="text"
                className="form-control "
                placeholder="Enter Refer Code"
              />
            </div>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-12 mb-3">
            <label>Scanner</label>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Enter Scanner"
              />
              <span className="input-group-text" id="basic-addon2">
                <QrCodeScannerIcon />
              </span>
            </div>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-12 mb-3">
            <div className="form-group">
              <label>Digit UPI Transaction ID</label>
              <input
                type="Number"
                className="form-control "
                placeholder="Enter 12 Digit UPI Transaction ID"
              />
            </div>
          </div>
          <div className="col-xl-12 col-lg-12 col-md-12 col-12 mb-3">
            <div className="form-check align-items-center">
              <input
                style={{ height: "30px" }}
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckChecked"
              />
              <label className="form-check-label ms-2">
                I have re-checked all the Details and agree to the
                <a href=""> Terms & Conditions.</a>
              </label>
            </div>
          </div>
        </div>
        <button className="btn btn_save_hp mt-4">Submit</button>
      </form>
    </div></div>
  )
}

export default GetPremium

