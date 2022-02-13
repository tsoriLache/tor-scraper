import { getAllPastes } from './utils/scraper';
import { Paste } from './db/Model';
import { sequelize } from './db/Model';
import hash from 'object-hash';
import { IPaste } from './types';

const insertAllPastes = async (pastes: IPaste[]) => {
  console.log(pastes.length);
  await sequelize.sync();
  pastes.forEach((paste) => {
    insertOnePaste(paste);
  });
};

const insertOnePaste = async (paste: IPaste) => {
  const id = hash(paste);
  try {
    await Paste.create({ ...paste, id, date_utc: paste.date });
  } catch (err) {
    console.log(err.parent.code);
  }
};

const execute = async () => {
  // pool.query('drop table pastes', (a: any, b: any) => console.log(a, b)); //delete data
  // pool.query('select id from pastes', (a: any, b: any) => console.log(a, b)); //get all ids
  insertAllPastes(await getAllPastes(6)); //insert all from page 1-x
};

execute();
setInterval(() => {
  execute();
}, 120000);
