import React from "react";
import '../fonts.css';
import React from "react";
import Page1 from "./home";
import Page2 from "./page2";
import Page3 from "./page3";
import Page4 from "./about";

const App = () => {
  return (
    <div
      style={{
        height: "100vh",
        overflowY: "scroll",
        scrollSnapType: "y mandatory"
      }}
    >
      <div style={{ height: "100vh", scrollSnapAlign: "start" }}>
        <Page1 />
      </div>
      <div style={{ height: "100vh", scrollSnapAlign: "start" }}>
        <Page2 />
      </div>
      <div style={{ height: "100vh", scrollSnapAlign: "start" }}>
        <Page3 />
      </div>
      <div style={{ height: "100vh", scrollSnapAlign: "start" }}>
        <Page4 />
      </div>
    </div>
  );
};

export default App;