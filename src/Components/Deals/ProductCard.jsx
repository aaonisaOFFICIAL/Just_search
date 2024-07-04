import React, { useContext, useEffect, useState } from 'react'
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import { addDoc, collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { db } from '../../Config';

const ProductCard = ({id, image, price, desc, city, number, username, apartment }) => {
  //using context api
  const { currentUser } = useContext(AuthContext)

  //setting the favs
  const [fav, setFav] = useState("")
  const [favDocId, setFavDocId] = useState(null);
  const [data, setData] = useState([])

  //function for fetching the favs
  const fetchFav = async () => {
    const favourite = collection(db, "dealsfavourite");
    const querySnapshot = await getDocs(favourite);
    
    querySnapshot.forEach((doc) => {
      if (doc.data().id === id) {
        setFavDocId(doc.id);
        setFav(true);
      }
    });
  };
  useEffect(() => {
    // Fetch the user's favorite document ID
    fetchFav();
    
  }, []);

  const addToFav = async (e) => {
    e.stopPropagation()
    try {
      const favourite = collection(db, "dealsfavourite");
      const docRef = await addDoc(favourite, {
        fav: "shop details",
        userId:currentUser.uid,
        image:image, 
        price:price,
        desc:desc, 
        city:city,
        number:number,
        username:username,
        apartment:apartment,
        id : id
      });

      setFav(true);
      setFavDocId(docRef.id);

    } catch (err) {
      console.error(err);
    }
  };

  const removefromFav = async (e) => {
    e.stopPropagation()
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

  useEffect(() => {
    const data = collection(db, "postadd")
  }, [])

  
  const navigate = useNavigate()
  const navigateToProductScreen = () => {
    const productDetails = {
      id,
      image,
      price,
      desc,
      city,
      number,
      username,
      apartment
    }
    
    navigate("/product-page", { state: { productDetails }});
  }
  return (
    <div className="product-card" onClick={navigateToProductScreen}>
        <div className="card-image">
        <img src={image} alt="Image" />
        <FaRegHeart className='image-heart'/>
        {
        fav ? (
          <FaHeart  className="image-heart active" onClick={removefromFav}/>
        ) : 
        (
          <FaRegHeart className="image-heart" onClick={addToFav} />
        )
      }
        </div>

        <h2>{price}</h2>
        <p>{desc}</p>
        <div className='card-address'>
        <p>{city}</p>
        {/* <p>15 Dec</p> */}
        </div>
    </div>
  )
}

export default ProductCard