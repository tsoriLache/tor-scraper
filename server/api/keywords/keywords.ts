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
