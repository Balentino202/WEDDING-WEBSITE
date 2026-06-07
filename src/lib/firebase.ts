// ────────────────────────────────────────────────────────────────────────────
//  FIREBASE SETUP — read FIREBASE_SETUP.md for step-by-step screenshots/help.
//
//  Paste the config object Firebase gives you (Project settings → Your apps →
//  SDK setup and configuration → "Config") between the lines below.
//
//  Until you fill this in, the site still works perfectly: RSVPs are kept on the
//  guest's own device and the /admin page shows a "not configured yet" notice.
// ────────────────────────────────────────────────────────────────────────────

import { initializeApp, type FirebaseApp } from 'firebase/app'
import { getFirestore, type Firestore } from 'firebase/firestore'
import { getAuth, type Auth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyAfud0gMqgW2DE36h7i6icFoBEvd5dNMkQ',
  authDomain: 'wedding-site-2a5f3.firebaseapp.com',
  projectId: 'wedding-site-2a5f3',
  storageBucket: 'wedding-site-2a5f3.firebasestorage.app',
  messagingSenderId: '922490364102',
  appId: '1:922490364102:web:8f9081c0cb54a7ae1b37c7',
  measurementId: 'G-Q8CHBQF1YB',
}

// Firebase is "on" only once a projectId has been supplied above.
export const firebaseEnabled = Boolean(firebaseConfig.projectId && firebaseConfig.apiKey)

let app: FirebaseApp | undefined
let db: Firestore | undefined
let auth: Auth | undefined

if (firebaseEnabled) {
  app = initializeApp(firebaseConfig)
  db = getFirestore(app)
  auth = getAuth(app)
}

export { db, auth }
