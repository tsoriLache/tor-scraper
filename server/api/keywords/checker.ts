const getOnlyNewPastes = (oldArr: any, newArr: any): any => {
  const comparison = (a: any, b: any) => a.id !== b.id;
  return newArr.filter((n: any) => oldArr.every((o: any) => comparison(o, n)));
};

const getAllKeysForNewPastes = (oldResult: any, result: any) => {
  return result.map((keywordObj: any, i: number) => {
    const key: string = Object.keys(keywordObj)[0];
    const newPastes = getOnlyNewPastes(
      oldResult[i][`${key}`],
      keywordObj[`${key}`]
    );
    return {
      [key]: newPastes,
    };
  });
};

const checkAllKeysForNewPastes = (
  result: { [x: string]: string[] }[]
): boolean => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return !result.every(
    (resultByKey: any) => Object.values(resultByKey)[0].length === 0
  );
};

export { getAllKeysForNewPastes, checkAllKeysForNewPastes };
