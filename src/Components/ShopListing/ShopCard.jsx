import React, { useContext, useEffect, useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import { FaWhatsapp } from "react-icons/fa6";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import {
  FieldValue,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../Config";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { MdOutlineLocalPhone } from "react-icons/md";
import StarIcon from "@mui/icons-material/Star";
//make changes after authenticating user
const ShopCard = ({
  id,
  pincode,
  specialist,
  locationLink,
  name,
  area,
  building,
  city,
  landmark,
  state,
  street,
  days,
  categorie,
  opensat,
  closesat,
  mobile,
  subcategorie,
  imageone,
  imagetwo,
  imagethree,
  imagefour,
  homeDelivery,
  openam,
  closeam,
  latitude,
  email,
  longitude,
  businessName,
}) => {
  //context api for auth
  const { currentUser } = useContext(AuthContext);

  //state variables for setting the favs
  const [fav, setFav] = useState("");
  const [favDocId, setFavDocId] = useState(null);

  const [index, setIndex] = useState(0);

  //state variables for showing number
  const [showNumber, setShowNumber] = useState(false);

  //function for fetching the favs
  const fetchFav = async () => {
    const favourite = collection(db, "favourite");
    const querySnapshot = await getDocs(favourite);

    querySnapshot.forEach((doc) => {
      if (doc.data().fav === "shop details") {
        setFavDocId(doc.id);
        setFav(true);
      }
    });
  };
  useEffect(() => {
    // Fetch the user's favorite document ID
    fetchFav();
  }, []);

  const addToFav = async () => {
    try {
      const favourite = collection(db, "favourite");
      const docRef = await addDoc(favourite, {
        fav: "shop details",
        userId: currentUser.uid,
        name: name,
        area: area,
        building: building,
        city: city,
        landmark: landmark,
        state: state,
        street: street,
        days: days,
        categorie: categorie,
        opensat: opensat,
        closesat: closesat,
        mobile: mobile,
        subcategorie: subcategorie,
        imageone,
        imagetwo,
        imagethree,
        imagefour,
      });

      setFav(true);
      setFavDocId(docRef.id);

      console.log("Fav set perfectly");
    } catch (err) {
      console.error(err);
    }
  };

  const removefromFav = async () => {
    try {
      const favourite = collection(db, "favourite");

      if (favDocId) {
        await deleteDoc(doc(favourite, favDocId));
        setFav(false);
        setFavDocId(null);
        console.log("Fav removed perfectly");
      }
    } catch (err) {
      console.error(err);
    }
  };

  //chat handler

  const chatHandler = () => {
    const url = `https://wa.me/91${mobile}`;
    window.open(url, "_blank");
  };

  //modal handler
  const openModal = () => {
    setShowNumber(!showNumber);
  };
  //navigation
  const navigate = useNavigate();

  const navigateToShopPage = () => {
    console.log(latitude);
    console.log(longitude);
    console.log(name);
    console.log(businessName, "bolona");
    const shopDetails = {
      locationLink,
      pincode,
      id,
      name,
      area,
      specialist,
      building,
      city,
      landmark,
      state,
      street,
      days,
      categorie,
      opensat,
      closesat,
      mobile,
      subcategorie,
      imageone,
      imagetwo,
      imagethree,
      imagefour,
      homeDelivery,
      openam,
      closeam,
      longitude,
      latitude,
      email,
      businessName,
    };

    navigate(`/shop/${categorie}/${name}`, { state: { shopDetails } });

    console.log(shopDetails);
    navigate(`/shop/${categorie}/${name}`, { state: { shopDetails } });
  };

  //for images
  const images = [imageone, imagetwo, imagethree, imagefour];

  //carousel
  const handleClick = (dir) => {
    const lastIdx = images.length - 1;
    if (dir === "left") {
      if (index === 0) {
        setIndex(lastIdx);
      } else {
        setIndex((idx) => idx - 1);
      }
    } else if (dir === "right") {
      if (lastIdx === index) {
        setIndex(0);
      } else {
        setIndex((idx) => idx + 1);
      }
    }
  };
  useEffect(() => {
    const tid = setInterval(() => {
      handleClick("right");
    }, 7000);
    return () => {
      clearInterval(tid);
    };
  }, [index]);
  const [isFavorited, setIsFavorited] = useState(false);

  const handleToggle = () => {
    setIsFavorited(!isFavorited);
  };
  return (
    <>
      <div className="shop-container" onClick={navigateToShopPage}>
        <div className="card-image">
          <img src={images[0]} alt="Images" />
        </div>
        <div className="card-data">
          <div className="d-flex justify-content-between">
            <h4>{businessName}</h4>
            <div onClick={handleToggle} style={{ cursor: "pointer" }}>
              {isFavorited ? (
                <FavoriteIcon style={{ color: "red" }} />
              ) : (
                <FavoriteBorderIcon />
              )}
            </div>
          </div>
          <div className="rating-container">
            <div className="rating-score">3.8</div>
            <div className="stars">
              <span className="star filled">
                <StarIcon />
              </span>
              <span className="star filled">
                <StarIcon />
              </span>
              <span className="star filled">
                <StarIcon />
              </span>
              <span className="star filled">
                <StarIcon />
              </span>
              <span className="star">
                <StarIcon />
              </span>
            </div>
            <div className="rating-text">3,599 Rating</div>
          </div>
          <div className="card-subcategories">
            {subcategorie.map(
              (value, index) => index <= 2 && <p key={index}>{value}</p>
            )}
            <p>Show More...</p>
          </div>
          <div className="card-timings">
            <p>Home Delivery -</p>
            <p>{homeDelivery}</p>
          </div>
          <div className="card-timings">
            <p>
              Specialist In<span style={{ marginLeft: "20px" }}>- </span>
            </p>
            <p>{specialist}</p>
          </div>
          <div className="card-address">
            <p>
              <CiLocationOn className="icon" />
              {area} , {city}
            </p>
          </div>

          <div className="card-button">
            <button onClick={openModal}>
              <MdOutlineLocalPhone style={{ fontSize: "20px" }} />
              {mobile}
            </button>
            <button className="whatsup-btn" onClick={chatHandler}>
              <FaWhatsapp style={{ fontSize: "20px" }} /> Chat
            </button>
          </div>
        </div>
      </div>

      <div className="container d-none">
        <div className="Reviews_Ratings">
          <h2 className="mb-2" data-bs-toggle="modal" data-bs-target="#Reviews">
            Reviews & Ratings
          </h2>
          <div className="rating-overview ">
            <div className="rating-score">3.8</div>
            <div className="rating-text">
              <h6 className="mb-0">3,599 Rating </h6>
              <p className="mb-0">
                JD rating index based on 3599 ratings across the web
              </p>
            </div>
          </div>
          <div className="my-3">
            <h2 className="mb-0">Start your Review</h2>
            <div className="stars">
              <span className="star">
                <StarBorderIcon />
              </span>
              <span className="star">
                <StarBorderIcon />
              </span>
              <span className="star">
                <StarBorderIcon />
              </span>
              <span className="star">
                <StarBorderIcon />
              </span>
              <span className="star">
                <StarBorderIcon />
              </span>
            </div>
          </div>

          <h2>Recent rating trend</h2>
          <div className="rating-trend">
            <span className="trend-item">
              4.0 <span className="star">&#9733;</span>
            </span>
            <span className="trend-item">
              5.0 <span className="star">&#9733;</span>
            </span>
            <span className="trend-item">
              2.0 <span className="star">&#9733;</span>
            </span>
            <span className="trend-item">
              5.0 <span className="star">&#9733;</span>
            </span>
            <span className="trend-item">
              5.0 <span className="star">&#9733;</span>
            </span>
            <span className="trend-item">
              1.0 <span className="star">&#9733;</span>
            </span>
            <span className="trend-item">
              5.0 <span className="star">&#9733;</span>
            </span>
            <span className="trend-item">
              4.0 <span className="star">&#9733;</span>
            </span>
            <span className="trend-item">
              4.0 <span className="star">&#9733;</span>
            </span>
          </div>

          <h2>User Reviews</h2>
          <div className="review-filters">
            <button className="filter-button">Relevant</button>
            <button className="filter-button">Latest</button>
            <button className="filter-button">High to Low</button>
          </div>

          <div className="user-review">
            <div className="review-header">
              <img src="https://via.placeholder.com/50" alt="User Avatar" />
              <div>
                <p className="mb-0">
                  <strong>Dipankar</strong>
                </p>
                <p className="mb-0">3695 reviews</p>
              </div>
              <div className="review-date text-end">25 Feb 2023</div>
            </div>
            <div className="review-rating">
              <span className="star filled">
                <StarIcon />
              </span>
              <span className="star filled">
                <StarIcon />
              </span>
              <span className="star filled">
                <StarIcon />
              </span>
              <span className="star filled">
                <StarIcon />
              </span>
              <span className="star">
                <StarIcon />
              </span>
            </div>
            <div className="review-text">
              Had one of the most amazing experience while staying here for
              almost a month. The rooms were very spacious and the room service
              was well above my expectations. The rooms were thoroughly
              sanitized and bed was made regularly while the staffs were just a
              phone call away for all your requirement or food orders.
            </div>
            <div className="review-actions">
              <button className="action-button">Helpful</button>
              <button className="action-button">Comment</button>
              <button className="action-button">Share</button>
            </div>
          </div>
        </div>
      </div>
      {/* Modal  */}
      <div
        className="modal fade"
        id="Reviews"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Feedback Form
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group mb-3">
                  <label>Rating:</label>
                  <div className="rating">
                    <div className="star_right">
                      <input
                        type="radio"
                        name="rating"
                        id="5-stars"
                        value="5"
                      />
                      <label for="5-stars" className="star">
                        &#9733;
                      </label>
                      5 stars
                    </div>
                    <div className="star_right">
                      <input
                        type="radio"
                        name="rating"
                        id="4-stars"
                        value="4"
                      />
                      <label for="4-stars" className="star">
                        &#9733;
                      </label>
                      4 stars
                    </div>
                    <div className="star_right">
                      <input
                        type="radio"
                        name="rating"
                        id="3-stars"
                        value="3"
                      />
                      <label for="3-stars" className="star">
                        &#9733;
                      </label>
                      3 stars
                    </div>
                    <div className="star_right">
                      <input
                        type="radio"
                        name="rating"
                        id="2-stars"
                        value="2"
                      />
                      <label for="2-stars" className="star">
                        &#9733;
                      </label>
                      2 stars
                    </div>
                    <div className="star_right">
                      <input type="radio" name="rating" id="1-star" value="1" />
                      <label for="1-star" className="star">
                        &#9733;
                      </label>
                      1 star
                    </div>
                  </div>
                </div>
                <div className="form-group mb-3">
                  <label for="comments">Comments:</label>
                  <textarea
                    className="form-control"
                    id="comments"
                    rows="4"
                  ></textarea>
                </div>
                <div className="form-group mb-3">
                  <label for="category">Category:</label>
                  <select className="form-control" id="category">
                    <option>Website Functionality</option>
                    <option>Customer Service</option>
                    <option>Product Quality</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="form-group mb-3">
                  <label for="screenshot">Screenshot (optional):</label>
                  <input
                    type="file"
                    className="form-control-file"
                    id="screenshot"
                  />
                </div>
                <div className="text-end">
                  <button type="submit" className="btn filter-button">
                    Submit Feedback
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopCard;
