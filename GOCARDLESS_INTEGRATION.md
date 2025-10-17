# GoCardless Integration

This document describes the GoCardless integration implemented in the Discover Islam donations page.

## Overview

The integration allows users to make both one-off and recurring donations through GoCardless payment processing. Users can select from predefined donation packages or enter custom amounts, with filtering based on payment type (one-off vs recurring) and category (school, exhibition, literature).

**Key Feature**: Both one-off and recurring payments use the same GoCardless redirect flow, which automatically handles mandate creation for recurring payments. This simplifies the implementation and provides a consistent user experience.

The implementation uses a server-side approach with API routes to handle GoCardless operations securely, preventing exposure of API credentials to the client-side. The system includes comprehensive error handling with dedicated success and failure pages.

## Features

### Payment Types

- **One-off Payments**: Single donations using GoCardless redirect flow
- **Recurring Payments**: Monthly donations using GoCardless redirect flow (automatically creates mandate)

### Donation Categories

- **School Visits**: Support educational school visit projects
- **Exhibitions**: Contribute to exhibition projects
- **Literature**: Help create educational literature

### UI Components

- **DonationPackage**: Displays individual donation options with category icons
- **Payment Type Toggle**: Switch between one-off and recurring payments
- **Category Tabs**: Filter donations by project category
- **Custom Amount**: Allow users to enter custom donation amounts
- **Success Page**: Confirmation page after successful payment completion
- **Failed Page**: Error handling page for failed payments with specific error messages

## File Structure

```
src/
├── lib/
│   └── gocardless.ts              # GoCardless service and templates
├── hooks/
│   └── useGoCardless.ts           # React hook for GoCardless operations
├── components/
│   └── DonationPackage.tsx        # Donation package display component
├── app/
│   ├── api/gocardless/
│   │   ├── redirect-flow/route.ts # Create redirect flows for payments
│   │   └── templates/route.ts     # Fetch donation templates
│   ├── donations/
│   │   ├── page.tsx               # Main donations page
│   │   ├── success/page.tsx       # Payment success page
│   │   └── failed/page.tsx        # Payment failure page
```

## Server-Side Architecture

The integration uses a secure server-side architecture where:

1. **Client-side**: React components handle UI interactions and call internal API routes
2. **API Routes**: Next.js API routes (`/api/gocardless/*`) handle all GoCardless operations
3. **Server-side Service**: GoCardless service class manages API calls and error handling
4. **Environment Security**: API credentials are only accessible server-side

This approach ensures:

- API credentials are never exposed to the browser
- All sensitive operations happen server-side
- Better error handling and logging capabilities
- Easier testing and debugging

## API Endpoints

### GET /api/gocardless/templates

Fetch donation templates with optional filtering.

**Query Parameters:**

- `type`: 'one-off' | 'recurring'
- `category`: 'school' | 'exhibition' | 'literature'

### POST /api/gocardless/redirect-flow

Create a redirect flow for both one-off and recurring payments.

**Body:**

```json
{
  "description": "Donation description",
  "success_redirect_url": "https://example.com/success",
  "session_token": "unique_session_token"
}
```

**Response:**

```json
{
  "id": "RE123456789",
  "status": "pending_customer_approval",
  "redirect_uri": "https://pay-sandbox.gocardless.com/billing/static/flow?id=...",
  "created_at": "2025-01-01T00:00:00.000Z",
  "updated_at": "2025-01-01T00:00:00.000Z"
}
```

## Environment Variables

Create a `.env.local` file with the following variables:

```env
GOCARDLESS_ACCESS_TOKEN=your_gocardless_access_token_here
NEXT_PUBLIC_GOCARDLESS_ENVIRONMENT=sandbox
```

## Setup Instructions

1. **Install Dependencies**

   ```bash
   npm install gocardless-nodejs axios
   ```

2. **Configure Environment Variables**
   - Copy `.env.local.example` to `.env.local`
   - Add your GoCardless access token
   - Set environment to 'sandbox' for testing or 'live' for production

3. **Get GoCardless Credentials**
   - Sign up for a GoCardless account
   - Create a sandbox account for testing
   - Generate an access token from the developer dashboard

4. **Test the Integration**
   - Start the development server: `npm run dev`
   - Navigate to `/donations`
   - Test both one-off and recurring payment flows

## Payment Flow

### Unified Payment Flow (Both One-off and Recurring)

1. User selects donation amount and category
2. User chooses payment type (one-off or recurring)
3. Clicks "Checkout"
4. Client calls `/api/gocardless/redirect-flow` endpoint
5. Server creates redirect flow via GoCardless API
6. User is redirected to GoCardless sandbox payment page
7. **For one-off payments**: User completes payment directly
8. **For recurring payments**: GoCardless automatically creates mandate and processes first payment
9. After completion, user is redirected to success page or failed page

### Error Handling

- **Success Page**: `/donations/success` - Displays confirmation for successful payments
- **Failed Page**: `/donations/failed` - Handles various failure scenarios with specific error messages

## Customization

### Adding New Donation Templates

Edit `src/lib/gocardless.ts` and add new templates to the `donationTemplates` array:

```typescript
{
  id: 'unique-id',
  name: 'Template Name',
  description: 'Template description',
  amount: 25,
  currency: 'GBP',
  type: 'one-off' | 'recurring',
  category: 'school' | 'exhibition' | 'literature',
  interval?: 'monthly' | 'quarterly' | 'yearly'
}
```

### Styling

The components use Tailwind CSS classes and follow the existing design system. Key classes:

- `bg-[#CB892A]`: Primary orange color
- `bg-[#408360]`: Green accent color
- `text-[#111111]`: Dark text color

## Error Handling

The integration includes comprehensive error handling:

- API errors are caught and displayed to users
- Loading states during API calls
- Validation for required fields
- Graceful fallbacks for missing data

## Security Considerations

- **Server-side API calls**: All GoCardless API calls are made from server-side API routes
- **Environment variables**: API keys are stored securely in environment variables
- **No client exposure**: API credentials are never exposed to the client-side
- **Error handling**: Comprehensive error handling prevents sensitive information leakage
- **User data**: No sensitive user data is stored locally
- **Payment processing**: All payment processing is handled securely by GoCardless

## Testing

1. **Sandbox Testing**: Use GoCardless sandbox environment for testing
2. **Test Cards**: Use GoCardless test bank details for payment testing
3. **Error Scenarios**: Test with invalid amounts, network errors, etc.
4. **Mock Mode**: System works in mock mode without GoCardless credentials for development
5. **Real Integration**: With valid sandbox token, users are redirected to actual GoCardless checkout pages

## Production Deployment

1. Update environment variables to use live GoCardless credentials
2. Test thoroughly in sandbox before going live
3. Monitor GoCardless dashboard for transaction status
4. Set up webhooks for payment notifications (optional)

## Support

For issues with the GoCardless integration:

1. Check the browser console for errors
2. Verify environment variables are set correctly
3. Check GoCardless dashboard for API errors
4. Review the GoCardless API documentation
