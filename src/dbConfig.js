import {initializeApp} from 'firebase/app';
import {getDatabase} from 'firebase/database';

const DB_CONFIG = {
    apiKey: "AIzaSyB4_zSocBtQ4zOeqIXwPFwyawkkQy6sLTY",
    authDomain: "commune-aid.firebaseapp.com",
    databaseURL: "https://commune-aid-default-rtdb.firebaseio.com",
    projectId: "commune-aid",
    storageBucket: "commune-aid.appspot.com",
    messagingSenderId: "775689803349",
    appId: "1:775689803349:web:4cb2ebadb9a0a3849026dc",
    measurementId: "G-23288JJZK5"
};

// Initialize Firebase
const app = initializeApp(DB_CONFIG);
const database = getDatabase(app)

  
export {app, database};
  