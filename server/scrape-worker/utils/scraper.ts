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

