export default function getShortUrl(hashId) {
  return `${window.location.protocol}//${window.location.host}/${hashId}`;
}
