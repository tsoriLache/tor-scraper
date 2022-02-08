let docClient = require('./config');
import { getAllPastes } from '../utils/scraper';
import { Paste } from '../types';

const insertOnePaste = (paste: Paste) => {
  const params = {
    TableName: 'pastes',
    Item: paste,
  };
  docClient.put(params, function (err: any, data: any) {
    if (data) {
      console.log(data);
    } else {
      console.log(err);
    }
  });
};

const insertAllPastes = (pastes: Paste[]) => {
  console.log(pastes.length);
  pastes.forEach((paste) => {
    insertOnePaste(paste);
  });
};

const job = async () => {
  const pastes = await getAllPastes(5);

  insertAllPastes(pastes);
};

job();
