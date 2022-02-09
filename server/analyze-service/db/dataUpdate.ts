import { analyze } from '../analyzer';

let { pool } = require('./config');

export interface Paste {
  id: string;
  title: string;
  author: string;
  date: number;
  content: string;
}

const getAndUpdateAllUntaggedPaste = () => {
  pool.query(
    'SELECT * FROM pastes WHERE tags is null',
    (err: any, data: any) => {
      if (err) console.log(err);
      else {
        updateTags(data);
      }
    }
  );
};

const updateTags = (pastes: Paste[]) => {
  pastes.forEach((paste) => {
    const tag = analyze(paste.title + paste.content);
    pool.query(
      `UPDATE pastes SET tags = '${tag}' WHERE id = '${paste.id}';`,
      (err: any, data: any) => {
        err ? console.log(err) : console.log(data);
      }
    );
  });
};

getAndUpdateAllUntaggedPaste();
