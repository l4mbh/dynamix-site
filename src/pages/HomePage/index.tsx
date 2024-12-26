import { Grid } from '@mui/material';
import AboutSection from '../../component/Home/About/AboutSection';
import ServicesSection from '../../component/Home/Services/ServicesSection';
import ServiceProvide from '../../component/Home/ServicesProvide/ServiceProvide';
import HomeProjects from '../../component/Home/Projects/HomeProjects';
import HomeCustomer from '../../component/Home/Customers/HomeCustomer';
import HomeBlog from '../../component/Home/Blog/HomeBlog';
import HeroSection from '../../component/Home/Hero/HeroSection';

const HomePage = () => {
  return (
    <Grid>
      <HeroSection />
      <ServiceProvide />
      <AboutSection />
      <ServicesSection />
      <HomeProjects />
      <HomeCustomer />
      <HomeBlog />
    </Grid>
  );
};

export default HomePage;
