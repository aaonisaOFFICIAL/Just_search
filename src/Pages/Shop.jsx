import React, { useEffect, useState } from 'react'
import ShopCard from '../Components/ShopListing/ShopCard'
import HomeNavbar from '../Components/Home/HomeNavbar'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../Config'
import { useParams } from 'react-router-dom'
import MapComponent from '../Components/Map/MapComponent'

const Shop = () => {
  // state variables for getting registered shop
  const [shop, setShop] = useState([])
  const { category } = useParams();
  const [demo,setDemo] = useState([]);
  const [subCategory, setSubCategory] = useState([])
  const [selectedSubCategory, setSelectedSubCategory] = useState(null)
  const [filteredData, setFilteredData] = useState([])

  console.log(category,'testing')
  console.log(shop,'shop')
  // function for fetching the registered shops
  const fetchShop = async() => {
    try {
      const shopCollection = collection(db, "buissness-listing")
      let q = query(shopCollection, where("categorie", "==", category))
      const querySnapshot = await getDocs(q)
      
      const usersInRange = querySnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });

      setShop(usersInRange)
      setDemo(usersInRange)
      console.log(usersInRange)
    } catch(err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchShop()
  }, [])


  const getSubCategory = async() => {
    try {
      const data = collection(db, "categories")
      const q = query(data, where("categorie", "==", category))
      const querySnapshot = await getDocs(q)

      const usersInRange = querySnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });

      setSubCategory(usersInRange)

      const subCategories = usersInRange.map((data) => {
        return data.subCategorie.split(",");
      }).flat(); // Use flat() to flatten the array of arrays into a single array
      setFilteredData(subCategories);
    } catch(err) {
      console.error(err.message)
    }
  }

  useEffect(() => {
    getSubCategory()
  }, [])


  const changeHandler=(e)=>{
    const res = e.target.value;
   const data =  demo.filter((data)=>{
        const temp = data.subcategorie;
        return temp.includes(res)
    })

    setShop(data)
}

  const handleSubCategoryClick = (subCategoryName) => {
    setSelectedSubCategory(subCategoryName)
  }
  console.log(filteredData)

  return (
    <>
      <HomeNavbar />
      <div style={{display:'inline-flex',maxWidth:'500px',margin:'auto',display:'flex',padding:'30px'}}>
        <p style={{fontSize:'20px',fontWeight:'bold',color:''}}>Select Sub - Category</p><div style={{width:'10px'}}></div>
        <select style={{borderRadius: '14px',border: '1px solid',padding: '5px'}} onChange={changeHandler}>
            {
                filteredData.map((data)=>(
                    <option>{data}</option>
                ))
            }
        </select>
    </div>
      {shop.map((value) => (
        <ShopCard
          key={value.id}
          id = {value.id}
          name={value.username}
          area={value.area}
          building={value.building}
          city={value.district}
          landmark={value.landmark}
          state={value.state}
          street={value.street}
          days={value.daysopen}
          pincode = {value.pincode}
          categorie={value.categorie}
          opensat={value.opensat}
          closesat={value.closesat}
          mobile={value.mobilenumber}
          subcategorie={value.subcategorie}
          category={category}
          specialist= {value.specialist}
          imageone={value.images[0]}
          imagetwo={value.images[1]}
          imagethree={value.images[2]}
          imagefour={value.images[3]}
          homeDelivery={value.homedelivery}
          openam={value.openam}
          closeam={value.closeam}
          latitude={value.latitude}
          longitude={value.longitude}
        />
      ))}
    </>
  )
}

export default Shop
