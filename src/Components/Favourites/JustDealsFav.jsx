import React, { useContext, useEffect, useState } from 'react'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../Config'
import { AuthContext } from '../../Context/AuthContext'
import ProductCard from '../Deals/ProductCard'

const JustDealsFav = () => {
  const [data, setData] = useState([])

  const { currentUser } = useContext(AuthContext)
  
  const getData = async() => {
    try{
      const fav = collection(db, "dealsfavourite")
      const q = query(fav, where("userId", "==", currentUser.uid))
      const querySnapshot = await getDocs(q)
      const usersInRange = querySnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      console.log(usersInRange)
      setData(usersInRange)
    }
    catch(err){
      console.error(err)
    }
  }

  useEffect(() => {
    getData()
  }, [])
  return (
    <div className="just-deals__fav">
     {data.map((data) => (
    <ProductCard id={data.id} image={data.image} price={data.price} desc={data.desc} city={data.city}/>
     ))}
    </div>
  )
}

export default JustDealsFav