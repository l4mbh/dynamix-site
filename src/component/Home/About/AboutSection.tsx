import { Button, Container, Grid, Grid2 } from '@mui/material'
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

  if (!aboutUs) return <Grid2><Loading /></Grid2>

  return (
    <Container>
      <Grid container spacing={5} className="flex items-start justify-center !my-5 h-full">
        <Grid item xs={6}>
          <img src={`http://localhost:1337${aboutUs.data.img_url.url}`} alt="about-us" className='rounded-lg' />
        </Grid>
        <Grid item xs={6} className='!h-full'>
          <div className='flex flex-col items-start justify-between'>
            <div>
              <SectionHeader title='About Us' />
              <p className='mt-5 text-slate-500 text-md'>{aboutUs.data.description}</p>
            </div>
            <Link to={'/about'}>
              <MainButton title='Read more' className='!mt-[50px] !text-white !bg-yellow-500 !border-yellow-500 !rounded-none' />
            </Link>
          </div>

        </Grid>
      </Grid>
    </Container>
  )
}

export default AboutSection