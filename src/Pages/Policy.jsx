import React from "react";
import HomeNavbar from "../Components/Home/HomeNavbar";
import Footer from '../Components/Footer/Footer';

function Policy() {
  return (
    <div>
      <HomeNavbar />
      <div className="AboutusHeader">Policies</div>
      <div className="container mt-5">
        {/* Privacy Policy */}
        <h3>Privacy Policy</h3>
        <p>Welcome to Just Search. We are committed to protecting your privacy and ensuring that your personal information is handled in a safe and responsible manner. This Privacy Policy outlines how we collect, use, disclose, and protect your information.</p>
        <h4>1. Information We Collect</h4>
        <ul>
          <li><b>Personal Information:</b> When you create an account, list a business, apply for a job, or interact with our services, we collect personal information such as your name, email address, phone number, and location.</li>
          <li><b>Business Information:</b> If you list a business, we collect details about the business, including its name, address, contact information, and description.</li>
          <li><b>Usage Information:</b> We collect information about your interactions with our website, including your browsing activity, search queries, and the pages you visit.</li>
          <li><b>Device Information:</b> We collect information about the devices you use to access our services, including its IP address, browser type, and operating system.</li>
        </ul>
        <h4>2. How We Use Your Information</h4>
        <ul>
          <li><b>To Provide Services:</b> We use your information to deliver and improve our services, process transactions, and provide customer support.</li>
          <li><b>To Personalize Experience:</b> We use your information to personalize your experience on our website, such as showing you relevant business listings and job opportunities.</li>
          <li><b>To Communicate:</b> We use your contact information to send you updates, notifications, and promotional messages. You can opt out of marketing communications at any time.</li>
          <li><b>To Improve Services:</b> We analyze usage data to improve our website and services, enhance user experience, and develop new features.</li>
        </ul>
        <h4>3. How We Share Your Information</h4>
        <ul>
          <li><b>With Business Owners:</b> If you contact or interact with a business listed on our website, we may share your contact details with the business owner.</li>
          <li><b>With Employers:</b> If you apply for a job through our website, we may share your application details with the employer.</li>
          <li><b>With Service Providers:</b> We share information with third-party service providers who help us operate our website, process payments, and provide customer support.</li>
          <li><b>As Required by Law:</b> We may disclose your information if required by law or in response to a legal request, such as a subpoena or court order.</li>
        </ul>
        <h4>4. Security</h4>
        <p>We implement security measures to protect your information from unauthorized access, alteration, disclosure, or destruction. However, no data transmission over the internet or electronic storage is completely secure, so we cannot guarantee absolute security.</p>
        <h4>5. Your Choices</h4>
        <ul>
          <li><b>Account Information:</b> You can update or delete your account information by logging into your account.</li>
          <li><b>Cookies:</b> You can set your browser to refuse cookies or to alert you when cookies are being sent. However, some features of our website may not function properly without cookies.</li>
          <li><b>Marketing Communications:</b> You can opt out of receiving promotional emails from us by following the unsubscribe instructions in those emails.</li>
        </ul>
        <h4>6. Children's Privacy</h4>
        <p>Our services are not directed to children under 13, and we do not knowingly collect personal information from children under 13. If we become aware that we have collected personal information from a child under 13, we will take steps to delete such information.</p>
        <h4>7. Changes to This Privacy Policy</h4>
        <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on our website and updating the "Effective Date" at the top of this page. Your continued use of our services after any changes take effect will constitute your acceptance of the revised policy.</p>
        <h4>8. Contact Us</h4>
        <p>If you have any questions or concerns about this Privacy Policy, please contact us at:</p>
        <p>Email: <a href="mailto:justsearch.help@gmail.com">justsearch.help@gmail.com</a></p>

        {/* Cancellation and Refund Policy */}
        <h3>Cancellation and Refund Policy</h3>
        <h4>1. Membership Purchases</h4>
        <ul>
          <li>Membership fees are non-refundable, as these payments grant access to our platform's features for a specified duration.</li>
        </ul>
        <h4>2. Role of Just Search in Transactions</h4>
        <ul>
          <li>Just Search acts as a platform to connect buyers and sellers and does not engage in the sale of products/services directly.</li>
        </ul>
        <h4>3. Refund Policy</h4>
        <ul>
          <li>Refund-related concerns for listed products should be directed to the seller.</li>
        </ul>
        <h4>4. Cancellation Policy</h4>
        <ul>
          <li>Membership plans cannot be canceled or refunded once activated.</li>
        </ul>

        {/* Shipping and Delivery Policy */}
        <h3>Shipping and Delivery Policy</h3>
        <h4>1. Role of Just Search in Shipping</h4>
        <ul>
          <li>Just Search is a listing platform and does not facilitate shipping or delivery of products.</li>
        </ul>
        <h4>2. Seller’s Shipping Policies</h4>
        <ul>
          <li>Shipping terms are determined by individual sellers.</li>
        </ul>
        <h4>3. Delays or Issues in Delivery</h4>
        <ul>
          <li>Just Search does not take responsibility for shipping delays or issues.</li>
        </ul>
      </div>
      <Footer />
    </div>
  );
}

export default Policy;

