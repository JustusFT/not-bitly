import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import getShortUrl from '../../util/getShortUrl';
import Button from '../common/Button';
import Spacer from '../common/Spacer';
import { LinksContext } from './Dashboard';
import VisitGraph from './VisitGraph';

const Stats = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: 16px;
  row-gap: 8px;

  > div {
    display: flex;
    align-items: center;
  }
`;

const StatKey = styled.div`
  justify-content: flex-end;
`;

const CopyButton = styled(Button)`
  margin-left: 16px;
`;

export default function LinkInfo() {
  const { hashid } = useParams();
  const [loading, setLoading] = useState(true);
  const [visits, setVisits] = useState([]);
  const linksContext = useContext(LinksContext);

  const currentLink = linksContext.find(link => link.hashid === hashid);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/links/${hashid}/visits`)
      .then(response => response.json())
      .then(json => {
        setVisits(json);
        setLoading(false);
      });
  }, [hashid]);

  return loading ? (
    'Loading...'
  ) : (
    <div>
      <Stats>
        <StatKey>Original URL:</StatKey>
        <div>{currentLink.original_url}</div>

        <StatKey>Shortened URL:</StatKey>
        <div>
          {getShortUrl(hashid)} <CopyButton>Copy</CopyButton>
        </div>

        <StatKey>Total visits:</StatKey>
        <div>{visits.length}</div>
      </Stats>
      <Spacer />
      <div>
        <a href={getShortUrl(hashid)} target="_blank">
          Visit page
        </a>
      </div>
      <Spacer />
      <Spacer />
      <div>
        <VisitGraph visits={visits} />
      </div>
    </div>
  );
}
