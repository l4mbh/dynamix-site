/* eslint-disable @typescript-eslint/no-explicit-any */
 
import { Container, Grid } from '@mui/material'
import { homeApi } from '../../../api/homeApi';
import SectionHeader from '../../parts/SectionHeader';
import { useEffect, useState } from 'react';
import { ManageAccounts } from '@mui/icons-material';
import Loading from '../../parts/Loading';

export type HomeProvidingServicesType = {
  data: Array<{
    id: number;
    title: string;
    description: string;
    img_url: {
      url: string;
    };
  }>;
};

const ServiceProvide = () => {
  const [services, setServices] = useState<HomeProvidingServicesType>();
  const [, setHoveredIndex] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await homeApi.getProvidingServices();
        setServices(response.data)
      } catch (error) {
        console.log("ERrror fetching ProvingServices: ", error)
      }
    };

    fetchData();
  }, [])

  if (!services) return <Container maxWidth="xl" className='!w-full !min-h-full flex items-center justify-center relative'><Loading/></Container>

  return (
    <div className='mb-5 py-[40px] pb-[100px] flex items-center justify-center w-full bg-slate-100'>
      <Container maxWidth="xl">
        <SectionHeader align="center" title="What services can we provide?" />
        <p className="text-center my-[50px] text-slate-500">
          We provide comprehensive solutions to meet the diverse needs of our clients, including technology consulting and implementation, system maintenance, and the provision of products and services to support operations. With a team of experienced professionals, we are committed to delivering optimal solutions to help your business grow sustainably and efficiently.
        </p>
        <Grid container  spacing={4} className="min-w-screen flex items-start justify-center">
          {services.data.map((service, index: any) => (
            <Grid item xs={6} key={index}>
              <div
                className="flex items-start justify-center h-full"
                onMouseEnter={() => setHoveredIndex(index)} // Khi hover vào, đặt index
                onMouseLeave={() => setHoveredIndex(null)} // Khi rời chuột, reset index
              >
                {/* Vòng tròn chứa icon */}
                <div className="flex group hover:!bg-white transition-all duration-300  flex-col items-center justify-center min-h-[80px] min-w-[80px] !bg-yellow-500 border-4 !border-yellow-500 rounded-full mx-3 relative overflow-hidden">

                  <ManageAccounts className="!text-5xl !text-white group-hover:!text-yellow-primary group-hover:!scale-1200" />
                </div>
                {/* Nội dung văn bản */}
                <div className="flex flex-col items-start justify-start">
                  <p className="w-full flex items-center my-2 text-lg font-bold">
                    {service.title}
                  </p>
                  <p className="cursor-pointer transition-all text-slate-500">
                    {service.description}
                  </p>
                </div>
              </div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  )
}

export default ServiceProvide