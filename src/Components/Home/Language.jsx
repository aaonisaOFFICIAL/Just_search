import React, { useEffect, useState } from 'react';
import stateDistrictData from '../../../state_district.json'; // Adjust path as per your file location
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../Config";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';

const Language = () => {
  const [states, setStates] = useState([]);
  const [selectedStateOption, setSelectedStateOption] = useState('');
  const [categorie, setCategorie] = useState([]);
  const [selectedCategoire, setSelectedCategorie] = useState('');
  const [district, setDistrict] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState('');
console.log(selectedDistrict,'================')
  const navigate = useNavigate();

  useEffect(() => {
    // Set initial states from JSON data
    setStates(Object.keys(stateDistrictData));
  }, []);

  const fetchDistricts = (state) => {
    // Fetch districts based on selected state from JSON data
    const districts = stateDistrictData[state];
    setDistrict(districts);
  };


  const getCategorie = async() => {
    try{
      const categorie = collection(db, 'categories')
      const data = await getDocs(categorie)

      const categorieInRange = data.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      setCategorie(categorieInRange)
    }
    catch(err){
      console.error(err)
    }
  }
  useEffect(() => {
    getCategorie();
  }, []);

  
  const handleClick = () => {
    const userChoice = {
      selectedStateOption,
      selectedDistrict,
      selectedCategoire
    }
    navigate(`/query/${selectedStateOption}/${selectedDistrict}/${selectedCategoire}`, { state:{ userChoice }})
  }

  return (
    <div className="language">
      <select onChange={(e) => {
        setSelectedStateOption(e.target.value);
        fetchDistricts(e.target.value);
      }}>
        <option value='selected'>State</option>
        {states?.map((state, index) => (
          <option value={state} key={index}>{state}</option>
        ))}
      </select>

      <select onChange={(e) => setSelectedDistrict(e.target.value)}>
        <option value="nostate">City</option>
        {district?.map((city, index) => (
          <option value={city} key={index}>{city}</option>
        ))}
      </select>

      <select onChange={(e) => setSelectedCategorie(e.target.value)}>
        <option value="">Category</option>
        {categorie.map((data, index) => (
          <option value={data.categorie} key={index}>{data.categorie}</option>
        ))}
      </select>

      <button onClick={handleClick} disabled={selectedStateOption === '' || selectedCategoire === ''}>Search</button>
    </div>
  );
};

export default Language;
