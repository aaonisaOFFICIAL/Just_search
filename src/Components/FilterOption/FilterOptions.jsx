import { collection, getDocs, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../../Config'

const FilterOptions = () => {
    const { category } = useParams()

    const [subCategory, setSubCategory] = useState([])

    const getSubCategory = async() => {
        try{
            const data = collection(db, "categories")
            const q = query(data, where("categorie", "==", category))
            const querySnapshot = await getDocs(q)

            const usersInRange = querySnapshot.docs.map((doc) => {
                return { id: doc.id, ...doc.data() };
              });

              setSubCategory(usersInRange)
        }
        catch(err){
            console.error(err.message)
        }
    }
    useEffect(() => {
        getSubCategory()
    }, [])
  return (
    <div className="filter-option">
       <div>
        <p>Sort By</p>
        {subCategory.map((data, index) => (
            <p key={index}>{data.subCategorie}</p>
        ))}
       </div>
    </div>
  )
}

export default FilterOptions