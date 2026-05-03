import * as admin from 'firebase-admin';
import * as dotenv from 'dotenv';
import * as path from 'path';
import * as fs from 'fs';

dotenv.config();

const firebaseConfig = {
  projectId: process.env.FIREBASE_PROJECT_ID,
};

if (!admin.apps.length) {
  try {
    let serviceAccount;

    // ✅ 1. PRIORITY: Use ENV variable (Render)
    if (process.env.FIREBASE_SERVICE_ACCOUNT) {
      serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        projectId: firebaseConfig.projectId,
      });
      console.log('✅ Firebase initialized using ENV service account');
    }

    // ✅ 2. LOCAL fallback (for development)
    else {
      const serviceAccountPath = path.join(__dirname, '../../firebase-service-account.json');

      if (fs.existsSync(serviceAccountPath)) {
        serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));
        admin.initializeApp({
          credential: admin.credential.cert(serviceAccount),
          projectId: firebaseConfig.projectId,
        });
        console.log('✅ Firebase initialized with local service account');
      } else {
        throw new Error('No Firebase credentials found');
      }
    }

  } catch (error) {
    console.error('❌ Firebase initialization failed:', error);
  }
}

export const db = admin.firestore();
export const auth = admin.auth();

export default admin;