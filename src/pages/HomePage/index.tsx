import { Grid2 } from '@mui/material';
import HomeLayout from '../../layout/Home';
import AboutSection from '../../component/Home/About/AboutSection';
import ServicesSection from '../../component/Home/Services/ServicesSection';
import ServiceProvide from '../../component/Home/ServicesProvide/ServiceProvide';
import HomeProjects from '../../component/Home/Projects/HomeProjects';
import HomeCustomer from '../../component/Home/Customers/HomeCustomer';
import HomeBlog from '../../component/Home/Blog/HomeBlog';

const HomePage = () => {
  return (
    <HomeLayout>
      <Grid2 container spacing={2} xs={12}>
        <ServiceProvide />
        <AboutSection />
        <ServicesSection />
        <HomeProjects />
        <HomeCustomer />
        <HomeBlog />
      </Grid2>
    </HomeLayout>
  );
};

export default HomePage;
