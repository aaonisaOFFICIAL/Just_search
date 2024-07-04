import React from 'react'
import { Route, Routes } from 'react-router-dom'

//page imports
import LoginPage from './Pages/LoginPage'
import OtpPage from './Pages/OtpPage'
import Navbar from './Components/Navbar/Navbar'
import BuisnessListeningPageOne from './Pages/BuisnessListeningPageOne'
import HomePage from './Pages/HomePage'
import Shop from './Pages/Shop'
import MobileFooter from './Components/MobileFooter/MobileFooter'
import Favourite from './Pages/Favourite'
import ProductScreen from './Pages/ProductScreen'
import ProdutPage from './Components/Deals/ProdutPage'
import DealsFooter from './Components/Deals/DealsFooter'
import Footer from './Components/Footer/Footer'
import DealsMobileNavbar from './Components/Deals/DealsMobileNavbar'
import ViewDealsPage from './Pages/ViewDealsPage'
import PostAd from './Pages/PostAd'
import HomeMobileNavbar from './Components/Home/HomeMobileNavbar'
import UserPostings from './Components/Deals/UserPostings'
import ShopDesc from './Components/ShopDesc/ShopDesc'
import UserSearch from './Components/UserSearch/UserSearch'
import Offer from './Components/Offer/Offer'
import CreateOffer from './Components/Offer/CreateOffer'

//styles
import "./Styles/Auth.scss"
import "./Styles/Navbar.scss"
import "./Styles/BuisnessListening.scss"
import "./Styles/Home.scss"
import "./Styles/Categories.scss"
import "./Styles/Shop.scss"
import "./Styles/MobileFooter.scss"
import "./Styles/ProductScreen.scss"
import "./Styles/Favourite.scss"
import "./Styles/ProductPage.scss"
import "./Styles/DealsFooter.scss"
import "./Styles/PostAdd.scss"
import "./Styles/DealsNavbar.scss"
import "./Styles/MapComponent.scss"
import "./Styles/Uploader.scss"
import "./Styles/Footer.scss"
import "./Styles/DealsMobileNavbar.scss"
import "./Styles/DealsCategorieNavbar.scss"
import "./Styles/HomeNavbar.scss"
import "./Styles/HomeMobileNavbar.scss"
import "./Styles/UserPostings.scss"
import "./Styles/ShopDesc.scss"
import "./Styles/UserSearch.scss"
import "./Styles/FilterOptions.scss"
import "./Styles/CreateOffer.scss"
import "./Styles/Offer.scss"
import "./Styles/OfferNavbar.scss"
import BuisnessListeningPageTwo from './Pages/BusinessListingPageTwo'
import BusinessEditForm from './Components/BuissnessListening/BusinessEditForm'
import ShopImages from './Components/ShopDesc/ShowImages'

const App = () => {
  const getState = () => {
    
  }
  return (
    <>
  {/* <Navbar /> */}
   <Routes>
    <Route path='/login' element={<LoginPage />} />
    <Route path='/otp' element={<OtpPage />} />
    <Route path='/' element={<HomePage />} />
    <Route path='/business-listening' element={<BuisnessListeningPageOne />} />
    <Route path='/:category' element={<Shop />} />
    <Route path='/shop/:category/:name' element={<ShopDesc />} />
    <Route path='/product-screen' element={<ProductScreen />} />
    <Route path='/favourite' element={<Favourite />} />
    <Route path='/product-page' element={<ViewDealsPage />} />
    <Route path='/post-ad' element={<PostAd />} />
    <Route path='/my-postings' element={<UserPostings />} />
    <Route path='/query/:state/:city/:categorie' element={<UserSearch />} />
    <Route path='/offer' element={<Offer />} />
    <Route path='/create-offer' element={<CreateOffer />} />
    <Route path='/only/for/admin' element={<BuisnessListeningPageTwo />} />
    <Route path="/edit/:id" element={<BusinessEditForm />} />
    <Route path='/images/:id' element={<ShopImages />} />
   </Routes>
   {/* <HomeMobileNavbar /> */}
   {/* <DealsMobileNavbar /> */}
   {/* <Footer /> */}
   {/* <MobileFooter /> */}
   {/* <DealsFooter /> */}
    </>
  )
}

export default App
