import { useEffect, useState } from 'react';
import Slider from "react-slick";
import { motion } from "framer-motion";
import { homeApi } from '../../../api/homeApi';
import { Link } from 'react-router-dom';
import MainButton from '../../parts/MainButton';
import Loading from '../../parts/Loading';
import { Grid2 } from '@mui/material';

type heroType = {
  data: Array<{
    title: string;
    subtitle: string;
    img_url: { url: string };
    button_text: string;
  }>;
};

const HeroSection = () => {
  const [heroInfo, setHeroinfo] = useState<heroType | null>();
  const [slideIndex, setSlideIndex] = useState(0);

  const commonHost = import.meta.env.VITE_COMMON_HOST

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await homeApi.getHeroInfo();
        setHeroinfo(response.data);
      } catch (error) {
        console.log('error fetch hero data', error);
      }
    };

    fetchData();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    beforeChange: (_current: number, next: number) => {
      setSlideIndex(next); // Set slideIndex when slide changes
    },
    afterChange: (index: number) => {
      setSlideIndex(index); // Update slideIndex after the slide change
    },
  };

  if (!heroInfo) {
    return <div className='w-full h-screen flex justify-center items-center'>
      <Loading />
    </div>
  }

  return (
    <Grid2
      className={`!w-full !h-screen relative`}
    >
      <Slider {...settings} className="h-full">
        {heroInfo?.data.map((slide, index) => (
          <div key={index} className="h-full">
            {/* Hiệu ứng ảnh nền khi chuyển slide */}
            <motion.div
              className="min-h-screen bg-cover bg-center flex items-center justify-center text-white"
              style={{
                backgroundImage: `url('${commonHost}${slide.img_url.url}')`,
              }}
              initial={{ opacity: 0 }}
              animate={{
                opacity: slideIndex === index ? 1 : 0, // Chỉ hiện ảnh nền khi slide đang hiển thị
              }}
              transition={{
                duration: 1,
                type: "spring",
                stiffness: 50,
              }}
            >
              <div className="text-center z-10 p-8 min-h-screen w-full flex justify-center items-center bg-black bg-opacity-50">
                {/* Nội dung của slide */}
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{
                    opacity: slideIndex === index ? 1 : 0, // Trigger animation based on current slideIndex
                    y: slideIndex === index ? 0 : 50, // Trigger movement for the current slide
                  }}
                  transition={{
                    duration: 1,
                    type: "spring",
                    stiffness: 50,
                    delay: slideIndex === index ? 0 : 0.5, // Đảm bảo có độ trễ khi chuyển slide
                  }}
                >
                  <h1 className="text-4xl md:text-6xl font-bold mb-4 max-w-[1000px]">
                    {slide.title}
                  </h1>
                  <p className="text-lg md:text-xl mb-6 !text-slate-300">{slide.subtitle}</p>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: slideIndex === index ? 1 : 0, // Đảm bảo nút xuất hiện cùng với slide
                    }}
                    transition={{ delay: 1, duration: 1 }}
                  >
                    <Link to="/about">
                      <MainButton title="Learn More" />
                    </Link>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        ))}
      </Slider>
    </Grid2>
  );
};

export default HeroSection;
