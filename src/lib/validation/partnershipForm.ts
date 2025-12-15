import { z } from 'zod';

// Email validation (more comprehensive than default)
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Partnership Form Validation Schema
export const partnershipFormSchema = z.object({
  organizationName: z
    .string()
    .min(1, 'Organization/Company name is required')
    .min(2, 'Organization name must be at least 2 characters long')
    .max(150, 'Organization name cannot exceed 150 characters')
    .refine(
      val => val.trim().length > 0,
      'Organization name cannot be empty or contain only spaces'
    ),

  organizationType: z
    .string()
    .min(1, 'Type of organization is required')
    .refine(val => val.trim().length > 0, 'Organization type cannot be empty'),

  contactPersonName: z
    .string()
    .min(1, 'Contact person name is required')
    .min(2, 'Contact person name must be at least 2 characters long')
    .max(100, 'Contact person name cannot exceed 100 characters')
    .regex(
      /^[a-zA-Z\s\-\']+$/,
      'Contact person name can only contain letters, spaces, hyphens, and apostrophes'
    )
    .refine(
      val => val.trim().length > 0,
      'Contact person name cannot be empty or contain only spaces'
    ),

  position: z
    .string()
    .min(1, 'Position/Role is required')
    .min(2, 'Position must be at least 2 characters long')
    .max(100, 'Position cannot exceed 100 characters')
    .refine(
      val => val.trim().length > 0,
      'Position cannot be empty or contain only spaces'
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

  partnershipType: z
    .string()
    .min(1, 'Type of partnership is required')
    .refine(val => val.trim().length > 0, 'Partnership type cannot be empty'),

  workingTogether: z
    .string()
    .min(1, 'This field is required')
    .max(1000, 'Description cannot exceed 1000 characters')
    .refine(
      val => val.trim().length > 0,
      'This field cannot be empty or contain only spaces'
    ),
});

// Form initial values
export const partnershipFormDefaultValues = {
  organizationName: '',
  organizationType: '',
  contactPersonName: '',
  position: '',
  email: '',
  phone: '',
  partnershipType: '',
  workingTogether: '',
};

// Organization type options
export const organizationTypeOptions = [
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
export const partnershipTypeOptions = [
  { value: 'educational', label: 'Educational Partnership' },
  { value: 'event', label: 'Event Collaboration' },
  { value: 'resource', label: 'Resource Sharing' },
  { value: 'funding', label: 'Funding/Sponsorship' },
  { value: 'outreach', label: 'Community Outreach' },
  { value: 'media', label: 'Media Partnership' },
  { value: 'research', label: 'Research Collaboration' },
  { value: 'other', label: 'Other' },
];

// Type inference from schema
export type PartnershipFormData = z.infer<typeof partnershipFormSchema>;
