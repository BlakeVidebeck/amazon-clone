import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://us-central1-clone-89f2e.cloudfunctions.net/api',

	// 'http://localhost:5001/clone-89f2e/us-central1/api', // the api (cloud func) url
});

export default instance;
