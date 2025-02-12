import React from "react";
import thirdtext from "../assets/background/thirdpagetext.png";
import dance from "../assets/background/secondbar.png";
import audience from "../assets/background/thirdbar.png";
import secondpg from "../assets/background/2nd pg.png";
import '../fonts.css';
import { useEffect, useState } from "react";

export function Page_3() {
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
              }}>
            <img
        src={thirdtext}
        alt="Overlay"
        style={{
            position: 'absolute',
            top: '10px',
            left: '47%',  
            transform: 'translateX(-50%)',
            maxWidth: '90%',
            maxHeight: '90vh', 
            objectFit: 'contain',
            boxSizing: 'border-box'
        }}
      />
     <div
        style={{
          display: 'flex',
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          padding: '20px',
          marginBottom: '20px',
          width: '100%',
          boxSizing: 'border-box',
          marginTop: '10px',
          alignItems: 'center',
          position: 'relative',
          top: 'calc(10px +  60vh)'
        }}
      >
        <div
          style={{
            flex: '0 0 auto',
            width: '80%',
            maxWidth: '400px',
            marginRight: '10px',
            borderRadius: '10px',
            overflow: 'hidden',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            scrollSnapAlign: 'start',
            boxSizing: 'border-box',
            
          }}
        >
          <img
            src={dance}
            alt="Event 1"
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
              objectFit: 'cover',
            }}
          />
        </div>
        <div
          style={{
            flex: '0 0 auto',
            width: '80%',
            maxWidth: '400px',
            marginRight: '10px',
            borderRadius: '10px',
            overflow: 'hidden',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            scrollSnapAlign: 'start',
            boxSizing: 'border-box',
          }}
        >
          <img
            src={audience}
            alt="Event 2"
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
              objectFit: 'cover',
            }}
          />
        </div>
        <div
          style={{
            flex: '0 0 auto',
            width: '80%',
            maxWidth: '400px',
            marginRight: '10px',
            borderRadius: '10px',
            overflow: 'hidden',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            scrollSnapAlign: 'start',
            boxSizing: 'border-box',
          }}
        >
          <img
            src={dance}
            alt="Event 3"
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
              objectFit: 'cover',
            }}
          />
        </div>
        <div
          style={{
            flex: '0 0 auto',
            width: '80%',
            maxWidth: '400px',
            marginRight: '10px',
            borderRadius: '10px',
            overflow: 'hidden',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            scrollSnapAlign: 'start',
            boxSizing: 'border-box',
          }}
        >
          <img
            src={audience}
            alt="Event 4"
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
              objectFit: 'cover',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Page_3;