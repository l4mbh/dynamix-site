import { Container, Grid, Grid2 } from '@mui/material'
import React, { useEffect } from 'react'
import SectionHeader from '../../parts/SectionHeader'
import { Link } from 'react-router-dom'
import MainButton from '../../parts/MainButton'
import { homeApi } from '../../../api/homeApi'
import Loading from '../../parts/Loading'

interface AboutUsType {
  data: {
    title: string;
    description: string;
    img_url: {
      url: string;
    };
  }
}

const AboutSection = () => {
  const [aboutUs, setAboutUs] = React.useState<AboutUsType>();

  const commonHost = import.meta.env.VITE_COMMON_HOST


  useEffect(() => {
    const fetchAboutUs = async () => {
      try {
        const response = await homeApi.getBoutInfo();
        const data = response.data;
        setAboutUs(data);
      } catch (error) {
        console.log("Error fetching about us: ", error)
      }
    }
    fetchAboutUs();
  }, [])

  if (!aboutUs) return <Grid2 className='!w-full !min-h-full flex items-center justify-center relative'><Loading /></Grid2>

  return (
    <Container maxWidth="xl" className='py-14'>
      <Grid container spacing={5} className="flex items-start justify-center !my-5 h-full">
        <Grid item xs={12} md={6}>
          <img src={`${commonHost}${aboutUs.data.img_url.url}`} alt="about-us" />
        </Grid>
        <Grid item xs={12} md={6} className='!h-full'>
          <div className='flex flex-col items-start justify-between'>
            <div>
              <SectionHeader title='About Us' />
              <p className='mt-5 text-slate-500 text-md'>{aboutUs.data.description}</p>
            </div>
            <Link to={'/about'} className='mt-6'>
              <MainButton title='Read more' />
            </Link>
          </div>

        </Grid>
      </Grid>
    </Container>
  )
}

export default AboutSection