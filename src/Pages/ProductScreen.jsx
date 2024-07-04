import React, { useEffect, useState } from 'react';
import ProductCard from '../Components/Deals/ProductCard';
import DealsNavbar from '../Components/Deals/DealsNavbar';
import DealsFooter from '../Components/Deals/DealsFooter';
import DealsMobileNavbar from '../Components/Deals/DealsMobileNavbar';
import DealsCategorieNavbar from '../Components/Deals/DealsCategorieNavbar';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../Config';

const ProductScreen = () => {
  const [data, setData] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [city, setCity] = useState('');
  const [fetchedData, setFetchedData] = useState([]);

  const getData = async () => {
    try {
      const user = collection(db, 'postadd');
      const q = await getDocs(user);

      const usersInRange = q.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      setData(usersInRange);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleGetData = (data) => {
    setFetchedData(data);
  };

  const handleStateChange = (state) => {
    setSelectedState(state);
  };

  const handleCityChange = (city) => {
    setCity(city);
  };

  return (
    <div className='product-screen-wrapper'>
      <div className='product-screen-navs'>
        <DealsNavbar
          selectedState={selectedState}
          onStateChange={handleStateChange}
          city={city}
          onCityChange={handleCityChange}
        />
        <DealsMobileNavbar />
        <DealsCategorieNavbar state={selectedState} city={city} handleData={handleGetData} />
      </div>
      <div className='product-screen'>
        <h1>Fresh Recommendation</h1>

        <div className='product-cards--container'>
          {(fetchedData.length > 0 ? fetchedData : data).map((data, index) => (
            <ProductCard
              key={index}
              id={data.id}
              image={data.images[0]}
              price={data.price}
              desc={data.description}
              city={data.city}
              number={data.number}
              username={data.username}
              apartment={data.apartment}
            />
          ))}
        </div>
      </div>
      <div className='product-screen-footer'>
        <DealsFooter />
      </div>
    </div>
  );
};

export default ProductScreen;
