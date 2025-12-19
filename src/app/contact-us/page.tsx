'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import FundraisePage from '@/components/common/FundraisePage';
import AnimatedJourneySection from '@/components/common/AnimatedJourneySection';
import HookForm from '@/components/common/HookForm';
import HookFormInput from '@/components/common/HookFormInput';
import HookFormSelect from '@/components/common/HookFormSelect';
import HookFormTextarea from '@/components/common/HookFormTextarea';
import { useFormContext } from 'react-hook-form';
import {
  contactFormSchema,
  contactFormDefaultValues,
  topicOptions,
  type ContactFormData,
} from '@/lib/validation/contactForm';
import { sendContactFormEmail, sendUserConfirmationEmail } from '@/lib/email';
import toast from 'react-hot-toast';
// Thank You Banner Component
const ThankYouBanner = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        type: 'spring',
        stiffness: 200,
        damping: 20,
        duration: 0.6,
      }}
      className='relative w-full max-w-[898px] h-auto min-h-[300px] sm:min-h-[400px] md:min-h-[474px] mx-auto bg-white rounded-[16px] sm:rounded-[18px] md:rounded-[20px] flex flex-col items-center justify-center overflow-hidden p-6 sm:p-8 md:p-12'
    >
      {/* Checkmark Circle and Icon */}
      <motion.div
        className='relative flex items-center justify-center mb-8'
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: 'spring',
          stiffness: 200,
          damping: 15,
          delay: 0.2,
        }}
      >
        {/* Outer Circle */}
        <motion.div
          className='absolute w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] md:w-[122.9px] md:h-[122.9px]'
          initial={{ rotate: -180 }}
          animate={{ rotate: 0 }}
          transition={{
            type: 'spring',
            stiffness: 200,
            damping: 15,
            delay: 0.3,
          }}
        />
        {/* Checkmark Icon */}
        <motion.div
          className='relative w-[85px] h-[82px] sm:w-[105px] sm:h-[102px] md:w-[127.5px] md:h-[122.9px]'
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 20,
            delay: 0.5,
          }}
        >
          <Image
            src='/figma/check.png'
            alt='Checkmark'
            width={127.5}
            height={122.9}
            className='object-contain w-full h-full'
          />
        </motion.div>
      </motion.div>

      {/* Thank You Text */}
      <motion.h2
        className='text-center text-[40px] sm:text-[50px] md:text-[60px] lg:text-[80px] leading-[1.2] font-extrabold text-[#408360] mb-4 sm:mb-6'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          delay: 0.7,
          ease: 'easeOut',
        }}
      >
        Thank You!
      </motion.h2>

      {/* Confirmation Message */}
      <motion.p
        className='text-center text-[16px] sm:text-[20px] md:text-[24px] lg:text-[30px] leading-[1.2] font-medium text-[rgba(17,17,17,0.8)] max-w-full px-4'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 0.8, y: 0 }}
        transition={{
          duration: 0.5,
          delay: 0.9,
          ease: 'easeOut',
        }}
      >
        Your Message has been submitted. Our team will reach out to you soon.
      </motion.p>
    </motion.div>
  );
};

// Submit Button Component for React Hook Form
const SubmitButton = ({ isLoading }: { isLoading: boolean }) => {
  const { formState } = useFormContext();
  const { isSubmitting } = formState;
  const disabled = isLoading || isSubmitting;

  return (
    <div className='flex justify-center pt-4'>
      <button
        type='submit'
        disabled={disabled}
        className={`
          w-full max-w-[400px]
          px-6 sm:px-7 md:px-8
          py-3 sm:py-3.5 md:py-4
          h-[48px] sm:h-[52px] md:h-[56px] lg:h-[60px]
          text-[16px] sm:text-[18px] md:text-[19px] lg:text-[20px]
          font-medium
          rounded-[40px] sm:rounded-[50px] md:rounded-[55px] lg:rounded-[62px]
          bg-[#408360]
          hover:bg-[#357050]
          text-white
          focus:ring-2
          focus:ring-[#408360]
          focus:ring-offset-2
          transition-all
          duration-300
          disabled:opacity-50
          disabled:cursor-not-allowed
          cursor-pointer
          flex items-center justify-center gap-2 sm:gap-3
        `}
      >
        {(isLoading || isSubmitting) && (
          <svg
            className='animate-spin h-5 w-5 text-current'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
          >
            <circle
              className='opacity-25'
              cx='12'
              cy='12'
              r='10'
              stroke='currentColor'
              strokeWidth='4'
            ></circle>
            <path
              className='opacity-75'
              fill='currentColor'
              d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
            ></path>
          </svg>
        )}
        {isLoading || isSubmitting ? 'Sending...' : 'Send'}
      </button>
    </div>
  );
};

