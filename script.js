import http from 'k6/http';
import { sleep } from 'k6';
import { check } from 'k6';

export let options = {
  stages: [
    { duration: '1m', target: 10 }, // 10 virtual users for 1 minute
  ],
};

const baseUrl = 'http://localhost:8080'; // Replace with your API URL

export default function () {
  // POST request to create a new item
  let newItem = {
    name: 'New Item Name',
    description: 'New Item Description',
  };
  let createResponse = http.post(`${baseUrl}/items`, JSON.stringify(newItem), {
    headers: { 'Content-Type': 'application/json' },
  });

  // Verify the POST request response
  check(createResponse, {
    'Create Item Status is 201': (r) => r.status === 201,
  });

  // GET request to read all items
  let readAllResponse = http.get(`${baseUrl}/items`);

  // Verify the GET request response
  check(readAllResponse, {
    'Read All Items Status is 200': (r) => r.status === 200,
  });

  // GET request to read an item by ID (replace :id with an actual ID)
  let itemId = 1; // Replace with an actual item ID
  let readItemResponse = http.get(`${baseUrl}/items/${itemId}`);

  // Verify the GET request response
  check(readItemResponse, {
    'Read Item Status is 200': (r) => r.status === 200,
  });

  // PUT request to update an item by ID (replace :id with an actual ID)
  let updatedItem = {
    name: 'Updated Item Name',
    description: 'Updated Item Description',
  };
  let updateResponse = http.put(`${baseUrl}/items/${itemId}`, JSON.stringify(updatedItem), {
    headers: { 'Content-Type': 'application/json' },
  });

  // Verify the PUT request response
  check(updateResponse, {
    'Update Item Status is 200': (r) => r.status === 200,
  });

  // PATCH request to partially update an item by ID (replace :id with an actual ID)
  let partialUpdateResponse = http.patch(`${baseUrl}/items/${itemId}`, JSON.stringify(updatedItem), {
    headers: { 'Content-Type': 'application/json' },
  });

  // Verify the PATCH request response
  check(partialUpdateResponse, {
    'Partial Update Item Status is 200': (r) => r.status === 200,
  });

  // DELETE request to delete an item by ID (replace :id with an actual ID)
  let deleteResponse = http.del(`${baseUrl}/items/${itemId}`);

  // Verify the DELETE request response
  check(deleteResponse, {
    'Delete Item Status is 200': (r) => r.status === 200,
  });

  // Sleep to simulate user think time
  sleep(1);
}
