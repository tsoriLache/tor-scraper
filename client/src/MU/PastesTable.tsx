import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { SERVER_DOMAIN } from '../config';

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

interface Paste {
  id: string;
  title: string;
  date_utc: number;
  content: string;
  author: string;
  tags: string;
}

export default function Recent() {
  const UTCtoString = (utc: number) => new Date(utc).toString();
  const [recentPastes, setRecentPastes] = useState([{} as Paste]);
  useEffect(() => {
    const recentPastesFromDB = async () => {
      const { data }: { data: Paste[] } = await axios.get(
        `${SERVER_DOMAIN}paste/recent`
      );
      console.log(data);

      setRecentPastes(data);
    };

    recentPastesFromDB();
  }, []);

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
              <TableCell>{UTCtoString(date_utc)}</TableCell>
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
