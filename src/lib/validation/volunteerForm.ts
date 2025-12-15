import { z } from 'zod';

// Email validation (more comprehensive than default)
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Volunteer Form Validation Schema
export const volunteerFormSchema = z.object({
  fullName: z
    .string()
    .min(1, 'Full name is required')
    .min(2, 'Full name must be at least 2 characters long')
    .max(100, 'Full name cannot exceed 100 characters')
    .regex(
      /^[a-zA-Z\s\-\']+$/,
      'Full name can only contain letters, spaces, hyphens, and apostrophes'
    )
    .refine(
      val => val.trim().length > 0,
      'Full name cannot be empty or contain only spaces'
    ),

  email: z
    .string()
    .min(1, 'Email address is required')
    .regex(
      emailRegex,
      'Please enter a valid email address (e.g., user@example.com)'
    )
    .max(254, 'Email address cannot exceed 254 characters')
    .toLowerCase()
    .refine(
      val => val.trim().length > 0,
      'Email address cannot be empty or contain only spaces'
    ),

  phone: z.string().optional(),

  age: z
    .string()
    .min(1, 'Age is required')
    .refine(val => {
      const num = parseInt(val, 10);
      return !isNaN(num) && num >= 16 && num <= 100;
    }, 'Age must be between 16 and 100'),

  location: z
    .string()
    .min(1, 'Location/City is required')
    .min(2, 'Location must be at least 2 characters long')
    .max(100, 'Location cannot exceed 100 characters')
    .refine(
      val => val.trim().length > 0,
      'Location cannot be empty or contain only spaces'
    ),

  occupation: z
    .string()
    .min(1, 'Current occupation is required')
    .min(2, 'Occupation must be at least 2 characters long')
    .max(100, 'Occupation cannot exceed 100 characters')
    .refine(
      val => val.trim().length > 0,
      'Occupation cannot be empty or contain only spaces'
    ),

  skills: z
    .string()
    .min(1, 'Skills and interests are required')
    .min(
      5,
      'Please provide more details about your skills (at least 5 characters)'
    )
    .max(500, 'Skills description cannot exceed 500 characters')
    .refine(
      val => val.trim().length > 0,
      'Skills cannot be empty or contain only spaces'
    ),

  availability: z
    .string()
    .min(1, 'Availability is required')
    .min(5, 'Please specify your availability (at least 5 characters)')
    .max(200, 'Availability cannot exceed 200 characters')
    .refine(
      val => val.trim().length > 0,
      'Availability cannot be empty or contain only spaces'
    ),

  experience: z
    .string()
    .max(1000, 'Experience description cannot exceed 1000 characters')
    .optional()
    .or(z.literal('')),
});

// Form initial values
export const volunteerFormDefaultValues = {
  fullName: '',
  email: '',
  phone: '',
  age: '',
  location: '',
  occupation: '',
  skills: '',
  availability: '',
  experience: '',
};

// Type inference from schema
export type VolunteerFormData = z.infer<typeof volunteerFormSchema>;