export default function ContactUs() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (
    data: ContactFormData,
    _helpers: { reset: () => void }
  ) => {
    setIsLoading(true);
    const toastId = toast.loading('Sending your message...');

    try {
      // Send email using server action
      const result = await sendContactFormEmail(data);

      if (result.success) {
        // Send confirmation email to user
        const userEmail = data.email as string;
        if (userEmail) {
          try {
            await sendUserConfirmationEmail(userEmail, 'Contact Us', data);
          } catch (confirmationError) {
            console.error(
              'Error sending confirmation email:',
              confirmationError
            );
            // Don't fail the main submission if confirmation email fails
          }
        }

        toast.success('Your message has been sent successfully!', {
          id: toastId,
        });
        // Show thank you banner
        setIsSubmitted(true);
      } else {
        throw new Error(result.error || 'Failed to send email');
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      toast.error(
        'There was an error sending your message. Please try again.',
        { id: toastId }
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <FundraisePage
        title='Contact Us'
        titleClassName='text-[#CB892A]'
        containerClassName='max-w-[920px] px-4 sm:px-6 lg:px-8'
        descriptionClassName='hidden'
      >
        {/* Animated Description Text */}
        <motion.div
          className='w-full text-center mb-8 sm:mb-10 md:mb-12 px-4 flex items-center justify-center'
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          <motion.p
            className='font-[500] text-lg sm:text-xl md:text-[30px] leading-[36px] text-center w-full max-w-[1100px]'
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
          >
            Our team is passionate about delivering accurate, engaging, and
            impactful experiences that inspire curiosity, break down barriers,
            and foster mutual respect.
          </motion.p>
        </motion.div>

        {/* Contact Form or Thank You Banner */}
        <AnimatePresence mode='wait'>
          {!isSubmitted ? (
            <motion.div
              key='form'
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className='w-full'
            >
              <HookForm
                schema={contactFormSchema}
                defaultValues={contactFormDefaultValues}
                onSubmit={handleSubmit}
                className='mb-16'
                maxWidth='920px'
                mode='onChange'
              >
                <div className='space-y-4 sm:space-y-5 md:space-y-6'>
                  {/* Full Name */}
                  <HookFormInput
                    label='Full Name'
                    name='fullName'
                    type='text'
                    placeholder='Enter Full Name'
                    required
                  />

                  {/* Email and Phone */}
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <HookFormInput
                      label='Email'
                      name='email'
                      type='email'
                      placeholder='Enter Email'
                      required
                    />
                    <HookFormInput
                      label='Phone Number'
                      name='phone'
                      type='tel'
                      inputMode='tel'
                      placeholder='Enter Phone Number'
                      required
                    />
                  </div>

                  {/* Organization */}
                  <HookFormInput
                    label='Organisation'
                    name='organization'
                    type='text'
                    placeholder='Enter Organisation'
                  />

                  {/* Topic */}
                  <HookFormSelect
                    label='Topic'
                    name='topic'
                    placeholder='Choose Topic'
                    options={topicOptions}
                    required
                  />

                  {/* Message */}
                  <HookFormTextarea
                    label='Message'
                    name='message'
                    placeholder='Enter your query or message'
                    rows={6}
                    required
                    maxLength={2000}
                  />

                  {/* Submit Button */}
                  <SubmitButton isLoading={isLoading} />
                </div>
              </HookForm>
            </motion.div>
          ) : (
            <motion.div
              key='thank-you'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className='w-full flex justify-center'
            >
              <div className='relative'>
                <ThankYouBanner />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </FundraisePage>

      <AnimatedJourneySection />
    </>
  );
}
