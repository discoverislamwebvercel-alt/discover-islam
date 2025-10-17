'use client';

import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { twMerge } from 'tailwind-merge';

interface HookFormProps<T extends z.ZodType<any, any, any>> {
  children:
    | React.ReactNode
    | ((props: { isSubmitting: boolean; isValid: boolean }) => React.ReactNode);
  schema: T;
  defaultValues?: z.infer<T>;
  onSubmit: (data: z.infer<T>) => void | Promise<void>;
  className?: string;
  title?: string;
  titleClassName?: string;
  subtitle?: string;
  maxWidth?: string;
  mode?: 'onChange' | 'onBlur' | 'onSubmit' | 'onTouched' | 'all';
  reValidateMode?: 'onChange' | 'onBlur' | 'onSubmit';
}

const HookForm = <T extends z.ZodType<any, any, any>>({
  children,
  schema,
  defaultValues,
  onSubmit,
  className = '',
  title,
  titleClassName = '',
  subtitle,
  maxWidth = '920px',
  mode = 'onSubmit',
  reValidateMode = 'onChange',
}: HookFormProps<T>) => {
  const methods = useForm<z.infer<T>>({
    resolver: zodResolver(schema) as any,
    defaultValues: defaultValues as any,
    mode,
    reValidateMode,
  });

  const { formState, handleSubmit } = methods;
  const { isSubmitting, isValid } = formState;

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

        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='space-y-6'
            noValidate
          >
            {typeof children === 'function'
              ? children({ isSubmitting, isValid })
              : children}
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default HookForm;
