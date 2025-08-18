# Google OAuth Setup for Supabase

## Steps to Enable Google Sign-In

### 1. Google Cloud Console Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API:
   - Go to "APIs & Services" > "Library"
   - Search for "Google+ API"
   - Click "Enable"

4. Create OAuth 2.0 Credentials:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth client ID"
   - Choose "Web application"
   - Name it (e.g., "LinkedIn Profile Enhancer")
   - Add Authorized JavaScript origins:
     ```
     https://xsdifshrnkrkzctgorpo.supabase.co
     http://localhost:3000
     http://localhost:3003
     ```
   - Add Authorized redirect URIs:
     ```
     https://xsdifshrnkrkzctgorpo.supabase.co/auth/v1/callback
     ```
   - Click "Create"
   - Save your **Client ID** and **Client Secret**

### 2. Supabase Dashboard Setup

1. Go to your [Supabase Dashboard](https://app.supabase.com)
2. Select your project: **linkedin-profile-enhancer**
3. Navigate to "Authentication" > "Providers"
4. Find "Google" in the list
5. Toggle it to **Enabled**
6. Enter your Google OAuth credentials:
   - **Client ID**: (from Google Cloud Console)
   - **Client Secret**: (from Google Cloud Console)
7. Click "Save"

### 3. Update Redirect URLs (if needed)

In your Supabase dashboard:
1. Go to "Authentication" > "URL Configuration"
2. Add your site URLs to "Redirect URLs":
   ```
   http://localhost:3000/auth/callback
   http://localhost:3003/auth/callback
   https://linkedin-profile-enhancer-*.vercel.app/auth/callback
   https://your-custom-domain.com/auth/callback
   ```

### 4. Environment Variables

Make sure your `.env.local` has:
```env
NEXT_PUBLIC_SUPABASE_URL=https://xsdifshrnkrkzctgorpo.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

### 5. Testing

1. Start your development server: `npm run dev`
2. Go to `/auth/login`
3. Click the "Google" button
4. You should be redirected to Google's OAuth consent screen
5. After authorization, you'll be redirected back to `/dashboard`

## Troubleshooting

### Error: "Unsupported provider: provider is not enabled"
- This means Google OAuth is not enabled in Supabase
- Follow steps 2 above to enable it

### Error: "redirect_uri_mismatch"
- The redirect URI doesn't match what's configured in Google Cloud Console
- Add the exact URI shown in the error to your Google OAuth settings

### Error: "Invalid client"
- Your Client ID or Client Secret is incorrect
- Double-check the credentials in both Google Cloud Console and Supabase

### Users not being created
- Check Supabase logs in Dashboard > "Logs" > "Edge Functions"
- Ensure the database tables exist (users, profiles)

## Security Notes

- Never commit your Client Secret to version control
- Use environment variables for sensitive data
- Regularly rotate your OAuth credentials
- Monitor usage in Google Cloud Console