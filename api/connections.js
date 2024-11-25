
import fetch from 'node-fetch';
import { API_URL } from '../constants/api';

export async function fetchDestinations() {
    try {
        const response = await fetch(`${API_URL}`);
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }
        const data = await response.json();
        console.log(data);
        return data; 
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
        return []; 
    }
}

export async function fetchDestination(name) {
    try {
        const response = await fetch(`${API_URL}/${name}`);
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }
        const data = await response.json();
        return data; 
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
        return null; 
    }
}

export async function createDestination(destination) {
    try {
        const response = await fetch(`${API_URL}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(destination),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }
        return true; 
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
        return false; 
    }
}
export async function updateDestination(name, destination) {
    try {
        const response = await fetch(`${API_URL}/${name}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(destination),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }
        return true; 
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
        return false; 
    }
}
export async function deleteDestination(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }
        return true; 
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
        return false; 
    }
}