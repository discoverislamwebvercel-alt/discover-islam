'use client';

import React from 'react';
import HookForm from './HookForm';
import HookFormInput from './HookFormInput';
import HookFormTextarea from './HookFormTextarea';
import HookFormRadioGroup from './HookFormRadioGroup';
import FormButton from './FormButton';
import {
  exhibitionFormSchema,
  exhibitionFormDefaultValues,
  exhibitionModelOptions,
  hearAboutUsOptions,
  ExhibitionFormData,
} from '../../lib/validation/exhibitionForm';

// Conditional instructor count component
function ConditionalInstructorCount() {
  return (
    <HookFormInput
      label='How many?'
      name='instructorCount'
      placeholder='Enter number of instructors'
    />
  );
}

const ExhibitionBookingForm: React.FC = () => {
  const handleSubmit = async (_data: ExhibitionFormData) => {
    // TODO: integrate with backend/API
    alert(
      'Exhibition booking request submitted successfully! We will contact you soon to confirm the details.'
    );
  };

  return (
    <HookForm
      title='Islamic Exhibitions'
      subtitle='Book an Islamic Exhibition at Your Venue'
      schema={exhibitionFormSchema}
      defaultValues={exhibitionFormDefaultValues}
      onSubmit={handleSubmit}
      className='mb-24'
      maxWidth='910px'
      mode='onBlur'
    >
      <div className='space-y-6'>
        {/* Full Name */}
        <HookFormInput
          label='Full Name'
          name='fullName'
          placeholder='Enter Full Name'
        />

        {/* Organisation / Centre Name */}
        <HookFormInput
          label='Organisation / Centre Name'
          name='organization'
          placeholder='Enter Organisation / Centre Name'
        />

        {/* Email / Phone */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <HookFormInput
            label='Email'
            name='email'
            type='email'
            placeholder='Enter Email'
          />
          <HookFormInput
            label='Phone Number'
            name='phone'
            type='tel'
            placeholder='Enter Phone Number'
          />
        </div>

        {/* Address */}
        <HookFormInput
          label='Location / Address of Venue'
          name='address'
          placeholder='Enter Location / Address of Venue'
        />

        {/* Preferred Date(s) */}
        <HookFormInput
          label='Preferred Date(s)'
          name='preferredDates'
          type='date'
          placeholder='Enter Preferred Date(s)'
        />

        {/* Audience & Attendees */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <HookFormInput
            label='Type of Audience'
            name='audienceType'
            placeholder='e.g., Public, Interfaith, School, College'
          />
          <HookFormInput
            label='Approximate Number of Attendees'
            name='attendees'
            placeholder='Enter Approximate Number of Attendees'
          />
        </div>

        {/* Venue size & Exhibition model */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <HookFormInput
            label='Size of the venue'
            name='venueSize'
            placeholder='Enter Size of the venue'
          />
          <HookFormRadioGroup
            label='Types of exhibition model'
            name='exhibitionModel'
            options={exhibitionModelOptions}
            columns={2}
          />
        </div>

        {/* Instructors required? */}
        <div>
          <HookFormRadioGroup
            label='Do you require instructors from our team to attend and deliver?'
            name='instructorsRequired'
            options={[
              { value: 'yes', label: 'Yes' },
              { value: 'no', label: 'No' },
            ]}
            columns={2}
          />
          <ConditionalInstructorCount />
        </div>

        {/* Notes */}
        <HookFormTextarea
          label='Any Specific Requirements or Notes'
          name='requirements'
          placeholder='Enter any additional information...'
          rows={4}
        />

        {/* Hear about us */}
        <HookFormRadioGroup
          label='How did you hear about us?'
          name='hearAboutUs'
          options={hearAboutUsOptions}
          columns={3}
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
    </HookForm>
  );
};

export default ExhibitionBookingForm;
