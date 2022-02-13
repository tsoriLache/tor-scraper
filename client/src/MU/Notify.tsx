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
import KWPastes from './keywords/KeywordsPastes';

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

export default function Notify({ notifications }: any) {
  //TODO send req to server for recent 10 pastes
  return (
    <React.Fragment>
      <Title>Notifications:</Title>
      {notifications.map((kwPastesObj: { string: Paste[] }) => (
        <KWPastes
          key={Object.keys(kwPastesObj)[0]}
          pastes={Object.values(kwPastesObj)[0]}
          title={Object.keys(kwPastesObj)[0]}
        />
      ))}
    </React.Fragment>
  );
}
