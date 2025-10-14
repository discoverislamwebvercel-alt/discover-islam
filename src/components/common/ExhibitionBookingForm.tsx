'use client';

import React from 'react';
import * as Yup from 'yup';
import FormikForm from './FormikForm';
import Input from './Input';
import Select from './Select';
import Textarea from './Textarea';
import RadioGroup from './RadioGroup';
import FormButton from './FormButton';
import { useFormikContext } from 'formik';

// Validation schema for Exhibition Booking form
const bookingFormSchema = Yup.object({
  fullName: Yup.string()
    .min(2, 'Full name must be at least 2 characters')
    .max(100, 'Full name must be less than 100 characters')
    .required('Full name is required'),

  organization: Yup.string()
    .min(2, 'Organisation/Centre name must be at least 2 characters')
    .max(150, 'Organisation/Centre name must be less than 150 characters')
    .required('Organisation/Centre name is required'),

  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Email is required'),

  phone: Yup.string()
    .min(7, 'Please enter a valid phone number')
    .required('Phone number is required'),

  address: Yup.string().required('Location / Address of Venue is required'),

  preferredDates: Yup.string().required('Preferred date(s) are required'),

  audienceType: Yup.string().required('Type of Audience is required'),

  attendees: Yup.string().optional(),

  venueSize: Yup.string().required('Size of the venue is required'),

  exhibitionModel: Yup.string().required(
    'Type of exhibition model is required'
  ),

  instructorsRequired: Yup.string().required(
    'Please indicate if instructors are required'
  ),

  instructorCount: Yup.string().when('instructorsRequired', {
    is: (val: string) => val === 'yes',
    then: schema => schema.required('Please specify how many'),
    otherwise: schema => schema.optional(),
  }),

  requirements: Yup.string().optional(),

  hearAboutUs: Yup.string().optional(),
});

// Initial values
const initialValues = {
  fullName: '',
  organization: '',
  email: '',
  phone: '',
  address: '',
  preferredDates: '',
  audienceType: '',
  attendees: '',
  venueSize: '',
  exhibitionModel: '',
  instructorsRequired: 'yes',
  instructorCount: '',
  requirements: '',
  hearAboutUs: '',
};

// Options
const exhibitionModelOptions = [
  { value: 'full', label: 'Full Exhibition' },
  { value: 'mini', label: 'Mini Exhibition' },
  { value: 'tech-only', label: 'Tech Models Only' },
  { value: 'custom', label: 'Custom / Mixed' },
];

const hearAboutUsOptions = [
  { value: 'instagram', label: 'Instagram' },
  { value: 'facebook', label: 'Facebook' },
  { value: 'youtube', label: 'YouTube' },
  { value: 'word-of-mouth', label: 'Word of mouth' },
  { value: 'school', label: 'School / College' },
  { value: 'mosque', label: 'Mosque' },
  { value: 'search', label: 'Search engine' },
  { value: 'other', label: 'Other' },
];

function ConditionalInstructorCount() {
  const { values } = useFormikContext<typeof initialValues>();
  if (values?.instructorsRequired === 'yes') {
    return (
      <Input
        label='How many?'
        name='instructorCount'
        placeholder='Enter number of instructors'
        required
      />
    );
  }
  return null;
}

const ExhibitionBookingForm: React.FC = () => {
  const handleSubmit = async (values: typeof initialValues) => {
    console.log('Exhibition booking submitted:', values);
    // TODO: integrate with backend/API
  };

  return (
    <FormikForm
      title='Islamic Exhibitions'
      subtitle='Book an Islamic Exhibition at Your Venue'
      initialValues={initialValues}
      validationSchema={bookingFormSchema}
      onSubmit={handleSubmit}
      className='mb-24'
      maxWidth='910px'
    >
      <div className='space-y-6'>
        {/* Full Name */}
        <Input
          label='Full Name'
          name='fullName'
          placeholder='Enter Full Name'
          required
        />

        {/* Organisation / Centre Name */}
        <Input
          label='Organisation / Centre Name'
          name='organization'
          placeholder='Enter Organisation / Centre Name'
          required
        />

        {/* Email / Phone */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
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

        {/* Address */}
        <Input
          label='Location / Address of Venue'
          name='address'
          placeholder='Enter Location / Address of Venue'
          required
        />

        {/* Preferred Date(s) */}
        <Input
          label='Preferred Date(s)'
          name='preferredDates'
          type='date'
          placeholder='Enter Preferred Date(s)'
          required
        />

        {/* Audience & Attendees */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <Input
            label='Type of Audience'
            name='audienceType'
            placeholder='e.g., Public, Interfaith, School, College'
            required
          />
          <Input
            label='Approximate Number of Attendees'
            name='attendees'
            placeholder='Enter Approximate Number of Attendees'
          />
        </div>

        {/* Venue size & Exhibition model */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <Input
            label='Size of the venue'
            name='venueSize'
            placeholder='Enter Size of the venue'
            required
          />
          <Select
            label='Types of exhibition model'
            name='exhibitionModel'
            placeholder='Enter Types of exhibition model'
            options={exhibitionModelOptions}
            required
          />
        </div>

        {/* Instructors required? */}
        <div>
          <RadioGroup
            label='Do you require instructors from our team to attend and deliver?'
            name='instructorsRequired'
            options={[
              { value: 'yes', label: 'Yes' },
              { value: 'no', label: 'No' },
            ]}
            columns={2}
            required
          />
          <ConditionalInstructorCount />
        </div>

        {/* Notes */}
        <Textarea
          label='Any Specific Requirements or Notes'
          name='requirements'
          placeholder='Enter any additional information...'
          rows={4}
        />

        {/* Hear about us */}
        <Select
          label='How did you hear about us?'
          name='hearAboutUs'
          placeholder='Select platform'
          options={hearAboutUsOptions}
        />

        {/* Submit */}
        <div className='flex pt-2'>
          <FormButton
            type='submit'
            variant='primary'
            size='lg'
            className='w-full max-w-[400px] font-extrabold'
          >
            Submit Booking Request
          </FormButton>
        </div>
      </div>
    </FormikForm>
  );
};

export default ExhibitionBookingForm;
