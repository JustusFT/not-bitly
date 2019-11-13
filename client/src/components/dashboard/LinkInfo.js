import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getShortUrl from "../../util/getShortUrl";

export default function LinkInfo() {
  const { hashid } = useParams();
  const [loading, setLoading] = useState(true);
  const [visits, setVisits] = useState([]);

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
    "Loading..."
  ) : (
    <div>
      <div>URL: [url...]</div>
      <div>
        <a href={getShortUrl(hashid)} target="_blank">
          Visit page
        </a>
      </div>
      <div>{visits.length} total visits</div>
      <div>(insert some sort of graph to see visits over time)</div>
      {JSON.stringify(visits)}
    </div>
  );
}
