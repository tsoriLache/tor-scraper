import cheerio from 'cheerio';
import { Paste } from '../types';
import {
  getHtml,
  format,
  filterEmptyData,
  splitSignature,
} from '../helpers/helpers';

const BASE_URL =
  'http://strongerw2ise74v3duebgsvug4mehyhlpa7f6kfwnas7zofs3kov7yd.onion/all?page=';
const CSS_SELECTOR = '.col-sm-12';

const getLinks = async (cssSelector: string, url: string) => {
  try {
    const html = await getHtml(url);
    const $ = cheerio.load(html);
    let links: {}[] = [];
    $(`${cssSelector}`, html).each((_: number, cheerioElement: any) => {
      const detailedLink = $(cheerioElement).find('a').attr('href');
      links = [...links, detailedLink];
    });
    return links;
  } catch (err) {
    console.log(err);
  }
};
