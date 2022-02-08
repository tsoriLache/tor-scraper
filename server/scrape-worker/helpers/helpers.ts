import { Paste } from '../types';
import { normalizeDate } from './normalize';
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
  const date = split[1].split('Language')[0];
  return { author, date };
};

// console.log(
//   splitSignature('Posted by Anonymous at 08 Feb 2022, 09:00:13 UTC ')
// );

const filterEmptyData = (allData: Paste[]) => {
  const filterdData = allData.filter(
    ({ date, author, content, title }) => date && author && content && title
  );
  return filterdData;
};

export { getHtml, format, filterEmptyData, splitSignature };
