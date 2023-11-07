import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 10, // Number of virtual users
  duration: '30s', // Test duration
};

export default function () {
  const baseUrl = 'http://localhost:8080';

  // Test creating a new item
  const createItemPayload = JSON.stringify({
    name: 'LoadTestItem',
    description: 'LoadTestDescription',
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

  // Test reading all items
  const readAllItemsRes = http.get(`${baseUrl}/items`);
  check(readAllItemsRes, {
    'Read All Items: status is 200': (r) => r.status === 200,
  });

  // Simulate user think time
  sleep(1);
}
