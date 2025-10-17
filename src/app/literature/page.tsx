'use client';

import HeroSection from '@/components/common/HeroSection';
import AnimatedImageSection from '../../components/common/AnimatedImageSection';
import CollectionSection from '@/components/CollectionSection';
import HookForm from '@/components/common/HookForm';
import HookFormInput from '@/components/common/HookFormInput';
import HookFormTextarea from '@/components/common/HookFormTextarea';
import HookFormRadioGroup from '@/components/common/HookFormRadioGroup';
import FormButton from '@/components/common/FormButton';
import {
  literatureFormSchema,
  literatureFormDefaultValues,
  materialOptions,
  type LiteratureFormData,
} from '@/lib/validation/literatureForm';
import ResponsiveFallingCards from '@/components/ResponsiveFallingCards';

const cards = [
  {
    text: 'Approved by Qualified Scholars',
    styles: 'bg-[#408360] text-white rounded-[20px]',
    rotate: '0.26deg',
    y: 150,
    x: 100,
    width: '250px',
    icon: false,
  },
  {
    text: '',
    styles: 'bg-transparent text-white rounded-[20px]',
    rotate: '-6.5deg',
    y: 10,
    x: 770,
    width: '300px',
    icon: false,
    isTransparent: true,
  },
  {
    text: 'Perfect for Events, Schools & Public Outreach',
    styles: 'bg-[#111111] text-white rounded-[20px]',
    rotate: '15.51deg',
    y: 70,
    x: 50,
    width: '600px',
    icon: false,
  },
  {
    text: 'Clear, Concise, and Engaging',
    styles: 'bg-[#111111] text-white rounded-[20px]',
    rotate: '5.53deg',
    y: -70,
    x: 250,
    width: '380px',
    icon: false,
  },
  {
    text: 'Covers Essential Topics',
    styles: 'bg-[#CB892A] text-white rounded-[20px]',
    rotate: '0.36deg',
    y: 35,
    x: 0,
    width: '520px',
    icon: false,
  },
  {
    text: 'Available in Multiple Languages',
    styles: 'bg-[#CB892A] text-white rounded-[20px]',
    rotate: '-9deg',
    y: -180,
    x: -550,
    width: '330px',
    icon: false,
  },
];

export default function Literature() {
  const handleSubmit = async (_data: LiteratureFormData) => {
    try {
      // Simulate API call
      // console.log('Form submitted:', data);

      // Here you would typically send the data to your backend
      // await submitLiteratureRequest(data);

      // Show success message
      alert('Literature request submitted successfully!');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting your request. Please try again.');
    }
  };

  return (
    <>
      <HeroSection
        heroImage='/literatureHero.png'
        title='LITERATURE'
        subHeading='Sharing the Message with Clarity and Compassion'
        description={
          <>
            Our literature{' '}
            <strong>promotes peace, understanding, and harmony</strong> by
            offering clear and engaging resources about Islam in a variety of
            languages. Designed for accessibility across diverse communities,
            these materials help eliminate misconceptions by accurately
            presenting the{' '}
            <strong>true teachings, values, and principles</strong> of Islam
          </>
        }
      />
      <AnimatedImageSection
        text1='TRUE TEACHINGS, VALUES AND PRINCIPLES OF ISLAM'
        text2='SHARING THE MESSAGE'
      />

      <ResponsiveFallingCards
        cards={cards}
        heading1={'What Makes Our'}
        heading2={'Literature Effective?'}
      />
      <CollectionSection
        title='Shop from our collection'
        buttonText='View More'
        onButtonClick={() => {
          // Handle browse all books click
        }}
        items={[
          {
            id: 1,
            title: 'Understanding Islam',
            price: '£15.00',
            image: '/Collection1.png',
          },
          {
            id: 2,
            title: 'Islamic History',
            price: '£18.00',
            image: '/Collection2.png',
          },
          {
            id: 3,
            title: 'Quran Studies',
            price: '£20.00',
            image: '/Collection1.png',
          },
        ]}
      />

      <HookForm
        title='Request Free Literature Form'
        subtitle='Request Free Islamic Literature'
        schema={literatureFormSchema}
        defaultValues={literatureFormDefaultValues}
        onSubmit={handleSubmit}
        className='mb-16'
        maxWidth='920px'
        mode='onChange'
      >
        <div className='space-y-6'>
          <HookFormInput
            label='Full Name'
            name='fullName'
            type='text'
            placeholder='Enter your full name'
            required
          />

          <HookFormInput
            label='Organisation / Centre Name'
            name='organization'
            type='text'
            placeholder='Enter your organisation or centre name'
            required
          />

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <HookFormInput
              label='Email'
              name='email'
              type='email'
              placeholder='Enter your email address'
              required
            />
            <HookFormInput
              label='Phone Number'
              name='phone'
              type='tel'
              placeholder='Enter your phone number'
              required
            />
          </div>

          <HookFormInput
            label='Delivery Address'
            name='address'
            placeholder='Enter delivery address'
            required
          />

          <HookFormRadioGroup
            label="Select the materials you'd like to receive:"
            name='materials'
            options={materialOptions}
            columns={3}
            required
          />

          <HookFormInput
            label='Quantity Needed'
            name='quantity'
            type='number'
            placeholder='Enter quantity needed'
            required
            min={1}
            max={1000}
          />

          <HookFormInput
            label='Purpose'
            name='purpose'
            placeholder='e.g., for an event, personal use, school, dawah'
            required
          />

          <HookFormTextarea
            label='Any additional notes or requests'
            name='notes'
            rows={4}
            maxLength={2000}
          />

          <FormButton
            type='submit'
            variant='primary'
            size='lg'
            className='w-full max-w-[400px]'
          >
            Request Literature
          </FormButton>
        </div>
      </HookForm>
    </>
  );
}
