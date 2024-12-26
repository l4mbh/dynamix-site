import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface ProjectType {
  data: Array<{
    customer_name: string;
    id: number;
    title: string;
    description: string;
    imgs_url: Array<{
      url: string;
    }>;
  }>;
}

interface SliderComponentProps {
  projects: ProjectType; // Prop nhận dữ liệu từ bên ngoài
}

const SliderComponent: React.FC<SliderComponentProps> = ({ projects }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,    // Enable auto scroll
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const commonHost = import.meta.env.VITE_COMMON_HOST;

  return (
    <div>
      <Slider {...settings}>
        {projects.data.map((project) => (
          <div
            key={project.id}
            className="flex w-full h-[600px] lg:h-[400px] bg-gray-100 relative"
          >
            <div className="h-full w-full flex-col md:flex-row absolute lg:position-static top-0 left-0 right-0">
              <img
                src={`${commonHost}${project.imgs_url[0].url}`}
                alt={project.title}
                className="lg:!min-w-[50%] h-full lg:!w-1/2 w-full lg:!max-w-[50%] absolute lg:position-static top-0 left-0 right-0"
              />
              <div
                className="lg:!min-w-[50%] lg:!max-w-[50%] bg-black bg-opacity-75 lg:!bg-white absolute lg:position-static top-0 bottom-0 right-0 z-10 h-full flex flex-col justify-center items-start p-8 overflow-scroll lg:overflow-auto"
              >
                <h2 className="text-3xl font-bold mb-4 uppercase !text-white lg:!text-black">{project.title}</h2>
                <p className="!text-white lg:!text-gray-600 mb-6">{project.description}</p>
                <p className='!text-white lg:!text-gray-600'>Collaboration with: <span className='font-extrabold text-white lg:text-black'>{project.customer_name}</span></p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SliderComponent;
