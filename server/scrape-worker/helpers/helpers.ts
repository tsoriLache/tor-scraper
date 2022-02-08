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

const splitSignature = (signature: string) => {
  if (typeof signature.split('Posted by ')[1] === 'undefined') return {};
  const split = signature.split('Posted by ')[1].split(' at ');
  const author = split[0];
  const date = split[1].split(', ')[0];
  return { author, date };
};
