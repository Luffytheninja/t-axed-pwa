# Studio Ayo Website - Form Data Storage

## Current Status
The contact form in the website currently **does not save data anywhere**. When a user submits the form, it only shows an alert message but doesn't persist the data.

## Recommended Solutions

### Option 1: Formspree (Easiest, Free Tier Available)
**Best for**: Quick deployment, no backend needed

1. Sign up at [https://formspree.io](https://formspree.io)
2. Create a new form and get your form endpoint
3. Update `src/components/Contact.jsx`:
   ```javascript
   const handleSubmit = async (e) => {
     e.preventDefault()
     
     try {
       const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify(formData),
       })
       
       if (response.ok) {
         alert('Thank you for your interest! We will be in touch soon.')
         setFormData({ name: '', email: '', company: '', message: '' })
       }
     } catch (error) {
       alert('Something went wrong. Please try again.')
     }
   }
   ```

**Pros**: 
- No backend code needed
- Free tier: 50 submissions/month
- Email notifications
- Spam protection
- Dashboard to view submissions

**Cons**: 
- Limited free submissions
- Data stored on third-party service

---

### Option 2: Netlify Forms (If deploying on Netlify)
**Best for**: If you're deploying on Netlify

1. Add `netlify` attribute to your form in `Contact.jsx`:
   ```jsx
   <form onSubmit={handleSubmit} data-netlify="true" name="contact">
     <input type="hidden" name="form-name" value="contact" />
     {/* rest of your form fields */}
   </form>
   ```

**Pros**:
- Free (100 submissions/month)
- Built into Netlify
- Email notifications
- Export to CSV

**Cons**:
- Only works with Netlify hosting
- Limited to 100 submissions/month on free plan

---

### Option 3: Google Sheets (Via Google Apps Script)
**Best for**: Simple storage you can access easily

1. Create a Google Sheet
2. Go to Extensions → Apps Script
3. Add this code:
   ```javascript
   function doPost(e) {
     var sheet = SpreadsheetApp.getActiveSheet();
     var data = JSON.parse(e.postData.contents);
     sheet.appendRow([new Date(), data.name, data.email, data.company, data.message]);
     return ContentService.createTextOutput(JSON.stringify({result: 'success'}))
       .setMimeType(ContentService.MimeType.JSON);
   }
   ```
4. Deploy as web app and get the URL
5. Update form to POST to that URL

**Pros**:
- Free
- Data in spreadsheet you control
- Easy to export/analyze

**Cons**:
- Requires Google Apps Script setup
- Need to handle CORS

---

### Option 4: Custom Backend (Most Control)
**Best for**: Full control and integration with your systems

Create your own backend using:
- Node.js + Express
- Firebase/Supabase
- Vercel Serverless Functions

**Pros**:
- Full control
- Can integrate with CRM/database
- Custom logic

**Cons**:
- Requires backend development
- More complex deployment

---

## Recommended Solution for Studio Ayo

For a quick launch, I recommend **Formspree**:
- Professional
- Easy setup (5 minutes)
- Email notifications
- Free tier sufficient for starting out
- Can upgrade as needed

## Next Steps

1. Choose a solution above
2. Update `src/components/Contact.jsx` with the chosen implementation
3. Test the form submission
4. Set up email notifications (if available)
5. Monitor submissions through your chosen platform's dashboard
