import React from 'react'
import Language from '../Components/Home/Language'
import CarouselComponent from '../Components/Home/Carousel/Carousel'
import AddOne from '../Components/Home/Adds/AddOne'
import Categories from '../Components/Home/Categories/Categories'
import MapComponent from '../Components/Map/MapComponent'
import Footer from '../Components/Footer/Footer'
import HomeNavbar from '../Components/Home/HomeNavbar'
import AddFive from '../Components/Home/Adds/AddFive'
import HomeMobileNavbar from '../Components/Home/HomeMobileNavbar'
import MobileFooter from '../Components/MobileFooter/MobileFooter'

const HomePage = () => {
  return (

    <div className='home-page-mobile'>
    <HomeNavbar />
    <HomeMobileNavbar />
    <Language />
    <AddOne />
      <Categories />
    {/* <AddOne />
    <AddOne /> */}
    {/* <MapComponent /> */}
    {/* <CarouselComponent /> */}
    {/* <AddFive/> */}
    <Footer />
    <div className="home-page-mobilenav">
    <MobileFooter />
    </div>
    </div>
  )
}

export default HomePage
