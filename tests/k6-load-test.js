import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 20 },  // Ramp up
    { duration: '1m', target: 100 },  // Load test
    { duration: '30s', target: 0 },   // Ramp down
  ],
};

const BASE_URL = __ENV.TARGET_URL; // Will be passed via command line

export default function () {
  // Health check endpoint
  const healthRes = http.get(`${BASE_URL}/health`);
  check(healthRes, { 
    'health check status is 200': (r) => r.status === 200,
  });

  // Main service endpoint
  const mainRes = http.get(`${BASE_URL}/`);
  check(mainRes, { 
    'main endpoint status is 200': (r) => r.status === 200,
  });

  sleep(1);
}