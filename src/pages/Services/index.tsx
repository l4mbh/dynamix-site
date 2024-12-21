/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import PageLayout from '../../layout/PageLayout'
import PageHeader from '../../component/parts/PageHeader'
import { Container } from '@mui/material'
import { servicesApi } from '../../api/servicesApi';
import Loading from '../../component/parts/Loading';
import MainButton from '../../component/parts/MainButton';

interface AccordionItem {
  title: string;
  img_url: {
    url: string
  };
  description: string;
}

const index = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const [services, setServices] = useState<AccordionItem[]>([]);

  const commonHost = import.meta.env.VITE_COMMON_HOST

  const handleAccordionClick = (index: number) => {
    setActiveIndex(index === activeIndex ? 0 : index);
  };

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await servicesApi.getServices();
        const data = await response.data;
        setServices(data.data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();

  }, []);

  if (!services) {
    return <PageLayout>
      <PageHeader title="Services" />
      <Container className='!w-full !min-h-screen flex items-center justify-center relative'>
        <Loading />
      </Container>
    </PageLayout>
  }

  return (
    <>
      <PageHeader title="Services" />
      <Container maxWidth="xl">
        <div className="flex">
          <div className="w-1/2 py-4">
            {activeIndex !== null && (
              <img
                src={`${commonHost}${services[activeIndex]?.img_url.url}` || `${commonHost}/uploads/home_about_us_6b53cd24ea.png`}
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <div className="w-1/2 p-4">
            {services.map((item: AccordionItem, index) => (
              <Accordion
                key={index}
                expanded={activeIndex === index}
                onChange={() => handleAccordionClick(index)}
                className="mb-4 !shadow-none !bg-slate-100"
              >
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls={`panel${index}-content`}
                  id={`panel${index}-header`}
                  className='bg-slate-200'
                >
                  <Typography className='!font-bold !text-black !uppercase !tracking-widest'>{item.title}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>{item.description}</Typography>
                  <div className='mt-4 flex w-full items-center justify-start'>
                    <MainButton title='Read more' style='contained' />
                  </div>
                </AccordionDetails>
              </Accordion>
            ))}
          </div>
        </div>
      </Container>
    </>
  )
}

export default index