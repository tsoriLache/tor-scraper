import { Paste } from './db/Model';
import { analyze } from './classifier/analyzer';

// export interface IPaste {
//   id: string;
//   title: string;
//   author: string;
//   date: number;
//   content: string;
// }

const getUntaggedPastes = async () => {
  return Paste.findAll({ where: { tags: null } });
};

const updateTags = async (pastes: any[]) => {
  pastes.forEach((paste) => {
    const tags = analyze(paste.title + paste.content);
    try {
      Paste.update({ tags }, { where: { id: paste.id } });
    } catch (err) {
      console.log(err);
    }
  });
};

const tagUntaggedPastes = async () => {
  try {
    const pastes = await getUntaggedPastes();
    updateTags(pastes);
  } catch (err) {
    console.log(err);
  }
};

setInterval(() => {
  tagUntaggedPastes();
}, 120000);
