import React from 'react';
import { API_BASE_URL } from '../App';

function ContactUs() {
  return (
    <div className="flex flex-col md:flex-row justify-between p-8 bg-gray-100 min-h-screen">
      {/* Contact Us Section */}
      <div className="md:w-1/2 p-4">
        <h1 className="text-3xl font-bold mb-4 text-[#003180ff]">Contact Us</h1>
        <p className="mb-4 text-gray-700">
          If you have any questions or concerns, feel free to reach out to us!
        </p>
        <form className="bg-white p-6 rounded-lg shadow-md">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full mb-4 p-2 border border-gray-300 rounded"
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full mb-4 p-2 border border-gray-300 rounded"
            required
          />
          <textarea
            placeholder="Your Message"
            className="w-full mb-4 p-2 border border-gray-300 rounded"
            rows="5"
            required
          ></textarea>
          <button
            type="submit"
            className="bg-[#003180ff] text-white py-2 px-4 rounded hover:bg-[#002060] transition duration-300"
          >
            Send Message
          </button>
        </form>
      </div>

      {/* Google Map Section */}
      <div className="md:w-1/2 p-4">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.790610042135!2d36.782031773527166!3d-1.3004861986871614!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f1a6bf7445dc1%3A0x940b62a3c8efde4c!2sMoringa%20School!5e0!3m2!1sen!2sus!4v1729664657367!5m2!1sen!2sus"
          width="600"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
}

export default ContactUs;
