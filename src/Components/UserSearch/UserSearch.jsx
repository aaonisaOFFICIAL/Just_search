import React, { useEffect, useState, useCallback } from 'react';
import HomeNavbar from '../Home/HomeNavbar';
import ShopCard from '../ShopListing/ShopCard';
import { useLocation } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../Config';

const UserSearch = () => {
    const [queryData, setQueryData] = useState([]);
    const [demo, setDemo] = useState([]);
    const [subCategorie, setSubCategorie] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const { userChoice } = location.state;




    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            const dataCollection = collection(db, 'buissness-listing');
            const q = query(
                dataCollection,
                where('state', '==', userChoice.selectedStateOption),
                where('district', '==', userChoice.selectedDistrict),
                where('categorie', '==', userChoice.selectedCategoire)
            );
            const querySnapshot = await getDocs(q);

            const dataInRange = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setQueryData(dataInRange);
            setDemo(dataInRange);

            const categoriesCollection = collection(db, 'categories');
            const q1 = query(categoriesCollection, where('categorie', '==', userChoice.selectedCategoire));
            const querySnapshot1 = await getDocs(q1);

            const subCategoriesInRange1 = querySnapshot1.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));

            const res = subCategoriesInRange1.flatMap(category => category.subCategorie.split(','));
            setSubCategorie(res);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [userChoice]);


    console.log(queryData, userChoice)

    const changeHandler = useCallback(e => {
        const res = e.target.value;
        const filteredData = demo.filter(data => data.subcategorie.includes(res));
        setQueryData(filteredData);
    }, [demo]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <HomeNavbar />
            <div style={{ display: 'flex', maxWidth: '500px', margin: 'auto', padding: '30px' }}>
                <p style={{ fontSize: '20px', fontWeight: 'bold' }}>Select Sub - Category</p>
                <div style={{ width: '10px' }}></div>
                <select
                    style={{ borderRadius: '14px', border: '1px solid', padding: '5px' }}
                    onChange={changeHandler}
                >
                    {subCategorie.map((data, index) => (
                        <option key={index} value={data}>
                            {data}
                        </option>
                    ))}
                </select>
            </div>
            <div className="user-search">
                {queryData.map((value, index) => (
                     <ShopCard
                     key={index}
                     name={value?.username || 'N/A'}
                     id={value?.id || 'N/A'}
                     area={value?.area || 'N/A'}
                     pincode={value?.pincode || 'N/A'}
                     building={value?.building || 'N/A'}
                     city={value?.district || 'N/A'}
                     landmark={value?.landmark || 'N/A'}
                     state={value?.state || 'N/A'}
                     street={value?.street || 'N/A'}
                     days={value?.daysopen || []}
                     categorie={value?.categorie || 'N/A'}
                     opensat={value?.opensat || 'N/A'}
                     closesat={value?.closesat || 'N/A'}
                     mobile={value?.mobilenumber || 'N/A'}
                     subcategorie={value?.subcategorie || []}
                     imageone={value?.images?.[0] || 'defaultImageURL'}
                     imagetwo={value?.images?.[1] || 'defaultImageURL'}
                     imagethree={value?.images?.[2] || 'defaultImageURL'}
                     imagefour={value?.images?.[3] || 'defaultImageURL'}
                     latitude={value?.latitude || 'N/A'}
                     longitude={value?.longitude || 'N/A'}
                     specialist={value?.specialist || 'N/A'}
                     homeDelivery={value?.homedelivery || 'N/A'}
                     closeam={value?.closeam || 'N/A'}
                     openam={value?.openam || 'N/A'}
                     email={value?.email || 'N/A'}
                     locationLink={value?.locationLink || 'N/A'}
                 />
                ))}
            </div>
        </>
    );
};

export default UserSearch;
