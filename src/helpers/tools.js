
export const writeJsonLd = function doWriteJsonLd(data) {
  let jsonElem = document.querySelector('script[type="application/ld+json"]'),
      appendElementToHead = false;
  if (!jsonElem) {
    jsonElem = document.createElement('script');
    jsonElem.setAttribute('type', 'application/ld+json');
    appendElementToHead = true;
  }
  jsonElem.innerText = JSON.stringify(data);
  if (appendElementToHead) {
    document.head.appendChild(jsonElem);
  }
}

export const scrollToPos = (pos) => document.body.scrollTop = document.documentElement.scrollTop = pos;
export const scrollToTop = () => scrollToPos(0);


const parseDate = (date) => {
  var parsedDate = new Date(date);
  return parsedDate.toDateString().split(' ');
}
const getDay = (date) => {
  var dateParts = parseDate(date);
  return dateParts[2];
}
const getMonth = (date) => {
  var dateParts = parseDate(date);
  return dateParts[1];
}
const getYear = (date) => {
  var dateParts = parseDate(date);
  return dateParts[3];
}
export const parseDayAndMonth = (date) => {
  return date ? `${getDay(date)} ${getMonth(date)}` : 'a definir';
}
export const parseDayMonthYear = (date) => {
  return date ? `${getDay(date)} ${getMonth(date)} ${getYear(date)}` : 'a definir';
}

const getHours = (date) => {
  var timeParts = parseTime(date);
  return timeParts[0].split(':')[0];
}
const getMinutes = (date) => {
  var timeParts = parseTime(date);
  return timeParts[0].split(':')[1];
}
const buildCurrentTime = (date) => {
  let hours = getHours(date),
  minutes = getMinutes(date);
  let ret = `${hours}h`
  if (minutes != '00') {
    ret += `${minutes}m`;
  }
  return ret;
}
const parseTime = (date) => {
  var parsedDate = new Date(date);
  return parsedDate.toTimeString().split(' ');
}
export const parseHour = (date) => {
  let dateRegex = /\d{4}-\d{1,2}-\d{1,2}(?:T|\s)\d{2}\:\d{2}\:\d{2}/;
  return dateRegex.test(date) 
        ? buildCurrentTime(date)
        : 'a definir';
}