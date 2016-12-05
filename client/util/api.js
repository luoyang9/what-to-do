import fetch from 'isomorphic-fetch'
import config from '../../server/config'

const API_URL = typeof window === 'undefined' ? `http://localhost:${config.port}/api` : '/api';

export default function callAPI(endpoint, method = 'GET', body) {
	return fetch(`${API_URL}/${endpoint}`, {
		headers: {'Content-Type': 'application/json'},
		method,
		body: JSON.stringify(body)
	}).then(response => {	
		if(!response.ok) {
			return Promise.reject(json);
		}	

		if(response.status === 204) return;
		return response.json();
	});
}