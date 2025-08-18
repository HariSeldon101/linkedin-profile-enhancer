# Fix Google OAuth "Missing OAuth Secret" Error

## The error "Unsupported provider: missing OAuth secret" means Google OAuth is partially configured. Here's how to fix it:

## Step 1: Create Google OAuth Credentials

### 1.1 Go to Google Cloud Console
- Visit: https://console.cloud.google.com/
- Sign in with your Google account

### 1.2 Create or Select a Project
- Click the project dropdown at the top
- Click "New Project" or select an existing one
- Name it (e.g., "LinkedIn Profile Enhancer")

### 1.3 Enable Required APIs
1. In the left sidebar, click "APIs & Services" → "Library"
2. Search for "Google+ API"
3. Click on it and press "Enable"

### 1.4 Create OAuth Credentials
1. Go to "APIs & Services" → "Credentials"
2. Click "+ CREATE CREDENTIALS" → "OAuth client ID"
3. If prompted, configure the OAuth consent screen first:
   - Choose "External" user type
   - Fill in the required fields:
     - App name: "LinkedIn Profile Enhancer"
     - User support email: Your email
     - Developer contact: Your email
   - Save and continue through the scopes (you can skip optional fields)
   - Add test users if needed
   - Go back to Credentials

### 1.5 Configure OAuth Client
1. Click "+ CREATE CREDENTIALS" → "OAuth client ID" again
2. Application type: "Web application"
3. Name: "LinkedIn Profile Enhancer Web"
4. Add Authorized JavaScript origins:
   ```
   https://xsdifshrnkrkzctgorpo.supabase.co
   ```
5. Add Authorized redirect URIs:
   ```
   https://xsdifshrnkrkzctgorpo.supabase.co/auth/v1/callback
   ```
6. Click "CREATE"

### 1.6 Copy Your Credentials
After creation, you'll see a popup with:
- **Client ID**: Something like `123456789-abcdefg.apps.googleusercontent.com`
- **Client Secret**: Something like `GOCSPX-1234567890abcdefg`

**SAVE THESE - YOU'LL NEED THEM!**

## Step 2: Configure Supabase

### 2.1 Open Supabase Dashboard
- Go to: https://app.supabase.com/project/xsdifshrnkrkzctgorpo
- Sign in to your account

### 2.2 Navigate to Authentication Settings
1. Click "Authentication" in the left sidebar
2. Click "Providers" tab

### 2.3 Configure Google Provider
1. Find "Google" in the list
2. Make sure it's toggled ON (enabled)
3. Enter your credentials:
   - **Client ID**: Paste the Client ID from Google Cloud Console
   - **Client Secret**: Paste the Client Secret from Google Cloud Console
   - **Authorized Client IDs**: Leave empty (optional)
4. Click "Save"

### 2.4 Verify Redirect URLs
1. Still in Authentication, click "URL Configuration"
2. Make sure these URLs are in the "Redirect URLs" list:
   ```
   http://localhost:3000/**
   http://localhost:3003/**
   https://linkedin-profile-enhancer-*.vercel.app/**
   https://*.vercel.app/**
   ```
3. If not, add them and click "Save"

## Step 3: Test the Configuration

### 3.1 Test Locally
1. Run your app locally: `npm run dev`
2. Go to http://localhost:3003/auth/login
3. Click "Google" button
4. You should see Google's sign-in page

### 3.2 Test on Production
1. Go to your live site
2. Navigate to /auth/login
3. Click "Google" button
4. Sign in with Google

## Common Issues and Solutions

### Issue: "Access blocked: This app's request is invalid"
**Solution**: Check that your redirect URI in Google Cloud Console exactly matches Supabase's callback URL

### Issue: "redirect_uri_mismatch"
**Solution**: 
1. Copy the exact redirect URI from the error message
2. Add it to Google Cloud Console → OAuth 2.0 Client → Authorized redirect URIs
3. Save and wait 5 minutes for propagation

### Issue: "Unauthorized client"
**Solution**: Make sure the Client ID in Supabase matches the one in Google Cloud Console

### Issue: Still getting "missing OAuth secret"
**Solution**: 
1. The Client Secret might have spaces or special characters
2. Copy it again without any trailing spaces
3. Make sure you clicked "Save" in Supabase after entering the secret

## Step 4: Verify in Supabase Logs

1. In Supabase Dashboard, go to "Logs" → "Auth Logs"
2. Try to sign in with Google
3. Check the logs for any specific error messages

## Important Security Notes

- **Never commit** your Client Secret to Git
- **Never expose** your Client Secret in client-side code
- The Client ID is safe to be public
- The Client Secret must remain private

## Quick Checklist

- [ ] Google Cloud Project created
- [ ] Google+ API enabled
- [ ] OAuth consent screen configured
- [ ] OAuth 2.0 Client ID created
- [ ] Correct redirect URI added in Google Console
- [ ] Client ID copied correctly
- [ ] Client Secret copied correctly (no spaces!)
- [ ] Google provider enabled in Supabase
- [ ] Client ID pasted in Supabase
- [ ] Client Secret pasted in Supabase
- [ ] Changes saved in Supabase
- [ ] Tested locally
- [ ] Tested in production

## Still Having Issues?

1. Double-check that the Client Secret is copied correctly (it's easy to miss characters)
2. Try regenerating the Client Secret in Google Cloud Console
3. Make sure you're using the correct Supabase project
4. Clear your browser cache and cookies
5. Try in an incognito/private browser window

## Contact for Help

If you're still stuck after following all these steps:
1. Check Supabase Auth Logs for specific errors
2. Check browser console for JavaScript errors
3. The issue is likely a mismatch between Google Console and Supabase configuration