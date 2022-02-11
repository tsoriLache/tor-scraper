const getOnlyNewPastes = (oldarr: any, newarr: any): any => {
  const comparison = (a: any, b: any) => a.id !== b.id;
  return newarr.filter((n: any) => oldarr.every((o: any) => comparison(o, n)));
};

const checkAllKeysForNewPastes = (OLDRESULT: any, RESULT: any) => {
  return RESULT.map((keywordObj: any, i: number) => {
    const key: string = Object.keys(keywordObj)[0];
    return {
      [key]: getOnlyNewPastes(OLDRESULT[i][`${key}`], keywordObj[`${key}`]),
    };
  });
};

export default checkAllKeysForNewPastes;
