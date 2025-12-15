import * as Yup from 'yup';

// Phone number validation regex (supports various formats)
const phoneRegex =
  /^[\+]?[1-9][\d]{0,3}[\s\-\.]?[\(]?[\d]{1,3}[\)]?[\s\-\.]?[\d]{1,4}[\s\-\.]?[\d]{1,4}[\s\-\.]?[\d]{0,9}$/;

// Email validation (more comprehensive than default)
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Literature Request Form Validation Schema
export const literatureFormSchema = Yup.object({
  fullName: Yup.string()
    .min(2, 'Full name must be at least 2 characters')
    .max(100, 'Full name must be less than 100 characters')
    .matches(
      /^[a-zA-Z\s\-\']+$/,
      'Full name can only contain letters, spaces, hyphens, and apostrophes'
    )
    .required('Full name is required'),

  organization: Yup.string()
    .min(2, 'Organization name must be at least 2 characters')
    .max(150, 'Organization name must be less than 150 characters')
    .required('Organization/Centre name is required'),

  email: Yup.string()
    .matches(emailRegex, 'Please enter a valid email address')
    .required('Email address is required'),

  phone: Yup.string(),

  address: Yup.string()
    .min(10, 'Delivery address must be at least 10 characters')
    .max(500, 'Delivery address must be less than 500 characters')
    .required('Delivery address is required'),

  materials: Yup.string().required('Material selection is required'),

  quantity: Yup.number()
    .positive('Quantity must be a positive number')
    .integer('Quantity must be a whole number')
    .min(1, 'Minimum quantity is 1')
    .max(1000, 'Maximum quantity is 1000')
    .required('Quantity is required'),

  purpose: Yup.string()
    .min(10, 'Purpose must be at least 10 characters')
    .max(1000, 'Purpose must be less than 1000 characters')
    .required('Purpose is required'),

  notes: Yup.string()
    .max(2000, 'Additional notes must be less than 2000 characters')
    .optional(),
});

// Contact Form Validation Schema
export const contactFormSchema = Yup.object({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .matches(
      /^[a-zA-Z\s\-\']+$/,
      'Name can only contain letters, spaces, hyphens, and apostrophes'
    )
    .required('Name is required'),

  email: Yup.string()
    .matches(emailRegex, 'Please enter a valid email address')
    .required('Email address is required'),

  subject: Yup.string()
    .min(5, 'Subject must be at least 5 characters')
    .max(200, 'Subject must be less than 200 characters')
    .required('Subject is required'),

  message: Yup.string()
    .min(20, 'Message must be at least 20 characters')
    .max(2000, 'Message must be less than 2000 characters')
    .required('Message is required'),
});

// Newsletter Subscription Schema
export const newsletterSchema = Yup.object({
  email: Yup.string()
    .matches(emailRegex, 'Please enter a valid email address')
    .required('Email address is required'),

  firstName: Yup.string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be less than 50 characters')
    .matches(
      /^[a-zA-Z\s\-\']+$/,
      'First name can only contain letters, spaces, hyphens, and apostrophes'
    )
    .optional(),

  interests: Yup.array().of(Yup.string()).optional(),
});

// Generic validation helpers
export const validationHelpers = {
  // Check if string contains only letters, spaces, hyphens, and apostrophes
  isValidName: (value: string) => /^[a-zA-Z\s\-\']+$/.test(value),

  // Check if email format is valid
  isValidEmail: (value: string) => emailRegex.test(value),

  // Check if phone number format is valid
  isValidPhone: (value: string) => phoneRegex.test(value),

  // Sanitize string input (remove extra spaces, trim)
  sanitizeString: (value: string) => value.trim().replace(/\s+/g, ' '),

  // Format phone number for display
  formatPhoneNumber: (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length === 10) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    }
    return value;
  },
};

// Form initial values
export const literatureFormInitialValues = {
  fullName: '',
  organization: '',
  email: '',
  phone: '',
  address: '',
  materials: '',
  quantity: 1,
  purpose: '',
  notes: '',
};

export const contactFormInitialValues = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

export const newsletterInitialValues = {
  email: '',
  firstName: '',
  interests: [] as string[],
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

export type LiteratureFormValues = typeof literatureFormInitialValues;
export type ContactFormValues = typeof contactFormInitialValues;
export type NewsletterFormValues = typeof newsletterInitialValues;
