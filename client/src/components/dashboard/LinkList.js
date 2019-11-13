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

export default function LinkList({ links }) {
  const { url } = useRouteMatch();

  return (
    <Container>
      {links.map(link => (
        <LinkItemWrapper>
          <LinkItem>
            <Link to={`${url}/${link.hashid}`}>{getShortUrl(link.hashid)}</Link>
            <FlexGrow />
            <div>{link.visits} visits</div>
          </LinkItem>
        </LinkItemWrapper>
      ))}
    </Container>
  );
}
