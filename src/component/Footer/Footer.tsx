import { Link } from 'react-router-dom';
import './Footer.css';
import { Container } from '@mui/material';
const Footer = () => {
  return (
    <footer className="footer !bg-dark-bg">
      <Container maxWidth="xl" className=" mx-auto grid grid-cols-12">
        <div className="col-span-5">
          <div className="flex items-center justify-center h-full footer-logo">
            <img src={'http://localhost:1337/uploads/logo_dark_8781c1800b.png'} className="w-64" alt="logo" />
          </div>
        </div>
        <div className="col-span-4 text-secondary-text">
          <h3 className="footerTitle">Company</h3>
          <ul className="footerList">
            <li className="footerItem">AI Dynamix Company Limited</li>

            <li className="footerItem">
              {/* <Link to="/">Return & Refund</Link> */}
              <span className="text-yellow-primary">
                Address 1:
              </span>{' '}
              10th Floor, Paxsky Building, 51 Nguyen Cu Trinh St., Nguyen Cu Trinh Ward, District 1, Ho Chi Minh City
            </li>
            <li className="footerItem">
              {/* <Link to="/">online stores</Link> */}
              <span className="text-yellow-primary">
                Address 2:
              </span>{' '}
              D2B Street, High-Tech Park, Long Thanh My Ward, District 9, Ho Chi Minh City
            </li>
            <li className="footerItem">
              {/* <Link to="/">terms & conditions</Link> */}
              <span className="text-yellow-primary">Email: </span>
              linh@ai.dynamix.vn
            </li>
            <li className="footerItem">
              <span className="text-yellow-primary">Phone: </span>
              +84.90.6868.913
            </li>
          </ul>
        </div>
        <div className="col-span-3">
          <h3 className="footerTitle">Products</h3>

          <ul className="footerList">
            <li className="footerItem">
              <Link to="/">
                <span className="text-yellow-primary font-semibold">
                  Management System
                </span>
              </Link>
            </li>

            <li className="footerItem">
              <Link to="/">
                <span className="text-yellow-primary font-semibold">
                  Web E-commerce
                </span>
              </Link>
            </li>
          </ul>
          <br />
          <h3 className="footerTitle">Introduction</h3>

          <ul className="footerList">
            <li className="footerItem">
              <Link to="/">
                <span className="text-yellow-primary font-semibold">
                  Company
                </span>
              </Link>
            </li>

            <li className="footerItem">
              <Link to="/">
                <span className="text-yellow-primary font-semibold">Team</span>
              </Link>
            </li>
          </ul>
        </div>
      </Container>
      <div className="flex justify-center gap-16 bg-transparent w-full px-36 pt-12 pb-3">
        <Link
          to={'#'}
          className="flex items-center justify-center gap-2 text-white text-sm"
        >
          <div className="flex justify-center items-center p-2 rounded-full border border-white  w-8 h-8 ">
            <i className="fa-brands fa-facebook-f"></i>
          </div>
          <p>Facebook</p>
        </Link>
        <Link
          to={'#'}
          className="flex items-center justify-center gap-2 text-white text-sm"
        >
          <div className="flex justify-center items-center p-2 rounded-full border border-white  w-8 h-8 ">
            <i className="fa-brands fa-linkedin-in"></i>
          </div>
          <p>LinkedIn</p>
        </Link>
        <Link
          to={'#'}
          className="flex items-center justify-center gap-2 text-white text-sm"
        >
          <div className="flex justify-center items-center p-2 rounded-full border border-white  w-8 h-8 ">
            <i className="fa-brands fa-youtube"></i>
          </div>
          <p>Youtube</p>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
