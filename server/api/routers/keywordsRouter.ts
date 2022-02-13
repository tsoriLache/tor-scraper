import express from 'express';
import searchForKeywords from '../keywords/keywords';
import { Result } from '../types';
import {
  getAllKeysForNewPastes,
  checkAllKeysForNewPastes,
} from '../keywords/checker';
const router = express.Router();

let results: { clientId: string; result: Result }[] = [];
let clients: any = [];
let pastes: any[][] = [];

router.get('/:clientId', (req: any, res: any, next: any) => {
  const { clientId } = req.params;
  console.log(`${clientId} connected`);

  const newClient = {
    id: clientId,
    res,
  };

  clients.push(newClient);

  const headers = {
    'Content-Type': 'text/event-stream',
    Connection: 'keep-alive',
    'Cache-Control': 'no-cache',
  };
  res.writeHead(200, headers);

  const data = `data: ${JSON.stringify(pastes)}\n\n`;

  res.write(data);
  req.on('close', () => {
    console.log(`${clientId} Connection closed`);
    clients = clients.filter((client: any) => client.id !== clientId);
  });
});

router.post('/:clientId', async (req: any, res: any, next: any) => {
  const { clientId } = req.params;
  const { keywords } = req.body;
  let crIndex = results.findIndex((cr) => cr.clientId === clientId);
  if (crIndex >= 0) results[crIndex].result = { old: [], neww: [] };
  else {
    results.push({ clientId, result: { old: [], neww: [] } });
    crIndex = 0;
  }

  const newResult = await searchForKeywords(keywords);
  sendEventsToClient(newResult, clientId);
  setInterval(async () => {
    console.log('2min');
    const newResult = await searchForKeywords(keywords);
    results[crIndex].result.old = results[crIndex].result.neww;
    results[crIndex].result.neww = newResult;
    if (results[crIndex].result.old.length > 0) {
      const newPastes = getAllKeysForNewPastes(
        results[crIndex].result.old,
        results[crIndex].result.neww
      );
      if (checkAllKeysForNewPastes(newPastes))
        sendNotificationToClient(newPastes, newResult, clientId);
    }
  }, 12000);
  res.json('searching...');
});

export function sendEventsToClient(pastes: any, clientId: any) {
  try {
    const client = clients.find(({ id }: any) => id === clientId);
    client.res.write(`data: ${JSON.stringify(pastes)}\n\n`);
  } catch (err) {
    console.log(err);
  }
}

export function sendNotificationToClient(
  pastes: any,
  newResult: any,
  clientId: any
) {
  try {
    const client = clients.find(({ id }: any) => id === clientId);
    client.res.write(
      `data: ${JSON.stringify({ notify: pastes, data: newResult })}\n\n`
    );
  } catch (err) {
    console.log(err);
  }
}
export default router;
