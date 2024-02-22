import { HAPIO_API_URL } from '$lib/config.js';
import { HAPIO_API_TOKEN } from '$lib/config.js';

export async function getResourceServiceList(header, params='') {

  try {
    const queryString = Object.keys(params).length > 0
    ? `?${new URLSearchParams(params).toString()}`
    : '';
    const response = await fetch(HAPIO_API_URL + '/v1/resources/' + params.resource + '/services/', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${HAPIO_API_TOKEN}`, // Include the JWT token in the header
        //'Access-Control-Allow-Origin': '*',
      },
    });
    return response;
  } catch (error) {
    throw new Error(`Error fetching list of services for a resource: ${error.message}`);
  }
}


export async function getResourceService(header, params) {
  try {
    const response = await fetch(HAPIO_API_URL + '/v1/resources/' + params.resource + '/services/' + params.id , {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${HAPIO_API_TOKEN}`, // Include the JWT token in the header
        'Content-Type': 'application/json',
      }
    });

    if (response.ok) {
      // Handle success (e.g., return response data or show a success message)
      const data = await response.json();
      return data;
    } else {
      // Handle error (e.g., throw an error or show an error message)
      throw new Error('Failed to get service for a resource');
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export async function createResourceService(header, params, body) {
  console.log("creating a service for a resource...")
  try {
    const response = await fetch(HAPIO_API_URL + '/v1/resources/' + params.resource + '/services/' + params.service , {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${HAPIO_API_TOKEN}`, // Include the JWT token in the header
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      // Handle success (e.g., return response data or show a success message)
      const data = await response.json();
      return data;
    } else {
      // Handle error (e.g., throw an error or show an error message)
      throw new Error('Failed to create a service for a resource');
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export async function deleteResourceService(header, params) {
  console.log("deleting a service for a resource...")
  try {
    const response = await fetch(HAPIO_API_URL + '/v1/resources/' + params.resource + '/services/' + params.id , {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${HAPIO_API_TOKEN}` // Include the JWT token in the header
      },
    });

    if (response.ok) {
      // Handle success (e.g., return response data or show a success message)
    } else {
      // Handle error (e.g., throw an error or show an error message)
      throw new Error('Failed to delete a service for a resource');
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}
