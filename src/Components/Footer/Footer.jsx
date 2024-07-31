import React from "react";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-heading">{/* <h1>Quick Links</h1> */}</div>

      <div className="footer-data">
        <div className="data-row">
          <h1>
            Just <span>Search</span>
          </h1>
        </div>
        <div className="data-row">
          <h4>Quick Links </h4>
          <a href="/Aboutus">About us</a>
          <a href="/">Investor Relation</a>
          <a href="/we-are-hiring">We’re Hiring</a>
          <a href="/customer-care">Customer Care</a>
        </div>
        <div className="data-row">
          <h4>Legal Policy</h4>
          <a href="/terms-of-service">Terms Of Service</a>
          <a href="/privacy-policy">Privacy Policy</a>
        </div>
        <div className="data-row">
          <h4>Contact Us</h4>
          <p>+1 809 120 6705</p>
          <p>
            37 San Juan Lane Graaf <br />
            Florisstraat 22A,3021 CH
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
