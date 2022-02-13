import {
  Button,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
} from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { SERVER_DOMAIN } from '../../config';
import KWPastes, { Paste } from './KeywordsPastes';
const CLIENT_ID = '12345';

const sendKeywords = (clientId: string, keywords: string[]) => {
  axios.post(`${SERVER_DOMAIN}kw/${clientId}`, { keywords });
};

export default function KeywordsPage({ setNote }: any) {
  const [input, setInput] = useState('');
  const [datakw, setDataKw] = useState([] as any);
  const [listening, setListening] = useState(false);
  const [match, setMatch] = useState(false);

  useEffect(() => {
    if (!listening) {
      const events = new EventSource(`${SERVER_DOMAIN}kw/${CLIENT_ID}`);
      events.onmessage = (event) => {
        const parsedData = JSON.parse(event.data);

        if (parsedData[0] === undefined) {
          if (parsedData.notify) {
            setNote(parsedData.notify);
            setMatch(true);
            setDataKw(parsedData.data);
          } else {
            setMatch(false);
          }
        } else {
          setMatch(true);
          setDataKw(parsedData);
        }
      };
      setListening(true);
    }
  }, [listening, datakw]);

  return (
    <div>
      <FormControl>
        <InputLabel htmlFor="my-input">Search With Keywords</InputLabel>
        <Input
          id="my-input"
          aria-describedby="my-helper-text"
          onChange={({ target }) => {
            setInput(target.value);
          }}
        />
        <FormHelperText id="my-helper-text">
          Enter as many keywords as you like use | to separate them.
        </FormHelperText>
        <Button
          variant="contained"
          onClick={() => {
            sendKeywords(CLIENT_ID, input.split('|'));
          }}
        >
          Send
        </Button>
      </FormControl>
      <div>
        {match
          ? datakw.map((kwPastesObj: { string: Paste[] }) => (
              <KWPastes
                key={Object.keys(kwPastesObj)[0]}
                pastes={Object.values(kwPastesObj)[0]}
                title={Object.keys(kwPastesObj)[0]}
              />
            ))
          : 'no match'}
      </div>
    </div>
  );
}
