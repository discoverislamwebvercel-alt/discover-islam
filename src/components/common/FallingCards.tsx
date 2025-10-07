const FallingCards = () => {
  return (
    <div className='hidden lg:block'>
      {/* Bottom: Green - 10+ Years of Experience */}
      <div className='absolute bottom-0 left-8 bg-[#408360] text-white font-bold px-2 py-2 rounded-lg transform shadow-lg w-[230px] z-10'>
        <p className='text-lg font-semibold'>
          10+ Years of <br /> Experience
        </p>
      </div>

      {/* Stars above green div - Diagonal arrangement */}
      <div className='absolute bottom-24 left-24'>
        {/* Bottom row - 2 stars together */}
        <div className='flex items-center '>
          <img src='/Star 3.png' alt='Star' className='w-10 h-10 ' />
          <img src='/Star 4.png' alt='Star' className='w-10 h-10' />
        </div>
        {/* Top star - positioned above the right star */}
        <div className='absolute -top-7 -right-1'>
          <img src='/Star 5.png' alt='Star' className='w-10 h-10' />
        </div>
      </div>

      {/* Above green: Orange - Content Reviewed by Qualified Scholars */}
      <div className='absolute bottom-0 left-86 bg-[#cb892a] text-white px-2 py-1 rounded-lg transform shadow-lg w-[320px] z-20 -ml-[84px]'>
        <p className='text-md font-semibold'>
          Content Reviewed by Qualified Scholars
        </p>
      </div>

      {/* Above orange: Black - Backed by Positive feedback */}
      <div className='absolute bottom-14 left-44 bg-black text-white px-3 py-4 font-bold rounded-lg transform rotate-12 shadow-lg w-[240px] z-30'>
        <p className='text-sm font-semibold'>Backed by Positive feedback</p>
      </div>

      {/* Above black: Orange - Interactive, Modern Displays */}
      <div className='absolute bottom-32 left-62 bg-[#cb892a] text-white px-6 py-4 rounded-lg transform -rotate-5 shadow-lg max-w-[240px] z-40'>
        <p className='text-sm font-semibold'>
          Interactive, Modern Displays That Engage and Inspire
        </p>
      </div>

      {/* Right side: Green circle */}
      <div className='absolute bottom-8 left-[480px] w-15 h-15 bg-[#afcbb5] rounded-full'></div>

      {/* Right side: Black tilted - Tailored for Non-Muslim Audiences */}
      <div className='absolute bottom-13 left-[460px] bg-black text-white px-6 py-2 rounded-lg transform rotate-14 shadow-lg w-[440px] z-30'>
        <p className='text-sm font-semibold'>
          Tailored for Non-Muslim Audiences
        </p>
      </div>

      {/* Top right: Green - Fully Mobile & Self-Contained */}
      <div className='absolute bottom-18 right-2 bg-[#408360] text-white px-6 py-4 rounded-lg transform -rotate-12 shadow-lg w-[250px] z-20'>
        <p className='text-sm font-semibold'>
          Fully Mobile & Self-
          <br />
          Contained
        </p>
      </div>

      {/* Bottom right: Icon */}
      <div className='absolute bottom-3 right-12 w-20 h-20 flex items-center justify-center'>
        <img
          src='/Group 4165.png'
          alt='Islamic Icon'
          className='w-full h-full object-contain'
        />
      </div>
    </div>
  );
};

export default FallingCards;
