import { HAPIO_API_URL } from '$lib/config.js';
import { HAPIO_API_TOKEN } from '$lib/config.js';

export async function getScheduleBlockList(header, params='') {

  try {
    const queryString = Object.keys(params).length > 0
    ? `?${new URLSearchParams(params).toString()}`
    : '';
    const response = await fetch(HAPIO_API_URL + '/v1/resources/' + params.resource + '/schedule-blocks/', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${HAPIO_API_TOKEN}`, // Include the JWT token in the header
        //'Access-Control-Allow-Origin': '*',
      },
    });
    return response;
  } catch (error) {
    throw new Error(`Error fetching services list: ${error.message}`);
  }
}


export async function getScheduleBlock(header, params) {
  try {
    const response = await fetch(HAPIO_API_URL + '/v1/resources/' + params.resource + '/schedule-blocks/' + params.id , {
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
      throw new Error('Failed to get service');
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export async function createScheduleBlock(header, body) {
  console.log("creating a schedule block...")
  try {
    const response = await fetch(HAPIO_API_URL + '/v1/services', {
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
      throw new Error('Failed to create schedule block');
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export async function updateScheduleBlock(header, params, body) {
  console.log("updating a schedule block...")
  try {
    const response = await fetch(HAPIO_API_URL + '/v1/services/' + params.id, {
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
      throw new Error('Failed to update schedule block');
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}
