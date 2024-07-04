// import React, { useContext, useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import { CiLocationOn, CiClock2 } from 'react-icons/ci';
// import { BsWhatsapp } from 'react-icons/bs';
// import { FaHeart, FaRegHeart } from 'react-icons/fa6';
// import { addDoc, collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
// import { db } from '../../Config';
// import { AuthContext } from '../../Context/AuthContext';

// const ShopDesc = () => {
//   const { currentUser } = useContext(AuthContext);

//   const location = useLocation();
//   const { shopDetails } = location.state;


//   // State variables for setting the favs
//   const [fav, setFav] = useState(false);
//   const [favDocId, setFavDocId] = useState(null);

//   const checkFavorite = async () => {
//     try {
//       const favourite = collection(db, 'favourite');
//       const querySnapshot = await getDocs(
//         query(favourite, where('id', '==', shopDetails.id))
//       );

//       querySnapshot.forEach((doc) => {
//         console.log(doc.data())
//         if (doc.data().id === shopDetails.id) {
//           setFavDocId(doc.id);
//           setFav(true);
//         }
//       });
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     // Check if the shop is already a favorite
//     checkFavorite();
//   }, [ shopDetails.name]);

//   const chatHandler = () => {
//     const url = `https://wa.me/91${shopDetails.mobile}`;
//     window.open(url, '_blank');
//   };

//   const addToFav = async () => {
//     try {
//       console.log(shopDetails)
//       const favourite = collection(db, 'favourite');
//       const docRef = await addDoc(favourite, {
//         fav: 'shop details',
//         userId: currentUser.uid,
//         id: shopDetails.id,
//         name: shopDetails.name,
//         area: shopDetails.area,
//         building: shopDetails.building,
//         city: shopDetails.city,
//         landmark: shopDetails.landmark,
//         state: shopDetails.state,
//         street: shopDetails.street,
//         days: shopDetails.days,
//         categorie: shopDetails.categorie,
//         opensat: shopDetails.opensat,
//         closesat: shopDetails.closesat,
//         mobile: shopDetails.mobile,
//         subcategorie: shopDetails.subcategorie,
//         imageone: shopDetails.imageone==undefined?'':shopDetails.imageone,
//         imagetwo: shopDetails.imagetwo==undefined?'':shopDetails.imagetwo,
//         imagethree: shopDetails.imagethree==undefined?'':shopDetails.imagethree,
//         imagefour: shopDetails.imagefour==undefined?'':shopDetails.imagefour,
//       });

//       setFav(true);
//       setFavDocId(docRef.id);

