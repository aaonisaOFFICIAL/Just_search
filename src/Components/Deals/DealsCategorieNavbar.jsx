// DealsCategorieNavbar.js
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../../Config';


const DealsCategorieNavbar = ({ state, city, handleData }) => {
  const [categories, setCategories] = useState([]);
  const [subCategorie, setSubCategorie] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedSubCategory, setSelectedSubCategory] = useState('')

  const getCategories = async () => {
    try {
      const categoryCollection = collection(db, 'dealscategories');
      const data = await getDocs(categoryCollection);

      const categoriesInRange = data.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCategories(categoriesInRange);
    } catch (err) {
      console.error(err);
    }
  };

  const getSubCategories = async () => {
    try {
      const data = collection(db, 'dealscategories');
      const q = query(data, where('categorie', '==', selectedCategory));
      const querySnapshot = await getDocs(q);

      const subCategoriesInRange = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSubCategorie(subCategoriesInRange.flatMap((category) => category.subCategorie.split(',')));
      console.log(subCategorie);
      // setSubCategorie(subCategoriesInRange);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      getSubCategories();
    }
  }, [selectedCategory]);

  const getData = async() => {
    try{
      const data = collection(db, "postadd")
      const q = query(data, where("state", "==", state), where("city", "==", city), where("categorie", "==", selectedCategory))
      const querySnapshot = await getDocs(q)
      const dataInRange = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      handleData(dataInRange)
    }
    catch(err){
      console.error(err.message)
    }
  }

  

  return (
    <div className='deals-category-navbar'>
      <select onChange={(e) => setSelectedCategory(e.target.value)}>
        <option value='Select'>Select Category</option>
        {categories.map((data, index) => (
          <option value={data.categorie} key={index}>
            {data.categorie}
          </option>
        ))}
      </select>
      <select onChange={(e) => setSelectedSubCategory([e.target.value])}>
        {/* Ensure that onSubCategoryChange receives an array */}
        <option value='Select'>Select Sub-Category</option>
        {subCategorie.map((data, index) => (
          <option value={data} key={index}>
            {data}
          </option>
        ))}
      </select>
      <button onClick={getData}>Search</button>
    </div>
  );
};

export default DealsCategorieNavbar;
