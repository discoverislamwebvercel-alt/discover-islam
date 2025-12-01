'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import FundraisePage from '@/components/common/FundraisePage';
import AnimatedJourneySection from '@/components/common/AnimatedJourneySection';
import HookForm from '@/components/common/HookForm';
import HookFormInput from '@/components/common/HookFormInput';
import HookFormSelect from '@/components/common/HookFormSelect';
import HookFormTextarea from '@/components/common/HookFormTextarea';
import { useFormContext } from 'react-hook-form';
import {
  partnershipFormSchema,
  partnershipFormDefaultValues,
  organizationTypeOptions,
  partnershipTypeOptions,
  type PartnershipFormData,
} from '@/lib/validation/partnershipForm';
import {
  sendPartnershipFormEmail,
  sendUserConfirmationEmail,
} from '@/lib/email';
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

export default function PartnerWithUsPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (
    data: PartnershipFormData,
    _helpers: { reset: () => void }
  ) => {
    setIsLoading(true);
    const toastId = toast.loading('Submitting your partnership request...');

    try {
      // Send email using server action
      const result = await sendPartnershipFormEmail(data);

      if (result.success) {
        // Send confirmation email to user
        const userEmail = data.email as string;
        if (userEmail) {
          try {
            await sendUserConfirmationEmail(
              userEmail,
              'Partnership Request',
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
          'Partnership request submitted successfully! We will contact you soon.',
          { id: toastId }
        );
      } else {
        throw new Error(result.error || 'Failed to send email');
      }
    } catch (error) {
      console.error('Error submitting partnership request:', error);
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
      <FundraisePage
        title='Partner with Us'
        titleClassName='text-[#111111]'
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
            className='font-medium text-lg md:text-xl lg:text-[30px] leading-[100%] text-center w-full max-w-[1100px] tracking-normal'
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
            style={{
              fontFamily:
                'SF Pro Display, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial',
              fontWeight: 500,
            }}
          >
            Strong partnerships build strong communities. Discover Islam
            welcomes collaboration with individuals, organizations, and
            institutions that share our vision of education, understanding, and
            unity. Let&apos;s work together on meaningful projects and new
            initiatives.
          </motion.p>
        </motion.div>

        {/* Partnership Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <HookForm
            schema={partnershipFormSchema}
            defaultValues={partnershipFormDefaultValues}
            onSubmit={handleSubmit}
            className='mb-16'
            maxWidth='920px'
            mode='onChange'
          >
            <div className='space-y-4 sm:space-y-5 md:space-y-6'>
              {/* Organization Information */}
              <HookFormInput
                label='Organization/Company Name (or indicate if an individual)'
                name='organizationName'
                type='text'
                placeholder='Enter Organization/Company Name (or indicate if an individual)'
                required
              />

              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <HookFormSelect
                  label='Type of Organization'
                  name='organizationType'
                  placeholder='Choose Type of Organization'
                  options={organizationTypeOptions}
                  required
                />
                <HookFormInput
                  label="Contact Person's Full Name"
                  name='contactPersonName'
                  type='text'
                  placeholder="Enter Contact Person's Full Name"
                  required
                />
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <HookFormInput
                  label='Position/Role'
                  name='position'
                  type='text'
                  placeholder='Enter Position/Role'
                  required
                />
                <HookFormInput
                  label='Email Address'
                  name='email'
                  type='email'
                  placeholder='Enter Email Address'
                  required
                />
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <HookFormInput
                  label='Phone Number'
                  name='phone'
                  type='tel'
                  placeholder='Enter Phone Number'
                  required
                />
                <HookFormSelect
                  label='Type of Partnership'
                  name='partnershipType'
                  placeholder='Choose Type'
                  options={partnershipTypeOptions}
                  required
                />
              </div>

              <HookFormTextarea
                label='How do you see us working together?'
                name='workingTogether'
                placeholder='Enter How do you see us working together?'
                rows={4}
                required
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
