import React, { FormEvent, ReactNode } from 'react';

interface FormProps {
  children: ReactNode;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  className?: string;
  title?: string;
  subtitle?: string;
  maxWidth?: string;
}

/**
 * Reusable Form wrapper component
 *
 * @param children - Form elements to be rendered inside the form
 * @param onSubmit - Function to handle form submission
 * @param className - Additional CSS classes
 * @param title - Optional form title
 * @param subtitle - Optional form subtitle
 * @param maxWidth - Maximum width of the form (default: 910px)
 *
 * @example
 * ```tsx
 * <Form
 *   title="Contact Us"
 *   subtitle="Get in touch with our team"
 *   onSubmit={handleSubmit}
 * >
 *   <Input label="Name" value={name} onChange={setName} />
 *   <Button type="submit">Submit</Button>
 * </Form>
 * ```
 */
const Form: React.FC<FormProps> = ({
  children,
  onSubmit,
  className = '',
  title,
  subtitle,
  maxWidth = '910px',
}) => {
  return (
    <div className={`mx-auto px-4 py-8 ${className}`} style={{ maxWidth }}>
      {title && (
        <div className='text-center mb-8'>
          <h2 className='text-3xl font-bold text-[#111111] mb-2'>{title}</h2>
          {subtitle && <p className='text-lg text-[#111111E5]'>{subtitle}</p>}
        </div>
      )}

      <form onSubmit={onSubmit} className='space-y-6'>
        {children}
      </form>
    </div>
  );
};

export default Form;
