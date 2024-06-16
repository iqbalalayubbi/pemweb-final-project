function setToLocale() {}

export function getDatetime(localeTime) {
  return moment(localeTime).format("YYYY-MM-DD HH-mm-ss");
}

export function getLocaleTime(datetime) {
  return moment(datetime, "YYYY-MM-DD HH-mm-ss").format("YYYY-MM-DDTHH:mm");
}

export function getFullDate(datetime) {
  return moment(datetime, "YYYY-MM-DD HH-mm-ss").format("DD MMM YYYY");
}

export function getFullTime(datetime) {
  return moment(datetime, "YYYY-MM-DD HH-mm-ss").format("HH mm");
}
