import React from "react";
import "../styles.css"; // Import CSS

const Header = () => {
  return (
<header className="header">
  <div className="logo">
    <span className="black">GLI</span>
    <span className="red">MM</span>
    <span className="black">ER</span>
  </div>
  <nav>
    <ul>
      <li><a href="#">Home</a></li>
      <li><a href="#">Events</a></li>
      <li><a href="#">Services</a></li>
      <li><a href="#">Contact</a></li>
    </ul>
  </nav>
  <button className="btn">Sign Up</button>
</header>
  );
};

export default Header;
