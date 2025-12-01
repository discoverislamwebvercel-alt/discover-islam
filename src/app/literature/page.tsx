'use client';

import HeroSection from '@/components/common/HeroSection';
import AnimatedImageSection from '../../components/common/AnimatedImageSection';
import CollectionSection from '@/components/CollectionSection';
import HookForm from '@/components/common/HookForm';
import HookFormInput from '@/components/common/HookFormInput';
import HookFormTextarea from '@/components/common/HookFormTextarea';
// import HookFormRadioGroup from '@/components/common/HookFormRadioGroup';
import FormButton from '@/components/common/FormButton';
import {
  literatureFormSchema,
  literatureFormDefaultValues,
  // materialOptions,
  type LiteratureFormData,
} from '@/lib/validation/literatureForm';
import ResponsiveFallingCards from '@/components/ResponsiveFallingCards';
import {
  sendLiteratureRequestFormEmail,
  sendUserConfirmationEmail,
} from '@/lib/email';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

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
    styles: 'bg-transparent text-white rounded-[20px] shadow-none',
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
  const [isLoading, setIsLoading] = useState(false);

  // Smoothly scroll to collection section if query param present
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const target = params.get('scrollTo');
    if (target === 'exploreGuides') {
      const el = document.getElementById('exploreGuides');
      if (el) {
        // Use requestAnimationFrame to avoid layout thrash during hydration
        requestAnimationFrame(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
      }
    }
  }, []);

  const handleSubmit = async (
    data: LiteratureFormData,
    { reset }: { reset: () => void }
  ) => {
    setIsLoading(true);
    const toastId = toast.loading('Submitting your literature request...');

    try {
      // Send email using server action
      const result = await sendLiteratureRequestFormEmail(data);

      if (result.success) {
        // Send confirmation email to user
        const userEmail = data.email as string;
        if (userEmail) {
          try {
            await sendUserConfirmationEmail(
              userEmail,
              'Literature Request',
              data
            );
          } catch (confirmationError) {
            console.error(
              'Error sending confirmation email:',
              confirmationError
            );
            // Don't fail the main submission if confirmation email fails
          }
        }

        toast.success('Literature request submitted successfully!', {
          id: toastId,
        });
        // Reset form after successful submission
        reset();
      } else {
        throw new Error(result.error || 'Failed to send email');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error(
        'There was an error submitting your request. Please try again.',
        { id: toastId }
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <HeroSection
        heroImage='/Literature_hero_bg.jpg'
        title='LITERATURE'
        subHeading='Sharing the Message with Clarity and Compassion'
        description={
          <>
            Our literature promotes peace, understanding, and harmony through
            clear and engaging resources about Islam, available in a range of
            languages. Designed to be accessible to diverse communities, these
            materials help dispel misconceptions by accurately presenting the
            true teachings, values, and principles of Islam.
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
        id='exploreGuides'
        title='Explore Our Guides'
        subtitle='Hear It. Read It. Live It.'
        buttonText='View More'
        onButtonClick={() => {
          // Handle browse all books click
        }}
        items={[
          {
            id: 1,
            title: 'Infinite Benefits of Fasting',
            description:
              'Explore the physical, spiritual, and emotional benefits of fasting — a practice that nurtures self-control, gratitude, and closeness to the Creator.',
            price: '£10',
            perItem: '/10-pack',
            image: '/Collection1.png',
          },
          {
            id: 2,
            title: 'Understanding Islam',
            description:
              'A comprehensive guide to the fundamental principles and teachings of Islam, designed to foster understanding and dispel misconceptions.',
            price: '£10',
            perItem: '/10-pack',
            image: '/Collection2.png',
          },
          {
            id: 3,
            title: 'Islamic History',
            description:
              'Discover the rich history of Islamic civilization, from its origins to its contributions to science, culture, and human progress.',
            price: '£10',
            perItem: '/10-pack',
            image: '/Collection1.png',
          },
          {
            id: 4,
            title: 'Quran Studies',
            description:
              'An accessible introduction to the Quran, its teachings, and its relevance to modern life, perfect for both Muslims and non-Muslims.',
            price: '£10',
            perItem: '/10-pack',
            image: '/Collection2.png',
          },
          {
            id: 5,
            title: 'Quran Studies',
            description:
              'An accessible introduction to the Quran, its teachings, and its relevance to modern life, perfect for both Muslims and non-Muslims.',
            price: '£10',
            perItem: '/10-pack',
            image: '/Collection2.png',
          },
          {
            id: 6,
            title: 'Quran Studies',
            description:
              'An accessible introduction to the Quran, its teachings, and its relevance to modern life, perfect for both Muslims and non-Muslims.',
            price: '£10',
            perItem: '/10-pack',
            image: '/Collection2.png',
          },
          {
            id: 7,
            title: 'Quran Studies',
            description:
              'An accessible introduction to the Quran, its teachings, and its relevance to modern life, perfect for both Muslims and non-Muslims.',
            price: '£10',
            perItem: '/10-pack',
            image: '/Collection2.png',
          },
          {
            id: 8,
            title: 'Quran Studies',
            description:
              'An accessible introduction to the Quran, its teachings, and its relevance to modern life, perfect for both Muslims and non-Muslims.',
            price: '£10',
            perItem: '/10-pack',
            image: '/Collection2.png',
          },
        ]}
      />

      <motion.section
        className='w-full flex justify-center mb-16'
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, amount: 0.3 }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1,
              delayChildren: 0.2,
            },
          },
        }}
      >
        <div
          className='w-full px-4 sm:px-6 lg:px-8'
          style={{ maxWidth: '920px' }}
        >
          {/* Animated Title */}
          <motion.div
            className='text-center my-8'
            variants={{
              hidden: { opacity: 0, y: -20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                },
              },
            }}
          >
            <h1 className='text-4xl md:text-5xl lg:text-[80px] font-extrabold text-[#408360]'>
              Need bulk copies for your centre?
            </h1>
            <motion.h1
              className='text-4xl md:text-5xl lg:text-[80px] font-extrabold mb-16 text-[#111111]'
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              Fill in the form below
            </motion.h1>
          </motion.div>

          <HookForm
            schema={literatureFormSchema}
            defaultValues={literatureFormDefaultValues}
            onSubmit={handleSubmit}
            maxWidth='920px'
            mode='onChange'
          >
            <motion.div
              className='space-y-6'
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.08,
                  },
                },
              }}
            >
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.5,
                      ease: [0.22, 1, 0.36, 1],
                    },
                  },
                }}
              >
                <HookFormInput
                  label='Full Name'
                  name='fullName'
                  type='text'
                  placeholder='Enter your full name'
                  required
                />
              </motion.div>

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.5,
                      ease: [0.22, 1, 0.36, 1],
                    },
                  },
                }}
              >
                <HookFormInput
                  label='Organisation / Centre Name'
                  name='organization'
                  type='text'
                  placeholder='Enter your organisation or centre name'
                  required
                />
              </motion.div>

              <motion.div
                className='grid grid-cols-1 md:grid-cols-2 gap-4'
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.5,
                      ease: [0.22, 1, 0.36, 1],
                    },
                  },
                }}
              >
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
              </motion.div>

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.5,
                      ease: [0.22, 1, 0.36, 1],
                    },
                  },
                }}
              >
                <HookFormInput
                  label='Delivery Address'
                  name='address'
                  placeholder='Enter delivery address'
                  required
                />
              </motion.div>

              {/* <HookFormRadioGroup
                label="Select the materials you'd like to receive:"
                name='materials'
                options={materialOptions}
                columns={3}
                required
              /> */}

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.5,
                      ease: [0.22, 1, 0.36, 1],
                    },
                  },
                }}
              >
                <HookFormInput
                  label='Quantity Needed'
                  name='quantity'
                  type='number'
                  placeholder='Enter quantity needed'
                  required
                  min={1}
                  max={1000}
                />
              </motion.div>

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.5,
                      ease: [0.22, 1, 0.36, 1],
                    },
                  },
                }}
              >
                <HookFormInput
                  label='Purpose'
                  name='purpose'
                  placeholder='e.g., for an event, personal use, school, dawah'
                  required
                />
              </motion.div>

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.5,
                      ease: [0.22, 1, 0.36, 1],
                    },
                  },
                }}
              >
                <HookFormTextarea
                  label='Any additional notes or requests'
                  name='notes'
                  rows={4}
                  maxLength={2000}
                />
              </motion.div>

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.5,
                      ease: [0.22, 1, 0.36, 1],
                    },
                  },
                }}
                className='flex justify-center'
              >
                <FormButton
                  type='submit'
                  variant='primary'
                  size='lg'
                  loading={isLoading}
                  className='w-full max-w-[400px]'
                >
                  {isLoading ? 'Submitting...' : 'Request Literature'}
                </FormButton>
              </motion.div>
            </motion.div>
          </HookForm>
        </div>
      </motion.section>
    </>
  );
}
