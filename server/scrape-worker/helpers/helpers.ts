import { Paste } from '../types';
const axios = require('axios');

const getHtml = async (url: string) => {
  const response = await axios.get(`${url}`, {
    proxy: { host: 'localhost', port: 8118 },
  });
  return response.data;
};

const format = (elem: any) => {
  return elem.text().replace(/[\n\t\r]/g, '');
};

