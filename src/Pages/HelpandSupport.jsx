import React from "react";
import HomeNavbar from "../Components/Home/HomeNavbar";
import Footer from "../Components/Footer/Footer";
import Help_Support from "../Assests/Help_Support.png";
function HelpandSupport() {
  return (
    <div>
      <HomeNavbar />
      <div className="AboutusHeader">Help & Support</div>
      <div className="container my-5">
        <div className="row">
          <div className="col-lg-5">
            <img src={Help_Support} className="img-fluid" alt="" />
          </div>
          <div className="col-lg-5">
            <div className="mb-2">
              <h4>Help & Support</h4>
            </div>
            <div className="mb-2">
              <div className="form-group">
                <label className="form-label">Select Issue</label>
                <select className="form-select">
                  <option>Select Issue</option>
                  <option>Payment Issue</option>
                  <option>Business Profile Issue</option>
                  <option>Hire/Job Profile Issue</option>
                  <option>Suggestion</option>
                  <option>Others</option>
                </select>
              </div>
            </div>
            <div className="mb-2">
              <div className="form-group">
                <label className="form-label">Describe your issue</label>
                <textarea
                  className="form-control"
                  name=""
                  id=""
                  rows="4"
                ></textarea>
              </div>
            </div>
            <div className="mb-5 text-center">
              <button className="btn filter-button mt-4 px-5">Submit</button>
            </div>
            <div className="mb-2 text-center">
              <p>
                Need more help? <a href="#">Contact us</a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default HelpandSupport;
