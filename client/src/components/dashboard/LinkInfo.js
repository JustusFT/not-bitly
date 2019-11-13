import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import getShortUrl from '../../util/getShortUrl';
import { LinksContext } from './Dashboard';
import VisitGraph from './VisitGraph';

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
      <div>URL: {currentLink.original_url}</div>
      <div>
        <a href={getShortUrl(hashid)} target="_blank">
          Visit page
        </a>
      </div>
      <div>{visits.length} total visits</div>
      <div>
        <VisitGraph visits={visits} />
      </div>
    </div>
  );
}
