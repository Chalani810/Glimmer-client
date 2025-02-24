import React from "react";
//import "./style.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-logo">Glimmer</div>
        <p className="footer-text">
          Best event essentials rental service for your special moments.
        </p>
      </div>
      <div className="footer-links">
        <div className="column">
          <h3>About</h3>
          <ul>
            <li><a href="#">Company</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Press</a></li>
          </ul>
        </div>
        <div className="column">
          <h3>Support</h3>
          <ul>
            <li><a href="#">Help Center</a></li>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">FAQs</a></li>
          </ul>
        </div>
        <div className="column">
          <h3>Follow Us</h3>
          <ul className="social-links">
            <li><a href="#">Facebook</a></li>
            <li><a href="#">Instagram</a></li>
            <li><a href="#">Twitter</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2024 Glimmer. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
