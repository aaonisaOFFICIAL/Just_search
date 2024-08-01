import HomeNavbar from "../Home/HomeNavbar";
import Footer from "../Footer/Footer";
import React, {
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { CiLocationOn } from "react-icons/ci";
import CallIcon from "@mui/icons-material/Call";
import { BsWhatsapp } from "react-icons/bs";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../Config";
import { AuthContext } from "../../Context/AuthContext";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
const ShopDesc = () => {
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [infoWindowOpen, setInfoWindowOpen] = useState(false);
  const locations = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  let { shopDetails } = locations.state || {};

  const center = useMemo(
    () => [shopDetails?.latitude, shopDetails?.longitude],
    [shopDetails?.latitude, shopDetails?.longitude]
  );

  const [fav, setFav] = useState(false);
  const [favDocId, setFavDocId] = useState(null);

  const checkFavorite = useCallback(async () => {
    if (!shopDetails?.id) return;
    try {
      const favourite = collection(db, "favourite");
      const querySnapshot = await getDocs(
        query(favourite, where("id", "==", shopDetails.id))
      );

      querySnapshot.forEach((doc) => {
        if (doc.data().id === shopDetails.id) {
          setFavDocId(doc.id);
          setFav(true);
        }
      });
    } catch (err) {
      console.error(err);
    }
  }, [shopDetails?.id]);

  useEffect(() => {
    handleGetLocation();
    checkFavorite();
  }, [checkFavorite]);

  const chatHandler = useCallback(() => {
    if (!shopDetails?.mobile) return;
    const url = `https://wa.me/91${shopDetails.mobile}`;
    window.open(url, "_blank");
  }, [shopDetails?.mobile]);

  const addToFav = useCallback(async () => {
    if (!currentUser?.uid || !shopDetails) return;
    try {
      const favourite = collection(db, "favourite");
      const docRef = await addDoc(favourite, {
        fav: "shop details",
        userId: currentUser.uid,
        ...shopDetails,
        imageone: shopDetails.imageone || "",
        imagetwo: shopDetails.imagetwo || "",
        imagethree: shopDetails.imagethree || "",
        imagefour: shopDetails.imagefour || "",
      });

      setFav(true);
      setFavDocId(docRef.id);
    } catch (err) {
      console.error(err);
    }
  }, [currentUser?.uid, shopDetails]);

  const removefromFav = useCallback(async () => {
    if (!favDocId) return;
    try {
      await deleteDoc(doc(collection(db, "favourite"), favDocId));
      setFav(false);
      setFavDocId(null);
    } catch (err) {
      console.error(err);
    }
  }, [favDocId]);

  const openGoogleMap = useCallback(() => {
    debugger;
    if (!shopDetails?.latitude || !shopDetails?.longitude) return;
    const url = `https://www.google.com/maps?q=${+shopDetails.latitude},${+shopDetails.longitude}`;
    window.open(url, "_blank");
  }, [shopDetails?.latitude, shopDetails?.longitude]);

  const clickHandler = useCallback(() => {
    if (!shopDetails?.id) return;
    navigate(`/images/${shopDetails?.id}`);
  }, [navigate, shopDetails?.id]);

  if (!shopDetails) {
    return <div>Loading...</div>;
  }

  const handleGetLocation = () => {
    if (shopDetails?.locationLink) {
      const [lat, lng] = parseLocationLink(shopDetails.locationLink);
      setLocation({ lat, lng });
    } else if (shopDetails?.latitude && shopDetails?.longitude) {
      setLocation({
        lat: parseFloat(shopDetails.latitude),
        lng: parseFloat(shopDetails.longitude),
      });
    }
  };

  const parseLocationLink = (link) => {
    try {
      const url = new URL(link);
      const coords = url.pathname.split("@")[1].split(",");
      return [parseFloat(coords[0]), parseFloat(coords[1])];
    } catch (error) {
      console.error("Invalid location link", error);
      return [null, null];
    }
  };

  const handleMarkerClick = () => {
    setInfoWindowOpen(true);
  };

  const handleDirectionsClick = () => {
    if (location.lat || location.lng) {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}`;
      window.open(url, "_blank");
    } else {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${shopDetails.latitude},${shopDetails.longitude}`;
      window.open(url, "_blank");
    }
  };

  const isValidLatLng = (lat, lng) => {
    return !isNaN(lat) && !isNaN(lng) && lat !== null && lng !== null;
  };

  return (
    <>
      <HomeNavbar />
      <div className="container-fluid show_dec_page mb-5">
        <div className="row justify-content-center">
          <div className="col-lg-9">
            <div className="frist_img">
              {shopDetails?.imageone && (
                <img
                  src={shopDetails?.imageone}
                  className="img-fluid"
                  alt="Shop Image"
                />
              )}
            </div>
          </div>
          <div className="col-lg-3">
            <div className="show-more">
              {shopDetails?.imageone && (
                <img src={shopDetails?.imagetwo} alt="Shop Image" />
              )}
              {shopDetails?.imageone && (
                <img src={shopDetails?.imagethree} alt="Shop Image" />
              )}
              <div className="position-relative_img">
                {shopDetails?.imageone && (
                  <img src={shopDetails?.imagefour} alt="Shop Image" />
                )}
                <div className="show_more_btn" onClick={clickHandler}>
                  Show More
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-7 mt-5 ">
            <div className="show_dec_page_content">
              <h2>{shopDetails?.name}</h2>

              <div className="d-flex align-items-center">
                <span>
                  <CiLocationOn />
                </span>
                <p>
                  {shopDetails?.street} {shopDetails?.landmark},{" "}
                  {shopDetails?.area}, {shopDetails?.city}, {shopDetails?.state}
                  , {shopDetails?.pincode}
                </p>
              </div>

              <div className="d-flex show_icon_call">
                <p className="mb-0">
                  <AccessTimeIcon className="icon-img" /> {shopDetails?.opensat}
                  {shopDetails.openam} to {shopDetails.closesat}
                  {shopDetails.closeam}
                </p>
                <p className="mx-4">
                  <CallIcon className="icon-img" /> {shopDetails?.mobile}
                </p>
                <p className="mb-0">
                  <MailOutlineIcon className="icon-img" /> {shopDetails?.email}
                </p>
              </div>

              <p className="content_text">
                Home Delivery - {shopDetails?.homeDelivery}
              </p>

              <p className="content_text">
                Specialist In - {shopDetails?.specialist}
              </p>
              <p className="content_text">
                Category - {shopDetails?.categorie}
              </p>
              {/* <div
              style={{
                fontFamily: "Poppins",
                marginTop: "10px",
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <p style={{ fontSize: "20px" }}>
                <CiLocationOn />
              </p>
              <p>{shopDetails?.area}</p>
            </div> */}
              <div className="group_btn">
                <button className="Get-Direction-btn" onClick={openGoogleMap}>
                  Get Direction
                </button>

                <button className="buttons-wp mx-2" onClick={chatHandler}>
                  <BsWhatsapp className="me-3" style={{ color: "#4caf50" }} />
                  Chat
                </button>

                {fav ? (
                  <button className="buttons-wp" onClick={removefromFav}>
                    <FaHeart style={{ color: "#FF6C3D" }} />
                    Remove from Favorites
                  </button>
                ) : (
                  <button className="buttons-Favorites" onClick={addToFav}>
                    <FaRegHeart className="me-3" style={{ color: "#fff" }} />
                    Add to Favorites
                  </button>
                )}
              </div>
            </div>

            <hr />
            <div className="Reviews_Ratings mt-4">
              <h2
                style={{ cursor: "pointer" }}
                className="mb-3"
                data-bs-toggle="modal"
                data-bs-target="#Reviews"
              >
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
                <h2 className="mb-3">Start your Review</h2>
                <div className="stars Start-Review">
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
                  4.0{" "}
                  <span className="star">
                    {" "}
                    <StarIcon />
                  </span>
                </span>
                <span className="trend-item">
                  5.0{" "}
                  <span className="star">
                    {" "}
                    <StarIcon />
                  </span>
                </span>
                <span className="trend-item">
                  2.0{" "}
                  <span className="star">
                    {" "}
                    <StarIcon />
                  </span>
                </span>
                <span className="trend-item">
                  5.0{" "}
                  <span className="star">
                    {" "}
                    <StarIcon />
                  </span>
                </span>
                <span className="trend-item">
                  5.0{" "}
                  <span className="star">
                    {" "}
                    <StarIcon />
                  </span>
                </span>
                <span className="trend-item">
                  1.0{" "}
                  <span className="star">
                    {" "}
                    <StarIcon />
                  </span>
                </span>
                <span className="trend-item">
                  5.0{" "}
                  <span className="star">
                    {" "}
                    <StarIcon />
                  </span>
                </span>
                <span className="trend-item">
                  4.0{" "}
                  <span className="star">
                    {" "}
                    <StarIcon />
                  </span>
                </span>
                <span className="trend-item">
                  4.0{" "}
                  <span className="star">
                    {" "}
                    <StarIcon />
                  </span>
                </span>
              </div>

              <h2>User Reviews</h2>
              <div className="review-filters">
                <button className="filter-button">Relevant</button>
                <button className="filter-button">Latest</button>
                <button className="filter-button">High to Low</button>
              </div>

              <div className="user-review border-bottom">
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
                  almost a month. The rooms were very spacious and the room
                  service was well above my expectations. The rooms were
                  thoroughly sanitized and bed was made regularly while the
                  staffs were just a phone call away for all your requirement or
                  food orders.
                </div>
                <div className="review-actions">
                  <button className="action-button">
                    {" "}
                    <ThumbUpAltOutlinedIcon className="me-2" /> Helpful
                  </button>
                  <button className="action-button">
                    <ModeCommentOutlinedIcon className="me-2" />
                    Comment
                  </button>
                  <button className="action-button">
                    <ReplyOutlinedIcon className="me-2" /> Share
                  </button>
                </div>
              </div>
            </div>
            {/* Modal  */}
            <div
              className="modal fade"
              id="Reviews"
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
                            <label className="star">&#9733;</label>5 stars
                          </div>
                          <div className="star_right">
                            <input
                              type="radio"
                              name="rating"
                              id="4-stars"
                              value="4"
                            />
                            <label className="star">&#9733;</label>4 stars
                          </div>
                          <div className="star_right">
                            <input
                              type="radio"
                              name="rating"
                              id="3-stars"
                              value="3"
                            />
                            <label>&#9733;</label>3 stars
                          </div>
                          <div className="star_right">
                            <input
                              type="radio"
                              name="rating"
                              id="2-stars"
                              value="2"
                            />
                            <label className="star">&#9733;</label>2 stars
                          </div>
                          <div className="star_right">
                            <input
                              type="radio"
                              name="rating"
                              id="1-star"
                              value="1"
                            />
                            <label className="star">&#9733;</label>1 star
                          </div>
                        </div>
                      </div>
                      <div className="form-group mb-3">
                        <label>Comments:</label>
                        <textarea
                          className="form-control"
                          id="comments"
                          rows="4"
                        ></textarea>
                      </div>
                      <div className="form-group mb-3">
                        <label>Category:</label>
                        <select className="form-control" id="category">
                          <option>Website Functionality</option>
                          <option>Customer Service</option>
                          <option>Product Quality</option>
                          <option>Other</option>
                        </select>
                      </div>
                      <div className="form-group mb-3">
                        <label>Screenshot (optional):</label>
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
          </div>
          <div className="col-lg-4 mt-5">
            <div style={{ width: "100%", height: "600px" }}>
              <LoadScript googleMapsApiKey="AIzaSyArPjk4KhR-EfvAUhJM93VLNCFUUVQulrI">
                {isValidLatLng(location.lat, location.lng) && (
                  <GoogleMap
                    center={location}
                    zoom={15}
                    mapContainerStyle={{ width: "100%", height: "100%" }}
                  >
                    <Marker position={location} onClick={handleMarkerClick} />
                    {infoWindowOpen && (
                      <InfoWindow
                        position={location}
                        onCloseClick={() => setInfoWindowOpen(false)}
                      >
                        <div>
                          <button onClick={handleDirectionsClick}>
                            Get Directions
                          </button>
                        </div>
                      </InfoWindow>
                    )}
                  </GoogleMap>
                )}
              </LoadScript>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ShopDesc;
