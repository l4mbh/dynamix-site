/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import PageHeader from '../../component/parts/PageHeader';
import { Button, CircularProgress, Container } from '@mui/material';
import { Mail, Phone, PinDrop } from '@mui/icons-material';
import axiosInstance from '../../api/axiosInstance';

const index: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: '',
    email: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const commonHost = import.meta.env.VITE_COMMON_HOST

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
    setSubmitting(true);
    setError(null);
    axiosInstance.post(`/form-submissions`, formData)
      .then((response) => {
        // Xử lý phản hồi thành công
        if(response.data.success) {
          setSubmitting(false);
          setIsSubmitted(true);
        } else {
          setSubmitting(false);
          setError(response.data.message);
        }
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
        setSubmitting(false);
        // Xử lý lỗi khi gửi form
      });
  };

  return (
    <>
      <PageHeader title="Contact Us" />
      <Container maxWidth='xl'>
        <div className='grid grid-cols-1 md:grid-cols-3 items-stretch justify-between space-x-4 py-16 px-8'>
          <div className='col-span-1 !h-full flex items-center space-x-4 border p-5 group'>
            <PinDrop className='!text-6xl bg-slate-100 p-2 group-hover:bg-yellow-primary transition-all duration-200 group-hover:text-white' />
            <div>
              <h3 className='text-2xl font-bold'>Address</h3>
              <p className='text-sm'>51 Nguyen Cu Trinh St., Nguyen Cu Trinh Ward, District 1, Ho Chi Minh City</p>
            </div>
          </div>
          <div className='flex items-center space-x-4 border p-5 group'>
            <Phone className='!text-6xl bg-slate-100 p-2 group-hover:bg-yellow-primary transition-colors duration-200 group-hover:text-white' />
            <div>
              <h3 className='text-2xl font-bold'>Phone</h3>
              <p className='text-lg'>+84.90.6868.913</p>
            </div>
          </div>
          <div className='flex items-center space-x-4 border p-5 group'>
            <Mail className='!text-6xl bg-slate-100 p-2 group-hover:bg-yellow-primary transition-colors duration-200 group-hover:text-white' />
            <div>
              <h3 className='text-2xl font-bold'>Email</h3>
              <p className='text-lg'>linh@ai.dynamix.vn</p>
            </div>
          </div>
        </div>
        <div className={`flex flex-col md:flex-row items-center py-16 px-8 space-y-8 md:space-y-0 `}>
          {/* Right side: Contact Form */}
          {
            !isSubmitted ?
              (
                <div className="flex-1 bg-white p-8">
                  <h2 className="font-bold text-3xl tracking tracking-widest text-black text-center mb-6 uppercase">get in touch</h2>

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
                        className="w-full p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-primary"
                        placeholder="Enter your name"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="name" className="block text-lg font-medium mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-primary"
                        placeholder="Enter your email"
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
                        className="w-full p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-primary"
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
                        className="w-full p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-primary"
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
                    <div className="flex justify-center">
                      <Button
                        type="submit"
                        variant='contained'
                        className="!bg-black !capitalize !text-white !font-bold !text-lg py-2 px-4 w-40 h-12 !rounded-none hover:!bg-yellow-primary transition-colors duration-200"
                        title='Submit'
                      >
                        {
                          submitting ?
                            (
                              <CircularProgress color="inherit" size={20} className='animate-spin' />
                            ) :
                            (
                              'Submit'
                            )
                        }
                      </Button>
                      {error && <p className="text-red-500 mt-2">{error}</p>}
                    </div>
                  </form>
                </div>
              ) :
              (
                <div className="flex-1 bg-white p-8">
                  <h2 className="font-bold text-3xl tracking tracking-widest text-black text-center mb-6 uppercase">Your message has been sent successfully!</h2>
                </div>
              )
          }
        </div>
      </Container>
    </>
  );
};

export default index;
