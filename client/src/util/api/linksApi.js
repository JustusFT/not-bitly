function create(url) {
  // prepend an http:// if not provided
  if (!/^https?:\/\//.test(url)) {
    url = `http://${url}`;
  }

  return fetch(`/api/links`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url }),
  });
}

function destroy(id) {
  return fetch(`/api/links/${id}`, {
    method: "DELETE",
  });
}

export default {
  create,
  destroy,
};
