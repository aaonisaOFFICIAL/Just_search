import { useParams } from "react-router-dom";
import { db } from "../../Config";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";


const ShopImages = () => {

    const {id} = useParams();
    const [data,setdata] = useState([]);
    const [images,setImages] = useState([]);
  

    useEffect(() => {
        const fetchBusinessData = async () => {
          try {
            const businessRef = doc(db, "buissness-listing", id);
            const businessSnapshot = await getDoc(businessRef);
            if (businessSnapshot.exists()) {
              const res = businessSnapshot.data();
              setdata(res);
              const img = res.images;
              const product = res.productimages;
              const combinedArray = img.concat(product);
              setImages(combinedArray)
            } else {
              console.log("No such document!");
            }
          } catch (error) {
            console.error("Error fetching document:", error);
          }
        };
    
        fetchBusinessData();
      }, [id]);


  return (
            <Carousel>
               {
                images.map((data)=>{
                    return <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <img height={"700px"} src={data} />
                  </div>
                })
               }
            </Carousel>
  );
};

export default ShopImages;
