import React, { useContext, useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../Config"; // Ensure you have configured Firestore in this file
import HomeNavbar from "../Components/Home/HomeNavbar";
import Footer from "../Components/Footer/Footer";
import Help_Support from "../Assests/Help_Support.png";
import { AuthContext } from "../Context/AuthContext";
import Swal from "sweetalert2";

function HelpandSupport() {
  const [formData, setFormData] = useState({
    topic: "",
    description: "",
  });
  const { currentUser } = useContext(AuthContext);
  const uid = currentUser.uid
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (!formData.topic || !formData.description) {
      if (!formData.description) {
      Swal.fire({
        icon: 'error',
        title: 'error',
        text: 'please fill description!',
      })
      return;
    }
   
    try {
      const docRef = await addDoc(collection(db, "helpsupport"), {
        ...formData,
        uid,
        created_at: serverTimestamp(),
      });
      console.log("Document written with ID: ", docRef.id);
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'message send to just search!',
      })
      setFormData({ topic: "", description: "" });
    } catch (error) {
      console.error("Error adding document: ", error);
      alert(`Error: ${error.message}`);
    }
  };

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
            <form onSubmit={handleSubmit}>
              <div className="mb-2">
                <div className="form-group">
                  <label className="form-label">Select Issue</label>
                  <select
                    className="form-select"
                    name="topic"
                    value={formData.topic}
                    onChange={handleChange}
                  >
                    <option value="">Select Issue</option>
                    <option value="Payment Issue">Payment Issue</option>
                    <option value="Business Profile Issue">Business Profile Issue</option>
                    <option value="Hire/Job Profile Issue">Hire/Job Profile Issue</option>
                    <option value="Suggestion">Suggestion</option>
                    <option value="Others">Others</option>
                  </select>
                </div>
              </div>
              <div className="mb-2">
                <div className="form-group">
                  <label className="form-label">Describe your issue</label>
                  <textarea
                    className="form-control"
                    name="description"
                    rows="4"
                    value={formData.description}
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>
              <div className="mb-5 text-center">
                <button type="submit" className="btn filter-button mt-4 px-5">
                  Submit
                </button>
              </div>
            </form>
            <div className="mb-2 text-center">
              <p>
                Need more help? <a href="#">Contact us</a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default HelpandSupport;
