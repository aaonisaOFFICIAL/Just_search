import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../Config";
import "./BusinessEditForm.css"; // Import CSS file for styling

const BusinessEditForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBusinessData = async () => {
      try {
        const businessRef = doc(db, "buissness-listing", id);
        const businessSnapshot = await getDoc(businessRef);
        if (businessSnapshot.exists()) {
          setFormData(businessSnapshot.data());
          setLoading(false);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    };

    fetchBusinessData();
  }, [id]);

  const handleSubmit = async () => {
    try {
      const businessRef = doc(db, "buissness-listing", id);
      await updateDoc(businessRef, formData);
      console.log("Document successfully updated!");
      navigate("/");
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  const handleChange = (e) => {
    console.log(formData)
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="form-container">
      <h2>Edit Business Details</h2>
      <div className="input-container">
        <input
          type="text"
          name="businessName"
          placeholder="Business Name"
          value={formData.businessName || ""}
          onChange={handleChange}
        />
      </div>
      <div className="input-container">
        <input
          type="text"
          name="pincode"
          placeholder="Pincode"
          value={formData.pincode || ""}
          onChange={handleChange}
        />
      </div>
      <div className="input-container">
        <input
          type="text"
          name="blockBuilding"
          placeholder="Block Number / Building Name"
          value={formData.building || ""}
          onChange={handleChange}
        />
      </div>
      <div className="input-container">
        <input
          type="text"
          name="streetColony"
          placeholder="Street / Colony Name"
          value={formData.street || ""}
          onChange={handleChange}
        />
      </div>
      <div className="input-container">
        <input
          type="text"
          name="area"
          placeholder="Area"
          value={formData.area || ""}
          onChange={handleChange}
        />
      </div>
      <div className="input-container">
        <input
          type="text"
          name="landmark"
          placeholder="Landmark"
          value={formData.landmark || ""}
          onChange={handleChange}
        />
      </div>
      <div className="input-container">
        <input
          type="text"
          name="name"
          placeholder="Contact Person Name"
          value={formData.username || ""}
          onChange={handleChange}
        />
      </div>
      <div className="input-container">
        <input
          type="text"
          name="number"
          placeholder="Contact Person Number"
          maxLength={10}
          value={formData.mobilenumber || ""}
        />
      </div>
      <div className="input-container">
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email || ""}
          onChange={handleChange}
        />
      </div>
      <div className="input-container">
        <input
          type="number"
          name="opensat"
          placeholder="Opens At"
          value={formData.opensat || ""}
          onChange={handleChange}
        />
      </div>
      <div className="input-container">
        <input
          type="number"
          name="closesat"
          placeholder="Closes At"
          value={formData.closesat || ""}
          onChange={handleChange}
        />
      </div>
      {/* Add more input fields as needed */}

      <button onClick={handleSubmit}>Save Changes</button>
    </div>
  );
};

export default BusinessEditForm;
