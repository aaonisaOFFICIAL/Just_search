import React from "react";
import HomeNavbar from "../Components/Home/HomeNavbar";
import Footer from '../Components/Footer/Footer'
function Customer() {
  return (
    <div>
      <HomeNavbar />
      <div className="AboutusHeader">Customer Care</div>
      <div className="container mt-4">
        <h3>Welcome to Just Search Customer Care</h3>
        <p>
          At Just Search, we prioritize your satisfaction and are committed to
          providing exceptional support. Our dedicated Customer Care team is
          here to assist you with any questions, concerns, or feedback you may
          have.
        </p>

        <h4>How Can We Assist You?</h4>
        <ol>
          <li>
            <b>Account Support:</b>
            <ul>
              <li>Help with creating, managing, and securing your account.</li>
              <li>Assistance with login issues and password recovery.</li>
            </ul>
          </li>
          <li>
            <b>Business Listing Assistance:</b>
            <ul>
              <li>Guidance on how to list your business on Just Search.</li>
              <li>
                Help with updating or modifying your business information.
              </li>
              <li>
                Support for enhancing your business profile for better
                visibility.
              </li>
            </ul>
          </li>
          <li>
            <b>User Experience:</b>
            <ul>
              <li>
                Address any issues encountered while navigating the website.
              </li>
              <li>
                Provide tips and tricks for using the platform efficiently.
              </li>
              <li>Feedback on improving our search results.</li>
            </ul>
          </li>
          <li>
            <b>Referral Program:</b>
            <ul>
              <li>
                Information on how to participate in our referral program.
              </li>
              <li>Assistance with referral code issues.</li>
              <li>Details on earning incentives through referrals.</li>
            </ul>
          </li>
          <li>
            <b>Technical Support:</b>
            <ul>
              <li>Troubleshooting technical problems.</li>
              <li>Help with browser compatibility and performance issues.</li>
              <li>Reporting bugs and following up on their resolution.</li>
            </ul>
          </li>
        </ol>

        <h4>How to Reach Us?</h4>
        <ul>
          <li>
            <b>Email Support:</b> Reach out to us at{" "}
            <a href="mailto:support@justsearch.com">support@justsearch.com</a>{" "}
            for any queries or support requests. Our team will respond within 24
            hours.
          </li>
          <li>
            <b>Live Chat:</b> Use the live chat feature available on the website
            for immediate assistance during business hours.
          </li>
          <li>
            <b>Phone Support:</b> Call our customer care hotline at
            1-800-123-4567 from Monday to Friday, 9 AM to 6 PM.
          </li>
        </ul>

        <h4>FAQs</h4>
        <p>
          Check our <a href="#">FAQs section</a> for quick answers to common
          questions.
        </p>

        <h4>Feedback</h4>
        <p>
          Your feedback is invaluable to us. Please let us know how we can
          improve your experience by submitting your comments through our{" "}
          <a href="#">feedback form</a>.
        </p>
      </div>
      <Footer />
    </div>
  );
}

export default Customer;
