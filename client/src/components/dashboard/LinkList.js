import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import getShortUrl from "../../util/getShortUrl";
import FlexGrow from "../common/FlexGrow";

const Container = styled.div`
  padding: 16px;
`;

const LinkItemWrapper = styled.div`
  &:not(:last-child)::after {
    content: "";
    display: block;
    border-bottom: 1px solid lightgray;
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

  return (
    <Container>
      {links.map(link => (
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
