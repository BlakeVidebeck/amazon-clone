import firebase from 'firebase';

const firebaseConfig = {
	apiKey: 'AIzaSyA0DXgeDkJ1Iqjf6-CpUTlHoBHqCvggb1Q',
	authDomain: 'clone-89f2e.firebaseapp.com',
	projectId: 'clone-89f2e',
	storageBucket: 'clone-89f2e.appspot.com',
	messagingSenderId: '501151139434',
	appId: '1:501151139434:web:ef5073a050bf99012dac13',
	measurementId: 'G-BTTYEWPBWB',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
