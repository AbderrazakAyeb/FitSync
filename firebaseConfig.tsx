// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyABtWtcvgTlfEHKsuB9JKBGHpCFgdVCb44",
    authDomain: "fitsync-d6fd2.firebaseapp.com",
    projectId: "fitsync-d6fd2",
    storageBucket: "fitsync-d6fd2.firebasestorage.app",
    messagingSenderId: "970716794001",
    appId: "1:970716794001:web:913ddd0387aa01d1658330",
    measurementId: "G-P02H3EW753"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  
  export { auth };