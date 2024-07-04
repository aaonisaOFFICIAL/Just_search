import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import { db, storage } from '../../Config';
import { AuthContext } from '../../Context/AuthContext';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import OfferNavbar from './OfferNavbar';
import { useNavigate } from 'react-router-dom';

const CreateOffer = () => {
  const { currentUser } = useContext(AuthContext)
  const navigate = useNavigate();
  // Create state to store image files and their previews
  const [imageFiles, setImageFiles] = useState(Array.from({ length: 5 }, () => null));
  const [imagePreviews, setImagePreviews] = useState(Array.from({ length: 5 }, () => null));
  const [categorie ,setCategorie] = useState([])
  const [selectedCategorie, setSelectedCategoire] = useState("")
  const [businessName, setBusinessName] = useState("")
  const [user, setUser] = useState([])
  const [err, setErr] = useState(null)
  const [date, setDate] = useState(null)
  const [prices, setPrices] = useState(Array.from({ length: 5 }, () => ""));

  // Handle image file change
  const handleImageChange = (index, event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newPreviews = [...imagePreviews];
        newPreviews[index] = e.target.result;
        setImagePreviews(newPreviews);

        const newFiles = [...imageFiles];
        newFiles[index] = file;
        setImageFiles(newFiles);
      };
      reader.readAsDataURL(file);
    }
  };
  //handling price event
  const handlePriceChange = (index, event) => {
    const newPrices = [...prices];
    newPrices[index] = event.target.value;
    setPrices(newPrices);
  };
  
  const productBoxes = Array.from({ length: 5 });

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

  
  //check if user has listed their business
  const checkListedUser = async() => {
    try{
      const checkUser = collection(db, "buissness-listing")
      const q = query(checkUser, where("businessName", "==", businessName))
      const querySnapshot = await getDocs(q)
      const dataInRange = querySnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      setUser(dataInRange)
    } 
    catch(err){
      console.error(err.message)
    } 
  }
  useEffect(() => {
    getCategorie()
  }, [])

  useEffect(() => {
    checkListedUser()

  }, [businessName])
  console.log(user)

  //handle Submit for submiting data
  const storageRef = ref(storage, 'images');
  const handleSubmit = async () => {
    
    if(businessName === '' || date === null || selectedCategorie === ''){
      setErr("Fill the feilds correctly")
    }
    if (user.length === 0 || user[0].businessName !== businessName) {
      setErr("Business is not listed");
      return; // Stop execution if this condition is true
    }
    try {
      alert("please wait");
      // Create an array to store image download URLs
      const imageUrls = [];
      

      // Loop through each image file, create a blob, and upload it to Firebase Storage
      for (let i = 0; i < imageFiles.length; i++) {
        const file = imageFiles[i];
        if (file) {
          const blob = new Blob([file]);
          const imageRef = ref(storageRef, `${businessName}-image-${i + 1}`);
          await uploadBytes(imageRef, blob);

          // Get the download URL of the uploaded image
          const imageUrl = await getDownloadURL(imageRef);

          imageUrls.push(imageUrl);
        }
      }

      // Create user data object
      const userData = {
        businessName:businessName,
        date:date,
        categorie:selectedCategorie,
        images: imageUrls, 
        approved:true,
        state:user[0].state,
        prices:prices
      };
      
      // Add the user data to Firestore
      const docRef = await addDoc(collection(db, 'offer-listing'), userData);
      alert("This Offer Will Showing For 24 Hour");
      console.log('Document written with ID: ', docRef.id);
      navigate("/");
      setErr(null)
    } catch (err) {
      console.error(err.message);
    }
  };
 
  return (
    <>
    <OfferNavbar />
      <div className='create-offer'>
      <h1>Create Offer</h1>

      <div className="date-category">
          <input type="text" placeholder='Enter Business-Name' onChange={(e) => setBusinessName(e.target.value)}/>
        <input type="date" onChange={(e) => setDate(e.target.value)}/>
        <select onChange={(e) => setSelectedCategoire(e.target.value)}>
          <option value="Select">Select Category</option>
          {
            categorie.map((data, index) => (
              <option value={data.categorie} key={index}>{data.categorie}</option>
            ))
          }
        </select>
      </div>

      <div className="product-images">
        {productBoxes.map((_, index) => (
          <div key={index} className="product-box">
            <input
              type="file"
              accept="image/*"
              onChange={(event) => handleImageChange(index, event)}
            />
            {imagePreviews[index] && (
              <img src={imagePreviews[index]} alt={`Product Preview ${index + 1}`} className='preview-image'/>
            )}
          </div>
        ))}
      </div>
        {err && <p style={{color:"red", marginTop:"10px"}}>{err}</p>}
      <button className='create-offer-submit' onClick={handleSubmit}>Submit</button>
    </div>
    </>
  );
};

export default CreateOffer;
