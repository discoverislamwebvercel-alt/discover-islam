import { z } from 'zod';

// Phone number validation regex (supports various formats)
const phoneRegex =
  /^[\+]?[1-9][\d]{0,3}[\s\-\.]?[\(]?[\d]{1,3}[\)]?[\s\-\.]?[\d]{1,4}[\s\-\.]?[\d]{1,4}[\s\-\.]?[\d]{0,9}$/;

// Email validation (more comprehensive than default)
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Exhibition Booking Form Validation Schema with descriptive error messages
export const exhibitionFormSchema = z.object({
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

  organization: z
    .string()
    .min(1, 'Organisation/Centre name is required')
    .min(2, 'Organisation name must be at least 2 characters long')
    .max(150, 'Organisation name cannot exceed 150 characters')
    .refine(
      val => val.trim().length > 0,
      'Organisation name cannot be empty or contain only spaces'
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

  phone: z
    .string()
    .min(1, 'Phone number is required')
    .regex(
      phoneRegex,
      'Please enter a valid phone number (e.g., +44 20 7946 0958 or 020 7946 0958)'
    )
    .refine(
      val => val.trim().length > 0,
      'Phone number cannot be empty or contain only spaces'
    ),

  address: z
    .string()
    .min(1, 'Location/Address of Venue is required')
    .min(
      5,
      'Venue address must be at least 5 characters long to ensure accurate location'
    )
    .max(500, 'Venue address cannot exceed 500 characters')
    .refine(
      val => val.trim().length > 0,
      'Venue address cannot be empty or contain only spaces'
    ),

  preferredDates: z
    .string()
    .min(1, 'Preferred date(s) are required')
    .refine(val => val.trim().length > 0, 'Preferred dates cannot be empty'),

  audienceType: z
    .string()
    .min(1, 'Type of audience is required')
    .min(
      3,
      'Please provide a more specific audience type (e.g., Public, School, College)'
    )
    .max(100, 'Audience type cannot exceed 100 characters')
    .refine(
      val => val.trim().length > 0,
      'Audience type cannot be empty or contain only spaces'
    ),

  attendees: z
    .string()
    .max(100, 'Attendees information cannot exceed 100 characters')
    .optional()
    .or(z.literal('')),

  venueSize: z
    .string()
    .min(1, 'Size of the venue is required')
    .min(
      3,
      'Please provide more details about the venue size (e.g., Small hall, Large auditorium)'
    )
    .max(200, 'Venue size description cannot exceed 200 characters')
    .refine(
      val => val.trim().length > 0,
      'Venue size cannot be empty or contain only spaces'
    ),

  exhibitionModel: z
    .string()
    .min(1, 'Type of exhibition model is required')
    .refine(val => val.trim().length > 0, 'Exhibition model cannot be empty'),

  instructorsRequired: z
    .string()
    .min(1, 'Please indicate if instructors are required')
    .refine(val => val === 'yes' || val === 'no', 'Please select Yes or No'),

  instructorCount: z.string().optional().or(z.literal('')),

  requirements: z
    .string()
    .max(2000, 'Requirements/notes cannot exceed 2000 characters')
    .optional()
    .or(z.literal('')),

  hearAboutUs: z
    .string()
    .max(100, 'Source information cannot exceed 100 characters')
    .optional()
    .or(z.literal('')),
});

// Form initial values
export const exhibitionFormDefaultValues = {
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

// Exhibition model options
export const exhibitionModelOptions = [
  { value: 'full', label: 'Full Exhibition' },
  { value: 'mini', label: 'Mini Exhibition' },
  { value: 'tech-only', label: 'Tech Models Only' },
  { value: 'custom', label: 'Custom / Mixed' },
];

// How did you hear about us options
export const hearAboutUsOptions = [
  { value: 'instagram', label: 'Instagram' },
  { value: 'facebook', label: 'Facebook' },
  { value: 'youtube', label: 'YouTube' },
  { value: 'word-of-mouth', label: 'Word of mouth' },
  { value: 'school', label: 'School / College' },
  { value: 'mosque', label: 'Mosque' },
  { value: 'search', label: 'Search engine' },
  { value: 'other', label: 'Other' },
];

// Type inference from schema
export type ExhibitionFormData = z.infer<typeof exhibitionFormSchema>;
