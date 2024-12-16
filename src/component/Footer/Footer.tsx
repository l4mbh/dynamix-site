import React from 'react';
import { Grid, Button, Typography, Divider } from '@mui/material';
import { NavLink } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white p-12">
      <Grid container spacing={4} justifyContent="center">

        {/* Phần 1: Logo và Dịch vụ */}
        <Grid item xs={12} sm={4}>
          <div className="flex flex-col items-start space-y-4">
            <div>
              <Typography variant="h6" className='uppercase '>Our Services</Typography>
              <div className='w-[75px] h-[3px] bg-yellow-500'></div>
            </div>
            <ul className="space-y-2 text-[#777] flex flex-col gap-4">
              <li><NavLink to="/services/service1" className="hover:text-yellow-500">Service 1</NavLink></li>
              <li><NavLink to="/services/service2" className="hover:text-yellow-500">Service 2</NavLink></li>
              <li><NavLink to="/services/service3" className="hover:text-yellow-500">Service 3</NavLink></li>
            </ul>
            <img
              src="http://localhost:1337/uploads/aidynamix_logo_1d299852f5.png"
              alt="Company Logo"
              className="h-16"
            />
          </div>
        </Grid>

        {/* Phần 2: NavLink */}
        <Grid item xs={12} sm={4}>
          <div className="flex flex-col items-start space-y-4 ">
            <div>
              <Typography variant="h6" className='uppercase '>Quick links</Typography>
              <div className='w-[75px] h-[3px] bg-yellow-500'></div>
            </div>
            <ul className="space-y-2 text-[#777] flex flex-col gap-4">
              <li><NavLink to="/" className="hover:text-yellow-500">Home</NavLink></li>
              <li><NavLink to="/about" className="hover:text-yellow-500">About</NavLink></li>
              <li><NavLink to="/contact" className="hover:text-yellow-500">Contact</NavLink></li>
            </ul>
          </div>
        </Grid>

        {/* Phần 3: Bản đồ */}
        <Grid item xs={12} sm={4}>
          <div className="flex flex-col items-start space-y-4">
            <div>
              <Typography variant="h6" className='uppercase '>Find us</Typography>
              <div className='w-[75px] h-[3px] bg-yellow-500'></div>
            </div>
            <div className="w-full h-64 bg-gray-400">
              <iframe
                title="Company Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4930709838617!2d106.68512931476856!3d10.756030960372036!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752fe76a3b13e1%3A0xc2f49a7ef97d39f4!2zTGVnZW5kYXJ5IFBheXMuIFRocm93IE5pIFRpdGhhLCBHaW9uaW5lcyBDb21wYW55!5e0!3m2!1sen!2s!4v1675824110669!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </Grid>
      </Grid>

      <div className="text-center mt-8">
        <Typography variant="body2" className='text-sm text-[#777]'>
          © 2024 Company Name. All Rights Reserved.
        </Typography>
      </div>
    </footer>
  );
}

export default Footer;
