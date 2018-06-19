import Mock from 'mockjs'; // eslint-disable-line

import axios from 'axios';

import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios);


mock.onAny((res) => {
  const method = res.method.toUpperCase;

  const result = [200];

  switch (method) {
    case 'GET':
      result.push('1');
      break;
    case 'PUT':
      result.push('2');
      break;
    case 'DELETE':
      result.push('3');
      break;
    case 'POST':
      result.push('4');
      break;
    default:
      break;
  }


  return result;
});
