import * as R from 'ramda';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import linksApi from '../../util/api/linksApi';
import getShortUrl from '../../util/getShortUrl';
import Button from '../common/Button';
import CopyButton from '../common/CopyButton';
import Modal from '../common/Modal';
import Spacer from '../common/Spacer';
import Spin from '../common/Spin';
import { LinksContext } from './Dashboard';
import VisitGraph from './VisitGraph';

const Stats = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: 16px;
  row-gap: 8px;

  > div {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }
`;

const StatKey = styled.div`
  justify-content: flex-end;
`;

const CopyButtonContainer = styled.div`
  margin-left: 16px;
`;

const SpinContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ButtonSpacer = styled.div`
  width: 16px;
`

function DeleteButton({ id }) {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(false);
  const linksContext = useContext(LinksContext);

  async function deleteLink() {
    setLoading(true);
    const response = await linksApi.destroy(id);
    if (response.ok) {
      setActive(false);
      history.push("/a/dashboard");
      linksContext.setLinks(R.reject(x => x.hashid == id, linksContext.links))
    } else {
      alert("Failed to delete link!");
    }
    setLoading(false);
  }

  return (
    <>
      <Modal
        active={active}
        title="Delete Link"
        body={() => (
          <div>Are you sure that you want to delete this link? This action cannot be undone.</div>
        )}
        footer={() => (
          <>
            <Button disabled={loading} loading={loading} onClick={() => setActive(false)}>Cancel</Button>
            <ButtonSpacer />
            <Button disabled={loading} loading={loading} color="danger" onClick={() => deleteLink(id)}>Delete</Button>
          </>
        )}
      />
      <Button color="danger" onClick={() => setActive(true)}>Delete link</Button>
    </>
  )
}

export default function LinkInfo({ width }) {
  const { hashid } = useParams();
  const [loading, setLoading] = useState(true);
  const [visits, setVisits] = useState([]);
  const linksContext = useContext(LinksContext);

  const currentLink = linksContext.links.find(link => link.hashid === hashid);

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
    <SpinContainer>
      <Spin />
    </SpinContainer>
  ) : (
      <div>
        <Stats>
          <StatKey>Original URL:</StatKey>
          <div>{currentLink.original_url}</div>

          <StatKey>Shortened URL:</StatKey>
          <div>
            {getShortUrl(hashid)}{' '}
            <CopyButtonContainer>
              <CopyButton text={getShortUrl(hashid)} />
            </CopyButtonContainer>
          </div>

          <StatKey>Total visits:</StatKey>
          <div>{visits.length}</div>
        </Stats>
        <Spacer />
        <DeleteButton id={hashid} />
        <Spacer />
        <div>
          <a href={getShortUrl(hashid)} target="_blank">
            Visit page
        </a>
        </div>
        <Spacer />
        <Spacer />
        <div>
          <VisitGraph width={width} visits={visits} />
        </div>
      </div>
    );
}
