import React, { useEffect, useState } from 'react'
import HomeNavbar from '../Home/HomeNavbar'
import ShopCard from '../ShopListing/ShopCard'
import { useLocation } from 'react-router-dom'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../Config'

const UserSearch = () => {
    const [queryData, setQueryData] = useState([]);
    const [demo,setDemo] = useState([]);
    const [subCategorie, setSubCategorie] = useState([]);
    const location = useLocation()
    const { userChoice } = location.state
    
    const fetchData = async() => {
        try{
            const data = collection(db, "buissness-listing")
            const q = query(data, where("state", "==", userChoice.selectedStateOption), where("categorie", "==", userChoice.selectedCategoire))
            const querySnapshot = await getDocs(q)

            const dataInRange = querySnapshot.docs.map((doc) => {
                return { id: doc.id, ...doc.data() };
              });
              setQueryData(dataInRange)
              setDemo(dataInRange);


              console.log(dataInRange);



              const data1 = collection(db, 'categories');
                const q1 = query(data1, where('categorie', '==', userChoice.selectedCategoire));
                const querySnapshot1 = await getDocs(q1);

                const subCategoriesInRange1 = querySnapshot1.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                const res = subCategoriesInRange1.flatMap((category) => category.subCategorie.split(','))

                setSubCategorie(res);
                console.log(res);
        }
        catch(err){
            console.error(err)
        }
    }

    const changeHandler=(e)=>{
        const res = e.target.value;
       const data =  demo.filter((data)=>{
            const temp = data.subcategorie;
            return temp.includes(res)
        })

        setQueryData(data)
    }

    useEffect(() => {
        fetchData()
    }, [])
  return (
    <>
    <HomeNavbar />
    <div style={{display:'inline-flex',maxWidth:'500px',margin:'auto',display:'flex',padding:'30px'}}>
        <p style={{fontSize:'20px',fontWeight:'bold',color:''}}>Select Sub - Category</p><div style={{width:'10px'}}></div>
        <select style={{borderRadius: '14px',border: '1px solid',padding: '5px'}} onChange={changeHandler}>
            {
                subCategorie.map((data)=>(
                    <option>{data}</option>
                ))
            }
        </select>
    </div>
    <div className="user-search">
        {queryData.map((value, index) => (
            <ShopCard name={value.username} id={value.id} area={value.area} pincode={value.pincode} building={value.building} city={value.district} landmark={value.landmark} state={value.state} street={value.street} days={value.daysopen} categorie={value.categorie} opensat={value.opensat} closesat={value.closesat} mobile={value.mobilenumber} subcategorie = {value.subcategorie} imageone={value.images[0]} imagetwo={value.images[1]} imagethree={value.images[2]} imagefour={value.images[3]} latitude={value.latitude} longitude={value.longitude} specialist={value.specialist} homeDelivery={value.homedelivery} closeam={value.closeam} openam={value.openam} email={value.email}/>
        ))}     
    </div>
    </>
  )
}

export default UserSearch