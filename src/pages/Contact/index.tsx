import React, { useState } from 'react';
import PageLayout from '../../layout/PageLayout';
import PageHeader from '../../component/parts/PageHeader';

const index: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: '',
  });

  const services = [
    'Web Development',
    'Mobile App Development',
    'SEO Optimization',
    'Digital Marketing',
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic (e.g., send data to the API)
    console.log(formData);
  };

  return (
    <PageLayout>
      <PageHeader title="Contact Us" />
      <div className={`flex flex-col md:flex-row items-center py-16 px-8 space-y-8 md:space-y-0 `}>
        {/* Left side: Image */}
        <div className="flex-1">
          <img
            src="http://localhost:1337/uploads/contact_01be6eb5e9.png"
            alt="Contact Us"
            className="w-full h-full object-cover "
          />
        </div>

        {/* Right side: Contact Form */}
        <div className="flex-1 bg-white p-8">
          <h2 className="font-semibold text-yellow-500 text-center mb-6 uppercase text-2xl">Let us join you on your journey to success! Contact us now to get started.</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-lg font-medium mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="Enter your name"
              />
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-lg font-medium mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="Enter your phone number"
              />
            </div>

            {/* Service */}
            <div>
              <label htmlFor="service" className="block text-lg font-medium mb-2">
                Interested Service
              </label>
              <select
                id="service"
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              >
                <option value="">Select a service</option>
                {services.map((service, index) => (
                  <option key={index} value={service}>
                    {service}
                  </option>
                ))}
              </select>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full py-3 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </PageLayout>
  );
};

export default index;
