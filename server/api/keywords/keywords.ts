import { Paste } from '../db/Model';
import { Op } from 'sequelize';
import { sendEventsToClient } from '../routers/keywordsRouter';
import { ClientRequest } from '../types';

const searchForAllClientsKeywords = (searchRequests: ClientRequest[]) => {
  console.log(searchRequests);
  if (searchRequests) {
    console.log('searching...');
    searchRequests.forEach(({ keywords, clientId }: ClientRequest) => {
      searchKeywords(keywords, clientId);
    });
  }
};

const searchKeywords = async (keywords: string[], clientId: string) => {
  const results = await Promise.all(
    keywords.map(async (keyword) => await searchKeyword(keyword))
  );
  return sendEventsToClient(organizedResult(keywords, results), clientId);
};

const organizedResult = (keywords: string[], results: any) => {
  const organizedResult: any = [];
  keywords.forEach((keyword: string, i: number) =>
    organizedResult.push({ [keyword]: results[i] })
  );
  return organizedResult;
};

const searchKeyword = async (keyword: string) => {
  try {
    const results = await Paste.findAll({
      where: {
        title: {
          [Op.like]: '%' + keyword + '%',
        },
      },
    });
    return results.map((r: any) => r.dataValues);
  } catch (err) {
    console.log(err);
  }
};

export { searchKeywords, searchForAllClientsKeywords as searchForKeywords };
