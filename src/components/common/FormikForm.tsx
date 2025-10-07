'use client';

import React from 'react';
import { Formik, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { twMerge } from 'tailwind-merge';

const FormikForm = <T extends Record<string, any> = Record<string, any>>({
  children,
  initialValues,
  validationSchema,
  onSubmit,
  className = '',
  title,
  titleClassName = '',
  subtitle,
  maxWidth = '920px',
  enableReinitialize = false,
}: {
  children:
    | React.ReactNode
    | ((props: { isSubmitting: boolean; isValid: boolean }) => React.ReactNode);
  initialValues: T;
  validationSchema: Yup.ObjectSchema<any>;
  onSubmit: (
    values: T,
    formikHelpers: FormikHelpers<T>
  ) => void | Promise<void>;
  className?: string;
  title?: string;
  titleClassName?: string;
  subtitle?: string;
  maxWidth?: string;
  enableReinitialize?: boolean;
}) => {
  return (
    <div className={`w-full flex justify-center ${className}`}>
      <div className='w-full px-4 sm:px-6 lg:px-8' style={{ maxWidth }}>
        {title && (
          <div className='text-center mb-8'>
            <h1
              className={twMerge(
                'text-4xl md:text-5xl lg:text-[80px] font-extrabold text-[#408360]',
                titleClassName
              )}
            >
              {title}
            </h1>
            {subtitle && (
              <h1 className='text-4xl md:text-5xl lg:text-[80px] font-extrabold mb-16 text-[#111111]'>
                {subtitle}
              </h1>
            )}
          </div>
        )}

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          enableReinitialize={enableReinitialize}
        >
          {({ isSubmitting, isValid }) => (
            <Form className='space-y-6'>
              {typeof children === 'function'
                ? children({ isSubmitting, isValid })
                : children}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default FormikForm;
