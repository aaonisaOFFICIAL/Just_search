import React, { useEffect, useState } from 'react';
import { data } from './Data';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../../../Config';
import { useNavigate, useParams } from 'react-router-dom';

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [showAllCategories, setShowAllCategories] = useState(false);

    const getCategories = async () => {
        try {
            const categorie = collection(db, "categories");
            const q = query(categorie);
            const querySnapshot = await getDocs(q);
            const categoriesData = querySnapshot.docs.map((doc) => {
                return { id: doc.id, ...doc.data() };
            });

            setCategories(categoriesData);
        } catch (err) {
            console.error(err);
        }
    }

    // Navigation for a category
    const navigate = useNavigate();
    const navigateToCategoryShop = (category) => {
        navigate(`/${category}`);
    }

    useEffect(() => {
        getCategories();
    }, []);

    const renderCategories = () => {
        if (showAllCategories) {
            return categories.map((value, index) => (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }} key={index}>
                    <div className="categorie-box" onClick={() => navigateToCategoryShop(value.categorie)}>
                        <img src={value.imageUrl} alt="Logo" />
                    </div>
                    <p>{value.categorie}</p>
                </div>
            ));
        } else {
            // Display limited number of categories
            const limitedCategories = categories.slice(0, 9); // Adjust the number as needed
            return limitedCategories.map((value, index) => (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }} key={index}>
                    <div className="categorie-box" onClick={() => navigateToCategoryShop(value.categorie)}>
                        <img src={value.imageUrl} alt="Logo" />
                    </div>
                    <p>{value.categorie}</p>
                </div>
            ));
        }
    }

    const handleShowMoreClick = () => {
        setShowAllCategories(!showAllCategories);
    }

    return (
        <div className="categorie">
            {renderCategories()}
            {categories.length > 8 && (
                <button 
                className='categorie-box-button'
               
                onClick={handleShowMoreClick}
            >
                {showAllCategories ? "Show Less" : "Show More"}
            </button>
            
            )}
        </div>
    );
}

export default Categories;
