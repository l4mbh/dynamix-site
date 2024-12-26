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
  const isMobile = window.innerWidth < 768;

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
        if (response.data.success) {
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
      <Container maxWidth={ isMobile ? "xl" : false}  className='!h-auto mt-5 !px-0 !max-h-auto max-w-screen bg-cover bg-center bg-black' style={{ backgroundImage: `url("${commonHost}/uploads/contact_bb6e18b991.jpg")` }}>
        <div className='flex flex-col-reverse lg:flex-row bg-black bg-opacity-80 !text-white items-center justify-center gap-5 w-full'>
          <div className=' flex flex-col items-center justify-center gap-6 w-full !h-full lg:w-1/2 pb-8' >
            <div className='flex items-center w-full lg:w-2/3  space-x-4 p-5 group '>
              <PinDrop className='!text-6xl p-2 text-yellow-primary group-hover:bg-yellow-primary transition-all duration-200 group-hover:text-white' />
              <div className='!w-full'>
                <h3 className='text-2xl font-bold'>Address</h3>
                <p className='!text-normal w-full !text-yellow-primary'>51 Nguyen Cu Trinh St., Nguyen Cu Trinh Ward, District 1, Ho Chi Minh City</p>
              </div>
            </div>
            <div className='flex items-center w-full lg:w-2/3 space-x-4 p-5 group'>
              <Phone className='!text-6xl p-2 text-yellow-primary group-hover:bg-yellow-primary transition-colors duration-200 group-hover:text-white' />
              <div>
                <h3 className='text-2xl font-bold'>Phone</h3>
                <p className='!text-normal !text-yellow-primary'>+84.90.6868.913</p>
              </div>
            </div>
            <div className='flex items-center w-full lg:w-2/3 space-x-4 p-5 group'>
              <Mail className='!text-6xl p-2 text-yellow-primary group-hover:bg-yellow-primary transition-colors duration-200 group-hover:text-white' />
              <div>
                <h3 className='text-2xl font-bold'>Email</h3>
                <p className='!text-normal !text-yellow-primary'>linh@ai.dynamix.vn</p>
              </div>
            </div>
          </div>
          <div className={`flex flex-col md:flex-row w-full lg:w-1/2 items-center py-16 px-8 lg:px-8 space-y-0 md:space-y-0 `}>
            {/* Right side: Contact Form */}
            {
              !isSubmitted ?
                (
                  <div className="flex-1 py-0 lg:p-8">
                    <h2 className="font-bold text-3xl tracking tracking-widest text-white text-center mb-6 uppercase">get in touch</h2>

                    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
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
                      <div className="flex justify-center !my-5">
                        <Button
                          type="submit"
                          variant='contained'
                          className="!bg-yellow-primary !mt-5 !capitalize !text-white !font-bold !text-lg py-2 px-4 w-40 h-12 !rounded-none hover:!bg-yellow-300 transition-colors duration-200"
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
        </div>
      </Container>
    </>
  );
};

export default index;
