import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface ProjectType {
  data: Array<{
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
            className="flex w-full h-[400px] bg-gray-100"
          >
            {/* Hình ảnh bên trái */}
            <div className="h-full w-full flex">
              <img
                src={`${commonHost}${project.imgs_url[0].url}`}
                alt={project.title}
                className="!min-w-[50%] !max-w-[50%] object-cover"
              />
              <div
                className="!min-w-[50%] !max-w-[50%] h-full flex flex-col justify-center items-start p-8"
              >
                <h2 className="text-3xl font-bold mb-4">{project.title}</h2>
                <p className="text-gray-600 mb-6">{project.description}</p>
                <p>Collaboration with: <span className='font-extrabold'>{project.customer_name}</span></p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SliderComponent;
