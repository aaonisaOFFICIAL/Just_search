import React from "react";
import Footer from "../Components/Footer/Footer";
import HomeNavbar from "../Components/Home/HomeNavbar";

function Hiring() {
  return (
    <div>
      <HomeNavbar />
      <div className="AboutusHeader">We Are Hiring</div>
      <div className="container mt-5">
        <p>
          At <b>Just Search</b>, we are dedicated to bridging the gap between
          skilled professionals and companies in need of their expertise. By
          listing skilled individuals and collaborating with businesses, we
          provide valuable job opportunities for people in their local areas.
          Whether you're looking for full-time, part-time, or flexible work
          options, <b>Just Search</b> is here to connect you with the right
          opportunities.
        </p>

        <h4>Why Work With Us?</h4>
        <ul>
          <li>
            <b>Empowering Connections:</b> We help skilled individuals find
            meaningful employment and assist companies in sourcing local talent.
          </li>
          <li>
            <b>Flexible Opportunities:</b> Find jobs that match your
            preferences, be it full-time, part-time, or other flexible
            arrangements.
          </li>
          <li>
            <b>Local Focus:</b> We prioritize local employment to help you find
            jobs close to home, enhancing convenience and work-life balance.
          </li>
        </ul>

        <h4>How to Apply</h4>
        <p>
          If you are passionate about finding the right job or helping companies
          discover local talent, we want to hear from you! Please send your
          resume and cover letter to{" "}
          <a href="mailto:careers@justsearch.com">careers@justsearch.com</a> or
          visit our <a href="#">Hire Page</a> to apply for open positions.
        </p>

        <h4>Perks and Benefits</h4>
        <ul>
          <li>
            <b>Competitive Compensation:</b> Attractive salary packages to
            reward your expertise and dedication.
          </li>
          <li>
            <b>Work-Life Balance:</b> Flexible job options to suit your
            lifestyle and personal needs.
          </li>
          <li>
            <b>Professional Growth:</b> Access to training programs, workshops,
            and opportunities to enhance your skills.
          </li>
          <li>
            <b>Community Impact:</b> Contribute to local economic growth by
            connecting people with jobs in their community.
          </li>
        </ul>

        <p>
          Join <b>Just Search</b> and be part of a team that's making a real
          difference in the job market. We look forward to welcoming you and
          supporting your career journey!
        </p>
      </div>
      <Footer />
    </div>
  );
}

export default Hiring;
