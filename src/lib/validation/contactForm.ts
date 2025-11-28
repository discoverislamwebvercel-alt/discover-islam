import { z } from 'zod';

// Phone number validation regex (supports various formats)
const phoneRegex =
  /^[\+]?[1-9][\d]{0,3}[\s\-\.]?[\(]?[\d]{1,3}[\)]?[\s\-\.]?[\d]{1,4}[\s\-\.]?[\d]{1,4}[\s\-\.]?[\d]{0,9}$/;

// Email validation (more comprehensive than default)
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Contact Form Validation Schema
export const contactFormSchema = z.object({
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

  organization: z
    .string()
    .max(150, 'Organization name cannot exceed 150 characters')
    .optional()
    .or(z.literal('')),

  topic: z
    .string()
    .min(1, 'Please select a topic')
    .refine(val => val.trim().length > 0, 'Topic cannot be empty'),

  location: z
    .string()
    .min(1, 'Location/City is required')
    .min(2, 'Location must be at least 2 characters long')
    .max(100, 'Location cannot exceed 100 characters')
    .refine(
      val => val.trim().length > 0,
      'Location cannot be empty or contain only spaces'
    ),

  preferredDate: z
    .string()
    .min(1, 'Preferred date(s) are required')
    .refine(val => val.trim().length > 0, 'Preferred dates cannot be empty'),

  message: z
    .string()
    .min(1, 'Message is required')
    .min(10, 'Message must be at least 10 characters long')
    .max(2000, 'Message cannot exceed 2000 characters')
    .refine(
      val => val.trim().length > 0,
      'Message cannot be empty or contain only spaces'
    ),
});

// Form initial values
export const contactFormDefaultValues = {
  fullName: '',
  email: '',
  phone: '',
  organization: '',
  topic: '',
  location: '',
  preferredDate: '',
  message: '',
};

// Topic options for contact form
export const topicOptions = [
  { value: 'general', label: 'General Inquiry' },
  { value: 'exhibition', label: 'Exhibition Booking' },
  { value: 'school-visit', label: 'School Visit' },
  { value: 'literature', label: 'Literature Request' },
  { value: 'volunteer', label: 'Volunteering' },
  { value: 'partnership', label: 'Partnership' },
  { value: 'donation', label: 'Donation' },
  { value: 'other', label: 'Other' },
];

// Type inference from schema
export type ContactFormData = z.infer<typeof contactFormSchema>;
