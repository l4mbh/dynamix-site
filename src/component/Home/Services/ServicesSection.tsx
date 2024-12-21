import { Button, Card, CardActionArea, CardActions, CardContent, CardHeader, CardMedia, Container, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { homeServicesApi } from '../../../api/homeServicesApi'
import SectionHeader from '../../parts/SectionHeader'
import { motion } from "motion/react"
import { homeApi } from '../../../api/homeApi'
import Loading from '../../parts/Loading'

type ServicesType = {
  data: [
    {
      id: number,
      title: string,
      description: any,
      img_url: {
        url: string
      }
    }
  ]
}



const ServicesSection = () => {
  const [services, setServices] = useState<ServicesType>(null);

  const commonHost = import.meta.env.VITE_COMMON_HOST

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const respone = await homeApi.getServices();
        const data = respone.data;
        setServices(data);
      } catch (error) {
        console.log("Error fetching services: ", error)
      }
    }
    fetchServices();
  }, [])

  if (!services) {
    return <Container maxWidth="xl" className='!w-full !min-h-full flex items-center justify-center relative mx-auto'><Loading /></Container>
  }

  const ServiceCard = ({ service }: { service: { title: string; img_url: { url: string }; description: { children: { text: string }[] }[] } }) => {
    return (
      <Grid item xs={12} md={6} lg={4} className='overflow-hidden'>
        <motion.div
          className="relative"
          whileHover={{
            scale: 1.05,          // Tăng kích thước thẻ khi hover
            opacity: 1,           // Đảm bảo thẻ có độ mờ khi hover
          }}
          initial={{ opacity: 0.8 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="h-full flex flex-col justify-between shadow-sm overflow-hidden">
            {/* Card Media: Chỉ hiển thị hình ảnh */}
            {service.img_url && (
              <CardMedia
                component="img"
                height={200}
                src={`${commonHost}${service.img_url.url}`}
                alt={service.title}
              />
            )}

            {/* Title: Di chuyển từ dưới lên khi hover */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white overflow-hidden"
              initial={{ opacity: 0, y: 50 }}
              whileHover={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="uppercase text-center text-lg max-w-72 text-wrap">{service.title}</h3>
            </motion.div>
          </Card>
        </motion.div>
      </Grid>
    );
  };

  return (
    <div className='my-5 w-full min-h-[700px] bg-cover bg-center bg-fixed !bg-blend-soft-light' style={{ backgroundImage: `url('${commonHost}/uploads/ps_4_c9756f1126.jpg')` }}>
      <div className='w-full h-full flex items-center bg-black bg-opacity-80'>
        <Container maxWidth="xl" className='mx-auto py-5'>
          <SectionHeader theme='dark' align='center' title='The fields we are working in include' />
          <Grid container spacing={4} className='flex flex-row-reverse '>
            {services.data.map((service) => (
              <ServiceCard key={service.title} service={service} />
            ))}
          </Grid>
        </Container>
      </div>
    </div>
  )
}

export default ServicesSection