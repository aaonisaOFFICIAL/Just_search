import React from 'react'
import { useNavigate } from 'react-router-dom'

const OfferNavbar = () => {
  const navigate = useNavigate()

  const navigateToCreate = () => {
    navigate("/create-offer")
  }
  return (
    <div className='offer-navbar-container'>
        <div className='offer-navbar'>
        <h1>Just <span>Search</span></h1>
        <button onClick={navigateToCreate}>Create Offer</button>
        </div>
    </div>
  )
}

export default OfferNavbar
