 import http from 'k6/http';
 import {sleep} from 'k6';

export const options = {

    vus: 100,
    duration: '30s',

    cloud: {
      projectID: 3720401,
      // Test runs with the same name groups test runs together
      name: 'Load testing 1'
    }
  }

  const data = {
    shop_id: 'haveagreatstart',
  }
  export default function () {
    http.post('http://localhost:3000/api/category_items', JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' },
      });
    // http.get('http://localhost:3000/api/product?shop_id=haveagreatstart');
    sleep(1);
  }