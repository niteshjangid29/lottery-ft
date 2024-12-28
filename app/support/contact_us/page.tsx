"use client";
import React, { useState } from "react";
import {
  FaEnvelope,
  FaWhatsapp,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
// import Spinner from "../utils/spinner";
// import { submitContactUs } from "../utils/API/contactus";
const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    subject: "",
    message: "",
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.email || !formData.subject || !formData.message) {
      setError("All fields are required");
      return;
    }

    // try {
    // 	const response = await submitContactUs(formData);
    // 	if (response) {
    // 		//   notify("Message submitted successfully!");
    // 		setFormData({
    // 			email: "",
    // 			subject: "",
    // 			message: "",
    // 		});
    // 	} else {
    // 		//   notify("Failed to submit the message. Please try again.");
    // 	}
    // } catch (error) {
    // 	console.error("Error while submitting the contact form:", error);
    // 	// notify("An unexpected error occurred. Please try again later.");
    // } finally {
    // 	setloading(false);
    // }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4">Contact Us</h1>
        <p className="text-gray-600 text-center mb-6">
          Got a technical issue? Want to send feedback? Let us know.
        </p>
        <form onSubmit={handleSubmit}>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Your Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="name@example.com"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="subject"
              className="block text-sm font-medium text-gray-700"
            >
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Let us know how we can help you"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700"
            >
              Your Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Leave a comment..."
              rows={4}
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {/* {loading ? <Spinner /> : "Send message"} */}
            Send message
          </button>
        </form>
      </div>
      <div className="mt-6">
        <h2 className="text-center text-gray-600 text-sm mb-2">
          Connect with us:
        </h2>
        <div className="flex justify-center gap-4">
          {/* Email */}
          <a
            href="mailto:example@example.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-500 transition"
          >
            <FaEnvelope size={24} />
          </a>
          {/* WhatsApp */}
          <a
            href="https://wa.me/84638 16668"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-green-500 transition"
          >
            <FaWhatsapp size={24} />
          </a>
          {/* Instagram */}
          <a
            href="https://www.instagram.com/gofulltoss/?hl=en"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-pink-500 transition"
          >
            <FaInstagram size={24} />
          </a>
          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/company/gofulltoss/posts/?feedView=all"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-700 transition"
          >
            <FaLinkedin size={24} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
