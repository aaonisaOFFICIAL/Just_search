import React from 'react'
import { Route, Routes } from 'react-router-dom'

// Page imports
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

// Policies and Contact Pages
import CancellationRefundPolicy from './Pages/Policies/CancellationRefundPolicy'
import ShippingDeliveryPolicy from './Pages/Policies/ShippingDeliveryPolicy'
import ContactUs from './Pages/Policies/ContactUs'

// Styles
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
import Aboutus from './Pages/Aboutus'
import UserDetails from './Pages/UserDetails'
import EditBusinessProfile from './Pages/EditBusinessProfile'
import GetPremium from './Pages/GetPremium'
import Customer from './Pages/Customer'
import Terms from './Pages/Terms'
import Policy from './Pages/Policy'
import Hiring from './Pages/Hiring'
import HelpandSupport from './Pages/HelpandSupport'

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
        <Route path='/payment' element={<ShopImages />} />
        <Route path='/Aboutus' element={<Aboutus />} />  
        <Route path='/edit-business-profile' element={<EditBusinessProfile />} />  
        <Route path='/get-premium' element={<GetPremium />} />  
        <Route path='/customer-care' element={<Customer />} />  
        <Route path='/terms-of-service' element={<Terms />} />  
        <Route path='/privacy-policy' element={<Policy />} />  
        <Route path='/we-are-hiring' element={<Hiring />} />  
        <Route path='/help-and-support' element={<HelpandSupport />} />  
        <Route path='/UserDetails' element={<UserDetails />} />  
        
        {/* New Pages */}
        <Route path='/cancellation-and-refund-policy' element={<CancellationRefundPolicy />} />
        <Route path='/shipping-and-delivery-policy' element={<ShippingDeliveryPolicy />} />
        <Route path='/contact-us' element={<ContactUs />} />
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
