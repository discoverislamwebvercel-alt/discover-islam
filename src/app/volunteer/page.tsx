'use client';

import React from 'react';
import FundraisePageComponent from '@/components/common/FundraisePage';
import FormikForm from '@/components/common/FormikForm';
import Input from '@/components/common/Input';
import Textarea from '@/components/common/Textarea';
import * as Yup from 'yup';
import Button from '@/components/common/Button';
import AnimatedJourneySection from '@/components/common/AnimatedJourneySection';

// Validation schema for volunteer form
const volunteerFormSchema = Yup.object({
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

  age: Yup.number()
    .min(16, 'Must be at least 16 years old')
    .max(100, 'Please enter a valid age')
    .required('Age is required'),

  location: Yup.string().required('Location is required'),

  occupation: Yup.string()
    .min(2, 'Occupation must be at least 2 characters')
    .required('Current occupation is required'),

  skills: Yup.string()
    .min(5, 'Please provide more details about your skills')
    .required('Skills and interests are required'),

  hobbies: Yup.string()
    .min(3, 'Please provide more details about your hobbies')
    .required('Hobbies are required'),

  availability: Yup.string()
    .min(5, 'Please specify your availability')
    .required('Availability is required'),

  experience: Yup.string().max(
    1000,
    'Experience description must be less than 1000 characters'
  ),

  motivation: Yup.string()
    .min(20, 'Please provide more details about your motivation')
    .max(1000, 'Motivation must be less than 1000 characters')
    .required('This field is required'),

  emergencyContact: Yup.string()
    .min(10, 'Emergency contact must be at least 10 digits')
    .required('Emergency contact is required'),
});

// Initial form values
const initialValues = {
  fullName: '',
  email: '',
  phone: '',
  age: '',
  location: '',
  occupation: '',
  skills: '',
  hobbies: '',
  availability: '',
  experience: '',
  motivation: '',
  emergencyContact: '',
};

const VolunteerPage: React.FC = () => {
  const handleSubmit = async (values: typeof initialValues) => {
    console.log('Form submitted:', values);
    // Handle form submission logic here
  };

  return (
    <>
      <FundraisePageComponent
        title='Volunteer with Us'
        titleClassName='text-[#408360]'
        description="Volunteers are the heart of Discover Islam's mission. By giving your time, skills, and passion, you help us reach more people and create meaningful connections. Whatever your expertise, there is a place for you in our team!"
      >
        <FormikForm
          initialValues={initialValues}
          validationSchema={volunteerFormSchema}
          onSubmit={handleSubmit}
        >
          <div className='space-y-6'>
            {/* Personal Information */}
            <Input
              name='fullName'
              label='Full Name'
              placeholder='Enter Full Name'
              required
            />

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <Input
                name='email'
                type='email'
                label='Email'
                placeholder='Enter Email'
                required
              />

              <Input
                name='phone'
                type='tel'
                label='Phone Number'
                placeholder='Enter Phone Number'
                required
              />
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <Input
                name='age'
                type='number'
                label='Age'
                placeholder='Enter Age'
                required
              />

              <Input
                name='location'
                label='Location / City'
                placeholder='Enter Location'
                required
              />
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <Input
                name='occupation'
                label='Current Occupation/Profession'
                placeholder='Teacher, Engineer, Student etc.'
                required
              />

              <Input
                name='skills'
                label='Skills & Interests'
                placeholder='Teaching, Event Mgmt, Design, Admin etc.'
                required
              />
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <Input
                name='hobbies'
                label='Hobbies'
                placeholder='Enter Hobbies'
                required
              />

              <Input
                name='availability'
                label='Availability'
                placeholder='Weekdays, Weekends, Evenings, Flexible'
                required
              />
            </div>

            <Textarea
              name='experience'
              label='Previous Volunteer Experience (optional)'
              placeholder='Enter Previous Volunteer Experience (optional)'
              rows={3}
            />

            <Textarea
              name='motivation'
              label='Why do you want to volunteer with Discover Islam?'
              placeholder=''
              rows={4}
              required
            />

            <Input
              name='emergencyContact'
              type='tel'
              label='Emergency Contact'
              placeholder='Enter Phone Number'
              required
            />

            {/* Submit Button */}
            <div className='flex pt-4'>
              <Button
                className='w-[200px] text-[26px] font-extrabold'
                type='submit'
              >
                Submit
              </Button>
            </div>
          </div>
        </FormikForm>
      </FundraisePageComponent>
      <AnimatedJourneySection />
    </>
  );
};

export default VolunteerPage;
