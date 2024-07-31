import React from "react";
import HomeNavbar from "../Components/Home/HomeNavbar";
import Footer from '../Components/Footer/Footer'
function Terms() {
  return (
    <div>
      <HomeNavbar />
      <div className="AboutusHeader">Terms of Service</div>
      <div className="container mt-5 ">
       
        <h3>Welcome to Just Search</h3>
        <p>
          These Terms of Service (“Terms”) govern your use of the Just Search
          website and services. By accessing or using our services, you agree to
          comply with and be bound by these Terms. If you do not agree to these
          Terms, please do not use our services.
        </p>

        <h4>1. Acceptance of Terms</h4>
        <p>
          By using Just Search, you agree to these Terms, our Privacy Policy,
          and any additional terms applicable to specific services.
        </p>

        <h4>2. Services Provided</h4>
        <p>
          Just Search offers a platform for business listings, job placements,
          and local business searches. We connect users with businesses and job
          opportunities in their local area.
        </p>

        <h4>3. User Responsibilities</h4>
        <ul>
          <li>
            <b>Account Creation:</b> Users must provide accurate and complete
            information when creating an account.
          </li>
          <li>
            <b>Use of Services:</b> Users agree to use our services for lawful
            purposes and in a manner that does not infringe on the rights of
            others.
          </li>
          <li>
            <b>Content:</b> Users are responsible for any content they post,
            including business listings, reviews, and job postings. Content must
            be accurate, not misleading, and not violate any laws or
            regulations.
          </li>
        </ul>

        <h4>4. Business Listings</h4>
        <ul>
          <li>
            <b>Accuracy:</b> Businesses must ensure that their listings are
            accurate and up-to-date.
          </li>
          <li>
            <b>Compliance:</b> Listings must comply with all applicable laws and
            regulations.
          </li>
          <li>
            <b>Responsibility:</b> Businesses are responsible for any
            transactions or interactions that occur through their listings.
          </li>
        </ul>

        <h4>5. Job Placements</h4>
        <ul>
          <li>
            <b>Job Listings:</b> Employers must provide accurate job
            descriptions and requirements.
          </li>
          <li>
            <b>Candidate Information:</b> Candidates must provide truthful and
            accurate information about their qualifications and experience.
          </li>
          <li>
            <b>Employment Terms:</b> Just Search is not responsible for the
            terms of employment or any disputes that may arise.
          </li>
        </ul>

        <h4>6. Referral Program</h4>
        <ul>
          <li>
            <b>Referral Codes:</b> Salespersons can generate referral codes to
            track their business listings.
          </li>
          <li>
            <b>Incentives:</b> Incentives and perks will be provided based on
            the number of businesses listed through the referral codes.
          </li>
          <li>
            <b>Performance Tracking:</b> Just Search will track the performance
            of salespersons based on their referral codes.
          </li>
        </ul>

        <h4>7. Intellectual Property</h4>
        <ul>
          <li>
            <b>Ownership:</b> All content on Just Search, including text,
            graphics, logos, and software, is the property of Just Search or its
            licensors.
          </li>
          <li>
            <b>Use:</b> Users may not use any content from Just Search without
            prior written permission.
          </li>
        </ul>

        <h4>8. Privacy</h4>
        <p>
          Our Privacy Policy explains how we collect, use, and protect your
          personal information. By using our services, you consent to our data
          practices as described in the Privacy Policy.
        </p>

        <h4>9. Limitation of Liability</h4>
        <p>
          Just Search is not liable for any direct, indirect, incidental, or
          consequential damages resulting from your use of our services. This
          includes any loss of data or profits, or any unauthorized access to
          your account.
        </p>

        <h4>10. Termination</h4>
        <p>
          Just Search reserves the right to terminate or suspend your account at
          any time for any reason, including violation of these Terms.
        </p>

        <h4>11. Changes to Terms</h4>
        <p>
          We may update these Terms from time to time. If we make significant
          changes, we will notify you by email or through our services. Your
          continued use of our services after the changes take effect
          constitutes your acceptance of the new Terms.
        </p>

        <h4>12. Governing Law</h4>
        <p>
          These Terms are governed by the laws of India. Any disputes arising
          from these Terms will be resolved in the courts of Jodhpur, Rajasthan
          India.
        </p>

        <h4>Contact Us</h4>
        <p>
          If you have any questions or concerns about these Terms, please
          contact us at{" "}
          <a href="mailto:support@justsearch.com">support@justsearch.com</a>.
        </p>
      </div>
      <Footer />
    </div>
  );
}

export default Terms;
