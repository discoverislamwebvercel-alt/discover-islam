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
import {
  sendPartnershipFormEmail,
  sendUserConfirmationEmail,
} from '@/lib/email';
import toast from 'react-hot-toast';
import Spinner from '@/components/common/Spinner';

// Validation schema for partnership form
const partnershipFormSchema = Yup.object({
  organizationName: Yup.string()
    .min(2, 'Organization name must be at least 2 characters')
    .max(150, 'Organization name must be less than 150 characters')
    .required('Organization/Company name is required'),

  organizationType: Yup.string().required('Type of organization is required'),

  contactPersonName: Yup.string()
    .min(2, 'Contact person name must be at least 2 characters')
    .max(100, 'Contact person name must be less than 100 characters')
    .required('Contact person name is required'),

  position: Yup.string()
    .min(2, 'Position must be at least 2 characters')
    .max(100, 'Position must be less than 100 characters')
    .required('Position/Role is required'),

  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Email address is required'),

  phone: Yup.string()
    .min(10, 'Phone number must be at least 10 digits')
    .required('Phone number is required'),

  partnershipType: Yup.string().required('Type of partnership is required'),

  goals: Yup.string()
    .min(10, 'Please provide more details about your goals')
    .max(1000, 'Goals must be less than 1000 characters')
    .required('Goals for partnership are required'),

  workingTogether: Yup.string()
    .min(
      20,
      'Please provide more details about how you see us working together'
    )
    .max(1000, 'Description must be less than 1000 characters')
    .required('This field is required'),

  motivation: Yup.string()
    .min(20, 'Please provide more details about your motivation')
    .max(1000, 'Motivation must be less than 1000 characters')
    .required('This field is required'),
});

// Initial form values
const initialValues = {
  organizationName: '',
  organizationType: '',
  contactPersonName: '',
  position: '',
  email: '',
  phone: '',
  partnershipType: '',
  goals: '',
  workingTogether: '',
  motivation: '',
};

// Organization type options
const organizationTypeOptions = [
  { value: 'nonprofit', label: 'Non-Profit Organization' },
  { value: 'business', label: 'Business/Company' },
  { value: 'educational', label: 'Educational Institution' },
  { value: 'religious', label: 'Religious Organization' },
  { value: 'government', label: 'Government Agency' },
  { value: 'community', label: 'Community Group' },
  { value: 'individual', label: 'Individual' },
  { value: 'other', label: 'Other' },
];

// Partnership type options
const partnershipTypeOptions = [
  { value: 'educational', label: 'Educational Partnership' },
  { value: 'event', label: 'Event Collaboration' },
  { value: 'resource', label: 'Resource Sharing' },
  { value: 'funding', label: 'Funding/Sponsorship' },
  { value: 'outreach', label: 'Community Outreach' },
  { value: 'media', label: 'Media Partnership' },
  { value: 'research', label: 'Research Collaboration' },
  { value: 'other', label: 'Other' },
];

const PartnerWithUsPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (
    values: typeof initialValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    setIsLoading(true);
    const toastId = toast.loading('Submitting your partnership request...');

    try {
      // Send email using server action
      const result = await sendPartnershipFormEmail(values);

      if (result.success) {
        // Send confirmation email to user
        const userEmail = values.email as string;
        if (userEmail) {
          try {
            await sendUserConfirmationEmail(
              userEmail,
              'Partnership Request',
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
          'Partnership request submitted successfully! We will contact you soon.',
          { id: toastId }
        );
        // Reset form after successful submission
        resetForm();
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
      <FundraisePageComponent
        title='Partner with Us'
        titleClassName='text-[#111111]'
        description="Strong partnerships build strong communities. Discover Islam welcomes collaboration with individuals, organizations, and institutions that share our vision of education, understanding, and unity. Let's work together on meaningful projects and new initiatives."
      >
        <FormikForm
          initialValues={initialValues}
          validationSchema={partnershipFormSchema}
          onSubmit={handleSubmit}
        >
          {/* Organization Information */}
          <Input
            name='organizationName'
            label='Organization/Company Name (or indicate if an individual)'
            placeholder='Enter Organization/Company Name (or indicate if an individual)'
            required
          />

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <Select
              name='organizationType'
              label='Type of Organization'
              placeholder='Choose Type of Organization'
              options={organizationTypeOptions}
              required
            />

            <Input
              name='contactPersonName'
              label="Contact Person's Full Name"
              placeholder="Enter Contact Person's Full Name"
              required
            />
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <Input
              name='position'
              label='Position/Role'
              placeholder='Enter Position/Role'
              required
            />

            <Input
              name='email'
              type='email'
              label='Email Address'
              placeholder='Enter Email Address'
              required
            />
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <Input
              name='phone'
              type='tel'
              label='Phone Number'
              placeholder='Enter Phone Number'
              required
            />

            <Select
              name='partnershipType'
              label='Type of Partnership'
              placeholder='Choose Type'
              options={partnershipTypeOptions}
              required
            />
          </div>

          <Input
            name='goals'
            label='Goals for Partnership'
            placeholder='Enter Goals for Partnership'
            required
          />

          <Input
            name='workingTogether'
            label='How do you see us working together?'
            placeholder='Enter How do you see us working together?'
            required
          />

          <Textarea
            name='motivation'
            label='Why do you want to partner with Discover Islam?'
            placeholder=''
            rows={4}
            required
          />

          <div className='flex justify-center mt-8'>
            <Button
              type='submit'
              className='px-12 py-3 flex items-center justify-center gap-3'
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
        </FormikForm>
      </FundraisePageComponent>
      <AnimatedJourneySection />
    </>
  );
};

export default PartnerWithUsPage;
