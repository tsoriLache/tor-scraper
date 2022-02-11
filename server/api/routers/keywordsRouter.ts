import express from 'express';
import { searchForKeywords } from '../keywords/keywords';
import { ClientRequest } from '../types';
const router = express.Router();

let clients: any = [];
let searchRequests: ClientRequest[] = [];
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

router.post('/:clientId', (req: any, res: any, next: any) => {
  const { clientId } = req.params;
  const { keywords } = req.body;

  const crIndex = searchRequests.findIndex((cr) => cr.clientId === clientId);
  if (crIndex >= 0) searchRequests[crIndex].keywords = keywords;
  else searchRequests.push({ clientId, keywords });

  searchForKeywords(searchRequests);

  setInterval(() => {
    searchForKeywords(searchRequests);
  }, 120000);
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

export default router;
