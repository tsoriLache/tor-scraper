import cheerio from 'cheerio';
import { Paste } from '../types';
import {
  getHtml,
  format,
  filterEmptyData,
  splitSignature,
} from '../helpers/helpers';
import {
  normalizeAuthor,
  normalizeContent,
  normalizeDate,
  normalizeTitle,
} from '../helpers/normalize';

const BASE_URL =
  'http://strongerw2ise74v3duebgsvug4mehyhlpa7f6kfwnas7zofs3kov7yd.onion/all?page=';
const CSS_SELECTOR = '.col-sm-12';
const EMPTY_PASTE = {
  title: '',
  author: '',
  date: 0,
  content: '',
};

export const getAllPastes = async (numberOfPages: number): Promise<Paste[]> => {
  const pastes: Promise<Paste[]>[] = new Array(numberOfPages)
    .fill('')
    .map((_, i) => getAllPageData(`${BASE_URL}${i}`, CSS_SELECTOR));
  return (await Promise.all(pastes)).flat();
};

const getAllPageData = async (url: string, cssSelector: string) => {
  const links = await getLinks(cssSelector, url);
  const allData: Paste[] = await Promise.all(
    links.map((link) => (link ? getDataFromLink(`${link}`) : EMPTY_PASTE))
  );
  return filterEmptyData(allData);
};

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

const getDataFromLink = async (url: string) => {
  try {
    let data: Paste = EMPTY_PASTE;
    const html = await getHtml(url);
    const $ = cheerio.load(html);
    $('.container', html).each(function () {
      const title = format($(this).find('h4'));
      const content = format($(this).find('.text'));
      const signature = format($(this).find('.col-sm-6'));
      const { author, date } = splitSignature(signature);
      data = {
        title: normalizeTitle(title),
        content: normalizeContent(content),
        author: normalizeAuthor(author),
        date: normalizeDate(date),
      };
    });
    return data;
  } catch (err) {
    console.log(err);
  }
};

const tryi = async () => {
  console.log(
    await getDataFromLink(
      'http://strongerw2ise74v3duebgsvug4mehyhlpa7f6kfwnas7zofs3kov7yd.onion/pwtejwwgn'
    )
  );
};

tryi();
