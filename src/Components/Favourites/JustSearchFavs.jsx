import React, { useState, useEffect, useContext } from "react";
import { CiLocationOn } from "react-icons/ci";
import { db } from "../../Config";
import { collection, getDocs, where, query, deleteDoc, doc } from "firebase/firestore";
import {  FaHeart } from "react-icons/fa";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { control } from "leaflet";

const JustSearchFavs = () => {
  const [favs, setFavs] = useState([]);

  const { currentUser } = useContext(AuthContext)

  const fetchFavs = async () => {
    try {
      const favourite = collection(db, "favourite");
      const favQuery = query(favourite, where("userId", "==", currentUser.uid));
      const querySnapshot = await getDocs(favQuery);

      const favList = [];
      querySnapshot.forEach((doc) => {
        favList.push({ id: doc.id, ...doc.data() });
      });

      console.log(favList);

      setFavs(favList);
    } catch (err) {
      console.error(err);
    }
  };
    
  useEffect(() => {
    // Fetch user's favorites
    fetchFavs();
  }, []);

  const removefromFav = async (favId) => {
    try {
      const favourite = collection(db, "favourite");
      await deleteDoc(doc(favourite, favId));

      // Update the local state to remove the deleted favorite
      setFavs((prevFavs) => prevFavs.filter((fav) => fav.id !== favId));

      console.log("Fav removed perfectly");
    } catch (err) {
      console.error(err);
    }
  };

  const navigate = useNavigate()
  const navigateToShopPage = (shopDetails) => {
    navigate(`/shop/${shopDetails.categorie}/${shopDetails.name}`, { state: { shopDetails } });
  };
  

  return (
    <div className="search-favs">
      {favs.map((fav) => (
        <div className="favs-card" key={fav.id} onClick={() => navigateToShopPage(fav)}>
          <div className="favs-img">
            <img
              src={fav.imageone}
              alt=""
            />
          </div>

          <div className="favs-details">
            <h3>{fav.name}</h3>
            <div className="favs-address">
              <CiLocationOn className="icon" />
              <p>{fav.landmark} <br /> {fav.city}</p>
            </div>
            <div className="favs-subcategories">
              {fav.subcategorie.map((data) => (
                <p>{data}</p>
              ))}
              
            </div>

            <div className="favs-button">
              <button>Call Now</button>
              <button>Message</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default JustSearchFavs;
