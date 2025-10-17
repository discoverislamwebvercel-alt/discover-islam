'use client';

import React, { useState } from 'react';
import HookForm from './HookForm';
import HookFormInput from './HookFormInput';
import HookFormTextarea from './HookFormTextarea';
import HookFormRadioGroup from './HookFormRadioGroup';
import HookFormSelect from './HookFormSelect';
import FormButton from './FormButton';
import {
  exhibitionFormSchema,
  exhibitionFormDefaultValues,
  exhibitionModelOptions,
  hearAboutUsOptions,
  ExhibitionFormData,
} from '../../lib/validation/exhibitionForm';
import {
  sendExhibitionBookingFormEmail,
  sendUserConfirmationEmail,
} from '@/lib/email';
import toast from 'react-hot-toast';

// Conditional instructor count component
function ConditionalInstructorCount({
  className = '',
}: {
  className?: string;
}) {
  return (
    <HookFormInput
      label='How many?'
      name='instructorCount'
      placeholder='Enter number of instructors'
      className={className}
    />
  );
}

const ExhibitionBookingForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (
    data: ExhibitionFormData,
    { reset }: { reset: () => void }
  ) => {
    setIsLoading(true);
    const toastId = toast.loading('Submitting your booking request...');

    try {
      // Send email using server action
      const result = await sendExhibitionBookingFormEmail(data);

      if (result.success) {
        // Send confirmation email to user
        const userEmail = data.email as string;
        if (userEmail) {
          try {
            await sendUserConfirmationEmail(
              userEmail,
              'Exhibition Booking',
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
          'Exhibition booking request submitted successfully! We will contact you soon to confirm the details.',
          { id: toastId }
        );
        // Reset form after successful submission
        reset();
      } else {
        throw new Error(result.error || 'Failed to send email');
      }
    } catch (error) {
      console.error('Error submitting exhibition booking request:', error);
      toast.error(
        'There was an error submitting your booking request. Please try again or contact us directly.',
        { id: toastId }
      );
    } finally {
      setIsLoading(false);
    }
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
          <HookFormSelect
            label='Types of exhibition model'
            name='exhibitionModel'
            placeholder='Select exhibition model'
            options={exhibitionModelOptions}
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
          {/* How many (half width to match paired fields) */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-2'>
            <ConditionalInstructorCount />
          </div>
        </div>

        {/* Notes */}
        <HookFormTextarea
          label='Any Specific Requirements or Notes'
          name='requirements'
          placeholder='Enter any additional information...'
          rows={4}
        />

        {/* Hear about us - same width as venue field */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <HookFormSelect
            label='How did you hear about us?'
            name='hearAboutUs'
            placeholder='Select platform'
            options={hearAboutUsOptions}
          />
        </div>

        {/* Submit */}
        <div className='flex pt-2'>
          <FormButton
            type='submit'
            variant='primary'
            size='lg'
            loading={isLoading}
            className='w-full max-w-[400px] font-extrabold'
          >
            {isLoading ? 'Submitting...' : 'Submit Booking Request'}
          </FormButton>
        </div>
      </div>
    </HookForm>
  );
};

export default ExhibitionBookingForm;
