import React from "react";
import {
  FaFacebookF,
  FaYoutube,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhoneAlt,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white text-gray-800 border-t border-gray-200 px-6 md:px-5 py-20">
      <div className="max-w-full mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Logo & About */}
        <div>
          <img
            src="https://i.ibb.co/bfRfmnh/506449397-122099659574908092-5042721577538220121-n.jpg"
            alt="Inception Academy"
            className="w-40 -mt-10 "
          />
          <p className="text-gray-600 -mt-5 text-base leading-relaxed">
            Inception Academy is building future-ready freelancers with skills in AI, Robotics & Modern Tech. Our mission: Empowering Bangladesh through education.
          </p>
          <div className="flex space-x-3 mt-6">
            <a href="#" className="bg-gray-100 p-2.5 rounded-full text-gray-600 hover:bg-teal-500 hover:text-white shadow transition duration-300">
              <FaFacebookF />
            </a>
            <a href="#" className="bg-gray-100 p-2.5 rounded-full text-gray-600 hover:bg-teal-500 hover:text-white shadow transition duration-300">
              <FaYoutube />
            </a>
            <a href="mailto:inceptionacademy@gmail.com" className="bg-gray-100 p-2.5 rounded-full text-gray-600 hover:bg-teal-500 hover:text-white shadow transition duration-300">
              <FaEnvelope />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-3 text-gray-600 text-base">
            <li><a href="#" className="hover:text-teal-500 transition">Home</a></li>
            <li><a href="#" className="hover:text-teal-500 transition">Courses</a></li>
            <li><a href="#" className="hover:text-teal-500 transition">About Us</a></li>
            <li><a href="#" className="hover:text-teal-500 transition">Blog</a></li>
            <li><a href="#" className="hover:text-teal-500 transition">Success Stories</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
          <div className="space-y-5 text-gray-600 text-base">
            <div className="flex items-start">
              <FaMapMarkerAlt className="text-teal-500 text-lg mt-1 mr-3" />
              <span>Kushtia, Lahini, Bottola</span>
            </div>
            <div className="flex items-center">
              <FaPhoneAlt className="text-teal-500 text-lg mr-3" />
              <a href="tel:01983274783" className="hover:text-teal-500 transition">01983-274783</a>
            </div>
            <div className="flex items-center">
              <FaEnvelope className="text-teal-500 text-lg mr-3" />
              <a href="mailto:inceptionacademy@gmail.com" className="hover:text-teal-500 transition">
                inceptionacademy@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Google Map */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Find Us</h3>
          <div className="rounded-xl overflow-hidden shadow border border-gray-200 hover:border-teal-400 transition">
            <iframe
              title="Map"
              className="w-full h-52 grayscale hover:grayscale-0 transition duration-500"
              src="https://www.google.com/maps?q=kushtia+bottola&output=embed"
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-12 pt-6 border-t border-black text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Inception Academy. Crafted with care in Bangladesh.
      </div>
    </footer>
  );
};

export default Footer;
