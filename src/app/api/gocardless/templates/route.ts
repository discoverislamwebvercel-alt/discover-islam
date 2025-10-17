import { NextRequest, NextResponse } from 'next/server';
import { donationTemplates, filterTemplates } from '@/lib/gocardless';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') as 'one-off' | 'recurring' | null;
    const category = searchParams.get('category') as
      | 'school'
      | 'exhibition'
      | 'literature'
      | null;

    let templates = donationTemplates;

    if (type) {
      templates = filterTemplates(type, category || undefined);
    } else if (category) {
      templates = donationTemplates.filter(
        template => template.category === category
      );
    }

    return NextResponse.json(templates);
  } catch (error) {
    console.error('Error fetching templates:', error);
    return NextResponse.json(
      { error: 'Failed to fetch templates' },
      { status: 500 }
    );
  }
}
