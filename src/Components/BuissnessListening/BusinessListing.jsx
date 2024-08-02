import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db, storage } from "../../Config";
import { MdCloudUpload } from "react-icons/md";
import MultipleSelectCheckmarks from "./Checkbox";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import stateDistrictData from "../../../state_district.json";
import Swal from "sweetalert2";
const BuissnessForm2 = () => {
  //for days
  const [days, setDays] = useState([]);
  const [selectedDays, setSelectedDays] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [categorie, setCategorie] = useState([]); //having all the data
  const [subcategorie, setSubcategoire] = useState([]);

  const [selectedCategorie, setSelectedCategorie] = useState("");
  const [selectedSubCategorie, setSelectedSubCategorie] = useState([]);

  const [opentime, setOpentime] = useState("PM");
  const [closetime, setClosetime] = useState("AM");
  //for images
  const [images, setImages] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [toogle, setToogle] = useState(false);
  const [homeDelivery, setHomeDelivery] = useState("no");

  //for geolocation
  const [userLocation, setUserLocation] = useState(null);

  //for state and city
  const [state, setState] = useState([]);
  const [selectedState, setSelectedState] = useState([]);
  const [district, setDistrict] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState([]);

  const [selectedImages, setSelectedImages] = useState(Array(20).fill(null));

  // Introduce formData state to manage form fields
  const [formData, setFormData] = useState({
    businessName: "",
    pincode: "",
    blockBuilding: "",
    streetColony: "",
    area: "",
    landmark: "",
    name: "",
    number: "",
    ownernumber: "",
    refercode: "",
    email: "",
    opens: "",
    specialist: "",
    closes: "",
    // longitude: "",
    // latitude: "",
    enquirynumber: "",
    enquiryemail: "",
    locationLink: "",
  });

  //for next and prev step
  const nextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  //lifting state up for checkbox
  const handleSubCategoryChange = (selectedSubCategorie) => {
    setSelectedSubCategorie(selectedSubCategorie);
  };

  const handleFileChange = (event, index) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      const objectURL = URL.createObjectURL(selectedFile);

      // Update the images array based on the index
      setImages((prevImages) => {
        const updatedImages = [...prevImages];
        updatedImages[index] = { file: selectedFile, objectURL };
        return updatedImages;
      });
    }
  };

  // console.log(images[0].file.name, images[1].file.name, images[2].file.name, images[3].file.name)

  // Function to handle changes in form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(formData);
  };

  //for weeks selection
  const handleDayClick = (day) => {
    const updatedDays = [...days]; // Create a copy of the current days array

    if (updatedDays.includes(day)) {
      // If the day is already selected, remove it
      updatedDays.splice(updatedDays.indexOf(day), 1);
    } else {
      // If the day is not selected, add it
      updatedDays.push(day);
    }

    setDays(updatedDays); // Update the days state
    setSelectedDays(updatedDays); // Update the selectedDays state
  };

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const imageUrls = [];
      // Upload images
      for (let i = 0; i < images.length; i++) {
        const storageRef = ref(storage, `listing-image/${images[i].file.name}`);
        await uploadBytes(storageRef, images[i].file);
        const imageURL = await getDownloadURL(storageRef);
        imageUrls.push(imageURL);
      }

      const productImages = [];

      for (let i = 0; i < selectedImages.length; i++) {
        if (selectedImages[i]?.file) {
          const storageRef = ref(
            storage,
            `product-image/${selectedImages[i].file.name}`
          );
          await uploadBytes(storageRef, selectedImages[i].file);
          const imageUrl = await getDownloadURL(storageRef);
          productImages.push(imageUrl);
        }
      }

      // Shop listing data
      const listing = collection(db, "buissness-listing");
      const userData = {
        businessName: formData.businessName,
        pincode: formData.pincode,
        building: formData.blockBuilding,
        street: formData.streetColony,
        area: formData.area,
        landmark: formData.landmark,
        district: selectedDistrict,
        state: selectedState,
        username: formData.name,
        mobilenumber: formData.number,
        email: formData.email,
        refercode: formData.refercode,
        daysopen: days,
        opensat: formData.opens,
        closesat: formData.closes,
        openam: opentime,
        closeam: closetime,
        categorie: selectedCategorie,
        subcategorie: selectedSubCategorie,
        images: imageUrls, // Store image URLs as an array
        productimages: productImages,
        homedelivery: homeDelivery,
        // longitude: formData.longitude,
        // latitude: formData.latitude,
        locationLink: formData?.locationLink,
        date: new Date(),
      };
      //add data of shop
      await addDoc(listing, userData);
      console.log("shop-listed");

      //add shop to maps
      const addOnMap = collection(db, "shoplocation");
      await addDoc(addOnMap, {
        shopname: formData.businessName,
        // longitude: formData.longitude,
        // latitude: formData.latitude,
      });
      Swal.fire({
        icon: "success",
        title: "Posted Successfully!",
        showConfirmButton: false,
        timer: 2000, // Automatically close after 2 seconds
        timerProgressBar: true, // Show progress bar
        toast: true, // Display as toast (notification)
        position: "top-end", // Position of the toast
        showCloseButton: true, // Show close button
      });
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  const handleToogle = (value) => {
    setHomeDelivery(value);
    setToogle(!toogle);
  };

  const handleImageSelect = async (index, event) => {
    const file = event.target.files[0];
    setSelectedImages((prevSelectedImages) => {
      const newSelectedImages = [...prevSelectedImages];
      newSelectedImages[index] = { file };
      return newSelectedImages;
    });
  };
  const getCategories = async () => {
    try {
      const categorie = collection(db, "categories");
      const q = query(categorie);
      const querySnapshot = await getDocs(q);
      const usersInRange = querySnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });

      setCategorie(usersInRange);
    } catch (err) {
      console.error(err);
    }
  };

  const getSubCategories = async () => {
    try {
      const subcategoriesCollection = collection(db, "categories");
      const q = query(
        subcategoriesCollection,
        where("categorie", "==", selectedCategorie)
      );
      const querySnapshot = await getDocs(q);
      const subcategoriesData = querySnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });

      console.log(subcategoriesData);
      // Set the fetched subcategories to state or perform any other action with the data
      setSubcategoire(subcategoriesData);
    } catch (err) {
      console.error(err);
    }
  };

  //for geolocation
  // const getLocationHandler = () => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         const { latitude, longitude } = position.coords;
  //         setUserLocation({ latitude, longitude });
  //         // You can do something with the user's location here
  //       },
  //       (error) => {
  //         console.error("Error getting user location:", error.message);
  //         // Handle the error, e.g., show a user-friendly message
  //       }
  //     );
  //   } else {
  //     console.error("Geolocation is not supported by this browser.");
  //     // Handle the case where geolocation is not supported
  //   }
  // };

  // useEffect(() => {
  //   const fetchDistricts = async () => {
  //     try {
  //       // Fetch state data
  //       const response = await fetch(
  //         "https://good-jay-robe.cyclic.app/get-state"
  //       );
  //       const result = await response.json();
  //       const cityArray = result.message;
  //       setState(cityArray);

  //       if (selectedState) {
  //         // Fetch district data based on the selected state
  //         const responseDistrict = await fetch(
  //           `https://good-jay-robe.cyclic.app/get-district/${selectedState}`
  //         );
  //         const resultDistrict = await responseDistrict.json();
  //         const districts = resultDistrict.message.district
  //           .split(",")
  //           .map((district) => district.trim());
  //         setDistrict(districts);
  //       }
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };

  //   fetchDistricts();
  // }, [selectedState]);
  useEffect(() => {
    setState(Object.keys(stateDistrictData));
  }, []);
  const fetchDistricts = (state) => {
    // Fetch districts based on selected state from JSON data
    const districts = stateDistrictData[state];
    setDistrict(districts);
  };
  useEffect(() => {
    getCategories();
    // getLocationHandler();
  }, []);

  useEffect(() => {
    if (selectedCategorie) {
      getSubCategories();
    }
  }, [selectedCategorie]);

  console.log(formData.opens, formData.closes, opentime, closetime);

  return (
    <div className="listening-form" >
      {currentStep === 1 && (
        <div className="form-seven">
          <h2>
            Employee Code<span style={{ color: "red" }}>*</span>
          </h2>
          <div>
            <input
              maxLength={40}
              type="text"
              placeholder="Employee Code"
              className="specialist-input"
              name="refercode"
              value={formData.refercode}
              onChange={handleChange}
            />
          </div>

          <div className="control-btns">
            <button disabled={formData.refercode === ""} onClick={nextStep}>
              Next
            </button>
          </div>
        </div>
      )}

      {currentStep === 2 && (
        <div className="form-one">
          <h2>Enter Your Business Details</h2>

          <div className="field">
            {/* Use controlled inputs and link them to the state */}
            <input
              type="text"
              name="businessName"
              placeholder="Business Name*"
              value={formData.businessName}
              onChange={handleChange}
            />

            <div className="uploader">
              {[...Array(6)].map((_, index) => (
                <form key={index}>
                  <label htmlFor={`fileInput${index}`}>
                    <input
                      type="file"
                      id={`fileInput${index}`}
                      accept="image/*"
                      className="input-field"
                      hidden
                      onChange={(event) => handleFileChange(event, index)}
                    />

                    {images[index] ? (
                      <img
                        src={images[index].objectURL}
                        width={50}
                        height={50}
                        alt={images[index].file.name}
                      />
                    ) : (
                      <>
                        <MdCloudUpload color="#1475cf" size={30} />
                        <p>
                          {index < 1
                            ? "Banner Image"
                            : "Browse Files to upload"}
                        </p>
                      </>
                    )}
                  </label>
                </form>
              ))}
            </div>

            <select onChange={(e) => setSelectedCategorie(e.target.value)}>
              <option value="Select">Select Categorie</option>
              {categorie.map((value) => (
                <option value={value.categorie}>{value.categorie}</option>
              ))}
            </select>

            <MultipleSelectCheckmarks
              categorie={selectedCategorie}
              onSubCategoryChange={handleSubCategoryChange}
            />

            <input
              type="text"
              placeholder="Contact Person Name*"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Contact Person Number*"
              name="number"
              maxLength={10}
              value={formData.number}
              onChange={handleChange}
            />

            <input
              type="text"
              placeholder="Owner's Number*"
              name="ownernumber"
              maxLength={10}
              value={formData.ownernumber}
              onChange={handleChange}
            />

            {/* <input
              type="email"
              placeholder="Your Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            /> */}
            <button onClick={prevStep}>Previous</button>
            <button
              onClick={nextStep}
              disabled={
                formData.businessName === "" ||
                formData.name === "" ||
                formData.number === ""
              }
            >
              Continue
            </button>
          </div>
        </div>
      )}
      {currentStep === 3 && (
        <div className="form-two">
          <div className="progress-bar">
            <div></div>
          </div>

          <h2>Add Address Details</h2>

          <div>
            <input
              type="text"
              name="blockBuilding"
              placeholder="Block Number / Building Name*"
              value={formData.blockBuilding}
              onChange={handleChange}
            />
            <input
              type="text"
              name="streetColony"
              placeholder="Street / Colony Name*"
              value={formData.streetColony}
              onChange={handleChange}
            />
            <input
              type="text"
              name="area"
              placeholder="Area*"
              value={formData.area}
              onChange={handleChange}
            />
            <input
              type="text"
              name="landmark"
              placeholder="Landmark*"
              value={formData.landmark}
              onChange={handleChange}
            />
            <input
              type="number"
              name="pincode"
              placeholder="Pincode*"
              value={formData.pincode}
              onChange={handleChange}
            />

            {/* <input
              type="number"
              name="latitude"
              placeholder="latitude*"
              value={formData.latitude}
              onChange={handleChange}
            />

            <input
              type="number"
              name="longitude"
              placeholder="longitude*"
              value={formData.longitude}
              onChange={handleChange}
            /> */}
            <input
              type="text"
              name="locationLink"
              value={formData.locationLink}
              onChange={handleChange}
              placeholder="Paste location link here"
            />

            <div className="city">
              <select
                value={selectedState}
                onChange={(e) => {
                  setSelectedState(e.target.value);
                  fetchDistricts(e.target.value);
                }}
              >
                <option value="">Select State</option>
                {state.map((data, index) => (
                  <option value={data} key={index}>
                    {data}
                  </option>
                ))}
              </select>

              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
              >
                <option value="">Select City</option>
                {district.map((data, index) => (
                  <option value={data} key={index}>
                    {data}
                  </option>
                ))}
              </select>
            </div>

            <button onClick={prevStep}>Previous</button>
            <button
              onClick={nextStep}
              disabled={
                formData.pincode === "" ||
                formData.blockBuilding === "" ||
                formData.streetColony === "" ||
                formData.area === "" ||
                formData.landmark === "" ||
                formData.city === "" ||
                formData.state === "" ||
                formData.longitude == "" ||
                formData.latitude == ""
              }
            >
              Next
            </button>
          </div>
        </div>
      )}

      {currentStep === 4 && (
        <div className="form-three">
          <div className="progress-bar">
            <div></div>
          </div>

          <h2>Add Business Timings</h2>
          <p>Let your customer's know when you are available for them</p>

          <div>
            <p>
              Day of Closing<span style={{ color: "red" }}>*</span>
            </p>
            <div>
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                <button
                  key={day}
                  className={selectedDays.includes(day) ? "active" : ""}
                  onClick={() => handleDayClick(day)}
                >
                  {day}
                </button>
              ))}
            </div>

            <div>
              {/* <input
                type="text"
                placeholder="Opens At*"
                name="opens"
                value={formData.opens}
                onChange={handleChange}
              /> */}
              {/* <input
                type="text"
                placeholder="Closes At*"
                name="closes"
                value={formData.closes}
                onChange={handleChange}
              /> */}
              <div className="timing">
                <select
                  name="opens"
                  id="opens"
                  value={formData.opens}
                  onChange={handleChange}
                >
                  <option value="">Opens At</option>
                  {[...Array(13).keys()].map((hour) => (
                    <option key={hour} value={hour}>
                      {hour}
                    </option>
                  ))}
                </select>

                <select
                  onChange={(e) => setOpentime(e.target.value)}
                  value={opentime}
                >
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
              </div>
              <div className="timing">
                <select
                  name="closes"
                  value={formData.closes}
                  onChange={handleChange}
                >
                  <option value="">Closes At</option>
                  {[...Array(13).keys()].map((hour) => (
                    <option key={hour} value={hour}>
                      {hour}
                    </option>
                  ))}
                </select>
                <select
                  onChange={(e) => setClosetime(e.target.value)}
                  value={closetime}
                >
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
              </div>
            </div>
          </div>
          <div className="form-three-buttons">
            <button onClick={prevStep}>Previous</button>
            <button
              onClick={nextStep}
              // disabled={formData.opens === "" || formData.closes === ""}
            >
              Next
            </button>
          </div>
        </div>
      )}
      {currentStep === 5 && (
        <div className="form-seven">
          <h2>
            More about buissness<span style={{ color: "red" }}>*</span>
          </h2>
          <div className="home-delivery">
            <p>Home Delivery</p>
            <div>
              <button
                className={`${toogle ? "active" : ""}`}
                onClick={() => handleToogle("yes")}
              >
                Yes
              </button>
              <button
                className={`${toogle ? "" : "active"}`}
                onClick={() => handleToogle("no")}
              >
                No
              </button>
            </div>
          </div>
          <div>
            <input
              maxLength={40}
              type="text"
              placeholder="Specialist in"
              className="specialist-input"
              name="specialist"
              value={formData.specialist}
              onChange={handleChange}
            />
          </div>

          <p>
            Images of Product{" "}
            <span
              style={{ fontSize: "10px", marginTop: "10px", color: "#888686" }}
            >
              (add upto 20 images)
            </span>{" "}
          </p>
          <div className="image-boxes">
            {selectedImages.map((image, index) => (
              <label key={index} className="image-box">
                {image ? (
                  <img
                    src={URL.createObjectURL(image.file)}
                    alt={`Image ${index}`}
                    style={{
                      objectFit: "cover",
                      width: "100%",
                      height: "100%",
                    }}
                  />
                ) : (
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(event) => handleImageSelect(index, event)}
                    style={{ display: "none" }}
                  />
                )}
              </label>
            ))}
          </div>

          <div className="control-btns">
            <button onClick={prevStep}>Previous</button>
            <button onClick={nextStep}>Next</button>
          </div>
        </div>
      )}

      {currentStep === 6 && (
        <div className="form-six">
          <div className="progress-bar">
            <div></div>
          </div>

          <div className="enquiry">
            <h2>For any enquiry</h2>
            <input
              type="text"
              placeholder="Whatsapp Number"
              style={{ padding: "5px 15px", marginRight: "5px" }}
              onChange={handleChange}
              name="enquirynumber"
              value={formData.enquirynumber}
            />
            <input
              type="email"
              placeholder="Email"
              style={{ padding: "5px 15px" }}
              onChange={handleChange}
              name="enquiryemail"
              value={formData.enquiryemail}
            />
          </div>
          <div className="form-six-buttons">
            <button onClick={prevStep}>Previous</button>
            <button
              onClick={handleSubmit}
              disabled={formData.enquirynumber === ""}
            >
              Save and Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuissnessForm2;
