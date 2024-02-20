import { HAPIO_API_URL } from '$lib/config.js';
import { HAPIO_API_TOKEN } from '$lib/config.js';

export async function getResourceList(header, params='') {

  try {
    const queryString = Object.keys(params).length > 0
    ? `?${new URLSearchParams(params).toString()}`
    : '';
    const response = await fetch(HAPIO_API_URL + '/v1/resources/' + queryString, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${HAPIO_API_TOKEN}`, // Include the JWT token in the header
        'Content-Type': 'application/json',
        //'Access-Control-Allow-Origin': '*',
      },
    });
    return response;
  } catch (error) {
    throw new Error(`Error fetching resources list: ${error.message}`);
  }
}


export async function getResource(header, params) {
  try {
    const response = await fetch(HAPIO_API_URL + '/v1/resources/' + params.id, {
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
      throw new Error('Failed to get resource');
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export async function createResource(header, body) {
  console.log("creating a resource...")
  try {
    const response = await fetch(HAPIO_API_URL + '/v1/resources', {
      method: 'POST',
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
      throw new Error('Failed to create resource');
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export async function updateResource(header, params, body) {
  console.log("updating a resource...")
  try {
    const response = await fetch(HAPIO_API_URL + '/v1/resources/' + params.id, {
      method: 'PATCH',
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
      throw new Error('Failed to update resource');
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}
