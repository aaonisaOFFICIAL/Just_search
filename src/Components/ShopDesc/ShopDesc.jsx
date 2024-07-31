import HomeNavbar from '../Home/HomeNavbar';
import React, { useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CiLocationOn } from 'react-icons/ci';
import { BsWhatsapp } from 'react-icons/bs';
import { FaHeart, FaRegHeart } from 'react-icons/fa6';
import { addDoc, collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../Config';
import { AuthContext } from '../../Context/AuthContext';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

const ShopDesc = () => {
    const [location, setLocation] = useState({ lat: null, lng: null });
    const [infoWindowOpen, setInfoWindowOpen] = useState(false);
    const locations = useLocation();
    const navigate = useNavigate();
    const { currentUser } = useContext(AuthContext);

    let { shopDetails } = locations.state || {};

    const center = useMemo(() => [shopDetails?.latitude, shopDetails?.longitude], [shopDetails?.latitude, shopDetails?.longitude]);

    const [fav, setFav] = useState(false);
    const [favDocId, setFavDocId] = useState(null);

    const checkFavorite = useCallback(async () => {
        if (!shopDetails?.id) return;
        try {
            const favourite = collection(db, 'favourite');
            const querySnapshot = await getDocs(query(favourite, where('id', '==', shopDetails.id)));

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
        window.open(url, '_blank');
    }, [shopDetails?.mobile]);

    const addToFav = useCallback(async () => {
        if (!currentUser?.uid || !shopDetails) return;
        try {
            const favourite = collection(db, 'favourite');
            const docRef = await addDoc(favourite, {
                fav: 'shop details',
                userId: currentUser.uid,
                ...shopDetails,
                imageone: shopDetails.imageone || '',
                imagetwo: shopDetails.imagetwo || '',
                imagethree: shopDetails.imagethree || '',
                imagefour: shopDetails.imagefour || '',
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
            await deleteDoc(doc(collection(db, 'favourite'), favDocId));
            setFav(false);
            setFavDocId(null);
        } catch (err) {
            console.error(err);
        }
    }, [favDocId]);

    const openGoogleMap = useCallback(() => {
        debugger
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
            setLocation({ lat: parseFloat(shopDetails.latitude), lng: parseFloat(shopDetails.longitude) });
        }
    };

    const parseLocationLink = (link) => {
        try {
            const url = new URL(link);
            const coords = url.pathname.split('@')[1].split(',');
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
    
    }else
{
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

            <div className="image-section">
                {shopDetails?.imageone && <img src={shopDetails?.imageone} alt="Shop Image" />}
                {shopDetails?.imagetwo && <img src={shopDetails?.imagetwo} alt="Shop Image" />}
                {shopDetails?.imagethree && <img src={shopDetails?.imagethree} alt="Shop Image" />}
                {shopDetails?.imagefour && <img src={shopDetails?.imagefour} alt="Shop Image" />}
                <div
                    style={{
                        width: "20%",
                        textAlign: "center",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: "20px",
                        backgroundImage: "linear-gradient(to right, white, grey)",
                        border: "none",
                        color: "black",
                        padding: "10px 20px",
                        cursor: "pointer",
                        transition: "background-color 0.3s",
                    }}
                    onClick={clickHandler}
                >
                    Show More
                </div>
            </div>

            <div style={{ margin: "50px" }}></div>

            <button onClick={openGoogleMap}>Get Direction</button>

            <span style={{ marginLeft: "20px" }}></span>

            <button className="buttons-wp" onClick={chatHandler}>
                <BsWhatsapp style={{ color: '#1FAF38' }} />
                Chat
            </button>

            <span style={{ marginLeft: "20px" }}></span>

            {fav ? (
                <button className="buttons-wp" onClick={removefromFav}>
                    <FaHeart style={{ color: '#FF6C3D' }} />
                    Remove from Favorites
                </button>
            ) : (
                <button className="buttons-wp" onClick={addToFav}>
                    <FaRegHeart style={{ color: '#FF6C3D' }} />
                    Add to Favorites
                </button>
            )}

            <div style={{ margin: "50px" }}></div>

            <div className='shop-indexing'>
                <div className="shop-details">
                    <h2>{shopDetails?.name}</h2>
                    <div style={{ fontFamily: "Poppins", marginTop: "10px", display: "flex", alignItems: "center", gap: "4px" }}>
                        <span style={{ fontSize: "20px" }}><CiLocationOn /></span>
                        <p>{shopDetails?.street} {shopDetails?.landmark}, {shopDetails?.area}, {shopDetails?.city}, {shopDetails?.state}, {shopDetails?.pincode}</p>
                    </div>
                    <p style={{ fontFamily: "Poppins", marginTop: "10px" }}>Time - {shopDetails?.opensat}{shopDetails.openam} to {shopDetails.closesat}{shopDetails.closeam}</p>
                    <p style={{ fontFamily: "Poppins", marginTop: "10px" }}>Contact - {shopDetails?.mobile}</p>
                    <p style={{ fontFamily: "Poppins", marginTop: "10px" }}>Home Delivery - {shopDetails?.homeDelivery}</p>
                    <p style={{ fontFamily: "Poppins", marginTop: "10px" }}>Email - {shopDetails?.email}</p>
                    <p style={{ fontFamily: "Poppins", marginTop: "10px" }}>Specialist In - {shopDetails?.specialist}</p>
                    <p style={{ fontFamily: "Poppins", marginTop: "10px" }}>Category - {shopDetails?.categorie}</p>
                    <div style={{ fontFamily: "Poppins", marginTop: "10px", display: "flex", alignItems: "center", gap: "4px" }}>
                        <p style={{ fontSize: "20px" }}><CiLocationOn /></p>
                        <p>{shopDetails?.area}</p>
                    </div>
                </div>

                <div style={{ width: "100%", height: "400px" }}>
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

                                            <button onClick={handleDirectionsClick}>Get Directions</button>
                                        </div>
                                    </InfoWindow>
                                )}
                            </GoogleMap>
                        )}
                    </LoadScript>
                </div>
            </div>
        </>
    );
};

export default ShopDesc;
