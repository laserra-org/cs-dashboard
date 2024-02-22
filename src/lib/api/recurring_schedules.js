import { HAPIO_API_URL } from '$lib/config.js';
import { HAPIO_API_TOKEN } from '$lib/config.js';

export async function getRecurringScheduleList(header, params='') {

  try {
    const queryString = Object.keys(params).length > 0
    ? `?${new URLSearchParams(params).toString()}`
    : '';
    const response = await fetch(HAPIO_API_URL + '/v1/resources/' + params.resource + '/recurring-schedules/', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${HAPIO_API_TOKEN}`, // Include the JWT token in the header
        //'Access-Control-Allow-Origin': '*',
      },
    });
    return response;
  } catch (error) {
    throw new Error(`Error fetching recurring schedules list: ${error.message}`);
  }
}


export async function getRecurringSchedule(header, params) {
  try {
    const response = await fetch(HAPIO_API_URL + '/v1/resources/' + params.resource + '/recurring-schedules/' + params.id , {
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
      throw new Error('Failed to get recurring schedule');
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export async function createRecurringSchedule(header, params, body) {
  console.log("creating a recurring schedule...")
  try {
    const response = await fetch(HAPIO_API_URL + '/v1/resources/' + params.resource + '/recurring-schedules/', {
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
      throw new Error('Failed to create recurring schedule');
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export async function updateRecurringSchedule(header, params, body) {
  console.log("updating a recurring schedule...")
  try {
    const response = await fetch(HAPIO_API_URL + '/v1/resources/' + params.resource + '/recurring-schedules/' + params.id , {
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
      throw new Error('Failed to update recurring schedule');
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}
