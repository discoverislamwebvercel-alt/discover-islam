'use client';

import { useState, useCallback } from 'react';
import { DonationTemplate, RedirectFlow } from '@/lib/gocardless';

interface UseGoCardlessReturn {
  templates: DonationTemplate[];
  loading: boolean;
  error: string | null;
  fetchTemplates: (
    type?: 'one-off' | 'recurring',
    category?: 'school' | 'exhibition' | 'literature'
  ) => Promise<void>;
  createRedirectFlow: (params: {
    description: string;
    success_redirect_url: string;
    session_token: string;
    amount?: number;
    payment_type?: string;
    category?: string;
  }) => Promise<RedirectFlow>;
}

export function useGoCardless(): UseGoCardlessReturn {
  const [templates, setTemplates] = useState<DonationTemplate[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTemplates = useCallback(
    async (
      type?: 'one-off' | 'recurring',
      category?: 'school' | 'exhibition' | 'literature'
    ) => {
      setLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams();
        if (type) params.append('type', type);
        if (category) params.append('category', category);

        const response = await fetch(
          `/api/gocardless/templates?${params.toString()}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch templates');
        }

        const data = await response.json();
        setTemplates(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const createRedirectFlow = useCallback(
    async (params: {
      description: string;
      success_redirect_url: string;
      session_token: string;
      amount?: number;
      payment_type?: string;
      category?: string;
    }): Promise<RedirectFlow> => {
      const response = await fetch('/api/gocardless/redirect-flow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create redirect flow');
      }

      return response.json();
    },
    []
  );

  return {
    templates,
    loading,
    error,
    fetchTemplates,
    createRedirectFlow,
  };
}
