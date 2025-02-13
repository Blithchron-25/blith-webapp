import React from 'react';
import './Banner.css';

const Banner = () => {
  return (
    <div className="banner">
      <div className="banner-content">
        <div className="banner-message">
          <p>Please open this application on a mobile phone for the best experience.</p>
        </div>
        <div className="banner-image">
          <img src="/404-error.jpg" alt="Use mobile" />
        </div>
      </div>
    </div>
  );
};

export default Banner;