import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../Config";
import { useNavigate } from "react-router-dom";
import HomeNavbar from "../Home/HomeNavbar";
import MobileFooter from "../MobileFooter/MobileFooter";

const Offer = () => {
  const [states, setState] = useState([]);
  const [selectedStateOption, setSelectedStateOption] = useState("");
  const [categorie, setCategorie] = useState([]);
  const [selectedCategoire, setSelectedCategorie] = useState("");
  const [district, setDistrict] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [offer, setOffer] = useState([]);
  const [userDetails, setUserDetails] = useState([]);

  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        // Fetch state data
        const response = await fetch(
          "https://good-jay-robe.cyclic.app/get-state"
        );
        const result = await response.json();
        const cityArray = result.message;
        setState(cityArray);

        if (selectedStateOption) {
          // Fetch district data based on the selected state
          const responseDistrict = await fetch(
            `https://good-jay-robe.cyclic.app/get-district/${selectedStateOption}`
          );
          const resultDistrict = await responseDistrict.json();
          const districts = resultDistrict.message.district
            .split(",")
            .map((district) => district.trim());
          setDistrict(districts);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchDistricts();
  }, [selectedStateOption]);
  const getCategorie = async () => {
    try {
      const categorie = collection(db, "categories");
      const data = await getDocs(categorie);

      const categorieInRange = data.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      setCategorie(categorieInRange);
    } catch (err) {
      console.error(err);
    }
  };

  const getOfferData = async () => {
    try {
      const offer = collection(db, "offer-listing");
      const q = query(
        offer,
        where("state", "==", selectedStateOption),
        where("categorie", "==", selectedCategoire),
        where("approved", "==", true)
      );
      const querySnapshot = await getDocs(q);

      const OfferInRange = querySnapshot.docs
        .map((doc) => {
          const data = doc.data();
          const dateString = data.date; // Adjust this line according to your actual date field name
          const date = new Date(dateString);
          return { id: doc.id, ...data, date };
        })
        .filter((record) => {
          const twentyFourHoursAgo = new Date();
          twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);
          return record.date > twentyFourHoursAgo;
        });

      setOffer(OfferInRange);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getCategorie();
  }, []);

  useEffect(() => {
    getOfferData();
  }, [selectedCategoire]);

  const navigate = useNavigate();
  const navigateToDetailsPage = async (data) => {
    const fetchData = collection(db, "buissness-listing");
    const q = query(fetchData, where("businessName", "==", data.businessName));
    const querySnapshot = await getDocs(q);
    const BusinessdataInRange = querySnapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    console.log(BusinessdataInRange);
    const name = BusinessdataInRange[0].businessName;
    const shopDetails = {
      name: name,
      area: BusinessdataInRange[0].area,
      building: BusinessdataInRange[0].building,
      city: BusinessdataInRange[0].district,
      landmark: BusinessdataInRange[0].landmark,
      state: BusinessdataInRange[0].state,
      street: BusinessdataInRange[0].street,
      days: BusinessdataInRange[0].daysopen,
      categorie: BusinessdataInRange[0].categorie,
      opensat: BusinessdataInRange[0].opensat,
      closesat: BusinessdataInRange[0].closesat,
      mobile: BusinessdataInRange[0].mobilenumber,
      subcategorie: BusinessdataInRange[0].subcategorie,
      category: BusinessdataInRange[0].categorie,
      imageone: BusinessdataInRange[0].images[0],
      imagetwo: BusinessdataInRange[0].images[1],
      imagethree: BusinessdataInRange[0].images[2],
      imagefour: BusinessdataInRange[0].images[3],
    };
    navigate(`/shop/${selectedCategoire}/${name}`, { state: { shopDetails } });
  };

  // const navigate = useNavigate()

  const navigateToCreate = () => {
    navigate("/create-offer");
  };
  return (
    <>
      <HomeNavbar />
      <div className="offer-navbar-container-">
        <div className="offer-navbar mt-5">
          <h4>
          Create Offer 
          </h4>
          <button onClick={navigateToCreate}>Create Offer</button>
        </div>
      </div>
      <div className="offer">
        <div className="container my-5">
          <div className="search-offer offer_search_section_hp">
            <select
              className="form-select"
              onChange={(e) => setSelectedStateOption(e.target.value)}
            >
              <option value="selected">State</option>
              {states.map((data, index) => (
                <option value={data} key={index}>
                  {data}
                </option>
              ))}
            </select>

            <select
              className="form-select"
              onChange={(e) => setSelectedDistrict(e.target.value)}
            >
              <option value="nostate">City</option>
              {district.map((city) => (
                <option value={city}>{city}</option>
              ))}
            </select>

            <select
              className="form-select"
              onChange={(e) => setSelectedCategorie(e.target.value)}
            >
              <option value="">Categorie</option>
              {categorie.map((data, index) => (
                <option value={data.categorie} key={index}>
                  {data.categorie}
                </option>
              ))}
            </select>
            <button>Search</button>
          </div>
        </div>

        {offer.length > 0 ? (
          <div className="offer-card">
            {offer.map((data, index) => (
              <div
                className="offer-card-container"
                onClick={() => navigateToDetailsPage(data)}
              >
                <div className="offer-card-images" key={index}>
                  <div className="card-image-data" key={index}>
                    {data.images[0] && (
                      <>
                        <img src={data.images[0]} alt="Offer Image" />
                      </>
                    )}
                  </div>
                  <div className="card-image-data" key={index}>
                    {data.images[1] && (
                      <>
                        <img src={data.images[1]} alt="Offer Image" />
                      </>
                    )}
                  </div>
                  <div className="card-image-data" key={index}>
                    {data.images[2] && (
                      <>
                        <img src={data.images[2]} alt="Offer Image" />
                      </>
                    )}
                  </div>
                  <div className="card-image-data" key={index}>
                    {data.images[3] && (
                      <>
                        <img src={data.images[3]} alt="Offer Image" />
                      </>
                    )}
                  </div>
                  <div className="card-image-data" key={index}>
                    {data.images[4] && (
                      <>
                        <img src={data.images[4]} alt="Offer Image" />
                      </>
                    )}
                  </div>
                </div>
                <h2 className="offer-shop-name">{data.businessName}</h2>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center">No Offer available</div>
        )}
      </div>
      <div className="home-page-mobilenav">
        <MobileFooter />
      </div>
    </>
  );
};

export default Offer;
