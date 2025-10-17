'use client';

import { motion, useAnimationControls } from 'framer-motion';
import { ArrowDown, ChevronDown } from 'lucide-react';
import Button from './common/Button';
import React, { useRef, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';

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
  transportMethod: z.string().optional(),
  topics: z
    .string()
    .min(1, 'Please select topics you would like covered during the visit')
    .refine(
      val => val !== '',
      'Please select topics you would like covered during the visit'
    ),
  accessibility: z.string().optional(),
  hearAbout: z
    .string()
    .min(1, 'Please select how you heard about us')
    .refine(val => val !== '', 'Please select how you heard about us'),
});

type FormValues = z.infer<typeof schema>;

const MosqueVisitForm = () => {
  const formRef = useRef<HTMLDivElement | null>(null);
  const buttonControls = useAnimationControls();
  const formControls = useAnimationControls();
  const [buttonHidden, setButtonHidden] = useState(false);
  const [isHidden, setIsHidden] = useState('hidden');
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: 'onSubmit', // Only validate on submit to prevent early validation errors
    reValidateMode: 'onBlur',
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
      transportMethod: '',
      topics: '',
      accessibility: '',
      hearAbout: '',
    },
  });

  const onSubmit = async (_values: FormValues) => {
    try {
      // Simulate API call
      await new Promise(r => setTimeout(r, 600));

      // Show success message
      alert(
        'Mosque visit booking request submitted successfully! We will contact you soon to confirm the details.'
      );

      // In production, integrate with API endpoint
      // await submitMosqueVisitRequest(values);

      // Reset form after successful submission
      reset();
    } catch (error) {
      console.error('Error submitting mosque visit request:', error);
      alert(
        'There was an error submitting your booking request. Please try again or contact us directly.'
      );
    }
  };
  return (
    <section className='relative w-full bg-[#FFFFFF]'>
      {/* Hanging Bell Images */}
      <div className='absolute left-5 top-0 z-10'>
        <Image
          src='/figma/hanging-bell.png'
          alt='Hanging bell decoration'
          width={80}
          height={80}
        />
      </div>
      <div className='absolute right-5 top-0 z-10'>
        <Image
          src='/figma/hanging-bell.png'
          alt='Hanging bell decoration'
          width={80}
          height={80}
        />
      </div>

      <div className='mx-auto flex max-w-[1230px] flex-col items-center px-4 py-16 sm:py-20 md:py-24 lg:py-28'>
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className='text-center font-extrabold text-[#CB892A] tracking-[-0.03em] leading-[0.94] text-4xl sm:text-5xl md:text-6xl lg:text-[80px]'
        >
          Mosque Visit
        </motion.h1>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
          className='mt-4 text-center text-[#000000CC]'
        >
          <p className='mx-auto max-w-[1100px] font-extrabold leading-[1.07] tracking-[0] text-2xl sm:text-4xl md:text-5xl lg:text-[80px]'>
            Bring your students to
          </p>
          <p className='mx-auto max-w-[1100px] font-extrabold leading-[1.07] tracking-[0] text-2xl sm:text-4xl md:text-5xl lg:text-[80px]'>
            our mosque for an
          </p>
          <p className='mx-auto max-w-[1100px] font-extrabold leading-[1.07] tracking-[0] text-2xl sm:text-4xl md:text-5xl lg:text-[80px]'>
            inspiring experience
          </p>
        </motion.div>

        {/* Call to action */}
        {!buttonHidden && (
          <motion.div
            initial={{ opacity: 1, y: 0 }}
            animate={buttonControls}
            className='mt-8'
          >
            <Button
              variant='primary'
              className='!w-[280px] !h-[50px] !px-[25px] !py-[12px] !rounded-[40px] !text-[18px] sm:!w-[320px] sm:!h-[55px] sm:!px-[30px] sm:!py-[14px] sm:!text-[20px] md:!w-[360px] md:!h-[60px] md:!px-[35px] md:!py-[16px] md:!text-[22px] lg:!w-[404px] lg:!h-[67px] lg:!px-[37px] lg:!py-[18px] lg:!rounded-[52px] lg:!text-[26px] !font-extrabold !leading-[1] tracking-[0] shadow-sm bg-[#181818] text-white hover:bg-[#181818]/90'
              onClick={async () => {
                setIsHidden('block');
                // Smoother, slightly longer animations with an ease-out bezier
                const ease = [0.22, 1, 0.36, 1] as const;
                buttonControls.start({
                  y: 48,
                  opacity: 0,
                  transition: { duration: 0.6, ease },
                });
                formControls.start({
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.5,
                    ease: 'easeOut',
                  },
                });
                // Hide button after animation completes
                setTimeout(() => setButtonHidden(true), 620);
              }}
            >
              <span className='inline-flex items-center gap-[12px]'>
                Fill out form
                <ArrowDown
                  size={26}
                  strokeWidth={2}
                  className='w-[18px] h-[18px] sm:w-[20px] sm:h-[20px] md:w-[22px] md:h-[22px] lg:w-[26px] lg:h-[26px]'
                />
              </span>
            </Button>
          </motion.div>
        )}
      </div>

      {/* Form */}
      <motion.div
        ref={formRef}
        initial={{ opacity: 0, y: 32 }}
        animate={formControls}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`mx-auto w-full max-w-[600px] sm:max-w-[700px] md:max-w-[800px] lg:max-w-[940px] px-4 sm:px-5 md:px-6 pb-12 sm:pb-14 md:pb-16 transform-gpu ${isHidden}`}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='space-y-8 sm:space-y-7 md:space-y-8 lg:space-y-10'
        >
          {/* Full Name */}
          <div>
            <label className='mb-2 block text-[16px] leading-[20px] sm:text-[18px] sm:leading-[22px] md:text-[20px] md:leading-[24px] lg:text-[22px] lg:leading-[28px] font-medium text-[#181818]'>
              Full Name*
            </label>
            <Controller
              name='fullName'
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  placeholder='Enter Full Name'
                  className='h-[45px] sm:h-[50px] md:h-[55px] lg:h-[60px] w-full rounded-[35px] sm:rounded-[40px] md:rounded-[50px] lg:rounded-[62px] bg-[#0000000D] px-4 sm:px-5 text-[16px] sm:text-[18px] md:text-[19px] lg:text-[20px] text-[#181818] placeholder-[#0000001A] outline-none focus:ring-2 focus:ring-[#408360]/30'
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
            <label className='mb-2 block text-[16px] leading-[20px] sm:text-[18px] sm:leading-[22px] md:text-[20px] md:leading-[24px] lg:text-[22px] lg:leading-[28px] font-medium text-[#181818]'>
              School Name*
            </label>
            <Controller
              name='schoolName'
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  placeholder='Enter School Name'
                  className='h-[45px] sm:h-[50px] md:h-[55px] lg:h-[60px] w-full rounded-[35px] sm:rounded-[40px] md:rounded-[50px] lg:rounded-[62px] bg-[#0000000D] px-4 sm:px-5 text-[16px] sm:text-[18px] md:text-[19px] lg:text-[20px] placeholder-[#0000001A] text-[#181818]'
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
            <label className='mb-2 block text-[16px] leading-[20px] sm:text-[18px] sm:leading-[22px] md:text-[20px] md:leading-[24px] lg:text-[22px] lg:leading-[28px] font-medium text-[#181818]'>
              Role*
            </label>
            <Controller
              name='role'
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  placeholder='e.g., Teacher, RE Lead'
                  className='h-[45px] sm:h-[50px] md:h-[55px] lg:h-[60px] w-full rounded-[35px] sm:rounded-[40px] md:rounded-[50px] lg:rounded-[62px] bg-[#0000000D] px-4 sm:px-5 text-[16px] sm:text-[18px] md:text-[19px] lg:text-[20px] placeholder-[#0000001A] text-[#181818]'
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
              <label className='mb-2 block text-[16px] leading-[20px] sm:text-[18px] sm:leading-[22px] md:text-[20px] md:leading-[24px] lg:text-[22px] lg:leading-[28px] font-medium text-[#181818]'>
                Email*
              </label>
              <Controller
                name='email'
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    placeholder='Enter Email'
                    className='h-[45px] sm:h-[50px] md:h-[55px] lg:h-[60px] w-full rounded-[35px] sm:rounded-[40px] md:rounded-[50px] lg:rounded-[62px] bg-[#0000000D] px-4 sm:px-5 text-[16px] sm:text-[18px] md:text-[19px] lg:text-[20px] placeholder-[#0000001A] text-[#181818]'
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
              <label className='mb-2 block text-[16px] leading-[20px] sm:text-[18px] sm:leading-[22px] md:text-[20px] md:leading-[24px] lg:text-[22px] lg:leading-[28px] font-medium text-[#181818]'>
                Phone Number*
              </label>
              <Controller
                name='phone'
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    placeholder='Enter Phone Number'
                    className='h-[45px] sm:h-[50px] md:h-[55px] lg:h-[60px] w-full rounded-[35px] sm:rounded-[40px] md:rounded-[50px] lg:rounded-[62px] bg-[#0000000D] px-4 sm:px-5 text-[16px] sm:text-[18px] md:text-[19px] lg:text-[20px] placeholder-[#0000001A] text-[#181818]'
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
            <label className='mb-2 block text-[16px] leading-[20px] sm:text-[18px] sm:leading-[22px] md:text-[20px] md:leading-[24px] lg:text-[22px] lg:leading-[28px] font-medium text-[#181818]'>
              Location / Address of School*
            </label>
            <Controller
              name='address'
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  placeholder='Enter Location / Address of School'
                  className='h-[45px] sm:h-[50px] md:h-[55px] lg:h-[60px] w-full rounded-[35px] sm:rounded-[40px] md:rounded-[50px] lg:rounded-[62px] bg-[#0000000D] px-4 sm:px-5 text-[16px] sm:text-[18px] md:text-[19px] lg:text-[20px] placeholder-[#0000001A] text-[#181818]'
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
            <label className='mb-2 block text-[16px] leading-[20px] sm:text-[18px] sm:leading-[22px] md:text-[20px] md:leading-[24px] lg:text-[22px] lg:leading-[28px] font-medium text-[#181818]'>
              Preferred Date(s)*
            </label>
            <Controller
              name='preferredDates'
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  placeholder='Enter Preferred Date(s)'
                  className='h-[45px] sm:h-[50px] md:h-[55px] lg:h-[60px] w-full rounded-[35px] sm:rounded-[40px] md:rounded-[50px] lg:rounded-[62px] bg-[#0000000D] px-4 sm:px-5 text-[16px] sm:text-[18px] md:text-[19px] lg:text-[20px] placeholder-[#0000001A] text-[#181818]'
                />
              )}
            />
            {errors.preferredDates && (
              <p className='mt-1 text-[11px] text-red-600'>
                {errors.preferredDates.message}
              </p>
            )}
          </div>

          {/* Year groups and Number of Students */}
          <div className='grid grid-cols-1 gap-[30px] sm:gap-[25px] md:gap-[35px] lg:gap-[41px] md:grid-cols-2'>
            <div>
              <label className='mb-2 block text-[16px] leading-[20px] sm:text-[18px] sm:leading-[22px] md:text-[20px] md:leading-[24px] lg:text-[22px] lg:leading-[28px] font-medium text-[#181818]'>
                Year Groups / Key Stages*
              </label>
              <Controller
                name='yearGroups'
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    placeholder='Enter Year Groups / Key Stages'
                    className='h-[45px] sm:h-[50px] md:h-[55px] lg:h-[60px] w-full rounded-[35px] sm:rounded-[40px] md:rounded-[50px] lg:rounded-[62px] bg-[#0000000D] px-4 sm:px-5 text-[16px] sm:text-[18px] md:text-[19px] lg:text-[20px] placeholder-[#0000001A] text-[#181818]'
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
              <label className='mb-2 block text-[16px] leading-[20px] sm:text-[18px] sm:leading-[22px] md:text-[20px] md:leading-[24px] lg:text-[22px] lg:leading-[28px] font-medium text-[#181818]'>
                Number of Students*
              </label>
              <Controller
                name='numStudents'
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    placeholder='Enter Number of Students'
                    className='h-[45px] sm:h-[50px] md:h-[55px] lg:h-[60px] w-full rounded-[35px] sm:rounded-[40px] md:rounded-[50px] lg:rounded-[62px] bg-[#0000000D] px-4 sm:px-5 text-[16px] sm:text-[18px] md:text-[19px] lg:text-[20px] placeholder-[#0000001A] text-[#181818]'
                  />
                )}
              />
              {errors.numStudents && (
                <p className='mt-1 text-[11px] text-red-600'>
                  {errors.numStudents.message}
                </p>
              )}
            </div>
          </div>

          {/* Transport Method and Topics */}
          <div className='grid grid-cols-1 gap-[30px] sm:gap-[25px] md:gap-[35px] lg:gap-[41px] md:grid-cols-2'>
            <div>
              <label className='mb-2 block text-[16px] leading-[20px] sm:text-[18px] sm:leading-[22px] md:text-[20px] md:leading-[24px] lg:text-[22px] lg:leading-[28px] font-medium text-[#181818]'>
                Transport Method
              </label>
              <Controller
                name='transportMethod'
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    placeholder='Enter Transport Method'
                    className='h-[45px] sm:h-[50px] md:h-[55px] lg:h-[60px] w-full rounded-[35px] sm:rounded-[40px] md:rounded-[50px] lg:rounded-[62px] bg-[#0000000D] px-4 sm:px-5 text-[16px] sm:text-[18px] md:text-[19px] lg:text-[20px] placeholder-[#0000001A] text-[#181818]'
                  />
                )}
              />
            </div>
            <div>
              <label className='mb-2 block text-[16px] leading-[20px] sm:text-[18px] sm:leading-[22px] md:text-[20px] md:leading-[24px] lg:text-[22px] lg:leading-[28px] font-medium text-[#181818]'>
                Topics you&apos;d like covered during the visit*
              </label>
              <Controller
                name='topics'
                control={control}
                render={({ field }) => (
                  <div className='relative'>
                    <select
                      {...field}
                      className='h-[45px] sm:h-[50px] md:h-[55px] lg:h-[60px] w-full appearance-none rounded-[35px] sm:rounded-[40px] md:rounded-[50px] lg:rounded-[62px] bg-[#0000000D] pl-4 sm:pl-5 pr-10 sm:pr-12 text-[16px] sm:text-[18px] md:text-[19px] lg:text-[20px] placeholder-[#0000001A] text-[#181818]'
                    >
                      <option value=''>
                        Enter Topics you&apos;d like covered during the visit
                      </option>
                      <option value='islam_basics'>Islam Basics</option>
                      <option value='ramadan'>Ramadan</option>
                      <option value='prophets'>Prophets</option>
                      <option value='prayer'>Prayer</option>
                      <option value='mosque_tour'>Mosque Tour</option>
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

          {/* Accessibility */}
          <div>
            <label className='mb-2 block text-[16px] leading-[20px] sm:text-[18px] sm:leading-[22px] md:text-[20px] md:leading-[24px] lg:text-[22px] lg:leading-[28px] font-medium text-[#181818]'>
              Any Accessibility or Special Requirements
            </label>
            <Controller
              name='accessibility'
              control={control}
              render={({ field }) => (
                <textarea
                  {...field}
                  placeholder='Enter details'
                  className='min-h-[80px] sm:min-h-[90px] md:min-h-[100px] lg:min-h-[105px] w-full resize-y rounded-[15px] sm:rounded-[20px] md:rounded-[22px] lg:rounded-[25px] bg-[#0000000D] px-4 sm:px-5 py-2 sm:py-3 text-[16px] sm:text-[18px] md:text-[19px] lg:text-[20px] placeholder-[#0000001A] text-[#181818]'
                />
              )}
            />
          </div>

          {/* Hear about */}
          <div>
            <label className='mb-2 block text-[16px] leading-[20px] sm:text-[18px] sm:leading-[22px] md:text-[20px] md:leading-[24px] lg:text-[22px] lg:leading-[28px] font-medium text-[#181818]'>
              How did you hear about us?
            </label>
            <Controller
              name='hearAbout'
              control={control}
              render={({ field }) => (
                <div className='relative'>
                  <select
                    {...field}
                    className='h-[60px] w-full appearance-none rounded-[62px] bg-[#0000000D] pl-5 pr-12 text-[20px] placeholder-[#0000001A] text-[#111111]'
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
                    className='pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-black/40'
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
          <div className='pt-6'>
            <button
              type='submit'
              disabled={isSubmitting}
              className='w-[280px] h-[50px] rounded-[40px] bg-[#181818] px-[25px] py-[12px] text-[18px] leading-[22px] sm:w-[320px] sm:h-[55px] sm:px-[30px] sm:py-[14px] sm:text-[20px] sm:leading-[24px] md:w-[360px] md:h-[60px] md:px-[35px] md:py-[16px] md:text-[22px] md:leading-[26px] lg:w-[404px] lg:h-[67px] lg:rounded-[52px] lg:px-[37px] lg:py-[18px] lg:text-[26px] lg:leading-[31px] font-extrabold text-white hover:bg-[#181818]/90 disabled:opacity-70'
            >
              Submit Booking Request
            </button>
          </div>
        </form>
      </motion.div>
    </section>
  );
};

export default MosqueVisitForm;
