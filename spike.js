import http from 'k6/http';
import { check } from 'k6';

export default function () {
  const baseUrl = 'http://localhost:8080';

  // Test creating a new item
  const createItemPayload = JSON.stringify({
    name: 'SpikeTestItem',
    description: 'SpikeTestDescription',
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
}
