import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
  const baseUrl = 'http://localhost:8080';

  // Test creating a new item
  const createItemPayload = JSON.stringify({
    name: 'StressTestItem',
    description: 'StressTestDescription',
  });
  const createItemParams = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const createItemRes = http.post(`${baseUrl}/items`, createItemPayload, createItemParams);
  check(createItemRes, {
    'Create Item: status is 201': (r) => r.status === 201,
  });

  // Test reading an item by ID (you can add more routes as needed)
  const itemId = '654a1ab4a5b26bc78b68eac5'; // Replace with a valid item ID
  const readItemByIdRes = http.get(`${baseUrl}/items/${itemId}`);
  check(readItemByIdRes, {
    'Read Item by ID: status is 200': (r) => r.status === 200,
  });

  // Simulate user think time
  sleep(1);
}
