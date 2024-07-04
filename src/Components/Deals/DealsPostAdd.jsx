import React, { useEffect, useState } from 'react'
import { addDoc, collection, getDocs, query,where } from "firebase/firestore"
import { db, storage } from "../../Config"
import { IoArrowBack } from "react-icons/io5";
import { MdCloudUpload } from 'react-icons/md';
import MultipleCheckmarks from "./Multi";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useNavigate } from 'react-router-dom';


const DealsPostAdd = () => {
  const [currentStep ,setCurrentStep] = useState(1)
  const [images, setImages] = useState([]);
  const [category, setCategory] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState("")
  const [subCategorie, setSubCategorie] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState("")
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [price, setPrice] = useState("")
  const [number, setNumber] = useState("")
  const [state, setState] = useState("")
  const [city, setCity] = useState("")
  const [apartment, setApartment] = useState("")
  const [sellingReason, setSellingReason] = useState("")
  const [email, setEmail] = useState("")
  const [name, setName] = useState('')

  const nextStep = (data) => {
    setCurrentStep((prev) => prev+1 )
  }


  const nextCatStep = (data) => {
    setCurrentStep((prev) => prev+1 )
    setSelectedCategory(data)
  
  }

  
  const nextStepSub = (data) => {
    setSelectedSubCategory(data)
    setCurrentStep((prev) => prev + 1)
  }

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1)
  }

  const getCategoryData = async() => {
    try{
      const category = collection(db, "dealscategories")
      const q= query(category)

      const querySnapshot = await getDocs(q)
      const usersInRange = querySnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });

      setCategory(usersInRange)
      
    }
    catch(err){
      console.error(err)
    }
  }

  const handleSubCategoryChange = (selectedSubCategorie) => {
    setSubCategorie(selectedSubCategorie);
    console.log(subCategorie);
  };

  useEffect(() => {
    getCategoryData()
  }, []);



  const handleFileChange = (event, index) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      const objectURL = URL.createObjectURL(selectedFile);

      // Update the images array based on the index
      setImages((prevImages) => {
        const updatedImages = [...prevImages];
        updatedImages[index] = { file: selectedFile, objectURL };
        return updatedImages;
      });
    }
  };
  const navigate = useNavigate()

  const postYourAdd = async () => {
    try {
      // Ensure at least one image is selected
      if (!images || images.length === 0 || !images[0]?.file) {
        // Handle the case where no image is selected
        console.error("Please select at least one image.");
        return;
      }
  
      // Upload images
      const imageUrls = [];
      for (let i = 0; i < images.length; i++) {
        const storageRef = ref(storage, `post-ad/${images[i].file.name}`);
        await uploadBytes(storageRef, images[i].file);
        const imageURL = await getDownloadURL(storageRef);
        imageUrls.push(imageURL);
      }
  
      // Now, you can use imageUrls in your userData
      const postAdd = collection(db, "postadd");
      const userData = {
        categorie: selectedCategory,
        title: title,
        description: desc,
        price: price,
        number: number,
        state: state,
        city: city,
        apartment: apartment,
        images: imageUrls,
        email:email,
        subCategorie: subCategorie,
        sellingReason:sellingReason,
        username:name
      };
      await addDoc(postAdd, userData);
      navigate("/product-screen");
    } catch (err) {
      console.error(err);
    }
  };
 
  return (
    <>
    <div className="deals-post-add">
      <h1>POST YOUR AD</h1>
      {currentStep === 1 && (
        <div className="post-step__one">
          <h2>CHOOSE A CATEGORY</h2>

          <div className="category-listing">
            <div className="listing-row-one">
              {category.map((data, index) => (
                <div className="category-list" key={index} onClick={() => nextCatStep(data.categorie)} >
                  <img src={data.imageUrl} alt={data.categorie} />
                  <p>{data.categorie}</p>
                </div>
              ))}
            </div>

            
          </div>
          
        </div>
      )}
{currentStep === 2 && (
        <div className="post-step__one">
          <div className="post-step__new">
           <IoArrowBack className='back-arrow' onClick={prevStep}/>
          </div>
          <h2>CHOOSE A SUB CATEGORY</h2>

          <div className="category-listing">
            <div className="listing-row-one">
            <MultipleCheckmarks
              categorie={selectedCategory}
              onSubCategoryChange={handleSubCategoryChange}
            />


            <div style={{height:"50px"}}></div>
            
            <button style={{maxWidth:"200px",display:"block",margin:"auto",backgroundColor:"#FF6C3D",padding:"10px",borderRadius:"10px",color:"white"}} onClick={nextStep}>Next</button>
            <div style={{height:"50px"}}></div>
            </div>            
          </div>
          
        </div>
      )}
      {currentStep === 3 && (
        <div className="post-step__two">
          <div className="step-two__heading">
            <IoArrowBack className='back-arrow' onClick={prevStep}/>
            <h3>INCLUDE SOME DETAILS</h3>
          </div>

          <div className="step-tow__body">
            <div>
              <h4>Ad Title</h4>
              <input type="text" onChange={(e) => setTitle(e.target.value)}/>
            </div>

            <div>
              <h4>Description</h4>
              <textarea placeholder='Include condition, features and reason for selling' onChange={(e) => setDesc(e.target.value)}/>
              <p className='max-words'>Max words: {250-desc.length}</p>
            </div>

            <div>
              <h4>Selling Reason</h4>
              <textarea placeholder='Include condition, features and reason for selling' onChange={(e) => setSellingReason(e.target.value)}/>
              <p className='max-words'>Max words: {250-sellingReason.length}</p>
            </div>
          </div>

          <div className="step-two__btn">
          <button onClick={nextStep} disabled={title === "" || desc === "" || sellingReason === "" }>Continue</button>
          </div>
        </div>
      )}

      {currentStep === 4 && (
        <div className="post-step__three">
          <div className="step-three__heading">
            <IoArrowBack className='back-arrow' onClick={prevStep}/>
            <h3>INCLUDE SOME DETAILS</h3>
          </div>

          <div className="step-three__body">
            <div>
              <p>Set a price</p>
              <input type="text" maxLength={10} onChange={(e) => setPrice(e.target.value)}/>
            </div>

              <p>Upload Upto 6 Photos</p>
            <div className='upload-images'>
              
          <div>
          {[...Array(6)].map((_, index) => (
           <form key={index}>
             <label htmlFor={`fileInput${index}`}>
               <input
                 type="file"
                 id={`fileInput${index}`}
                 accept="image/*"
                 className="input-field"
                 hidden
                 onChange={(event) => handleFileChange(event, index)}
               />
 
               {images[index] ? (
                 <img
                   src={images[index].objectURL}
                   width={120}
                   height={120}
                   alt={images[index].file.name}
                 />
               ) : (
                 <>
                   <MdCloudUpload color="#1475cf" size={60}/>
                   <p>Browse Files to upload</p>
                 </>
               )}
             </label>
           </form>
         ))}
          </div>
       
            </div>

            <div>
              <p>For Enquiry</p>
              <input type="text" placeholder='Enter Name*'  style={{marginTop:"10px"}} onChange={(e) => setName(e.target.value)}/>
              <input type="text" style={{marginTop:"10px"}} maxLength={10} onChange={(e) => setNumber(e.target.value)} placeholder='Mobile Number*'/>
              <input type="email" placeholder='Email Address' style={{marginTop:"10px"}} onChange={(e) => setEmail(e.target.value)}/>
            </div>
            
            <div>
              <p>Confirm Your Location</p>
              <input type="text" placeholder='Apartment, Colony street name, Landmark' style={{margin:"5px"}} onChange={(e) => setApartment(e.target.value)}/>
              <input type="text" placeholder='City*' style={{margin:"5px"}} onChange={(e) => setCity(e.target.value)}/>
              <input type="text" placeholder='State*' style={{margin:"5px"}} onChange={(e) => setState(e.target.value)}/>
            </div>
          </div>
          
          <div className='step-three__btns'>
            <button onClick={postYourAdd} disabled={price === "" || number === "" || name === "" || state === "" || city === ""}>Post Now</button>
          </div>
        </div>
      )}

      
    </div>
      {/* <div className="product-screen-footer">
    <DealsFooter />
    </div> */}
    </>
  )
}

export default DealsPostAdd


