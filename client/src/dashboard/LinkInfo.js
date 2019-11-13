import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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

  return loading ? "Loading..." : <div>info{JSON.stringify(visits)}</div>;
}
