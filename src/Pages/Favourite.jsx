import React, { useState } from 'react'
import JustSearchFavs from '../Components/Favourites/JustSearchFavs'
import JustDealsFav from '../Components/Favourites/JustDealsFav'
import ProductCard from '../Components/Deals/ProductCard'
import HomeNavbar from '../Components/Home/HomeNavbar'
import HomeMobileNavbar from '../Components/Home/HomeMobileNavbar'
import MobileFooter from '../Components/MobileFooter/MobileFooter'

const Favourite = () => {
    const [activeTab, setActiveTab] = useState(1)

    const handleTabClick = (tab) => {
        setActiveTab(tab)
    }

  return (
    <>
    <HomeNavbar />
    {/* <HomeMobileNavbar /> */}
    <div className="favourite">
        <div className='active-tab'>
        <button onClick={() => handleTabClick(1)} className={activeTab === 1 ? "active" : ""}>Just Search Favs</button>
        <button onClick={() => handleTabClick(2)} className={activeTab === 2 ? "active" : ""}>Just Deals Favs</button>
        </div>

        {
            activeTab === 1 && (
                <div className="fav-tab">
                    <JustSearchFavs />
                </div>
            )
        }

        {
            activeTab === 2 && (
                <div className="fav-tab">
                    <JustDealsFav />
                </div>
            )
        }

    </div>
    <div className="home-page-mobilenav">
    <MobileFooter />
    </div>
    </>
  )
}

export default Favourite