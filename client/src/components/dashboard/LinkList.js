import React, { useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';
import getShortUrl from '../../util/getShortUrl';
import FlexGrow from '../common/FlexGrow';
import FormItem from '../common/FormItem';

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
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
  white-space: nowrap;

  > a {
    overflow-x: hidden;
    text-overflow: ellipsis;
  }
`;

const ShortUrlText = styled.div`
  font-size: 12px;
  margin-top: 8px;
`;

const LinksWrapper1 = styled.div`
  flex: 1;
  position: relative;
`;

const LinksWrapper2 = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: scroll;
`;

const Links = styled.div`
  padding: 16px;
`;

const SorterWrapper = styled.div`
  padding: 0 16px 16px 16px;
  border-bottom: 1px solid #ccc;
`;

export default function LinkList({ links }) {
  const { url } = useRouteMatch();
  const [sort, setSort] = useState('visits');

  return (
    <Container>
      <SorterWrapper>
        <FormItem label="Sort by:">
          <select value={sort} onChange={e => setSort(e.target.value)}>
            <option value="visits">Total visits</option>
            <option value="created_at">Date created</option>
          </select>
        </FormItem>
      </SorterWrapper>
      <LinksWrapper1>
        <LinksWrapper2>
          <Links>
            {links
              .sort((a, b) => a[sort] < b[sort])
              .map(link => (
                <LinkItemWrapper>
                  <div>
                    <LinkItem>
                      <Link to={`${url}/${link.hashid}`}>
                        {link.original_url}
                      </Link>
                      <FlexGrow />
                      <div>{link.visits} visits</div>
                    </LinkItem>
                    <ShortUrlText>{getShortUrl(link.hashid)}</ShortUrlText>
                  </div>
                </LinkItemWrapper>
              ))}
          </Links>
        </LinksWrapper2>
      </LinksWrapper1>
    </Container>
  );
}
