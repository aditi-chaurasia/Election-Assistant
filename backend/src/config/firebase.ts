import * as admin from 'firebase-admin';
import * as dotenv from 'dotenv';
import * as path from 'path';
import * as fs from 'fs';

dotenv.config();

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  try {
    // Try to find and use service account key
    const serviceAccountPath = path.join(__dirname, '../../firebase-service-account.json');
    
    if (fs.existsSync(serviceAccountPath)) {
      try {
        const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));
        admin.initializeApp({
          credential: admin.credential.cert(serviceAccount),
          projectId: firebaseConfig.projectId,
        });
        console.log('✅ Firebase initialized with service account');
      } catch (parseError) {
        console.warn('⚠️  Service account file exists but is invalid. Using default credentials...');
        admin.initializeApp({
          projectId: firebaseConfig.projectId,
        });
      }
    } else {
      // Fallback: Use default credentials (requires GOOGLE_APPLICATION_CREDENTIALS env var)
      admin.initializeApp({
        projectId: firebaseConfig.projectId,
      });
      console.log('ℹ️  Firebase initialized with default credentials');
      console.warn('📝 Note: To use Firestore, place firebase-service-account.json in the backend folder');
    }
  } catch (error) {
    console.error('❌ Failed to initialize Firebase Admin SDK:', error);
    console.warn('⚠️  Firestore operations will fail. Please provide service account credentials.');
  }
}

export const db = admin.firestore();
export const auth = admin.auth();

export default admin;
