'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import FundraisePage from '@/components/common/FundraisePage';
import AnimatedJourneySection from '@/components/common/AnimatedJourneySection';
import HookForm from '@/components/common/HookForm';
import HookFormInput from '@/components/common/HookFormInput';
import HookFormTextarea from '@/components/common/HookFormTextarea';
import { useFormContext } from 'react-hook-form';
import {
  volunteerFormSchema,
  volunteerFormDefaultValues,
  type VolunteerFormData,
} from '@/lib/validation/volunteerForm';
import { sendVolunteerFormEmail, sendUserConfirmationEmail } from '@/lib/email';
import toast from 'react-hot-toast';

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
        {isLoading || isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </div>
  );
};

export default function VolunteerPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (
    data: VolunteerFormData,
    _helpers: { reset: () => void }
  ) => {
    setIsLoading(true);
    const toastId = toast.loading('Submitting your volunteer application...');

    try {
      // Send email using server action
      const result = await sendVolunteerFormEmail(data);

      if (result.success) {
        // Send confirmation email to user
        const userEmail = data.email as string;
        if (userEmail) {
          try {
            await sendUserConfirmationEmail(
              userEmail,
              'Volunteer Application',
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

        toast.success(
          'Volunteer application submitted successfully! We will contact you soon.',
          { id: toastId }
        );
      } else {
        throw new Error(result.error || 'Failed to send email');
      }
    } catch (error) {
      console.error('Error submitting volunteer application:', error);
      toast.error(
        'There was an error submitting your application. Please try again.',
        { id: toastId }
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <FundraisePage
        title='Volunteer with Us'
        titleClassName='text-[#408360]'
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
            Volunteers are the heart of Discover Islam&apos;s mission. By giving
            your time, skills, and passion, you help us reach more people and
            create meaningful connections. Whatever your expertise, there is a
            place for you in our team!
          </motion.p>
        </motion.div>

        {/* Volunteer Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <HookForm
            schema={volunteerFormSchema}
            defaultValues={volunteerFormDefaultValues}
            onSubmit={handleSubmit}
            className='mb-16'
            maxWidth='920px'
            mode='onChange'
          >
            <div className='space-y-4 sm:space-y-5 md:space-y-6'>
              {/* Personal Information */}
              <HookFormInput
                label='Full Name'
                name='fullName'
                type='text'
                placeholder='Enter Full Name'
                required
              />

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

              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <HookFormInput
                  label='Age'
                  name='age'
                  type='number'
                  placeholder='Enter Age'
                  required
                  min={16}
                  max={100}
                />
                <HookFormInput
                  label='Location / City'
                  name='location'
                  type='text'
                  placeholder='Enter Location'
                  required
                />
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <HookFormInput
                  label='Current Occupation/Profession'
                  name='occupation'
                  type='text'
                  placeholder='Teacher, Engineer, Student etc.'
                  required
                />
                <HookFormInput
                  label='Skills & Interests'
                  name='skills'
                  type='text'
                  placeholder='Teaching, Event Mgmt, Design, Admin etc.'
                  required
                />
              </div>

              <HookFormInput
                label='Availability'
                name='availability'
                type='text'
                placeholder='Weekdays, Weekends, Evenings, Flexible'
                required
              />

              <HookFormTextarea
                label='Previous Volunteer Experience (optional)'
                name='experience'
                placeholder='Enter Previous Volunteer Experience (optional)'
                rows={3}
                maxLength={1000}
              />

              {/* Submit Button */}
              <SubmitButton isLoading={isLoading} />
            </div>
          </HookForm>
        </motion.div>
      </FundraisePage>

      <AnimatedJourneySection />
    </>
  );
}
