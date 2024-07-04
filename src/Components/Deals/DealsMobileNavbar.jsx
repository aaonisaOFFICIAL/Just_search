import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { IoMdNotificationsOutline } from "react-icons/io";
import { collection, getDoc, getDocs, query } from "firebase/firestore";
import { db } from "../../Config";

const DealsMobileNavbar = () => {
  const [category, setCategory] = useState([])
  const getAllCategory = async() => {
    try{
      const category = collection(db, "categories")
      const q = query(category)
      const querySnapshot = await getDocs(q)

      const usersInRange = querySnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      setCategory(usersInRange)
    }
    catch(err){
      console.error(err)
    }
  }

  useEffect(() => {
    getAllCategory()
  }, [])
  return (
    <>
    <div className="deals-mobile-navbar">
      <h1>Just <span>Deal</span></h1>
    </div>
    <div className="deals-mobile-wrapper">
      <div className="deals-mobile">
        <div className="mobile-search">
          <IoSearch style={{color:"#FF6C3D", fontSize:"20px"}}/>
          <input type="text" placeholder="Find Cars, Mobile Phones and more..."/>
         </div>
           <IoMdNotificationsOutline className="deals-mobile--icon"/>
       </div>
     </div>

     <div className="deals-mobile-category">
     <p>Browse Category</p>

     <div className="category-sldier">
      {category.map((value) => (
        <div className="slider-boxes">
        <img src={value.imageUrl} alt={value.categorie}/>
        <p>{value.categorie}</p>
        </div>
      ))}
     
     </div>
     </div>
    </>
  );
};

export default DealsMobileNavbar;
