import { Paste } from '../db/Model';
import { Op } from 'sequelize';

const searchKeywords = async (keywords: string[]) => {
  const results = await Promise.all(
    keywords.map(async (keyword) => await searchKeyword(keyword))
  );
  return organizedResult(keywords, results);
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

const organizedResult = (keywords: string[], results: any) => {
  const organizedResult: { [x: string]: string[] }[] = [];
  keywords.forEach((keyword: string, i: number) =>
    organizedResult.push({ [keyword]: results[i] })
  );
  return organizedResult;
};

export default searchKeywords;
