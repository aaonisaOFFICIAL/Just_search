import React, { useEffect, useState } from "react";
import "./Carousel.css"

const Carousel = () => {
  const [index, setIndex] = useState(0);
  //for images
  const images = ["https://images.unsplash.com/photo-1579353977828-2a4eab540b9a?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2FtcGxlfGVufDB8fDB8fHww", 
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-vBPal6njFZ16lz2xMDzSJMMxwQr2Yatw7A&usqp=CAU",
  "https://image.shutterstock.com/image-vector/sample-stamp-square-grunge-sign-260nw-1474408826.jpg"];

  const handleClick = (dir) => {
    const lastIdx = images.length - 1;
    if (dir === "left") {
      if (index === 0) {
        setIndex(lastIdx);
      } else {
        setIndex((idx) => idx - 1);
      }
    } else if (dir === "right") {
      if (lastIdx === index) {
        setIndex(0);
      } else {
        setIndex((idx) => idx + 1);
      }
    }
  };

  useEffect(() => {
    const tid = setInterval(() => {
      handleClick("right");
    }, 7000);

    return () => {
      clearInterval(tid);
    };
  }, [index]);

  return (
    <>
      <div className="carousel">
      <button onClick={() => handleClick("left")}>{"<"}</button>
          <img src={images[index]} alt="not-found" />
          <button onClick={() => handleClick("right")} className="right">
            {">"}
          </button>
      </div>
    </>
  );
};

export default Carousel;
