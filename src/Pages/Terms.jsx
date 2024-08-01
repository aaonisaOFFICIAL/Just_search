import React from "react";
import HomeNavbar from "../Components/Home/HomeNavbar";
import Footer from "../Components/Footer/Footer";
function Terms() {
  return (
    <div>
      <HomeNavbar />
      <div className="AboutusHeader">Terms and Conditions for Premium Services</div>
      <div className="container my-5">
        {/* <h3>Terms and Conditions for Premium Services</h3> */}

        <h4>1. Acceptance of Terms</h4>
        <p>
          By subscribing to the premium services provided by "Just Search," you
          agree to be bound by these terms and conditions. If you do not agree
          with any part of these terms, you must not subscribe to the premium
          services.
        </p>

        <h4>2. Premium Services</h4>
        <p>
          <strong>Just Search</strong> offers premium services that include enhanced features
          and functionalities, such as advanced search capabilities, priority
          support, and exclusive content. These services are available to users
          who subscribe and make the required payment.
        </p>

        <h4>3. Subscription and Payment</h4>
        <ul>
          <li>
            <b>Subscription Plans:</b> Various subscription plans are available,
            each with different features and durations. Details of these plans
            can be found on the subscription page.
          </li>
          <li>
            <b>Payment:</b> Payments for premium services must be made in
            advance. Accepted payment methods include credit cards, debit cards,
            and other payment gateways as specified on the payment page.
          </li>
        </ul>

        <h4>4. Cancellation and Refunds</h4>
        <ul>
          <li>
            <b>Cancellation:</b> You cannot cancel your subscription once opted.
          </li>
          <li>
            <b>Refunds:</b> Refunds for unused subscription periods will not be
            provided unless required by law. If you believe you are entitled to
            a refund, please contact our support team.
          </li>
        </ul>

        <h4>5. User Conduct</h4>
        <p>
          As a subscriber to the premium services, you agree to use the services
          in accordance with all applicable laws and regulations. You must not
          use the services to:
        </p>
        <ul>
          <li>
            Post or transmit any content that is unlawful, harmful, or
            offensive.
          </li>
          <li>Interfere with or disrupt the services or servers.</li>
        </ul>

        <h4>6. Modifications to Services and Terms</h4>
        <p>
          "Just Search" reserves the right to modify or discontinue the premium
          services at any time without notice. We also reserve the right to
          change these terms and conditions. The most current version of the
          terms will be available on our website. Continued use of the premium
          services after any such changes shall constitute your consent to such
          changes.
        </p>

        <h4>7. Limitation of Liability</h4>
        <p>
          To the fullest extent permitted by law, "Just Search" shall not be
          liable for any indirect, incidental, special, consequential, or
          punitive damages, or any loss of profits or revenues, whether incurred
          directly or indirectly, or any loss of data, use, goodwill, or other
          intangible losses, resulting from:
        </p>
        <ul>
          <li>Your use or inability to use the premium services.</li>
          <li>
            Any unauthorized access to or use of our servers and/or any personal
            information stored therein.
          </li>
          <li>
            Any bugs, viruses, trojan horses, or the like that may be
            transmitted to or through our services by any third party.
          </li>
        </ul>

        <h4>8. Governing Law</h4>
        <p>
          These terms and conditions shall be governed by and construed in
          accordance with the laws of the jurisdiction in which "Just Search"
          operates.
        </p>

        <h4>9. Contact Information</h4>
        <p>
          For any questions or concerns about these terms and conditions, please
          contact our support team at{" "}
          <a href="mailto:support@justsearch.net.in">
            support@justsearch.net.in
          </a>
          .
        </p>

        <p>
          By checking the box below, you acknowledge that you have read,
          understood, and agree to be bound by these terms and conditions.
        </p>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            value=""
            id="flexCheckDefault"
          />
          <label className="form-check-label ms-2">
            I agree to the Terms and Conditions for Premium Services.
          </label>
        </div>
        
      </div>

      <Footer />
    </div>
  );
}

export default Terms;
