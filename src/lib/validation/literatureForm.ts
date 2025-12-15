import { z } from 'zod';

// Email validation (more comprehensive than default)
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Literature Request Form Validation Schema with descriptive error messages
export const literatureFormSchema = z.object({
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
    .min(1, 'Organization/Centre name is required')
    .min(2, 'Organization name must be at least 2 characters long')
    .max(150, 'Organization name cannot exceed 150 characters')
    .refine(
      val => val.trim().length > 0,
      'Organization name cannot be empty or contain only spaces'
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

  address: z
    .string()
    .min(1, 'Delivery address is required')
    .min(
      10,
      'Delivery address must be at least 10 characters long to ensure accurate delivery'
    )
    .max(500, 'Delivery address cannot exceed 500 characters')
    .refine(
      val => val.trim().length > 0,
      'Delivery address cannot be empty or contain only spaces'
    ),

  // materials: z
  //   .string()
  //   .min(1, 'Please select at least one material type')
  //   .refine(val => val.trim().length > 0, 'Material selection cannot be empty'),

  quantity: z
    .number('Quantity must be a valid number')
    .int('Quantity must be a whole number (no decimals)')
    .positive('Quantity must be a positive number')
    .min(1, 'Minimum quantity is 1 item')
    .max(
      1000,
      'Maximum quantity is 1000 items (please contact us for larger orders)'
    ),

  purpose: z
    .string()
    .min(1, 'Purpose is required')
    .min(10, 'Please provide a more detailed purpose (at least 10 characters)')
    .max(1000, 'Purpose description cannot exceed 1000 characters')
    .refine(
      val => val.trim().length > 0,
      'Purpose cannot be empty or contain only spaces'
    ),

  notes: z
    .string()
    .max(2000, 'Additional notes cannot exceed 2000 characters')
    .optional()
    .or(z.literal('')),
});

// Form initial values
export const literatureFormDefaultValues = {
  fullName: '',
  organization: '',
  email: '',
  phone: '',
  address: '',
  // materials: '',
  quantity: 1,
  purpose: '',
  notes: '',
};

// Material options for literature form
export const materialOptions = [
  { value: 'quran', label: "Qur'an" },
  { value: 'this-is-islam', label: 'This is Islam' },
  { value: 'childrens-materials', label: "Children's materials" },
  { value: 'leaflets', label: 'Leaflets' },
  { value: 'other-islamic-books', label: 'Other Islamic books' },
  { value: 'hisn-al-muslim', label: 'Hisn al-Muslim (Fortress of the Muslim)' },
  { value: 'new-muslim-guide', label: 'The New Muslim Guide' },
  { value: 'names-of-allah', label: 'Names of Allah booklet' },
];

// Type inference from schema
export type LiteratureFormData = z.infer<typeof literatureFormSchema>;
