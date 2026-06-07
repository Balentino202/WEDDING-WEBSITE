# 🔐 RSVP Guest List — Setup Guide (one-time, ~10 minutes)

Your website can now collect every RSVP into one shared, private list that **only
you two** can open from any phone or laptop, at:

```
https://YOUR-SITE-ADDRESS/#/admin
```

To switch it on, you create a **free Firebase project** (Firebase is Google's
service for exactly this). Follow the steps below once. No coding needed — you
just copy a few values into one file.

---

## Step 1 — Create the Firebase project

1. Go to **https://console.firebase.google.com** and sign in with your Google account.
2. Click **“Add project”** → name it e.g. `purity-isaiah-wedding` → Continue.
3. Google Analytics is **not needed** — turn it off → **Create project** → wait, then **Continue**.

## Step 2 — Add a Web App and copy the config

1. On the project home, click the **`</>`** (Web) icon.
2. Nickname it `wedding-site` → **Register app** (skip “Firebase Hosting”).
3. You’ll see a code block with `const firebaseConfig = { ... }`. **Copy those values.**
4. Open the file **`src/lib/firebase.ts`** in this project and paste each value
   into the matching line. It should end up looking like:

   ```ts
   const firebaseConfig = {
     apiKey: 'AIzaSyXXXXXXXXXXXXXXXXXXXX',
     authDomain: 'purity-isaiah-wedding.firebaseapp.com',
     projectId: 'purity-isaiah-wedding',
     storageBucket: 'purity-isaiah-wedding.appspot.com',
     messagingSenderId: '123456789012',
     appId: '1:123456789012:web:abc123...',
   }
   ```

> These values are **safe** to put in the website — they only identify your
> project. Your data is protected by the login + rules in the next steps.

## Step 3 — Turn on the database (Firestore)

1. In the left menu: **Build → Firestore Database → Create database**.
2. Choose **Production mode** → pick a location (e.g. `eur3` or nearest) → **Enable**.
3. Open the **Rules** tab, replace everything with the rules below, and click **Publish**:

   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       // RSVPs: guests submit; only the logged-in couple can read/delete.
       match /rsvps/{doc} {
         allow create: if true;
         allow read, delete: if request.auth != null;
         allow update: if false;
       }
       // Guestbook well-wishes: shown publicly on the wall, anyone may post,
       // only the logged-in couple can delete.
       match /guestbook/{doc} {
         allow read, create: if true;
         allow delete: if request.auth != null;
         allow update: if false;
       }
     }
   }
   ```

   This means: **guests can send** RSVPs (private to you) and **post well-wishes**
   (shown on the public wall), but **only a logged-in account (you)** can read
   RSVPs or delete anything.

## Step 4 — Create YOUR login (the only one that can see the list)

1. Left menu: **Build → Authentication → Get started**.
2. **Sign-in method** tab → click **Email/Password** → toggle **Enable** → Save.
3. **Users** tab → **Add user** → enter the email + a strong password **you both** will use.
   - This is the email/password you’ll type on the `#/admin` page. (Add a second user if you each want your own.)

## Step 5 — Rebuild & deploy

1. In the project folder run:

   ```
   yarn build
   ```

2. Deploy as usual (push to GitHub / upload the `dist` folder).
3. Visit **`https://YOUR-SITE/#/admin`**, log in, and you’ll see RSVPs appear
   live as guests respond. 🎉

---

## What the admin page gives you

- ✅ Live counts: Responses, Yes / Maybe / No / Pending, and **total expected headcount**.
- 🎉 Per-event tally (Traditional / White Wedding / Reception) for catering.
- 🔍 Search by name/email/message and filter by response.
- 📥 **Export CSV** to hand to a planner or caterer.
- 🗑️ Delete test/spam entries.

## Good to know

- The `#/admin` link is **not shown anywhere** on the site — only people with the
  link *and* your password can use it.
- Free Firebase (Spark plan) easily covers a wedding’s worth of RSVPs at no cost.
- Until you complete Step 2, the site still works — RSVPs just stay on each
  guest’s device and `#/admin` shows a friendly “not connected yet” notice.
