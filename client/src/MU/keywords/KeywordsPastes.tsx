import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../Title';
import { useState, useEffect } from 'react';
import axios from 'axios';

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

export interface Paste {
  id: string;
  title: string;
  date_utc: number;
  content: string;
  author: string;
  tags: string;
}

export default function KWPastes({
  pastes,
  title,
}: {
  pastes: Paste[];
  title: string;
}) {
  const UTCtoString = (utc: number) => new Date(utc).toString();
  //TODO send req to server for recent 10 pastes
  return (
    <React.Fragment>
      <Title>{title}</Title>

      {pastes.length === 0 ? (
        <div>no match</div>
      ) : (
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
            {pastes.map(({ id, title, tags, date_utc, author }, i) =>
              i < 5 ? (
                <TableRow key={id}>
                  <TableCell>{title}</TableCell>
                  <TableCell>{tags}</TableCell>
                  <TableCell>{UTCtoString(date_utc)}</TableCell>
                  <TableCell>{author}</TableCell>
                  <TableCell align="right">{`${100}`}</TableCell>
                </TableRow>
              ) : null
            )}
          </TableBody>
        </Table>
      )}
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more orders
      </Link>
    </React.Fragment>
  );
}
