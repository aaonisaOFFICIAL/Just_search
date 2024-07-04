import React, { useContext, useEffect, useState } from 'react';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { FaWhatsapp } from "react-icons/fa";
import bike from "../../Assests/bike.jpg"
import { AuthContext } from '../../Context/AuthContext';
import { addDoc, collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { db } from '../../Config';
import DealsFooter from './DealsFooter';
import { useLocation } from 'react-router-dom';

const ProdutPage = () => {
  const location = useLocation();
  const { productDetails } = location.state;
  //context api
  const { currentUser } = useContext(AuthContext)
  //state variable for setting favs
  const [fav, setFav] = useState(false);
  const [favDocId, setFavDocId] = useState(null);


  //function for fetching the favs
  const fetchFav = async () => {
    const favourite = collection(db, "dealsfavourite");
    const querySnapshot = await getDocs(favourite);
    
    querySnapshot.forEach((doc) => {
      if (doc.data().id === productDetails.id) {
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
      const favourite = collection(db, "dealsfavourite");
      const docRef = await addDoc(favourite, {
        fav: "shop details",
        userId:currentUser.uid,
        id: productDetails.id,
        image:productDetails.image, 
        price:productDetails.price,
        desc:productDetails.desc, 
        city:productDetails.city,
        number:productDetails.number,
        username:productDetails.username,
        apartment:productDetails.apartment

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
      const favourite = collection(db, "dealsfavourite");

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
  
  const whatsappHandler = () => {
    const url = `https://wa.me/91${productDetails.number}`;
        window.open(url, '_blank');
  }
  return (
    <>
    <div className="product-page">
      <div className="page-user">
        <div className="page-product__desc">
          <h2>₹{productDetails.price}</h2>

          <p>
            {productDetails.desc}
          </p>
          {fav ? (
            <FaHeart className='fav-icon' onClick={removefromFav} style={{color:"rgb(197, 12, 12)"}}/>
          ) : (
            <FaRegHeart className='fav-icon' onClick={addToFav} />
          )}
        </div>

        <div className="page-product__details">
          <div>
          <img src="https://cdn-icons-png.flaticon.com/512/6596/6596121.png" alt="Avatar" />
            <div>
            <h2>{productDetails.username}</h2>
            <p>{productDetails.apartment}</p>
            </div>
              <FaWhatsapp className='whatsapp-icon' onClick={whatsappHandler}/>
          </div>
            <button>Call Seller For More Information</button>
        </div>

        {/* <div className="page-product__brand">
          <div>
            <p>Brand</p>
            <p>Yamaha</p>
          </div>
          <div>
            <p>Brand</p>
            <p>Yamaha</p>
          </div>
          <div>
            <p>Brand</p>
            <p>Yamaha</p>
          </div>
          <div>
            <p>Brand</p>
            <p>Yamaha</p>
          </div>
        </div> */}
      </div>

      <div className="page-images">
        <img src={productDetails.image} alt="Product Image" />
      </div>
    </div>
      {/* <div className="product-screen-footer">
   <DealsFooter />
   </div> */}
   </>
  );
};

export default ProdutPage;
