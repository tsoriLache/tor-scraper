import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import { useState } from 'react';

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

const mockPaste = {
  id: '033858db765ccf788fcf9051021cc9646934fadc',
  title: 'Dark Web Chat Rooms',
  date_utc: 2147483647,
  content:
    'http://v3pastedc5jeqahtq77gvu3vz222bcqhlfubfunzjzqedg6jdqqlvgqd.onion/view.php?paste=9FZ10NiYQSIX',
  author: 'Anonymous',
  tags: 'malware',
};

export default function Recent() {
  const UTCtoStrig = (utc: number) => new Date(utc).toString();
  // const getRecentPastes = ()=>{}
  const [recentPastes, setRecentPastes] = useState([
    mockPaste,
    mockPaste,
    mockPaste,
    mockPaste,
    mockPaste,
    mockPaste,
  ]);
  //TODO send req to server for recent 10 pastes
  return (
    <React.Fragment>
      <Title>Recent Pastes</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Tag</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Author</TableCell>
            <TableCell align="right">Interest Valuation</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {recentPastes.map(({ id, title, tags, date_utc, author }) => (
            <TableRow key={id}>
              <TableCell>{title}</TableCell>
              <TableCell>{tags}</TableCell>
              <TableCell>{UTCtoStrig(date_utc)}</TableCell>
              <TableCell>{author}</TableCell>
              <TableCell align="right">{`${100}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more orders
      </Link>
    </React.Fragment>
  );
}
