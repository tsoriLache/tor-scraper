let docClient = require('./config');
import { getAllPastes } from '../utils/scraper';
import { Paste } from '../types';
const md5 = require('md5');
let i = 1;
const insertOnePaste = (paste: Paste) => {
  const id = md5(paste.content);

  const params = {
    TableName: 'pastes',
    Item: { ...paste, id },
  };
  docClient.put(params, function (err: any, _data: any) {
    if (err) console.log(err);
  });
};

const insertAllPastes = (pastes: Paste[]) => {
  console.log(pastes.length);
  pastes.forEach((paste) => {
    console.log(i++, md5(paste.content));

    insertOnePaste(paste);
  });
};

const job = async () => {
  const pastes = await getAllPastes(6);
  insertAllPastes(pastes);
};

job();