//       console.log('Fav set perfectly');
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const removefromFav = async () => {
//     try {
//       const favourite = collection(db, 'favourite');

//       if (favDocId) {
//         await deleteDoc(doc(favourite, favDocId));
//         setFav(false);
//         setFavDocId(null);
//         console.log('Fav removed perfectly');
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div className="shop-desc">
//       <div className="shop-images">
//         <img src={shopDetails.imageone} alt="" />
//         <img src={shopDetails.imagetwo} alt="" />
//         <img src={shopDetails.imagethree} alt="" />
//         <img src={shopDetails.imagefour} alt="" />
//       </div>

//       <div className="shop-name">
//         <h2>{shopDetails.name}</h2>
//       </div>

//       <div className="shop-address">
//         <CiLocationOn style={{ fontSize: '20px' }} />
//         <p>
//           {shopDetails.building}, {shopDetails.street}, {shopDetails.landmark}, {shopDetails.area}, {shopDetails.city}, {shopDetails.state}
//         </p>
//       </div>

//       <div className="shop-timing">
//         <CiClock2 />
//         {Array.isArray(shopDetails.days) && shopDetails.days.length > 0 ? (
//           <p>
//             {shopDetails.days[0]} - {shopDetails.days[shopDetails.days.length - 1]}: {shopDetails.opensat}AM - {shopDetails.closesat} PM
//           </p>
//         ) : (
//           <p>No business days available</p>
//         )}
//       </div>

//       <div className="shop-buttons">
//         <button className="buttons-first">Call for more information</button>
//         <button className="buttons-wp" onClick={chatHandler}>
//           <BsWhatsapp style={{ color: '#1FAF38' }} />
//           Chat
//         </button>
//         {fav ? (
//           <button className="buttons-wp" onClick={removefromFav}>
//             <FaHeart style={{ color: '#FF6C3D' }} />
//             Remove from Favorites
//           </button>
//         ) : (
//           <button className="buttons-wp" onClick={addToFav}>
//             <FaRegHeart style={{ color: '#FF6C3D' }} />
//             Add to Favorites
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ShopDesc;


import HomeNavbar from '../Home/HomeNavbar';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import React, { useContext, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CiLocationOn, CiClock2 } from 'react-icons/ci';
import { BsWhatsapp } from 'react-icons/bs';
import { FaHeart, FaRegHeart } from 'react-icons/fa6';
import { addDoc, collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../Config';
import { AuthContext } from '../../Context/AuthContext';

const ShopDesc = () => {
  const location = useLocation();
  const { shopDetails } = location.state;
  const [fav, setFav] = useState(false);
  const center = [shopDetails.latitude, shopDetails.longitude];
  const navigate = useNavigate()


  const { currentUser } = useContext(AuthContext);


  // State variables for setting the favs
  const [favDocId, setFavDocId] = useState(null);

  const checkFavorite = async () => {
    try {
      const favourite = collection(db, 'favourite');
      const querySnapshot = await getDocs(
        query(favourite, where('id', '==', shopDetails.id))
      );

      querySnapshot.forEach((doc) => {
        console.log(doc.data())
        if (doc.data().id === shopDetails.id) {
          setFavDocId(doc.id);
          setFav(true);
        }
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    // Check if the shop is already a favorite
    checkFavorite();
  }, [ shopDetails.name]);

  const chatHandler = () => {
    const url = `https://wa.me/91${shopDetails.mobile}`;
    window.open(url, '_blank');
  };

  const addToFav = async () => {
    try {
      console.log(shopDetails)
      const favourite = collection(db, 'favourite');
      const docRef = await addDoc(favourite, {
        fav: 'shop details',
        userId: currentUser.uid,
        id: shopDetails.id,
        name: shopDetails.name,
        area: shopDetails.area,
        building: shopDetails.building,
        city: shopDetails.city,
        landmark: shopDetails.landmark,
        state: shopDetails.state,
        street: shopDetails.street,
        days: shopDetails.days,
        categorie: shopDetails.categorie,
        opensat: shopDetails.opensat,
        closesat: shopDetails.closesat,
        mobile: shopDetails.mobile,
        subcategorie: shopDetails.subcategorie,
        imageone: shopDetails.imageone==undefined?'':shopDetails.imageone,
        imagetwo: shopDetails.imagetwo==undefined?'':shopDetails.imagetwo,
        imagethree: shopDetails.imagethree==undefined?'':shopDetails.imagethree,
        imagefour: shopDetails.imagefour==undefined?'':shopDetails.imagefour,
      });

      setFav(true);
      setFavDocId(docRef.id);

      console.log('Fav set perfectly');
    } catch (err) {
      console.error(err);
    }
  };


  console.log(shopDetails);

  const removefromFav = async () => {
        try {
          const favourite = collection(db, 'favourite');
    
          if (favDocId) {
            await deleteDoc(doc(favourite, favDocId));
            setFav(false);
            setFavDocId(null);
            console.log('Fav removed perfectly');
          }
        } catch (err) {
          console.error(err);
        }
      };

  function openGoogleMap() {
    const url = `https://www.google.com/maps?q=${shopDetails.latitude},${shopDetails.longitude}`;
    window.open(url, "_blank");
  }


  const clickHandler=()=>{
    navigate(`/images/${shopDetails.id}`);
  }


  return (
    <>
      <HomeNavbar />

      <div className="image-section">
        {shopDetails.imageone && <img src={shopDetails.imageone} alt="Shop Image" />}
        {shopDetails.imagetwo && <img src={shopDetails.imagetwo} alt="Shop Image" />}
        {shopDetails.imagethree && <img src={shopDetails.imagethree} alt="Shop Image" />}
        {shopDetails.imagefour && <img src={shopDetails.imagefour} alt="Shop Image" />}
        <div style={{ width: "20%", textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center",borderRadius: "20px", 
                    backgroundImage: "linear-gradient(to right, white, grey)" /* Gradient from #FF6C3D to #FFD700 */,
                    border: "none", /* Remove border */
                    color: "black", /* Set text color */
                    padding: "10px 20px", /* Adjust padding */
                    cursor: "pointer", /* Change cursor to pointer on hover */
                    transition: "background-color 0.3s",  }} onClick={clickHandler}>
          Show More
        </div>

      </div>

      <div style={{margin:"50px"}}></div>

      <button onClick={openGoogleMap}>Get Direction</button>

      <span style={{marginLeft:"20px"}}></span>

      <button className="buttons-wp" onClick={chatHandler}>
        <BsWhatsapp style={{ color: '#1FAF38' }} />
           Chat
         </button>

         <span style={{marginLeft:"20px"}}></span>

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

      <div style={{margin:"50px"}}></div>


      <div className='shop-indexing'>
  <div className="shop-details">
    <h2>{shopDetails.name}</h2>
    <div style={{ fontFamily: "Poppins", marginTop: "10px", display: "flex", alignItems: "center", gap: "4px" }}>
      <span style={{ fontSize: "20px" }}><CiLocationOn /></span>
      <p>{shopDetails.street} {shopDetails.landmark}, {shopDetails.area}, {shopDetails.city}, {shopDetails.state}, {shopDetails.pincode}</p>
    </div>
    <p style={{ fontFamily: "Poppins", marginTop: "10px" }}>Time - {shopDetails.opensat}{shopDetails.openam} to {shopDetails.closesat}{shopDetails.closeam}</p>
    <p style={{ fontFamily: "Poppins", marginTop: "10px" }}>Contact - {shopDetails.mobile}</p>
    <p style={{ fontFamily: "Poppins", marginTop: "10px" }}>Home Delivery - {shopDetails.homeDelivery}</p>
    <p style={{ fontFamily: "Poppins", marginTop: "10px" }}>Email - {shopDetails.email}</p>
    <p style={{ fontFamily: "Poppins", marginTop: "10px" }}>Specialist In - {shopDetails.specialist}</p>
    <p style={{ fontFamily: "Poppins", marginTop: "10px" }}>Category - {shopDetails.categorie}</p>
    <div style={{ fontFamily: "Poppins", marginTop: "10px" }}>
      <p>Sub Category -</p>
      <div>
        {shopDetails.subcategorie.map((data, index) => (
          <p key={index}>{data},</p>
        ))}
      </div>
    </div>
  </div>
  <div style={{width:"70%"}}>
    <MapContainer center={center} zoom={30} className='map-style'>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[shopDetails.latitude, shopDetails.longitude]}>
        <Popup>{shopDetails.name}</Popup>
      </Marker>
    </MapContainer>
  </div>
</div>


    </>
  );
};

export default ShopDesc;
