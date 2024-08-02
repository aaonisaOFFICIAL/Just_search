import React from "react";
import Language from "../Components/Home/Language";
import CarouselComponent from "../Components/Home/Carousel/Carousel";
import AddOne from "../Components/Home/Adds/AddOne";
import Categories from "../Components/Home/Categories/Categories";
import MapComponent from "../Components/Map/MapComponent";
import Footer from "../Components/Footer/Footer";
import HomeNavbar from "../Components/Home/HomeNavbar";
import AddFive from "../Components/Home/Adds/AddFive";
import HomeMobileNavbar from "../Components/Home/HomeMobileNavbar";
import Categoriesimg from "../Components/Home/categories_top-img/Categoriesimg";
import PopularCategories from "../Components/Home/categories_top-img/PopularCategories";
import Newlylisted from "../Components/Home/categories_top-img/Newlylisted";
import CategoriesimgAds from "../Components/Home/categories_top-img/CategoriesimgAds";
import MobileFooter from "../Components/MobileFooter/MobileFooter";

const HomePage = () => {
  return (
    <div className="home-page-mobile">
      <HomeNavbar />
      {/* <HomeMobileNavbar /> */}
      <Categoriesimg />
      <Language />
      <Categories />
      <PopularCategories />
      <CategoriesimgAds />
      <Newlylisted />
      <AddOne  />
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
  );
};

export default HomePage;
