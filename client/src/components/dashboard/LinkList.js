import React, { useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';
import getShortUrl from '../../util/getShortUrl';
import FlexGrow from '../common/FlexGrow';
import FormItem from '../common/FormItem';
import Spacer from '../common/Spacer';

const Container = styled.div`
  padding: 16px;
`;

const LinkItemWrapper = styled.div`
  &:not(:last-child)::after {
    content: '';
    display: block;
    border-bottom: 1px solid #ccc;
    margin: 16px;
  }
`;

const LinkItem = styled.div`
  display: flex;
  align-items: center;
`;

const ShortUrlText = styled.div`
  font-size: 12px;
  margin-top: 8px;
`;

export default function LinkList({ links }) {
  const { url } = useRouteMatch();
  const [sort, setSort] = useState('visits');

  return (
    <Container>
      <FormItem label="Sort by:">
        <select value={sort} onChange={e => setSort(e.target.value)}>
          <option value="visits">Total visits</option>
          <option value="created_at">Date created</option>
        </select>
      </FormItem>
      <Spacer />
      {links
        .sort((a, b) => a[sort] < b[sort])
        .map(link => (
          <LinkItemWrapper>
            <div>
              <LinkItem>
                <Link to={`${url}/${link.hashid}`}>{link.original_url}</Link>
                <FlexGrow />
                <div>{link.visits} visits</div>
              </LinkItem>
              <ShortUrlText>{getShortUrl(link.hashid)}</ShortUrlText>
            </div>
          </LinkItemWrapper>
        ))}
    </Container>
  );
}
