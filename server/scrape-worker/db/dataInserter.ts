let { pool } = require('./config');
import { getAllPastes } from '../utils/scraper';
import { Paste } from '../types';
const hash = require('object-hash');

const CREATE_QUERY =
  'CREATE TABLE IF NOT EXISTS pastes (id VARCHAR(255)  PRIMARY KEY,title VARCHAR(255) NOT NULL,date_utc INT NOT NULL,content MEDIUMTEXT NOT NULL,author VARCHAR(255) NOT NULL,tags TEXT(100),created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)  ENGINE=INNODB;';

const createTable = () => {
  pool.query(CREATE_QUERY, (err: any, data: any) => {
    console.log(err ? err : data);
  });
};

const insertOnePaste = (paste: Paste) => {
  const id = hash(paste);
  const { author, title, date, content } = paste;
  pool.query(
    'INSERT into pastes (id, title, date_utc, content,author) VALUES (?,?,?,?,?)',
    [id, title, date, content, author],
    (err: any, data: any) => {
      err
        ? err.code === 'ER_DUP_ENTRY'
          ? console.log('data already exist in db:', err.sqlMessage)
          : console.log(err)
        : console.log('insert succeeded');
    }
  );
};

const insertAllPastes = (pastes: Paste[]) => {
  createTable();
  console.log(pastes.length);
  pastes.forEach((paste) => {
    insertOnePaste(paste);
  });
};

const job = async () => {
  // pool.query('drop table pastes', (a: any, b: any) => console.log(a, b)); //delete data
  // pool.query('select id from pastes', (a: any, b: any) => console.log(a, b)); //get all ids
  insertAllPastes(await getAllPastes(6)); //insert all from page 1-x
};

job();
