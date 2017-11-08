
function modifyreleaseDate(releaseDate) {
  const newReleaseDate = releaseDate.substring(0, 10);
  return newReleaseDate;
}
function millisToMinutesAndSeconds(millis) {
  const minutes = Math.floor(millis / 60000);
  const seconds = ((millis % 60000) / 1000).toFixed(0);
  const temps = `${minutes}:${seconds}`;
  return temps;
}

export default class JSOperation {
  static setreleasedate(releasedate) {
    return modifyreleaseDate(releasedate);
  }
  static setmillistominute(millis) {
    return millisToMinutesAndSeconds(millis);
  }
}
