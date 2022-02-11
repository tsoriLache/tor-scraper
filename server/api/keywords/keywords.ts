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
