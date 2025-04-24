import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#f1281a] text-white py-12">	
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-5 gap-10">
        {/* Logo + tagline */}
        <div>
          <h1 className="text-3xl font-extrabold text-black">
            Gl<span className="text-white">immer</span>
          </h1>
          <p className="mt-4 text-white font-semibold leading-6">
            Don’t Wait! It’s Time To Plan <br />
            Unforgettable Events And Create <br />
            Magical Moments That Last A Lifetime.
          </p>
        </div>

        {/* About */}
        <div>
          <h2 className="text-lg font-bold text-black mb-3">About</h2>
          <ul className="space-y-1 text-white">
            <li>Our Story</li>
            <li>Careers</li>
            <li>Our Team</li>
            <li>Resources</li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h2 className="text-lg font-bold text-black mb-3">Support</h2>
          <ul className="space-y-1 text-white">
            <li>Feedback</li>
            <li>Contact Us</li>
            <li>Help Center</li>
            <li>Terms of Service</li>
          </ul>
        </div>

        {/* Find Us */}
        <div>
          <h2 className="text-lg font-bold text-black mb-3">Find Us</h2>
          <ul className="space-y-1 text-white">
            <li>Events</li>
            <li>Locations</li>
            <li>Newsletter</li>
          </ul>
        </div>

        {/* Address */}
        <div>
          <h2 className="text-lg font-bold text-black mb-3">Address</h2>
          <p className="text-white">
            Lavender Lights Events <br />
            123 Celebration Lane <br />
            Blissville, Dreamstate 4567 <br />
            United States
          </p>
        </div>
      </div>
      {/* Bottom Bar */}
      <div className="bg-[#262626] max-w-7xl mx-auto px-6 py-8 rounded-lg" >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm font-semibold text-white">
            2025 UI DESIGN All Rights Reserved.
          </p>
          <div className="flex gap-4 text-white text-lg">
            <FaFacebookF className="cursor-pointer hover:text-gray-300" />
            <FaTwitter className="cursor-pointer hover:text-gray-300" />
            <FaInstagram className="cursor-pointer hover:text-gray-300" />
            <FaYoutube className="cursor-pointer hover:text-gray-300" />
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
