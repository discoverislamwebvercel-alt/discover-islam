import Button from './Button';

interface Props {
  heroImage: string;
  title: string;
  subHeading: string;
  description: string | React.ReactNode;
  buttonText?: string;
}

const HeroSection = ({
  heroImage,
  title,
  subHeading,
  description,
  buttonText = '',
}: Props) => {
  return (
    <div className='bg-white'>
      <section className='relative'>
        <div className='relative w-full h-[80vh] sm:h-[85vh] md:h-[95vh] lg:h-[100vh] bg-[#f0f0f0]'>
          <div
            className='absolute inset-0 bg-cover bg-center bg-no-repeat'
            style={{
              backgroundImage: `url(${heroImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />

          <div
            className='absolute inset-0 bg-cover bg-center bg-no-repeat'
            style={{
              backgroundImage: "url('/HeroOverlay.png')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: 0.6,
            }}
          />

          {/* Gradient Overlay - smooth transition to white */}
          <div className='absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white' />

          {/* End of image container */}
        </div>

        {/* Text Content slightly overlapping the image bottom */}
        <div className='relative z-10 -mt-12 sm:-mt-12 lg:-mt-42 px-4 sm:px-6 lg:px-8 sm:pt-6 pb-8 sm:pb-10 lg:pb-12 flex justify-center'>
          <div className='max-w-[1230px] mx-auto text-center flex flex-col items-center'>
            <h1 className='text-4xl sm:text-5xl md:text-6xl lg:text-[110px] font-extrabold mb-2 uppercase text-[#4C735D] leading-tight'>
              {title}
            </h1>
            <h2 className='text-2xl sm:text-3xl md:text-[80px] font-extrabold text-[#111111] mb-6 leading-tight'>
              {subHeading}
            </h2>
            <p className='text-lg sm:text-xl md:text-[30px] text-[#111111CC] max-w-[1080px] mx-auto font-[500] leading-[36px]'>
              {description}
            </p>
            {buttonText && (
              <Button
                variant='secondary'
                className='mt-8 !font-extrabold !text-[26px] !py-4 !px-9'
              >
                {buttonText}
              </Button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
