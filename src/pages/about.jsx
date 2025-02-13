import React from "react";
import secondpg from "../assets/background/2nd pg.png";
import fourthtext from "../assets/background/fourthpagetext.png";
import video from "../assets/background/video.png";

function About() {
  return (
    <div
      style={{
                      backgroundImage: `url(${secondpg})`,
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                      minHeight: "100vh",
                      width: "100vw",
                      position: 'relative',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
    >
      <img
        src={fourthtext}
        alt="Overlay"
        style={{
            position: 'absolute',
            top: '3%',
            left: '50%',  
            transform: 'translateX(-50%)',
            maxWidth: '90%',
            maxHeight: '90vh', 
            objectFit: 'contain',
            boxSizing: 'border-box'
        }}
      />
      <img
        src={video}
        alt="New Image"
        style={{
          position: 'absolute',
          top: '40%',
          left: '5%',
          maxWidth: '90%', 
          maxHeight: '40vh', 
          objectFit: 'contain', 
          borderRadius: '20px'
        }}
      />
    </div>
  );
};

export default About;
