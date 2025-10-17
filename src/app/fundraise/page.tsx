'use client';

import React, { useState } from 'react';
import FundraisePageComponent from '@/components/common/FundraisePage';
import FormikForm from '@/components/common/FormikForm';
import Input from '@/components/common/Input';
import Textarea from '@/components/common/Textarea';
import Select from '@/components/common/Select';
import * as Yup from 'yup';
import Button from '@/components/common/Button';
import AnimatedJourneySection from '@/components/common/AnimatedJourneySection';
import { sendFundraiseFormEmail, sendUserConfirmationEmail } from '@/lib/email';
import toast from 'react-hot-toast';
import Spinner from '@/components/common/Spinner';

// Validation schema for fundraising form
const fundraiseFormSchema = Yup.object({
  fullName: Yup.string()
    .min(2, 'Full name must be at least 2 characters')
    .max(100, 'Full name must be less than 100 characters')
    .required('Full name is required'),

  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Email address is required'),

  phone: Yup.string()
    .min(10, 'Phone number must be at least 10 digits')
    .required('Phone number is required'),

  organization: Yup.string().max(
    150,
    'Organization name must be less than 150 characters'
  ),

  fundraisingType: Yup.string().required('Please select a type of fundraising'),

  location: Yup.string().required('Location is required'),

  preferredDate: Yup.string().required('Preferred date is required'),

  support: Yup.string()
    .min(10, 'Please provide more details')
    .max(500, 'Description must be less than 500 characters')
    .required('This field is required'),

  notes: Yup.string().max(
    1000,
    'Additional notes must be less than 1000 characters'
  ),
});

// Initial form values
const initialValues = {
  fullName: '',
  email: '',
  phone: '',
  organization: '',
  fundraisingType: '',
  location: '',
  preferredDate: '',
  support: '',
  notes: '',
};

// Fundraising type options
const fundraisingTypeOptions = [
  { value: 'event', label: 'Fundraising Event' },
  { value: 'campaign', label: 'Online Campaign' },
  { value: 'charity-run', label: 'Charity Run/Walk' },
  { value: 'bake-sale', label: 'Bake Sale' },
  { value: 'auction', label: 'Charity Auction' },
  { value: 'other', label: 'Other' },
];

const FundraisePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (
    values: typeof initialValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    setIsLoading(true);
    const toastId = toast.loading('Submitting your fundraising request...');

    try {
      // Send email using server action
      const result = await sendFundraiseFormEmail(values);

      if (result.success) {
        // Send confirmation email to user
        const userEmail = values.email as string;
        if (userEmail) {
          try {
            await sendUserConfirmationEmail(
              userEmail,
              'Fundraising Request',
              values
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
          'Thank you for your interest in fundraising with us! We will contact you soon.',
          { id: toastId }
        );
        // Reset form after successful submission
        resetForm();
      } else {
        throw new Error(result.error || 'Failed to send email');
      }
    } catch (error) {
      console.error('Error submitting fundraising request:', error);
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
      <FundraisePageComponent>
        <FormikForm
          initialValues={initialValues}
          validationSchema={fundraiseFormSchema}
          onSubmit={handleSubmit}
        >
          <div className='space-y-6'>
            {/* Personal Information */}
            <Input
              label='Full Name'
              name='fullName'
              placeholder='Enter Full Name'
              required
            />
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <Input
                label='Email'
                name='email'
                type='email'
                placeholder='Enter Email'
                required
              />
              <Input
                label='Phone Number'
                name='phone'
                type='tel'
                placeholder='Enter Phone Number'
                required
              />
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <Input
                label='Organization/Business (if any)'
                name='organization'
                placeholder='Enter Organisation / Centre Name'
              />
              <Select
                label='Type of Fundraising'
                name='fundraisingType'
                options={fundraisingTypeOptions}
                placeholder='Choose Type of Fundraising'
                required
              />
            </div>

            {/* Fundraising Details */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <Input
                label='Location / City'
                name='location'
                placeholder='Enter Location'
                required
              />
              <Input
                label='Preferred Date(s)'
                name='preferredDate'
                type='date'
                placeholder='Enter Preferred Date(s)'
                required
              />
            </div>

            {/* Support Details */}
            <Input
              label='How would you like Discover Islam to support you?'
              name='support'
              placeholder='Resources, Promotion, Speakers, etc.'
              required
            />

            <Textarea
              label='Any additional notes or requests'
              name='notes'
              placeholder='Enter any additional information...'
              rows={4}
            />

            {/* Submit Button */}
            <div className='flex pt-4'>
              <Button
                className='w-[200px] text-[26px] font-extrabold flex items-center justify-center gap-3'
                type='submit'
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Spinner size='sm' className='text-white' />
                    Submitting...
                  </>
                ) : (
                  'Submit'
                )}
              </Button>
            </div>
          </div>
        </FormikForm>
      </FundraisePageComponent>
      <AnimatedJourneySection />
    </>
  );
};

export default FundraisePage;
