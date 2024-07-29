import React, { useContext, useEffect, useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import { FaWhatsapp } from "react-icons/fa6";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { FieldValue, addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc } from "firebase/firestore"
import { db } from "../../Config";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { MdOutlineLocalPhone } from "react-icons/md";

//make changes after authenticating user
const ShopCard = ({id,pincode,specialist, locationLink,name, area, building, city, landmark, state, street, days, categorie, opensat, closesat, mobile, subcategorie, imageone, imagetwo, imagethree, imagefour, homeDelivery,openam,closeam,latitude, email,longitude ,businessName}) => {

  //context api for auth
  const { currentUser } = useContext(AuthContext)

  //state variables for setting the favs
  const [fav, setFav] = useState("")
  const [favDocId, setFavDocId] = useState(null);

  const [index, setIndex] = useState(0);

  //state variables for showing number
  const [showNumber, setShowNumber] = useState(false)

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
        userId:currentUser.uid,
        name:name,
        area:area,
        building:building,
        city:city,
        landmark:landmark,
        state:state,
        street:street,
        days:days,
        categorie:categorie,
        opensat:opensat,
        closesat:closesat,
        mobile:mobile,
        subcategorie:subcategorie,
        imageone,
        imagetwo,
        imagethree,
        imagefour

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
    window.open(url, '_blank');
  };

  //modal handler
  const openModal = () => {
    setShowNumber(!showNumber)
  }
  //navigation
  const navigate = useNavigate()

  const navigateToShopPage = () => {
     

    console.log(latitude);
    console.log(longitude);
    console.log(name);
    console.log(businessName,"bolona");
    const shopDetails = {

      locationLink, pincode,id ,name, area,specialist, building, city, landmark, state, street, days, categorie, opensat, closesat, mobile, subcategorie, imageone, imagetwo, imagethree, imagefour, homeDelivery,openam,closeam,longitude,latitude,email,businessName
    };
    
    navigate(`/shop/${categorie}/${name}`, { state: { shopDetails }});


    console.log(shopDetails)
        navigate(`/shop/${categorie}/${name}`, { state: { shopDetails }});
  };

  //for images 
  const images = [imageone, imagetwo, imagethree, imagefour]
  
  //carousel
  const handleClick = (dir) => {
    const lastIdx = images.length - 1;
    if (dir === "left") {
      if (index === 0) {
        setIndex(lastIdx);
      }
      else{
        setIndex((idx) => idx - 1);
      }
    }
    else if (dir === "right") {
      if (lastIdx === index) {
        setIndex(0);
      }
      else {
        setIndex((idx) => idx + 1);
      }
    }
  }
  useEffect(() => {
    const tid = setInterval(() => {
      handleClick("right");
    }, 7000);
    return () => {
      clearInterval(tid);
    };
  }, [index]);

  return (
   <>
    <div className="shop-container" onClick={navigateToShopPage}>
      <div className="card-image">
        
        <img
          src={images[0]}
          alt="Images"
        />
       
      </div>
      <div className="card-data">
        <h3>{businessName}</h3>
        <div className="card-subcategories">
        {subcategorie.map((value, index) => (
          index <= 2 && <p key={index}>{value}</p>
        ))}
        <p>Show More...</p>
          
        </div>
       <div className="card-timings">
        <p>Home Delivery -</p>
        <p>{homeDelivery}</p>
       </div>
       <div className="card-timings">
       <p>Specialist In<span style={{ marginLeft: '20px' }}>- </span></p>
        <p>{specialist}</p>
       </div>
        <div className="card-address">
           
          <p><CiLocationOn className="icon"/>{area} , {city} </p>
         
        </div>
        


        <div className="card-button">
          <button onClick={openModal}><MdOutlineLocalPhone style={{fontSize:"20px"}}/>{mobile}</button>
          <button onClick={chatHandler}><FaWhatsapp style={{fontSize:"20px"}}/> Chat</button>
        </div>
      </div>
      
    </div>

    
   </>
  );
};

export default ShopCard;
