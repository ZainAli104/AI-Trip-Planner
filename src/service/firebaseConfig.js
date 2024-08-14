import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAld36tUPDAJaWjYP1sai0q-Y-gBwRslH4",
    authDomain: "ai-trip-planner-ed1f8.firebaseapp.com",
    projectId: "ai-trip-planner-ed1f8",
    storageBucket: "ai-trip-planner-ed1f8.appspot.com",
    messagingSenderId: "996729745455",
    appId: "1:996729745455:web:940f7509a6a789233756da",
    measurementId: "G-5WSW1SL400"
};

export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);