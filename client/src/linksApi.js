function create(url) {
  // prepend an http:// if not provided
  if (!/$https?:\/\//.test(url)) {
    url = `http://${url}`;
  }

  return fetch(`/api/links`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ url })
  });
}

export default {
  create
};
