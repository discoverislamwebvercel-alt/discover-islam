'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import FundraisePage from '@/components/common/FundraisePage';
import AnimatedJourneySection from '@/components/common/AnimatedJourneySection';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronDown } from 'lucide-react';
import {
  sendSchoolVisitFormEmail,
  sendUserConfirmationEmail,
} from '@/lib/email';
import toast from 'react-hot-toast';
import Spinner from '@/components/common/Spinner';

const schema = z.object({
  fullName: z
    .string()
    .min(1, 'Full name is required')
    .refine(
      val => val.trim().length >= 2,
      'Full name must be at least 2 characters long'
    )
    .refine(val => val.length <= 100, 'Full name cannot exceed 100 characters')
    .refine(
      val => /^[a-zA-Z\s\-\']+$/.test(val),
      'Full name can only contain letters, spaces, hyphens, and apostrophes'
    ),
  schoolName: z
    .string()
    .min(1, 'School name is required')
    .refine(
      val => val.trim().length >= 2,
      'School name must be at least 2 characters long'
    )
    .refine(
      val => val.length <= 150,
      'School name cannot exceed 150 characters'
    ),
  role: z
    .string()
    .min(1, 'Your role is required')
    .refine(
      val => val.trim().length >= 2,
      'Role must be at least 2 characters long'
    )
    .refine(val => val.length <= 100, 'Role cannot exceed 100 characters'),
  email: z
    .string()
    .min(1, 'Email address is required')
    .refine(
      val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
      'Please enter a valid email address (e.g., teacher@school.edu)'
    )
    .refine(
      val => val.length <= 254,
      'Email address cannot exceed 254 characters'
    ),
  phone: z
    .string()
    .min(1, 'Phone number is required')
    .refine(
      val => val.replace(/\D/g, '').length >= 7,
      'Phone number must be at least 7 digits long'
    )
    .refine(val => val.length <= 20, 'Phone number cannot exceed 20 characters')
    .refine(
      val =>
        /^[\+]?[1-9][\d]{0,3}[\s\-\.]?[\(]?[\d]{1,3}[\)]?[\s\-\.]?[\d]{1,4}[\s\-\.]?[\d]{1,4}[\s\-\.]?[\d]{0,9}$/.test(
          val
        ),
      'Please enter a valid phone number (e.g., +44 20 7946 0958 or 020 7946 0958)'
    ),
  address: z
    .string()
    .min(1, 'School address is required')
    .refine(
      val => val.trim().length >= 10,
      'School address must be at least 10 characters long for accurate location'
    )
    .refine(
      val => val.length <= 500,
      'School address cannot exceed 500 characters'
    ),
  preferredDates: z
    .string()
    .min(1, 'Preferred date(s) are required')
    .refine(
      val => val.trim().length >= 5,
      'Please provide more detailed preferred date(s)'
    )
    .refine(
      val => val.length <= 200,
      'Preferred dates cannot exceed 200 characters'
    ),
  yearGroups: z
    .string()
    .min(1, 'Year groups/Key stages are required')
    .refine(
      val => val.trim().length >= 3,
      'Please specify the year groups or key stages (e.g., Year 7-9, KS3)'
    )
    .refine(
      val => val.length <= 100,
      'Year groups cannot exceed 100 characters'
    ),
  numStudents: z
    .string()
    .min(1, 'Number of students is required')
    .refine(
      val => /^\d+$/.test(val),
      'Number of students must be a valid number (no letters or decimals)'
    )
    .refine(val => Number(val) > 0, 'Number of students must be greater than 0')
    .refine(
      val => Number(val) <= 1000,
      'Number of students cannot exceed 1000'
    ),
  topics: z
    .string()
    .min(1, 'Please select a topic of interest')
    .refine(val => val !== '', 'Please select a topic of interest'),
  accessibility: z.string().optional(),
  hearAbout: z
    .string()
    .min(1, 'Please select how you heard about us')
    .refine(val => val !== '', 'Please select how you heard about us'),
});

type FormValues = z.infer<typeof schema>;

export default function SchoolVisitPage() {
  const [isLoading, setIsLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
    defaultValues: {
      fullName: '',
      schoolName: '',
      role: '',
      email: '',
      phone: '',
      address: '',
      preferredDates: '',
      yearGroups: '',
      numStudents: '',
      topics: '',
      accessibility: '',
      hearAbout: '',
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    const toastId = toast.loading('Submitting your booking request...');

    try {
      const result = await sendSchoolVisitFormEmail(values);

      if (result.success) {
        const userEmail = values.email as string;
        if (userEmail) {
          try {
            await sendUserConfirmationEmail(
              userEmail,
              'School Visit Booking',
              values
            );
          } catch (confirmationError) {
            console.error(
              'Error sending confirmation email:',
              confirmationError
            );
          }
        }

        toast.success(
          'School visit booking request submitted successfully! We will contact you soon to confirm the details.',
          { id: toastId }
        );
        reset();
      } else {
        throw new Error(result.error || 'Failed to send email');
      }
    } catch (error) {
      console.error('Error submitting school visit request:', error);
      toast.error(
        'There was an error submitting your booking request. Please try again or contact us directly.',
        { id: toastId }
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <FundraisePage
        title='In School Visit'
        titleClassName='text-[#408360]'
        containerClassName='max-w-[940px] px-4 sm:px-6 lg:px-8'
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
            We visit your school to deliver an engaging and interactive
            presentation about Islam, tailored to your students&apos; age and
            curriculum needs.
          </motion.p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='space-y-8 sm:space-y-7 md:space-y-8 lg:space-y-10 mb-16'
          >
            {/* Full Name */}
            <div>
              <label className='mb-2 block text-[16px] leading-[20px] sm:text-[18px] sm:leading-[22px] md:text-[20px] md:leading-[24px] lg:text-[22px] lg:leading-[28px] font-medium text-[#111111]'>
                Full Name*
              </label>
              <Controller
                name='fullName'
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    placeholder='Enter Full Name'
                    className='h-[45px] sm:h-[50px] md:h-[55px] lg:h-[60px] w-full rounded-[35px] sm:rounded-[40px] md:rounded-[50px] lg:rounded-[62px] bg-[#0000000D] px-4 sm:px-5 text-[16px] sm:text-[18px] md:text-[19px] lg:text-[20px] text-[#111111] placeholder-[#0000001A] outline-none focus:ring-2 focus:ring-[#408360]/30'
                  />
                )}
              />
              {errors.fullName && (
                <p className='mt-1 text-[11px] text-red-600'>
                  {errors.fullName.message}
                </p>
              )}
            </div>

            {/* School Name */}
            <div>
              <label className='mb-2 block text-[16px] leading-[20px] sm:text-[18px] sm:leading-[22px] md:text-[20px] md:leading-[24px] lg:text-[22px] lg:leading-[28px] font-medium text-[#111111]'>
                School Name*
              </label>
              <Controller
                name='schoolName'
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    placeholder='Enter School Name'
                    className='h-[45px] sm:h-[50px] md:h-[55px] lg:h-[60px] w-full rounded-[35px] sm:rounded-[40px] md:rounded-[50px] lg:rounded-[62px] bg-[#0000000D] px-4 sm:px-5 text-[16px] sm:text-[18px] md:text-[19px] lg:text-[20px] placeholder-[#0000001A] text-[#111111]'
                  />
                )}
              />
              {errors.schoolName && (
                <p className='mt-1 text-[11px] text-red-600'>
                  {errors.schoolName.message}
                </p>
              )}
            </div>

            {/* Role */}
            <div>
              <label className='mb-2 block text-[16px] leading-[20px] sm:text-[18px] sm:leading-[22px] md:text-[20px] md:leading-[24px] lg:text-[22px] lg:leading-[28px] font-medium text-[#111111]'>
                Role*
              </label>
              <Controller
                name='role'
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    placeholder='e.g., Teacher, RE Lead'
                    className='h-[45px] sm:h-[50px] md:h-[55px] lg:h-[60px] w-full rounded-[35px] sm:rounded-[40px] md:rounded-[50px] lg:rounded-[62px] bg-[#0000000D] px-4 sm:px-5 text-[16px] sm:text-[18px] md:text-[19px] lg:text-[20px] placeholder-[#0000001A] text-[#111111]'
                  />
                )}
              />
              {errors.role && (
                <p className='mt-1 text-[11px] text-red-600'>
                  {errors.role.message}
                </p>
              )}
            </div>

            {/* Email + Phone */}
            <div className='grid grid-cols-1 gap-[30px] sm:gap-[25px] md:gap-[35px] lg:gap-[41px] md:grid-cols-2'>
              <div>
                <label className='mb-2 block text-[16px] leading-[20px] sm:text-[18px] sm:leading-[22px] md:text-[20px] md:leading-[24px] lg:text-[22px] lg:leading-[28px] font-medium text-[#111111]'>
                  Email*
                </label>
                <Controller
                  name='email'
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      placeholder='Enter Email'
                      className='h-[45px] sm:h-[50px] md:h-[55px] lg:h-[60px] w-full rounded-[35px] sm:rounded-[40px] md:rounded-[50px] lg:rounded-[62px] bg-[#0000000D] px-4 sm:px-5 text-[16px] sm:text-[18px] md:text-[19px] lg:text-[20px] placeholder-[#0000001A] text-[#111111]'
                    />
                  )}
                />
                {errors.email && (
                  <p className='mt-1 text-[11px] text-red-600'>
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div>
                <label className='mb-2 block text-[16px] leading-[20px] sm:text-[18px] sm:leading-[22px] md:text-[20px] md:leading-[24px] lg:text-[22px] lg:leading-[28px] font-medium text-[#111111]'>
                  Phone Number*
                </label>
                <Controller
                  name='phone'
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      placeholder='Enter Phone Number'
                      className='h-[45px] sm:h-[50px] md:h-[55px] lg:h-[60px] w-full rounded-[35px] sm:rounded-[40px] md:rounded-[50px] lg:rounded-[62px] bg-[#0000000D] px-4 sm:px-5 text-[16px] sm:text-[18px] md:text-[19px] lg:text-[20px] placeholder-[#0000001A] text-[#111111]'
                    />
                  )}
                />
                {errors.phone && (
                  <p className='mt-1 text-[11px] text-red-600'>
                    {errors.phone.message}
                  </p>
                )}
              </div>
            </div>

            {/* Address */}
            <div>
              <label className='mb-2 block text-[16px] leading-[20px] sm:text-[18px] sm:leading-[22px] md:text-[20px] md:leading-[24px] lg:text-[22px] lg:leading-[28px] font-medium text-[#111111]'>
                Location / Address of School*
              </label>
              <Controller
                name='address'
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    placeholder='Enter Location / Address of School'
                    className='h-[45px] sm:h-[50px] md:h-[55px] lg:h-[60px] w-full rounded-[35px] sm:rounded-[40px] md:rounded-[50px] lg:rounded-[62px] bg-[#0000000D] px-4 sm:px-5 text-[16px] sm:text-[18px] md:text-[19px] lg:text-[20px] placeholder-[#0000001A] text-[#111111]'
                  />
                )}
              />
              {errors.address && (
                <p className='mt-1 text-[11px] text-red-600'>
                  {errors.address.message}
                </p>
              )}
            </div>

            {/* Preferred dates */}
            <div>
              <label className='mb-2 block text-[16px] leading-[20px] sm:text-[18px] sm:leading-[22px] md:text-[20px] md:leading-[24px] lg:text-[22px] lg:leading-[28px] font-medium text-[#111111]'>
                Preferred Date(s)*
              </label>
              <Controller
                name='preferredDates'
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    placeholder='Enter Preferred Date(s)'
                    className='h-[45px] sm:h-[50px] md:h-[55px] lg:h-[60px] w-full rounded-[35px] sm:rounded-[40px] md:rounded-[50px] lg:rounded-[62px] bg-[#0000000D] px-4 sm:px-5 text-[16px] sm:text-[18px] md:text-[19px] lg:text-[20px] placeholder-[#0000001A] text-[#111111]'
                  />
                )}
              />
              {errors.preferredDates && (
                <p className='mt-1 text-[11px] text-red-600'>
                  {errors.preferredDates.message}
                </p>
              )}
            </div>

            {/* Year groups and Topics */}
            <div className='grid grid-cols-1 gap-[30px] sm:gap-[25px] md:gap-[35px] lg:gap-[41px] md:grid-cols-2'>
              <div>
                <label className='mb-2 block text-[16px] leading-[20px] sm:text-[18px] sm:leading-[22px] md:text-[20px] md:leading-[24px] lg:text-[22px] lg:leading-[28px] font-medium text-[#111111]'>
                  Year Groups / Key Stages*
                </label>
                <Controller
                  name='yearGroups'
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      placeholder='Enter Year Groups / Key Stages'
                      className='h-[45px] sm:h-[50px] md:h-[55px] lg:h-[60px] w-full rounded-[35px] sm:rounded-[40px] md:rounded-[50px] lg:rounded-[62px] bg-[#0000000D] px-4 sm:px-5 text-[16px] sm:text-[18px] md:text-[19px] lg:text-[20px] placeholder-[#0000001A] text-[#111111]'
                    />
                  )}
                />
                {errors.yearGroups && (
                  <p className='mt-1 text-[11px] text-red-600'>
                    {errors.yearGroups.message}
                  </p>
                )}
              </div>
              <div>
                <label className='mb-2 block text-[16px] leading-[20px] sm:text-[18px] sm:leading-[22px] md:text-[20px] md:leading-[24px] lg:text-[22px] lg:leading-[28px] font-medium text-[#111111]'>
                  Topics of Interest*
                </label>
                <Controller
                  name='topics'
                  control={control}
                  render={({ field }) => (
                    <div className='relative'>
                      <select
                        {...field}
                        className='h-[45px] sm:h-[50px] md:h-[55px] lg:h-[60px] w-full appearance-none rounded-[35px] sm:rounded-[40px] md:rounded-[50px] lg:rounded-[62px] bg-[#0000000D] pl-4 sm:pl-5 pr-10 sm:pr-12 text-[16px] sm:text-[18px] md:text-[19px] lg:text-[20px] placeholder-[#0000001A] text-[#111111]'
                      >
                        <option value=''>Select Topics of Interest</option>
                        <option value='islam_basics'>Islam Basics</option>
                        <option value='ramadan'>Ramadan</option>
                        <option value='prophets'>Prophets</option>
                      </select>
                      <ChevronDown
                        size={18}
                        strokeWidth={2}
                        className='pointer-events-none absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-black/40 w-[14px] h-[14px] sm:w-[16px] sm:h-[16px] md:w-[17px] md:h-[17px] lg:w-[18px] lg:h-[18px]'
                      />
                    </div>
                  )}
                />
                {errors.topics && (
                  <p className='mt-1 text-[11px] text-red-600'>
                    {errors.topics.message}
                  </p>
                )}
              </div>
            </div>

            {/* Number of Students */}
            <div>
              <label className='mb-2 block text-[16px] leading-[20px] sm:text-[18px] sm:leading-[22px] md:text-[20px] md:leading-[24px] lg:text-[22px] lg:leading-[28px] font-medium text-[#111111]'>
                Number of Students*
              </label>
              <Controller
                name='numStudents'
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    placeholder='Enter Number of Students'
                    className='h-[45px] sm:h-[50px] md:h-[55px] lg:h-[60px] w-full rounded-[35px] sm:rounded-[40px] md:rounded-[50px] lg:rounded-[62px] bg-[#0000000D] px-4 sm:px-5 text-[16px] sm:text-[18px] md:text-[19px] lg:text-[20px] placeholder-[#0000001A] text-[#111111]'
                  />
                )}
              />
              {errors.numStudents && (
                <p className='mt-1 text-[11px] text-red-600'>
                  {errors.numStudents.message}
                </p>
              )}
            </div>

            {/* Accessibility */}
            <div>
              <label className='mb-2 block text-[16px] leading-[20px] sm:text-[18px] sm:leading-[22px] md:text-[20px] md:leading-[24px] lg:text-[22px] lg:leading-[28px] font-medium text-[#111111]'>
                Any Accessibility or Special Requirements
              </label>
              <Controller
                name='accessibility'
                control={control}
                render={({ field }) => (
                  <textarea
                    {...field}
                    placeholder='Enter details'
                    className='min-h-[80px] sm:min-h-[90px] md:min-h-[100px] lg:min-h-[105px] w-full resize-y rounded-[15px] sm:rounded-[20px] md:rounded-[22px] lg:rounded-[25px] bg-[#0000000D] px-4 sm:px-5 py-2 sm:py-3 text-[16px] sm:text-[18px] md:text-[19px] lg:text-[20px] placeholder-[#0000001A] text-[#111111]'
                  />
                )}
              />
            </div>

            {/* Hear about */}
            <div>
              <label className='mb-2 block text-[16px] leading-[20px] sm:text-[18px] sm:leading-[22px] md:text-[20px] md:leading-[24px] lg:text-[22px] lg:leading-[28px] font-medium text-[#111111]'>
                How did you hear about us?*
              </label>
              <Controller
                name='hearAbout'
                control={control}
                render={({ field }) => (
                  <div className='relative'>
                    <select
                      {...field}
                      className='h-[45px] sm:h-[50px] md:h-[55px] lg:h-[60px] w-full appearance-none rounded-[35px] sm:rounded-[40px] md:rounded-[50px] lg:rounded-[62px] bg-[#0000000D] pl-4 sm:pl-5 pr-10 sm:pr-12 text-[16px] sm:text-[18px] md:text-[19px] lg:text-[20px] placeholder-[#0000001A] text-[#111111]'
                    >
                      <option value=''>Select platform</option>
                      <option value='google'>Google</option>
                      <option value='social'>Social Media</option>
                      <option value='referral'>Referral</option>
                      <option value='other'>Other</option>
                    </select>
                    <ChevronDown
                      size={18}
                      strokeWidth={2}
                      className='pointer-events-none absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-black/40 w-[14px] h-[14px] sm:w-[16px] sm:h-[16px] md:w-[17px] md:h-[17px] lg:w-[18px] lg:h-[18px]'
                    />
                  </div>
                )}
              />
              {errors.hearAbout && (
                <p className='mt-1 text-[11px] text-red-600'>
                  {errors.hearAbout.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <div className='pt-6 flex justify-center'>
              <button
                type='submit'
                disabled={isSubmitting || isLoading}
                className='w-full max-w-[404px] h-[50px] sm:h-[55px] md:h-[60px] lg:h-[67px] rounded-[40px] sm:rounded-[45px] md:rounded-[50px] lg:rounded-[52px] bg-[#408360] px-[25px] sm:px-[30px] md:px-[35px] lg:px-[37px] py-[12px] sm:py-[14px] md:py-[16px] lg:py-[18px] text-[18px] sm:text-[20px] md:text-[22px] lg:text-[26px] leading-[22px] sm:leading-[24px] md:leading-[26px] lg:leading-[31px] font-extrabold text-white hover:bg-[#357050] disabled:opacity-70 flex items-center justify-center gap-3 transition-colors'
              >
                {isLoading || isSubmitting ? (
                  <>
                    <Spinner size='sm' className='text-white' />
                    Submitting...
                  </>
                ) : (
                  'Submit Booking Request'
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </FundraisePage>

      <AnimatedJourneySection />
    </>
  );
}
